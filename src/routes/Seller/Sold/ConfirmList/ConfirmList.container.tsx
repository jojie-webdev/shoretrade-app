import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getSellerOrdersPlacedActions } from 'store/actions';
import { GetSellerOrder } from 'store/selectors/seller/orders';
import { Store } from 'types/store/Store';
import { formatOrderReferenceNumber } from 'utils/String/formatOrderReferenceNumber';

import {
  ConfirmListPublicProps,
  ConfirmListGeneratedProps,
} from './ConfirmList.props';
import { sellerOrderToConfirmList } from './ConfirmList.transform';
import ConfirmListView from './ConfirmList.view';

const ConfirmList = (props: ConfirmListPublicProps): JSX.Element => {
  const dispatch = useDispatch();
  const getOrdersPlaced = () => {
    dispatch(
      getSellerOrdersPlacedActions.request({
        page: '1',
        dateFrom: '',
        dateTo: '',
      })
    );
  };

  const isDataAvailable =
    useSelector((state: Store) => state.getSellerOrdersPlaced.data?.status) ===
      200 || false;

  useEffect(() => {
    // make sure seller orders is not empty
    if (!isDataAvailable) {
      getOrdersPlaced();
    }
  }, []);

  const { orderId } = props.match.params;
  const order = GetSellerOrder(orderId, 'PENDING');

  const title = formatOrderReferenceNumber(order?.orderRefNumber || 0);

  const items = sellerOrderToConfirmList(order);
  const generatedProps: ConfirmListGeneratedProps = {
    // generated props here
    title,
    items,
  };
  return <ConfirmListView {...props} {...generatedProps} />;
};

export default ConfirmList;
