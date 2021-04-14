import React from 'react';

import { ArrowLeft } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { BREAKPOINTS } from 'consts/breakpoints';
import { useMediaQuery } from 'react-responsive';
import { useTheme } from 'utils/Theme';

import { MobileHeaderGeneratedProps } from './MobileHeader.props';
import { Container, Title } from './MobileHeader.style';

//TODO: Normal Header
const MobileHeaderView = (props: MobileHeaderGeneratedProps): JSX.Element => {
  const theme = useTheme();
  const { children, onBack, showBack } = props;

  const isSmallScreen = useMediaQuery({ query: BREAKPOINTS['sm'] });

  if (!isSmallScreen) return <>{children}</>;

  return (
    <>
      <Container>
        {showBack && (
          <>
            <div onClick={onBack}>
              <ArrowLeft fill={theme.grey.noshade} height={14} width={14} />
            </div>
            <Title>
              <Typography weight="bold" color="noshade" align="center">
                {props.title}
              </Typography>
            </Title>
          </>
        )}
      </Container>
      {children}
    </>
  );
};

export default React.memo(MobileHeaderView);
