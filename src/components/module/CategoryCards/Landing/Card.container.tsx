import React from 'react';

import useHomeOld from 'utils/Hooks/useHomeOld';

import { CardProps } from './Card.props';
import CardNew from './Card.view';
import CardOld from './Card.view.old';

const Card = (props: CardProps): JSX.Element => {
  const isOld = useHomeOld();

  return isOld ? <CardOld {...props} /> : <CardNew {...props} />;
};

export default Card;
