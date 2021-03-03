import React, { useEffect, useReducer, useState } from 'react';

import { isEmpty } from 'ramda';
import { useDispatch, useSelector } from 'react-redux';
import { getAddressesActions } from 'store/actions';
import { GetAddressOptions } from 'store/selectors/seller/addresses';
import { MarketOfferItem } from 'types/store/CreateMarketOfferState';
import { Store } from 'types/store/Store';
import { createUpdateReducer } from 'utils/Hooks';
import { v4 as uuidv4 } from 'uuid';

import { MakeOfferProps } from './MakeOffer.props';
import { isValid } from './MakeOffer.validation';
import MakeOfferView from './MakeOffer.view';

const MakeOffer = (props: MakeOfferProps): JSX.Element => {
  const { buyerRequest, offer, currentOfferItem } = props;
  const dispatch = useDispatch();

  const currentOfferItemData = offer.find(
    (item) => item.editId === currentOfferItem
  );

  const [specifications, setSpecifications] = useState<string[]>(
    currentOfferItemData?.stateOptions || []
  );
  const [size, setSize] = useState(
    currentOfferItemData?.size.from === null
      ? 'ungraded'
      : currentOfferItemData?.size.from || ''
  );
  const [weight, setWeight] = useState(
    currentOfferItemData?.weight ? currentOfferItemData?.weight.toString() : ''
  );
  const [price, setPrice] = useState(
    currentOfferItemData?.price ? currentOfferItemData?.price.toString() : ''
  );
  const [deliveryDate, setDeliveryDate] = useState<Date | null>(
    currentOfferItemData?.deliveryDate || null
  );
  const [selectedAddress, setSelectedAddress] = useState(
    currentOfferItemData?.addressId || ''
  );

  const [errors, setErrors] = useReducer(
    createUpdateReducer<Record<string, string[]>>(),
    {}
  );

  const user = useSelector((state: Store) => state.getUser.data?.data.user);
  const sellerAddresses = useSelector(
    (state: Store) => state.getAddresses.data?.data.addresses || []
  );
  const addresses = GetAddressOptions(sellerAddresses);
  const companies = user?.companies || [];

  const getShippingTo = () => {
    const { shippingTo } = buyerRequest;
    const streetNumber = shippingTo.unit_number
      ? `${shippingTo.unit_number}/${shippingTo.street_number}`
      : shippingTo.street_number;
    return `${streetNumber} ${shippingTo.street_name}, ${shippingTo.suburb}, ${shippingTo.state} ${shippingTo.postcode}`;
  };

  const stateOptions =
    buyerRequest.specifications.map((group) => {
      return {
        label: group.stateName,
        value: group.stateId,
      };
    }) || [];

  const marketSizes = !isEmpty(buyerRequest.sizeOptions)
    ? buyerRequest.sizeOptions
    : [];

  useEffect(() => {
    if (companies.length > 0) {
      dispatch(
        getAddressesActions.request({
          companyId: companies[0].id,
        })
      );
    }
  }, [companies]);

  const onClickSpecification = (id: string) => {
    if (specifications.includes(id)) {
      setSpecifications((prevState) => prevState.filter((ps) => ps !== id));
    } else {
      setSpecifications((prevState) => [...prevState, id]);
    }
  };

  const addToMarketOffers = () => {
    const marketOfferValidation = isValid({
      specifications,
      size,
      price,
      deliveryDate,
      selectedAddress,
      weight,
    });
    const isEmptyError = Object.keys(marketOfferValidation).every(
      (k) => marketOfferValidation[k].length === 0
    );
    setErrors(marketOfferValidation);

    const payload: MarketOfferItem = {
      editId: currentOfferItemData?.editId || uuidv4(),
      addressId: selectedAddress,
      companyId: user?.companies[0].id || '',
      deliveryDate,
      marketRequestId: buyerRequest.id || '',
      price: parseFloat(price) || 0,
      sellerId: user?.id || '',
      size: {
        from: size as string,
        to: null,
      },
      stateOptions: specifications,
      weight: parseFloat(weight),
      listStateOptions: stateOptions
        .filter((item) => specifications.includes(item.value))
        .map((item) => item.label),
      type: buyerRequest?.type || '',
      image: buyerRequest?.image || '',
      measurementUnit: buyerRequest?.measurementUnit || '',
    };

    if (size === 'ungraded') {
      payload.size = {
        from: null,
        to: null,
      };
    }

    if (isEmptyError) {
      props.setOffer((o) => {
        const existing = o.some((item) => item.editId === payload.editId);
        if (existing) {
          return [
            payload,
            ...o.filter((item) => item.editId !== payload.editId),
          ];
        }

        return [...o, payload];
      });

      props.setCurrentOfferItem('');
      props.setStep && props.setStep(3);
    }
  };

  const generatedProps = {
    shippingTo: getShippingTo(),
    addresses,
    stateOptions,
    marketSizes,
    errors,

    size,
    setSize,
    specifications,
    weight,
    setWeight,
    price,
    setPrice,
    deliveryDate,
    setDeliveryDate,
    selectedAddress,
    setSelectedAddress,

    onClickSpecification,
    addToMarketOffers,
    ...props,
  };
  return <MakeOfferView {...generatedProps} />;
};

export default MakeOffer;
