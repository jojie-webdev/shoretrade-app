import React, { useEffect, useState } from 'react';

import { SELLER_MARKET_BOARD_ROUTES } from 'consts/routes';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import {
  getNegotiationByIdActions,
  createSellerCounterOfferActions,
  acceptNegotiationActions,
  declineNegotiationActions,
} from 'store/actions';
import { Store } from 'types/store/Store';

import NegotiationView from './Negotiation.view';

const Negotiation = (): JSX.Element => {
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showNegotiationModal, setShowNegotiationModal] = useState(false);
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [showDeclinedNegoModal, setShowDeclinedNegoModal] = useState(false);
  const [showSuccessfulNegoModal, setShowSuccessfulNegoModal] = useState(false);
  const [showNegotiationAcceptedModal, setShowNegotiationAcceptedModal] =
    useState(false);

  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const {
    state,
  }: {
    state: {
      negotiationRequestId: string;
    };
  } = useLocation();

  const { negotiationRequestId } = state;

  const negotiation = useSelector(
    (store: Store) => store.getNegotiationById.data?.data
  );

  const isCreateSellerCounterOfferPending = useSelector(
    (store: Store) => store.createSellerCounterOffer.pending
  );

  const isAcceptNegotiationPending = useSelector(
    (store: Store) => store.acceptNegotiation.pending
  );

  const isDeclineNegotiationPending = useSelector(
    (store: Store) => store.declineNegotiation.pending
  );

  const handleDeclinedNegoModalClose = () => {
    setShowDeclinedNegoModal(false);
  };

  const handleSuccessfulNegoModalClose = () => {
    setShowSuccessfulNegoModal(false);
  };

  const handleNegotiationAcceptedModalClose = () => {
    setShowNegotiationAcceptedModal(false);
  };

  const handleAcceptModalAcceptBtnClick = () => {
    if (negotiation) {
      dispatch(
        acceptNegotiationActions.request({
          negotiationRequestId: negotiation?.id,
          listingBoxId: negotiation?.listing_box_id,
        })
      );
    }
  };

  const handleAcceptBtnClick = () => {
    setShowAcceptModal((prevValue) => !prevValue);
  };

  const handleNegotiationCloseBtnClick = () => {
    setShowNegotiationModal((prevValue) => !prevValue);
  };

  const handleNegotiationConfirmClick = (counterOffer: number) => {
    if (negotiationRequestId && counterOffer) {
      dispatch(
        createSellerCounterOfferActions.request({
          negotiationRequestId,
          counterOffer,
        })
      );
    }
  };

  const handleDeclineClick = () => {
    setShowDeclineModal((prevValue) => !prevValue);
  };

  const handleDeclineModalCancelBtnClick = () => {
    setShowDeclineModal((prevValue) => !prevValue);
  };

  const handleDeclineModalConfirmBtnClick = () => {
    if (negotiation) {
      dispatch(
        declineNegotiationActions.request({
          negotiationRequestId: negotiation.id,
          listingBoxId: negotiation.listing_box_id,
        })
      );
    }
  };

  useEffect(() => {
    if (negotiationRequestId) {
      dispatch(getNegotiationByIdActions.request({ negotiationRequestId }));
    }
  }, [negotiationRequestId]);

  useEffect(() => {
    if (isCreateSellerCounterOfferPending === false) {
      setShowNegotiationModal(false);
      setShowSuccessfulNegoModal(true);
      dispatch(getNegotiationByIdActions.request({ negotiationRequestId }));
    }
  }, [isCreateSellerCounterOfferPending]);

  useEffect(() => {
    if (isAcceptNegotiationPending === false) {
      setShowAcceptModal(false);
      setShowNegotiationAcceptedModal(true);
      dispatch(getNegotiationByIdActions.request({ negotiationRequestId }));
    }
  }, [isAcceptNegotiationPending]);

  useEffect(() => {
    if (isDeclineNegotiationPending === false) {
      setShowDeclineModal(false);
      setShowDeclinedNegoModal(true);
      dispatch(getNegotiationByIdActions.request({ negotiationRequestId }));
    }
  }, [isDeclineNegotiationPending]);

  useEffect(() => {
    setShowDeclinedNegoModal(false);
    setShowSuccessfulNegoModal(false);
  }, []);

  if (!negotiationRequestId) {
    history.replace(SELLER_MARKET_BOARD_ROUTES.LANDING);
    return <></>;
  }

  const generatedProps = {
    negotiation,
    handleAcceptBtnClick,
    showAcceptModal,
    handleNegotiationCloseBtnClick,
    showNegotiationModal,
    handleNegotiationConfirmClick,
    handleAcceptModalAcceptBtnClick,
    handleDeclineClick,
    showDeclineModal,
    handleDeclineModalCancelBtnClick,
    handleDeclineModalConfirmBtnClick,
    isAcceptNegotiationPending: isAcceptNegotiationPending === true,
    isDeclineNegotiationPending: isDeclineNegotiationPending === true,
    showDeclinedNegoModal,
    handleDeclinedNegoModalClose,
    showSuccessfulNegoModal,
    handleSuccessfulNegoModalClose,
    showNegotiationAcceptedModal,
    handleNegotiationAcceptedModalClose,
  };

  return <NegotiationView {...generatedProps} />;
};

export default Negotiation;
