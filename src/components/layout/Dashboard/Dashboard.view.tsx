import React, { useEffect, useRef } from 'react';

import {
  ShoretradeLogo2,
  Exit,
  Cart,
  ArrowLeft,
  PlaceholderProfile,
  ChevronRight,
  ArrowLeftAlt,
} from 'components/base/SVG';
import Touchable from 'components/base/Touchable';
import Typography from 'components/base/Typography';
import Hamburger from 'components/module/Hamburger';
import { BUYER_ACCOUNT_ROUTES, BUYER_ROUTES } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Container } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router-dom';
import { Theme } from 'types/Theme';
import useHomeOld from 'utils/Hooks/useHomeOld';
import { toPrice } from 'utils/String/toPrice';
import { useTheme } from 'utils/Theme';

import {
  DashboardGeneratedProps,
  NavLinkProps,
  HeaderProps,
  IconLinkProps,
} from './Dashboard.props';
import {
  DashboardContainer,
  Sidebar,
  SidebarItem,
  TabletSidebar,
  TabletSidebarItem,
  Content,
  HeaderContainer,
  LogoutContainer,
  LogoutButton,
  CreditBalanceContainer,
  HamburgerWrapper,
  MenuIcon,
  MenuOverlay,
  CheckoutCount,
  SidebarLogoContainer,
  HeaderWrapper,
} from './Dashboard.style';

const NavLink = ({
  to,
  color,
  iconColor,
  linkText,
  Icon,
  onClick,
  isActive,
}: NavLinkProps) => {
  return (
    <SidebarItem to={to} onClick={onClick} isActive={isActive}>
      <div className="icon-container">
        {Icon && <Icon fill={iconColor} height={20} width={20} />}
      </div>
      <Typography className="link" color={color} weight="500">
        {linkText}
      </Typography>
    </SidebarItem>
  );
};

const IconLink = ({
  to,
  iconColor,
  Icon,
  onClick,
  isActive,
}: IconLinkProps) => {
  return (
    <TabletSidebarItem to={to} onClick={onClick} isActive={isActive}>
      <div className="icon-container">
        {Icon && <Icon fill={iconColor} height={20} width={20} />}
      </div>
    </TabletSidebarItem>
  );
};

const Header = ({
  pageTitle,
  userData,
  textColor,
  onClick,
  openSidebar,
  onBack,
  cartItems,
  onClickAccount,
}: HeaderProps) => {
  const theme = useTheme();
  const history = useHistory();

  const isMenuVisible = useMediaQuery({
    query: '(max-width: 768px)',
  });

  const isTablet = useMediaQuery({
    query: BREAKPOINTS.genericTablet,
  });

  const isHomeOld = useHomeOld();

  return (
    <HeaderContainer className="appbar" isHomeOld={isHomeOld}>
      <div className="left-content">
        {onBack && isMenuVisible ? (
          <Touchable className="back-button-container" onPress={() => onBack()}>
            <ArrowLeft fill={theme.grey.shade7} height={24} width={24} />
          </Touchable>
        ) : (
          <>
            {!isTablet && (
              <MenuIcon onClick={onClick}>
                <Hamburger
                  onClick={onClick}
                  isActive={openSidebar}
                  width={30}
                />
              </MenuIcon>
            )}
          </>
        )}

        <div className="title-container">
          {!isMenuVisible && onBack && (
            <Touchable
              className="back-button-container"
              onPress={() => onBack()}
            >
              <ArrowLeft fill={theme.grey.shade7} height={24} width={24} />
            </Touchable>
          )}

          <Typography variant="title4" color={textColor}>
            {pageTitle}
          </Typography>
        </div>
      </div>

      <div className="right-content">
        {theme.appType === 'buyer' && (
          <div className="cart-container">
            <div
              className="cart-wrapper"
              onClick={() => history.push(BUYER_ROUTES.CHECKOUT)}
            >
              <Cart fill={theme.grey.shade8} />
              {cartItems > 0 && (
                <CheckoutCount>
                  <Typography color="noshade" variant="small" weight="900">
                    {cartItems}
                  </Typography>
                </CheckoutCount>
              )}
            </div>
          </div>
        )}

        <Touchable
          className="dashboard-account-container"
          onPress={onClickAccount}
        >
          <div className="text-container">
            <Typography color={textColor} style={{ textAlign: 'right' }}>
              {userData?.companies[0].name}
            </Typography>
            <Typography
              variant="caption"
              color="shade6"
              weight="500"
              style={{ textAlign: 'right' }}
            >
              {userData?.firstName} {userData?.lastName}
            </Typography>
          </div>

          {userData?.profileImage ? (
            <img src={userData?.profileImage} alt="Profile" />
          ) : (
            <PlaceholderProfile />
          )}
        </Touchable>
      </div>
    </HeaderContainer>
  );
};

