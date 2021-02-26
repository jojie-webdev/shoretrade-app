import React from 'react';

import { ReviewOfferProps } from './ReviewOffer.props';
import ReviewOfferView from './ReviewOffer.view';

const ReviewOffer = (props: ReviewOfferProps): JSX.Element => {
  const generatedProps = {
    // generated props here
    ...props,
  };
  return <ReviewOfferView {...generatedProps} />;
};

export default ReviewOffer;
