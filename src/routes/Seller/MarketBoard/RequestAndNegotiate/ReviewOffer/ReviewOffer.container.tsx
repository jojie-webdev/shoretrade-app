import React from 'react';

import { isEmpty } from 'ramda';
import { useDispatch, useSelector } from 'react-redux';
import { createMarketOfferActions, getActiveOffersActions } from 'store/actions';
import { Store } from 'types/store/Store';

import { ReviewOfferProps } from './ReviewOffer.props';
import ReviewOfferView from './ReviewOffer.view';

const ReviewOffer = (props: ReviewOfferProps): JSX.Element => {
  const dispatch = useDispatch();
  const { offer, setOffer, setStep, setCurrentOfferItem } = props;

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

  const generatedProps = {
    onEdit,
    onDelete,
    onSubmit,
    isSubmitting,
    ...props,
  };
  return <ReviewOfferView {...generatedProps} />;
};

export default ReviewOffer;
