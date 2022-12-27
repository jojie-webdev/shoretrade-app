import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getOrderInvoiceAdjustmentsActions } from 'store/actions';
import { Store } from 'types/store/Store';

import { OrderItemProps } from './OrderItem.props';
import OrderItemView from './OrderItem.view';

const OrderItemContainer = (props: OrderItemProps): JSX.Element => {
  const dispatch = useDispatch();
  const orderInvoiceAdjustments = useSelector(
    (state: Store) => state.getOrderInvoiceAdjustments.data?.data
  );

  const [toggleInvoiceBtn, setToggleInvoiceBtn] = useState(false);

  const handleGetOrderInvoiceAdjustment = () => {
    setToggleInvoiceBtn((prevValue) => !prevValue);

    dispatch(
      getOrderInvoiceAdjustmentsActions.request({
        orderRefNum: props.data.orderRefNumber.toString(),
      })
    );
  };

  const generatedProps = {
    ...props,
    orderInvoiceAdjustments,
    handleGetOrderInvoiceAdjustment,
    toggleInvoiceBtn,
  };

  return <OrderItemView {...generatedProps} />;
};

export default OrderItemContainer;
