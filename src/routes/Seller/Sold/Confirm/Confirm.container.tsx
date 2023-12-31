import React, { useEffect, useState } from 'react';

import MobileModalView from 'components/layout/MobileModal';
import Modal from 'components/layout/Modal';
import { BREAKPOINTS } from 'consts/breakpoints';
import pathOr from 'ramda/es/pathOr';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import {
  confirmWeightActions,
  // getSellerOrdersPlacedActions,
} from 'store/actions';
import { GetSellerOrder } from 'store/selectors/seller/orders';
import { Store } from 'types/store/Store';
import { sizeToString } from 'utils/Listing';
import {
  formatMeasurementUnit,
  formatUnitToPricePerUnit,
} from 'utils/Listing/formatMeasurementUnit';
import { formatOrderReferenceNumber } from 'utils/String/formatOrderReferenceNumber';
import { toPrice } from 'utils/String/toPrice';

import {
  ConfirmPublicProps,
  ConfirmGeneratedProps,
  Details,
  Box,
} from './Confirm.props';
import ConfirmView from './Confirm.view';

const Confirm = (props: ConfirmPublicProps): JSX.Element => {
  const dispatch = useDispatch();

  // const getOrdersPlaced = () => {
  //   dispatch(
  //     getSellerOrdersPlacedActions.request({
  //       page: '1',
  //       dateFrom: '',
  //       dateTo: '',
  //     })
  //   );
  // };

  const { orderId, lineItemId, isOpen, onClickClose, status } = props;
  const order = GetSellerOrder(orderId, status ?? 'PENDING');
  const selectedLineItem = order?.orderLineItem
    ? order.orderLineItem.find((lineItem: any) => lineItem.id === lineItemId)
    : undefined;

  const pending =
    useSelector((state: Store) => state.confirmWeight.pending) || false;

  // useEffect(() => {
  //   // make sure seller orders is not empty
  //   if (!selectedLineItem) {
  //     getOrdersPlaced();
  //   }
  // }, []);

  const [boxes, setBoxes] = useState<Box[]>([]);
  const [initialBoxes, setInitialBoxes] = useState<Box[]>([]);

  const pricePerKilo = selectedLineItem?.listing.pricePerKilo || 0;

  const measurementUnit = formatMeasurementUnit(
    selectedLineItem?.listing.measurementUnit
  );

  const details: Details = {
    orderNumber: formatOrderReferenceNumber(order?.orderRefNumber || 0),
    buyer: order?.buyerCompanyName || '',
    uri: pathOr('', ['listing', 'images', '0'], selectedLineItem),
    price: `${toPrice(
      selectedLineItem?.listing.pricePerKilo || 0
    )} per ${formatUnitToPricePerUnit(measurementUnit)}`,
    name: selectedLineItem?.listing.typeName || '',
    tags:
      selectedLineItem?.listing.specifications.map((s: any) => ({
        label: s,
      })) || [],
    size: sizeToString(
      selectedLineItem?.listing.metricLabel || '',
      selectedLineItem?.listing.sizeFrom || '',
      selectedLineItem?.listing.sizeTo || ''
    ),
  };

  const onConfirm = () => {
    dispatch(
      confirmWeightActions.request({
        orderId: order?.orderId || '',
        orderLineItemId: lineItemId,
        listingId: selectedLineItem?.listing.listingId || '',
        listingBoxes: boxes,
      })
    );

    props.onClickConfirm();
  };

  useEffect(() => {
    if (selectedLineItem) {
      const boxes = selectedLineItem?.listingBoxes
        ? selectedLineItem?.listingBoxes.map((b: any) => ({
            id: b.id,
            weight: b.weight,
            quantity: b.quantity,
            ...(b.count ? { count: b.count } : {}),
          }))
        : [];
      setBoxes(boxes);
      setInitialBoxes(boxes);
    }
  }, [selectedLineItem]);

  const generatedProps: ConfirmGeneratedProps = {
    // generated props here
    pending,
    details,
    boxes,
    setBoxes,
    pricePerKilo,
    measurementUnit,
    onCancel: onClickClose,
    onConfirm,
    initialBoxes,
  };

  const isLargeScreen = useMediaQuery({ query: '(min-width: 800px)' });
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

  const ModalWrapper = isMobile ? MobileModalView : Modal;

  return (
    <ModalWrapper
      onClickClose={onClickClose}
      isOpen={isOpen}
      style={{
        width: isLargeScreen ? '75%' : 'calc(100% - 48px)',
        height: isLargeScreen ? '95%' : 'calc(100% - 48px)',
        borderRadius: '8px',
      }}
    >
      <ConfirmView {...props} {...generatedProps} />
    </ModalWrapper>
  );
};

export default Confirm;
