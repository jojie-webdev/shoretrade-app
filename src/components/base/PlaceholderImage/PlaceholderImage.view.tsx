import React from 'react';

import { PlaceholderIcon } from '../SVG';
import { PlaceholderImageProps } from './PlaceholderImage.props';
import { Placeholder } from './PlaceholderImage.style';

const PlaceholderImageView = (props: PlaceholderImageProps) => {
  return (
    <Placeholder {...props}>
      <PlaceholderIcon />
    </Placeholder>
  );
};

export default PlaceholderImageView;
