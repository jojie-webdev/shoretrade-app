import React, { useEffect, useState } from 'react';

import { SELLER_MARKET_BOARD_ROUTES } from 'consts/routes';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import {
  createMarketOfferActions,
  getActiveOffersActions,
  marketOfferNegotiateActions,
} from 'store/actions';
import { MarketOfferItem } from 'types/store/CreateMarketOfferState';
import { GetActiveOffersRequestResponseItem } from 'types/store/GetActiveOffersState';
import { GetAllMarketRequestResponseItem } from 'types/store/GetAllMarketRequestState';
import { GetAllNegoRequestResponseItem } from 'types/store/GetAllNegotiationsState';
import { Store } from 'types/store/Store';

import NegotiationView from './Negotiation.view';

const Negotiation = (): JSX.Element => {
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
      negotiation: GetAllNegoRequestResponseItem;
    };
  } = useLocation();

  const buyerRequest = state.buyerRequest;
  const activeOffer = state.activeOffer;
  const negotiation = state.negotiation;
  const offerSentStatus = useSelector(
    (state: Store) => state.createMarketOffer.data?.status
  );
  const marketOfferNegotiate = useSelector(
    (state: Store) => state.marketOfferNegotiate
  );

  const user = useSelector((state: Store) => state.getUser.data?.data.user);
  const buyerRequests = useSelector(
    (state: Store) => state.getAllMarketRequest.data?.data.marketRequests
  );

  const buyerRequestForActiveOfferTab = buyerRequests?.find(
    (buyerRequest) => buyerRequest.id === activeOffer?.marketRequest?.id
  );

  const userPending =
    user !== undefined &&
    !(user.companies || []).some((a) =>
      a.addresses.some((b) => b.approved === 'APPROVED')
    );

  const [offer, setOffer] = useState<MarketOfferItem[]>([]);
  const [currentOfferItem, setCurrentOfferItem] = useState('');
  const [showOfferSentModal, setShowOfferSentModal] = useState(false);
  const [showOfferAcceptSentModal, setShowOfferAcceptSentModal] =
    useState(false);

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

  const onConfirmSentOffer = () => {
    setShowOfferSentModal(false);
    setShowOfferAcceptSentModal(false);
    dispatch(marketOfferNegotiateActions.clear());
    dispatch(createMarketOfferActions.clear());
    dispatch(getActiveOffersActions.request({}));
    dispatch(getActiveOffersActions.request({}));
    history.push(SELLER_MARKET_BOARD_ROUTES.LANDING, {
      currentTab: 'My Active Offers',
    });
  };

  useEffect(() => {
    if (offerSentStatus === 200) {
      setShowOfferSentModal(true);
    } else {
      setShowOfferSentModal(false);
    }
  }, [offerSentStatus]);

  useEffect(() => {
    if (marketOfferNegotiate?.data?.status === 200) {
      if (marketOfferNegotiate?.request?.accepted === true) {
        setShowOfferAcceptSentModal(true);
      } else {
        setShowOfferSentModal(true);
      }
    } else {
      setShowOfferSentModal(false);
      setShowOfferAcceptSentModal(false);
    }
  }, [marketOfferNegotiate]);

  if ((isReview && !buyerRequest) || (!isReview && !activeOffer)) {
    history.replace(SELLER_MARKET_BOARD_ROUTES.LANDING);
    return <></>;
  }

  const generatedProps = {
    negotiation,
    offer,
    setOffer,
    currentOfferItem,
    setCurrentOfferItem,
    isReview,
    onNegotiateOffer,
    isNegotiating,
    userPending,
    buyerRequestForActiveOfferTab,
    showOfferSentModal,
    onConfirmSentOffer,
    showOfferAcceptSentModal,
  };
  return <NegotiationView {...generatedProps} />;
};

export default Negotiation;
