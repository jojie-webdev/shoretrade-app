import React from 'react';

import { MakeOfferProps } from './MakeOffer.props';
import MakeOfferView from './MakeOffer.view';

const MakeOffer = (props: MakeOfferProps): JSX.Element => {
  const generatedProps = {
    // generated props here
    ...props,
  };
  return <MakeOfferView {...generatedProps} />;
};

export default MakeOffer;
