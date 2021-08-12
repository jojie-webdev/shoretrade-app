import React, { useEffect, useRef } from 'react';

import {
  Exit,
  Cart as CartIcon,
  ArrowLeft,
  PlaceholderProfile,
  ChevronRight,
  ArrowLeftAlt,
  ShoretradeLogo,
  Close,
  Bell,
} from 'components/base/SVG';
import Touchable from 'components/base/Touchable';
import Typography from 'components/base/Typography';
import MobileNav from 'components/layout/MobileNav';
import Hamburger from 'components/module/Hamburger';
import NotificationMenu from 'components/module/NotificationMenu';
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
  PageTitle,
  LogoutContainer,
  LogoutButton,
  CreditBalanceContainer,
  HamburgerWrapper,
  MenuIcon,
  MenuOverlay,
  CheckoutCount,
  SidebarLogoContainer,
  HeaderWrapper,
  HeaderRightContent,
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
  const theme = useTheme();
  return (
    <SidebarItem
      activeStyle={{ background: theme.grey.shade8, borderRadius: '8px' }}
      to={to}
      onClick={onClick}
    >
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

const Cart = ({ cartItems }: { cartItems: number }) => {
  const theme = useTheme();
  const history = useHistory();

  const isMobile = useMediaQuery({
    query: BREAKPOINTS.sm,
  });

  return (
    <div className="cart-container">
      <div
        className="icon-wrapper"
        onClick={() => history.push(BUYER_ROUTES.CHECKOUT)}
      >
        <CartIcon fill={isMobile ? theme.grey.noshade : theme.grey.shade8} />
        {cartItems > 0 && (
          <CheckoutCount>
            <Typography color="noshade" variant="small" weight="900">
              {cartItems}
            </Typography>
          </CheckoutCount>
        )}
      </div>
    </div>
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

  const isMenuVisible = useMediaQuery({
    query: '(max-width: 768px)',
  });

  const isTablet = useMediaQuery({
    query: BREAKPOINTS.genericTablet,
  });

  const isMobile = useMediaQuery({
    query: BREAKPOINTS.sm,
  });

  const isHomeOld = useHomeOld();

  return isMobile ? (
    <MobileNav
      onBackOverride={onBack}
      showLogo={!onBack}
      leftContent={
        <>
          <HamburgerWrapper>
            <Hamburger
              onClick={onClick}
              isActive={openSidebar}
              width={18}
              height={11}
              color={theme.grey.noshade}
            />
          </HamburgerWrapper>
        </>
      }
      rightContent={
        <HeaderRightContent>
          <NotificationMenu notifTotal={3} />
          {!onBack && theme.appType === 'buyer' && (
            <Cart cartItems={cartItems} />
          )}
        </HeaderRightContent>
      }
    />
  ) : (
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
          <PageTitle color={textColor}>{pageTitle}</PageTitle>
        </div>
      </div>

      <HeaderRightContent>
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
        {theme.appType === 'buyer' && <Cart cartItems={cartItems} />}
        <NotificationMenu notifTotal={3} />
      </HeaderRightContent>
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
    onClickOpenSideBar,
    onBack,
    background,
    screenBackground,
    headerTextColor,
    cartItems,
    onClickAccount,
  } = props;

  const history = useHistory();
  const isSeller = theme.appType === 'seller';
  const textColor: keyof Theme['grey'] = isSeller ? 'noshade' : 'noshade';

  const iconColor = isSeller ? theme.grey.shade7 : theme.grey.shade7;

  const showSmallSidebar = useMediaQuery({
    query: BREAKPOINTS.genericTablet,
  });

  const isHomeOld = useHomeOld();

  return (
    <DashboardContainer openSidebar={openSidebar}>
      <MenuOverlay
        openSidebar={openSidebar}
        onClick={() => onClickOpenSideBar(!openSidebar)}
      />

      {showSmallSidebar && (
        <TabletSidebar>
          <HamburgerWrapper onClick={() => onClickOpenSideBar(!openSidebar)}>
            <Hamburger
              onClick={() => onClickOpenSideBar(!openSidebar)}
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
                  onClickOpenSideBar(false);
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
        <div className="wrapper">
          <div>
            <SidebarLogoContainer>
              <div
                className="close-container"
                onClick={() => onClickOpenSideBar(false)}
              >
                <Close height={13} width={13} fill={theme.grey.noshade} />
              </div>
              <ShoretradeLogo
                fill={theme.grey.noshade}
                width={133}
                height={16}
              />
            </SidebarLogoContainer>
            <div className="nav-items-container">
              {routes.map((route) => (
                <NavLink
                  onClick={() => {
                    if (openSidebar) {
                      onClickOpenSideBar(false);
                    }
                  }}
                  key={`sidenav-${route.path}`}
                  isActive={isInnerRoute(route.path)}
                  to={route.path}
                  color={isInnerRoute(route.path) ? 'noshade' : textColor}
                  iconColor={
                    isInnerRoute(route.path) ? theme.brand.primary : iconColor
                  }
                  linkText={route.title || ''}
                  Icon={route.icon}
                />
              ))}
            </div>
          </div>
          <div>
            {theme.appType === 'buyer' && (
              <CreditBalanceContainer
                onClick={() => {
                  if (openSidebar) {
                    onClickOpenSideBar(false);
                  }
                  history.push(BUYER_ACCOUNT_ROUTES.BANK_DETAILS);
                }}
              >
                <Typography color="shade6" variant="overline" weight="900">
                  Credit balance
                </Typography>
                <div className="balance-arrow">
                  <Typography
                    color="noshade"
                    variant="title5"
                    className="amount"
                  >
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
        </div>
      </Sidebar>

      <Content
        openSidebar={openSidebar}
        shouldIncludePadding={shouldIncludePadding}
        background={background}
        screenBackground={screenBackground}
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
                  onClick={() => onClickOpenSideBar(!openSidebar)}
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
                onClick={() => onClickOpenSideBar(!openSidebar)}
                openSidebar={openSidebar}
                onBack={onBack}
                cartItems={cartItems}
                onClickAccount={onClickAccount}
              />

              <div className="screen-wrapper">
                <div className="screen">
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
