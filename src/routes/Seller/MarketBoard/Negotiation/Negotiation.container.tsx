import React, { useEffect, useState } from 'react';

import { SELLER_MARKET_BOARD_ROUTES } from 'consts/routes';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import {
  getNegotiationByIdActions,
  createSellerCounterOfferActions,
  acceptNegotiationActions,
  declineNegotiationActions,
  getListingByIdActions,
  getListingBoxesActions,
} from 'store/actions';
import { GetListingBoxesResponseItem } from 'types/store/GetListingBoxesState';
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
  const [selectedGroupedBoxIndex, setSelectedGroupedBoxIndex] = useState(0);

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

  const listingBoxes =
    useSelector((store: Store) => store.getListingBoxes.data?.data) ||
    ({} as GetListingBoxesResponseItem);

  const listing = useSelector(
    (store: Store) => store.getListingById.data?.data
  );

  const isCreateSellerCounterOfferPending = useSelector(
    (store: Store) => store.createSellerCounterOffer.pending
  );

  const isAcceptNegotiationPending = useSelector(
    (store: Store) => store.acceptNegotiation.pending
  );

  const acceptNegotiationError = useSelector(
    (store: Store) => store.acceptNegotiation.error
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
          listingBoxes: listingBoxes.boxes
            ? listingBoxes.boxes[selectedGroupedBoxIndex]
            : negotiation.listing_boxes,
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

  const handleRadioClick = (groupedBoxesIndex: number) => {
    setSelectedGroupedBoxIndex(groupedBoxesIndex);
  };

  useEffect(() => {
    if (acceptNegotiationError && listing && negotiation) {
      dispatch(
        getListingBoxesActions.request({
          listingId: listing.listing_id,
          weight: negotiation.desired_quantity.toString(),
        })
      );
    }
  }, [negotiation, listing, acceptNegotiationError]);

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
    if (
      !acceptNegotiationError &&
      negotiationRequestId &&
      isAcceptNegotiationPending === false
    ) {
      setShowAcceptModal(false);
      setShowNegotiationAcceptedModal(true);
      dispatch(getNegotiationByIdActions.request({ negotiationRequestId }));
      dispatch(acceptNegotiationActions.clear());
    }
  }, [
    acceptNegotiationError,
    negotiationRequestId,
    isAcceptNegotiationPending,
  ]);

  useEffect(() => {
    if (isDeclineNegotiationPending === false) {
      setShowDeclineModal(false);
      setShowDeclinedNegoModal(true);
      dispatch(getNegotiationByIdActions.request({ negotiationRequestId }));
    }
  }, [isDeclineNegotiationPending]);

  useEffect(() => {
    if (negotiation?.listing_id) {
      dispatch(
        getListingByIdActions.request({
          listingId: negotiation.listing_id,
        })
      );
    }
  }, [negotiation?.listing_id]);

  useEffect(() => {
    setShowDeclinedNegoModal(false);
    setShowSuccessfulNegoModal(false);
    setShowNegotiationAcceptedModal(false);
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
    listing,
    listingBoxes,
    acceptNegotiationError,
    handleRadioClick,
    selectedGroupedBoxIndex,
  };

  return <NegotiationView {...generatedProps} />;
};

export default Negotiation;
