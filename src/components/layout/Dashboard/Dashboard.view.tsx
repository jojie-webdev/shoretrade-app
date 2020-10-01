import React from 'react';

import {
  ShoretradeLogo,
  Exit,
  Menu,
  Cart,
  ArrowLeft,
} from 'components/base/SVG';
import Touchable from 'components/base/Touchable';
import Typography from 'components/base/Typography';
import Hamburger from 'components/module/Hamburger';
import { BUYER_ROUTES } from 'consts';
import { Container } from 'react-grid-system';
import { useHistory } from 'react-router-dom';
import { Theme } from 'types/Theme';
import { toPrice } from 'utils/String/toPrice';
import { useTheme } from 'utils/Theme';

import {
  DashboardGeneratedProps,
  NavLinkProps,
  HeaderProps,
} from './Dashboard.props';
import {
  DashboardContainer,
  Sidebar,
  Content,
  HeaderContainer,
  SidebarItem,
  LogoutContainer,
  LogoutButton,
  CreditBalanceContainer,
  MenuIcon,
  MenuOverlay,
  CheckoutCount,
} from './Dashboard.style';

const NavLink = ({ to, color, iconColor, linkText, Icon }: NavLinkProps) => (
  <SidebarItem to={to}>
    <div className="icon-container">
      {Icon && <Icon fill={iconColor} height={20} width={20} />}
    </div>
    <Typography className="link" color={color} weight="500">
      {linkText}
    </Typography>
  </SidebarItem>
);

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

  return (
    <HeaderContainer className="appbar">
      <div className="left-content">
        <MenuIcon onClick={onClick}>
          <Hamburger onClick={onClick} isActive={openSidebar} width={30} />
        </MenuIcon>

        <div className="title-container">
          {onBack && (
            <div className="back-button-container">
              <Touchable circle onPress={() => onBack()}>
                <ArrowLeft width={14} height={14} fill={theme.grey.shade7} />
              </Touchable>
            </div>
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

        <Touchable onPress={onClickAccount}>
          <div className="text-container">
            <Typography color={textColor}>
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
          <img src={userData?.profileImage} alt="" />
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

  const isSeller = theme.appType === 'seller';
  const textColor: keyof Theme['grey'] = isSeller ? 'noshade' : 'shade9';

  const iconColor = isSeller ? theme.grey.noshade : theme.grey.shade9;

  return (
    <DashboardContainer openSidebar={openSidebar}>
      <MenuOverlay
        openSidebar={openSidebar}
        onClick={() => setOpenSidebar(!openSidebar)}
      />

      <Sidebar openSidebar={openSidebar}>
        <div>
          <div className="logo-container">
            <ShoretradeLogo />
          </div>
          {routes.map((route) => (
            <NavLink
              key={`sidenav-${route.path}`}
              to={route.path}
              color={isInnerRoute(route.path) ? 'primary' : textColor}
              iconColor={
                isInnerRoute(route.path) ? theme.brand.primary : iconColor
              }
              linkText={route.title || ''}
              Icon={route.icon}
            />
          ))}
        </div>

        <div>
          {theme.appType === 'buyer' && (
            <CreditBalanceContainer>
              <Typography color="shade7" variant="overline" weight="900">
                Credit balance
              </Typography>
              <Typography color="shade9" variant="title5" className="amount">
                {credit ? toPrice(credit) : '$0.00'}
              </Typography>
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
        shouldUseFullWidth={
          props.shouldUseFullWidth ? props.shouldUseFullWidth : false
        }
        background={background}
        screenBackground={screenBackground}
        color={color}
      >
        <Header
          pageTitle={pageTitle}
          userData={userData}
          textColor={headerTextColor || textColor}
          onClick={() => setOpenSidebar(!openSidebar)}
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
      </Content>
    </DashboardContainer>
  );
};

export default DashboardView;
