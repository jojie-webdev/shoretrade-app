import React from 'react';

// import { useTheme } from 'utils/Theme';
import { DividerProps } from './Divider.props';
import { Container } from './Divider.style';

const Divider = (props: DividerProps): JSX.Element => {
  // const theme = useTheme();
  return <Container className="divider" {...props} />;
};

export default React.memo(Divider);
