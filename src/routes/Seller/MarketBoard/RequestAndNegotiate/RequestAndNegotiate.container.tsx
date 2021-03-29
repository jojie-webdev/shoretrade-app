import React, { useEffect, useState } from 'react';

import { SELLER_MARKET_BOARD_ROUTES } from 'consts/routes';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { marketOfferNegotiateActions } from 'store/actions';
import { MarketOfferItem } from 'types/store/CreateMarketOfferState';
import { GetActiveOffersRequestResponseItem } from 'types/store/GetActiveOffersState';
import { GetAllMarketRequestResponseItem } from 'types/store/GetAllMarketRequestState';
import { Store } from 'types/store/Store';

import RequestAndNegotiateView from './RequestAndNegotiate.view';

const RequestAndNegotiate = (): JSX.Element => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const { pathname } = location;
  const {
    state,
  }: {
    state: {
      buyerRequest: GetAllMarketRequestResponseItem;
      activeOffer: GetActiveOffersRequestResponseItem;
    };
  } = useLocation();

  const user = useSelector((state: Store) => state.getUser.data?.data.user);
  const userPending =
    user !== undefined &&
    !(user.companies || []).some((a) =>
      a.addresses.some((b) => b.approved === 'APPROVED')
    );

  const buyerRequest = state.buyerRequest;
  const activeOffer = state.activeOffer;

  const [offer, setOffer] = useState<MarketOfferItem[]>([]);
  const [currentOfferItem, setCurrentOfferItem] = useState('');

  const isNegotiating =
    useSelector((state: Store) => state.marketOfferNegotiate.pending) || false;

  const isReview = pathname.includes(SELLER_MARKET_BOARD_ROUTES.OFFER);

  const onNegotiateOffer = (
    marketOfferId: string,
    price: number,
    accepted?: boolean
  ) => {
    dispatch(
      marketOfferNegotiateActions.request({
        marketOfferId,
        price,
        accepted: accepted,
      })
    );
  };

  if ((isReview && !buyerRequest) || (!isReview && !activeOffer)) {
    history.replace(SELLER_MARKET_BOARD_ROUTES.LANDING);
    return <></>;
  }

  const generatedProps = {
    buyerRequest,
    activeOffer,
    offer,
    setOffer,
    currentOfferItem,
    setCurrentOfferItem,
    isReview,
    onNegotiateOffer,
    isNegotiating,
    userPending,
  };
  return <RequestAndNegotiateView {...generatedProps} />;
};

export default RequestAndNegotiate;
