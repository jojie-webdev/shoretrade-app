import React, { useEffect, useReducer } from 'react';

import { Option } from 'components/module/ShippingCard/ShippingCard.props';
import { isEmpty, omit, pathOr } from 'ramda';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  getNegotiationByIdActions,
  selectedDeliveryMethodActions,
} from 'store/actions';
import { GetDefaultCompany } from 'store/selectors/buyer';
import { GetCartDataItem } from 'types/store/GetCartState';
import { Store } from 'types/store/Store';
import { createUpdateReducer } from 'utils/Hooks';
import {
  CLICK_AND_COLLECT_SERVICE,
  serviceNameToString,
  shipmentModeToString,
} from 'utils/String/toShipmentDateString';

import { TRANSACTION_VALUE_FEE_PERCENTAGE } from './NegotiationCheckout.constants';
import { NegotiationCheckoutGeneratedProps } from './NegotiationCheckout.props';
import NegotiationCheckoutView from './NegotiationCheckout.view';

const NegotiationCheckout = (): JSX.Element => {
  const { negotiationId } = useParams<{ negotiationId: string }>();

  const [selectedShippingId, setSelectedShippingId] = useReducer(
    createUpdateReducer<Record<string, string>>(),
    {}
  );

  const dispatch = useDispatch();

  const negotiation = useSelector(
    (store: Store) => store.getNegotiationById.data?.data
  );
  const isNegotiationPending =
    useSelector((store: Store) => store.getNegotiationById.pending) === true;
  const loadingShippingQuotes =
    useSelector((store: Store) => store.getShippingQuote.pending) || false;
  const shippingQuotes =
    useSelector((store: Store) => store.getShippingQuote.data?.data) || {};
  const selectedDeliveryMethod =
    useSelector((store: Store) => store.selectedDeliveryMethod) || {};

  const currentCompany = GetDefaultCompany();

  // const cartItems: GetCartDataItem[] = Object.keys(cartData?.items || {}).map(
  //   (key) => ({
  //     ...(cartData?.items || {})[key],
  //     cartItemId: key,
  //   })
  // );

  const companyPlan = useSelector(
    (store: Store) => store.getCompanyPlan.data?.data
  );

  const activeBaseSubscription = (companyPlan?.activePlans || []).find(
    ({ plan }) => ['BASE', 'PRO'].includes(plan.name.toUpperCase())
  );

  const essentials = (companyPlan?.activePlans || []).find(
    ({ plan }) => plan?.alias === 'BASE'
  );

  let transactionValueFeePercent = +pathOr(
    0,
    ['plan', 'transaction_value_fee_percentage'],
    activeBaseSubscription
  );

  const overrideTransactionValueFeePercent = +pathOr(
    0,
    ['subscription', 'override_fee_percentage'],
    essentials
  );

  if (essentials) {
    transactionValueFeePercent =
      overrideTransactionValueFeePercent || TRANSACTION_VALUE_FEE_PERCENTAGE;
  }

  const onDeliveryMethodSelection = (
    option: Option,
    orderListingKey: string
  ) => {
    dispatch(
      selectedDeliveryMethodActions.update({
        [orderListingKey]: option.nameId,
      })
    );
    setSelectedShippingId({
      [orderListingKey]: option.nameId,
    });
  };

  const removeItem = (id: string, orderListingKey: string) => {
    const modifiedSelectedDeliveryMethod = omit(
      [orderListingKey],
      selectedDeliveryMethod
    );

    dispatch(
      selectedDeliveryMethodActions.update(modifiedSelectedDeliveryMethod)
    );

    // dispatch(
    //   removeCartItemActions.request({
    //     employeeId: currentCompany?.employeeId || '',
    //     cartId: cartData?.id || '',
    //     transactionRef: id,
    //     orderListingKey,
    //   })
    // );
  };

  useEffect(() => {
    if (negotiationId) {
      dispatch(
        getNegotiationByIdActions.request({
          negotiationRequestId: negotiationId,
        })
      );
    }
  }, [negotiationId]);

  useEffect(() => {
    if (!loadingShippingQuotes) {
      const defaultShippingIds = Object.keys(shippingQuotes).reduce(
        (accumulator, key) => {
          const priceResults = shippingQuotes[key].priceResult.reduce(
            (prevValue: any, curValue: any) => {
              const serviceName = serviceNameToString(
                curValue.serviceName,
                curValue.locationName
              );

              if (serviceName.toLowerCase().includes('pickup at')) {
                return [curValue, ...prevValue];
              } else {
                return [...prevValue, curValue];
              }
            },
            []
          );

          const clickCollectShipping = priceResults.filter(
            (result) => result.serviceName === 'CLICK & COLLECT'
          );

          const priceResult = clickCollectShipping
            ? clickCollectShipping[0]
            : priceResults[0];

          const shipmentMode = shipmentModeToString(
            priceResult.shipmentMode,
            priceResult.serviceName
          );
          const serviceName = serviceNameToString(
            priceResult.serviceName,
            priceResult.locationName,
            // cartItems.find((cartItem) => key.includes(cartItem.companyId))
            //   ?.companyName || ''
            'companyName'
          );
          const deliveryMethod =
            priceResult.serviceName === CLICK_AND_COLLECT_SERVICE
              ? `${serviceName} ${priceResult.locationName} ${priceResult.carrierName}`
              : `${shipmentMode} ${serviceName} ${priceResult.carrierName}`;

          return {
            ...accumulator,
            ...(shippingQuotes[key].priceResult.length > 0
              ? { [key]: deliveryMethod }
              : {}),
          };
        },
        {}
      );

      if (Object.keys(selectedDeliveryMethod).length > 0) {
        setSelectedShippingId(selectedDeliveryMethod);
      } else {
        setSelectedShippingId(defaultShippingIds);
      }
    }
  }, [loadingShippingQuotes]);

  useEffect(() => {
    if (isEmpty(negotiation)) {
      dispatch(selectedDeliveryMethodActions.clear());
    }
  }, [negotiation]);

  const generatedProps: NegotiationCheckoutGeneratedProps = {
    negotiation,
    totalValue: 100,
    selectedShippingId,
    isNegotiationPending,
    balance: currentCompany?.credit || '',
    transactionValueFeePercent,
    onDeliveryMethodSelection,
    removeItem,
  };

  return <NegotiationCheckoutView {...generatedProps} />;
};

export default NegotiationCheckout;
