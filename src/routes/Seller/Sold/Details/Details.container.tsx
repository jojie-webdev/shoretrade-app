import React, { useEffect } from 'react';

import { SELLER_SOLD_ROUTES } from 'consts';
import pathOr from 'ramda/es/pathOr';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getSellerOrdersPlacedActions } from 'store/actions';
import { GetSellerOrder } from 'store/selectors/seller/orders';
import { Store } from 'types/store/Store';
import { formatOrderReferenceNumber } from 'utils/String/formatOrderReferenceNumber';

import {
  DetailsPublicProps,
  DetailsGeneratedProps,
  Details,
} from './Details.props';
import { sellerOrderToSoldDetails } from './Details.transform';
import DetailsView from './Details.view';

const DetailsContainer = (props: DetailsPublicProps): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector((state: Store) => state.auth.token) || '';

  const { orderId, status } = props.match.params;
  const order = GetSellerOrder(orderId, status);

  if (!order) {
    history.push(SELLER_SOLD_ROUTES.LANDING);
  }

  const details: Details = sellerOrderToSoldDetails(order);
  const generatedProps: DetailsGeneratedProps = {
    // generated props here
    details,
    token,
  };
  return <DetailsView {...props} {...generatedProps} />;
};

export default DetailsContainer;
