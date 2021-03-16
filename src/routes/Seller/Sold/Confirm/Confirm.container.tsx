import React, { useEffect, useState } from 'react';

import Modal from 'components/layout/Modal';
import pathOr from 'ramda/es/pathOr';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router-dom';
import {
  confirmWeightActions,
  getSellerOrdersPlacedActions,
} from 'store/actions';
import { GetSellerOrder } from 'store/selectors/seller/orders';
import { Store } from 'types/store/Store';
import { sizeToString } from 'utils/Listing';
import { formatMeasurementUnit, formatUnitToPricePerUnit } from 'utils/Listing/formatMeasurementUnit';
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
  const history = useHistory();

  // const getOrdersPlaced = () => {
  //   dispatch(
  //     getSellerOrdersPlacedActions.request({
  //       page: '1',
  //       dateFrom: '',
  //       dateTo: '',
  //     })
  //   );
  // };

  const { orderId, lineItemId, isOpen, onClickClose } = props;

  const order = GetSellerOrder(orderId, 'PENDING');
  const selectedLineItem = order?.orderLineItem
    ? order.orderLineItem.find((lineItem) => lineItem.id === lineItemId)
    : undefined;

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
      selectedLineItem?.listing.specifications.map((s) => ({ label: s })) || [],
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
        ? selectedLineItem?.listingBoxes.map((b) => ({
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
  return (
    <Modal
      onClickClose={onClickClose}
      isOpen={isOpen}
      style={{
        width: isLargeScreen ? '75%' : 'calc(100% - 48px)',
        height: isLargeScreen ? '75%' : 'calc(100% - 48px)',
      }}
    >
      <ConfirmView {...props} {...generatedProps} />
    </Modal>
  );
};

export default Confirm;
