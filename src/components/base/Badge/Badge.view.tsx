import React from 'react';

// import { useTheme } from 'utils/Theme';
import { BadgeProps } from './Badge.props';
import { BadgeContainer } from './Badge.style';

const Badge = (props: BadgeProps): JSX.Element => {
  // const theme = useTheme();
  return <BadgeContainer {...props} />;
};

export default React.memo(Badge);
