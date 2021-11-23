import React, { useEffect, useState } from 'react';

import { SELLER_MARKET_BOARD_ROUTES } from 'consts/routes';
import { isEmpty } from 'ramda';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import {
  createMarketOfferActions,
  getActiveOffersActions,
} from 'store/actions';
import { Store } from 'types/store/Store';

import { ReviewOfferProps } from './ReviewOffer.props';
import ReviewOfferView from './ReviewOffer.view';

const ReviewOffer = (props: ReviewOfferProps): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { offer, setOffer, setStep, setCurrentOfferItem } = props;
  const [showOfferSentModal, setShowOfferSentModal] = useState(false);

  const successStatus = useSelector(
    (state: Store) => state.createMarketOffer.data?.status
  );

  const isSubmitting =
    useSelector((state: Store) => state.createMarketOffer.pending) || false;

  const onEdit = (id: string) => {
    setCurrentOfferItem(id);
    setStep && setStep(2);
  };

  const onDelete = (id: string) => {
    const offerCopy = [...offer];
    const deleted = offerCopy.filter((item) => item.editId !== id);

    setOffer(deleted);
    if (isEmpty(deleted)) setStep && setStep(2);
  };

  const onSubmit = () => {
    dispatch(createMarketOfferActions.request(offer));
    dispatch(getActiveOffersActions.request({}));
  };

  const onConfirmOfferSentModal = () => {
    setShowOfferSentModal(false);
    history.push(SELLER_MARKET_BOARD_ROUTES.LANDING, {
      currentTab: 'My Active Offers',
    });
  };

  useEffect(() => {
    if (successStatus === 200) {
      setShowOfferSentModal(true);
    } else {
      setShowOfferSentModal(false);
    }
  }, [successStatus]);

  const generatedProps = {
    onEdit,
    onDelete,
    onSubmit,
    isSubmitting,
    showOfferSentModal,
    onConfirmOfferSentModal,
    ...props,
  };
  return <ReviewOfferView {...generatedProps} />;
};

export default ReviewOffer;
