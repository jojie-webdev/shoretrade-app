import React from 'react';

import { isEmpty } from 'ramda';

import { ReviewOfferProps } from './ReviewOffer.props';
import ReviewOfferView from './ReviewOffer.view';

const ReviewOffer = (props: ReviewOfferProps): JSX.Element => {
  const { buyerRequest, offer, setOffer, setStep } = props;

  const onDelete = (id: string) => {
    const offerCopy = [...offer];
    const deleted = offerCopy.filter((item) => item.editId !== id);

    setOffer(deleted);
    if (isEmpty(deleted)) setStep && setStep(2);
  };

  const generatedProps = {
    onDelete,
    ...props,
  };
  return <ReviewOfferView {...generatedProps} />;
};

export default ReviewOffer;
