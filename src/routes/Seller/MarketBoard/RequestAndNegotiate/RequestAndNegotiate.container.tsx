import React, { useState } from 'react';

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
  const buyerRequest = state.buyerRequest;
  const activeOffer = state.activeOffer;

  const [offer, setOffer] = useState<MarketOfferItem[]>([]);
  const [currentOfferItem, setCurrentOfferItem] = useState('');

  const isNegotiating =
    useSelector((state: Store) => state.marketOfferNegotiate.pending) || false;

  const isReview = pathname.includes(SELLER_MARKET_BOARD_ROUTES.OFFER);

  const onAcceptOffer = (marketOfferId: string, price: number) => {
    dispatch(
      marketOfferNegotiateActions.request({
        marketOfferId,
        price,
      })
    );
  };

  const onNegotiateOffer = (marketOfferId: string, price: number) => {
    dispatch(
      marketOfferNegotiateActions.request({
        marketOfferId,
        price,
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

    onAcceptOffer,
    onNegotiateOffer,

    isNegotiating,
  };
  return <RequestAndNegotiateView {...generatedProps} />;
};

export default RequestAndNegotiate;
