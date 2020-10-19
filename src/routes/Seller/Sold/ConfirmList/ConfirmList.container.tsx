import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
  getSellerOrdersPlacedActions,
  placeOrderActions,
  sendMessageActions,
} from 'store/actions';
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
  const buyer = order?.buyerCompanyName || '';

  const items = sellerOrderToConfirmList(order);

  const isPending =
    useSelector((state: Store) => state.placeOrder.pending) || false;

  const placeOrder = (config: { isPartial: boolean }) => {
    dispatch(
      placeOrderActions.request({
        orderId: order?.orderId || '',
        buyerCompanyId: order?.buyerCompanyId || '',
        sellerCompanyId: order?.sellerCompanyId || '',
        buyerId: order?.buyerId || '',
        sellerId: order?.sellerId || '',
        deliveryMethod: order?.deliveryMethod || '',
        deliveryOption: order?.deliveryOption || '',
        fromAddressId: order?.fromAddress.id || '',
        toAddressId: order?.toAddress.id || '',
        isPartial: config.isPartial,
        orderLineItem: order?.orderLineItem
          ? order?.orderLineItem.map((lineItem) => ({
              id: lineItem.id,
              weight: lineItem.weight,
              price: lineItem.price,
              weightConfirmed: lineItem.weightConfirmed,
              priceDelta: lineItem.priceDelta,
              listingBoxes: lineItem.listingBoxes,
              listing: lineItem.listing,
            }))
          : [],
      })
    );
  };

  const sendMessage = (message: string) => {
    dispatch(
      sendMessageActions.request({
        buyerId: order?.buyerId || '',
        message,
      })
    );
  };

  const generatedProps: ConfirmListGeneratedProps = {
    // generated props here
    title,
    items,
    orderId,
    placeOrder,
    isPending,
    buyer,
    sendMessage,
  };
  return <ConfirmListView {...props} {...generatedProps} />;
};

export default ConfirmList;
