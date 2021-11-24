import React, { useEffect, useReducer, useState } from 'react';

import { F, forEach, groupBy, isEmpty } from 'ramda';
import { useDispatch, useSelector } from 'react-redux';
import { getGroupName } from 'routes/Seller/MarketBoard/RequestAndNegotiate/MakeOffer/MakeOffer.transforms';
import { getAddressesActions } from 'store/actions';
import { GetAddressOptions } from 'store/selectors/seller/addresses';
import { MarketOfferItem } from 'types/store/CreateMarketOfferState';
import { Store } from 'types/store/Store';
import { createUpdateReducer } from 'utils/Hooks';
import { v4 as uuidv4 } from 'uuid';

import { MakeOfferProps, Option } from './MakeOffer.props';
import { isValid } from './MakeOffer.validation';
import MakeOfferView from './MakeOffer.view';

const MakeOffer = (props: MakeOfferProps): JSX.Element => {
  const { buyerRequest, offer, currentOfferItem } = props;
  const dispatch = useDispatch();

  const currentOfferItemData = offer.find(
    (item) => item.editId === currentOfferItem
  );

  const stateOptions = buyerRequest.specifications
    ? buyerRequest.specifications.map((group, i) => {
        return {
          label: group.stateName,
          value: group.stateId,
          groupOrder: group.stateGroup,
          groupName: `Specifications ${group.stateGroup}`,
        };
      })
    : [];

  const stateGroups = groupBy((s) => s.groupOrder.toString(), stateOptions);
  const groupedStateOptions = Object.values(stateGroups);

  const [specifications, setSpecifications] = useState<Option[]>(
    currentOfferItemData?.stateOptions
      ? stateOptions.filter((st) =>
          currentOfferItemData?.stateOptions.includes(st.value)
        )
      : []
  );
  const [size, setSize] = useState({
    from:
      currentOfferItemData?.size.from === null
        ? 'ungraded'
        : currentOfferItemData?.size.from || '',
    to:
      currentOfferItemData?.size.to === null
        ? ''
        : currentOfferItemData?.size.to || '',
  });
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
    return `${shippingTo.suburb}, ${shippingTo.state} ${shippingTo.postcode}`;
  };

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

  const onClickSpecification = (option: Option) => {
    const ids = specifications.map((s) => s.value);
    const groupOrders = specifications.map((s) => s.groupOrder);

    if (groupOrders.includes(option.groupOrder)) {
      if (ids.includes(option.value)) {
        setSpecifications((prevState) =>
          prevState.filter((ps) => ps.value !== option.value)
        );
      } else {
        setSpecifications((prevState) => [
          ...prevState.filter((ps) => ps.groupOrder !== option.groupOrder),
          option,
        ]);
      }
    } else {
      setSpecifications((prevState) => [...prevState, option]);
    }
  };

  const addToMarketOffers = () => {
    const marketOfferValidation = isValid({
      specifications,
      sizeFrom: size.from,
      price,
      deliveryDate,
      selectedAddress,
      weight,
    });

    if (size.from && size.to) {
      if (parseFloat(size.from) > parseFloat(size.to)) {
        marketOfferValidation.sizeTo = [
          'Please set value equal or higher than from',
        ];
      } else {
        marketOfferValidation.sizeTo = [];
      }
    }

    if (specifications) {
      //check each group
      const stateGroupIds = Object.keys(stateGroups);
      let missingSpec = false;
      stateGroupIds.forEach((id) => {
        let found = false;
        specifications.forEach((selectedSpec) => {
          if (id === selectedSpec.groupOrder.toString()) {
            found = true;
          }
        });
        if (!found) {
          missingSpec = true;
        }
      });

      if (missingSpec) {
        marketOfferValidation.specifications = [
          'Select at least 1 specification from each section',
        ];
      }
    }

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
        from: size.from,
        to: size.to || null,
      },
      stateOptions: specifications.map((s) => s.value),
      weight: parseFloat(weight),
      listStateOptions: specifications.map((s) => s.label),
      type: buyerRequest?.type || '',
      image: buyerRequest?.image || '',
      measurementUnit: buyerRequest?.measurementUnit || '',
    };

    if (size.from === 'ungraded') {
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
      props.setOfferSpecs(specifications);
      props.setCurrentOfferItem('');
      props.setStep && props.setStep(3);
    }
  };

  const generatedProps = {
    shippingTo: getShippingTo(),
    addresses,
    stateOptions: groupedStateOptions,
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
