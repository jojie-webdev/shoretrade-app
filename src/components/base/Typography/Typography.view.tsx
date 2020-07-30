import React from 'react';

import { TypographyProps } from './Typography.props';
import { P } from './Typography.style';

const Typography = ({ component, ...props }: TypographyProps): JSX.Element => {
  //@ts-ignore
  const Component = component ? P.withComponent(component) : P;

  return <Component {...props} />;
};

export default React.memo(Typography);
