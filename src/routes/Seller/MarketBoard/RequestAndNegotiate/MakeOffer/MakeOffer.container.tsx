import React, { useEffect, useReducer, useState } from 'react';

import { isEmpty } from 'ramda';
import { useDispatch, useSelector } from 'react-redux';
import { getAddressesActions } from 'store/actions';
import { GetAddressOptions } from 'store/selectors/seller/addresses';
import { Store } from 'types/store/Store';
import { createUpdateReducer } from 'utils/Hooks';

import { MakeOfferProps } from './MakeOffer.props';
import { isValid } from './MakeOffer.validation';
import MakeOfferView from './MakeOffer.view';

const MakeOffer = (props: MakeOfferProps): JSX.Element => {
  const { buyerRequest } = props;
  const dispatch = useDispatch();

  const currentSelectedMarketOffer = {} as any;

  const [specifications, setSpecifications] = useState<string[]>([]);
  const [size, setSize] = useState('');
  const [weight, setWeight] = useState('');
  const [price, setPrice] = useState('');
  const [deliveryDate, setDeliveryDate] = useState<Date | null>(null);
  const [selectedAddress, setSelectedAddress] = useState('');

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

    // const payload: MarketOfferItem = {
    const payload: any = {
      addressId: selectedAddress,
      companyId: user?.companies[0].id || '',
      deliveryDate,
      marketRequestId: currentSelectedMarketOffer?.id || '',
      price: parseFloat(price) || 0,
      sellerId: user?.id || '',
      size: {
        from: size,
        to: size,
      },
      stateOptions: specifications,
      weight: parseFloat(weight),
      listStateOptions: stateOptions
        .filter((item) => specifications.includes(item.value))
        .map((item) => item.label),
      type: currentSelectedMarketOffer?.type,
      image: currentSelectedMarketOffer?.image,
      measurementUnit: currentSelectedMarketOffer?.measurementUnit,
    };

    if (specifications.length < 0 || size === 'ungraded') {
      payload.size = {
        from: null,
        to: null,
      };
    }

    if (isEmptyError) {
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
