import React, { useEffect, useState } from 'react';

import { ArrowLeft, ShoretradeLogo } from 'components/base/SVG';
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
  } = props;

  const isSmallScreen = useMediaQuery({ query: BREAKPOINTS['sm'] });
  const [computedPosition, setComputedPosition] = useState('sticky');

  const rootElement = document.documentElement;
  const body = document.getElementsByTagName('body')[0];

  function handleScroll() {
    const scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
    if (rootElement.scrollTop > 1) {
      // fixed navbar always visible
      body.style.paddingTop = '48px';
      setComputedPosition('fixed');
    } else {
      // sticky navbar to avoid cutting off the page
      setComputedPosition('sticky');
      body.style.paddingTop = '0px';
    }
  }

  document.addEventListener('scroll', handleScroll);

  useEffect(() => {
    rootElement.scrollTop = 0;
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!isSmallScreen) return children ? <>{children}</> : null;

  return (
    <>
      <Container position={computedPosition}>
        <>
          {leftContent && showLogo && (
            <div className="left-content">{leftContent}</div>
          )}
          {showLogo && (
            <div onClick={onHome}>
              <ShoretradeLogo
                fill={theme.grey.noshade}
                width={133}
                height={16}
              />
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