const DashboardView = (props: DashboardGeneratedProps): JSX.Element => {
  const theme = useTheme();

  const {
    routes,
    pageTitle,
    isInnerRoute,
    shouldIncludePadding,
    userData,
    children,
    logout,
    credit,
    openSidebar,
    setOpenSidebar,
    onBack,
    background,
    screenBackground,
    color,
    headerTextColor,
    cartItems,
    onClickAccount,
  } = props;

  const screenRef = useRef<HTMLDivElement | null>(null);

  const history = useHistory();
  const isSeller = theme.appType === 'seller';
  const textColor: keyof Theme['grey'] = isSeller ? 'noshade' : 'noshade';

  const iconColor = isSeller ? theme.grey.noshade : theme.grey.shade7;

  const showSmallSidebar = useMediaQuery({
    query: BREAKPOINTS.genericTablet,
  });

  const isHomeOld = useHomeOld();

  useEffect(() => {
    if (screenRef) screenRef.current?.scrollTo(0, 0);
  }, [history.location]);

  return (
    <DashboardContainer openSidebar={openSidebar}>
      <MenuOverlay
        openSidebar={openSidebar}
        onClick={() => setOpenSidebar(!openSidebar)}
      />

      {showSmallSidebar && (
        <TabletSidebar>
          <HamburgerWrapper onClick={() => setOpenSidebar(!openSidebar)}>
            <Hamburger
              onClick={() => setOpenSidebar(!openSidebar)}
              isActive={openSidebar}
              width={20}
              height={10}
              color={theme.grey.noshade}
            />
          </HamburgerWrapper>

          {routes.map((route) => (
            <IconLink
              onClick={() => {
                if (openSidebar) {
                  setOpenSidebar(false);
                }
              }}
              key={`sidenav-${route.path}`}
              isActive={isInnerRoute(route.path)}
              to={route.path}
              iconColor={
                isInnerRoute(route.path) ? theme.grey.noshade : iconColor
              }
              Icon={route.icon}
            />
          ))}
        </TabletSidebar>
      )}

      <Sidebar openSidebar={openSidebar}>
        <div>
          <SidebarLogoContainer>
            <ShoretradeLogo2 />
            <div
              className="close-container"
              onClick={() => setOpenSidebar(false)}
            >
              <ArrowLeftAlt />
            </div>
          </SidebarLogoContainer>
          {routes.map((route) => (
            <NavLink
              onClick={() => {
                if (openSidebar) {
                  setOpenSidebar(false);
                }
              }}
              key={`sidenav-${route.path}`}
              isActive={isInnerRoute(route.path)}
              to={route.path}
              color={isInnerRoute(route.path) ? 'noshade' : textColor}
              iconColor={
                isInnerRoute(route.path) ? theme.grey.noshade : iconColor
              }
              linkText={route.title || ''}
              Icon={route.icon}
            />
          ))}
        </div>

        <div>
          {theme.appType === 'buyer' && (
            <CreditBalanceContainer
              onClick={() => {
                if (openSidebar) {
                  setOpenSidebar(false);
                }
                history.push(BUYER_ACCOUNT_ROUTES.BANK_DETAILS);
              }}
            >
              <Typography color="shade6" variant="overline" weight="900">
                Credit balance
              </Typography>
              <div className="balance-arrow">
                <Typography color="noshade" variant="title5" className="amount">
                  {credit ? toPrice(credit) : '$0.00'}
                </Typography>
                <ChevronRight />
              </div>
            </CreditBalanceContainer>
          )}

          <LogoutButton
            style={{ marginBottom: 24 }}
            onPress={() => logout()}
            dark={isSeller}
          >
            <LogoutContainer>
              <div className="icon-container">
                <Exit />
              </div>
              <Typography color="shade7" className="link" weight="500">
                Logout
              </Typography>
            </LogoutContainer>
          </LogoutButton>
        </div>
      </Sidebar>

      <Content
        openSidebar={openSidebar}
        shouldIncludePadding={shouldIncludePadding}
        background={background}
        screenBackground={screenBackground}
        color={color}
        isHomeOld={isHomeOld}
      >
        <>
          {isHomeOld ? (
            <Container
              className="container"
              style={{
                width: '100%',
                height: '100%',
                padding: 0,
                marginLeft: 0,
                marginRight: 0,
              }}
            >
              <HeaderWrapper>
                <Header
                  pageTitle={pageTitle}
                  userData={userData}
                  textColor={
                    headerTextColor || (isSeller ? 'noshade' : 'shade9')
                  }
                  onClick={() => setOpenSidebar(!openSidebar)}
                  openSidebar={openSidebar}
                  onBack={onBack}
                  cartItems={cartItems}
                  onClickAccount={onClickAccount}
                />
              </HeaderWrapper>
              {children}
            </Container>
          ) : (
            <>
              <Header
                pageTitle={pageTitle}
                userData={userData}
                textColor={headerTextColor || (isSeller ? 'noshade' : 'shade9')}
                onClick={() => setOpenSidebar(!openSidebar)}
                openSidebar={openSidebar}
                onBack={onBack}
                cartItems={cartItems}
                onClickAccount={onClickAccount}
              />

              <div className="screen-wrapper">
                <div ref={screenRef} className="screen">
                  <Container
                    className="container"
                    style={{
                      padding: 0,
                      marginLeft: 0,
                      marginRight: 0,
                      width: '100%',
                      maxWidth: '100%',
                    }}
                  >
                    {children}
                  </Container>
                </div>
              </div>
            </>
          )}
        </>
      </Content>
    </DashboardContainer>
  );
};

export default DashboardView;
