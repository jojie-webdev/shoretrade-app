import React from 'react';

import { ArrowLeft } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { MobileNavGeneratedProps } from 'components/layout/MobileNav/MobileNav.props';
import {
  Container,
  Content,
  Title,
} from 'components/layout/MobileNav/MobileNav.style';
import { BREAKPOINTS } from 'consts/breakpoints';
import { useMediaQuery } from 'react-responsive';
import { useTheme } from 'utils/Theme';

//TODO: Top Nav, Bottom NavBar?
const MobileNavView = (props: MobileNavGeneratedProps): JSX.Element => {
  const theme = useTheme();
  const { children, onBack, showBack } = props;

  const isSmallScreen = useMediaQuery({ query: BREAKPOINTS['sm'] });

  if (!isSmallScreen) return <>{children}</>;

  return (
    <>
      <Container>
        <>
          {showBack() && (
            <div onClick={onBack}>
              <ArrowLeft fill={theme.grey.noshade} height={14} width={14} />
            </div>
          )}
          <Title>
            <Typography weight="bold" color="noshade" align="center">
              {props.getTitle()}
            </Typography>
          </Title>
        </>
      </Container>

      <Content>{children}</Content>
    </>
  );
};

export default React.memo(MobileNavView);
