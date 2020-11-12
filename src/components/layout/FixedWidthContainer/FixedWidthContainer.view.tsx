import React, { ReactNode } from 'react';

// import { useTheme } from 'utils/Theme';
import { Container } from './FixedWidthContainer.style';

interface FixedWidthProps {
  width?: number | 320;
  children?: ReactNode;
  className?: string | undefined;
}

const FixedWidthContainerView = (props: FixedWidthProps): JSX.Element => {
  // const theme = useTheme();
  return <Container className={props.className} width={props.width || 320}>{props.children}</Container>;
};

export default React.memo(FixedWidthContainerView);
