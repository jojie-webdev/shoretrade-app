import React from 'react';

import { ArrowLeft, SfmLogo, ShoretradeLogo } from 'components/base/SVG';
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

const MobileNavView = (props: MobileNavGeneratedProps): JSX.Element | null => {
  const theme = useTheme();
  const {
    children,
    rightContent,
    leftContent,
    onBack,
    showLogo,
    showBack,
    onHome,
    position = 'fixed',
  } = props;

  const isSmallScreen = useMediaQuery({ query: BREAKPOINTS.nonDesktop });

  if (!isSmallScreen) return children ? <>{children}</> : null;

  return (
    <>
      <Container position={position}>
        <>
          {leftContent && showLogo && (
            <div className="left-content">{leftContent}</div>
          )}
          {showLogo && !theme.isSFM && (
            <div onClick={onHome}>
              <ShoretradeLogo
                fill={theme.grey.noshade}
                width={133}
                height={16}
              />
            </div>
          )}
          {showLogo && theme.isSFM && (
            <div onClick={onHome}>
              <SfmLogo fill={theme.grey.noshade} width={122} height={32} />
            </div>
          )}
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
          {rightContent && <div className="right-content">{rightContent}</div>}
        </>
      </Container>

      {children && <Content>{children}</Content>}
    </>
  );
};

export default React.memo(MobileNavView);
