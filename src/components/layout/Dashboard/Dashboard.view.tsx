import React, { useCallback } from 'react';

import {
  ShoretradeLogo,
  ShoretradeLogo2,
  Exit,
  Cart,
  ArrowLeft,
  PlaceholderProfile,
  ChevronRight,
  Close,
} from 'components/base/SVG';
import Touchable from 'components/base/Touchable';
import Typography from 'components/base/Typography';
import Hamburger from 'components/module/Hamburger';
import { BUYER_ACCOUNT_ROUTES, BUYER_ROUTES } from 'consts';
import { Container, Hidden, Visible } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router-dom';
import { Theme } from 'types/Theme';
import { autoScrollToTop } from 'utils/scrollToTop';
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
  HeaderWrapper,
} from './Dashboard.style';

const NavLink = ({
  to,
  color,
  iconColor,
  linkText,
  Icon,
  onClick,
}: NavLinkProps) => (
  <SidebarItem to={to} onClick={onClick}>
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
  useOuterWrapper,
}: HeaderProps) => {
  const theme = useTheme();
  const history = useHistory();

  const isMenuVisible = useMediaQuery({
    query: '(max-width: 768px)',
  });

  return (
    <HeaderContainer className="appbar" useOuterWrapper={useOuterWrapper}>
      <div className="left-content">
        {onBack && isMenuVisible ? (
          <Touchable className="back-button-container" onPress={() => onBack()}>
            <ArrowLeft fill={theme.grey.shade7} height={24} width={24} />
          </Touchable>
        ) : (
          <MenuIcon onClick={onClick}>
            <Hamburger onClick={onClick} isActive={openSidebar} width={30} />
          </MenuIcon>
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
    useOuterWrapper,
  } = props;

  const history = useHistory();
  const isSeller = theme.appType === 'seller';
  const textColor: keyof Theme['grey'] = isSeller ? 'noshade' : 'noshade';

  const iconColor = isSeller ? theme.grey.noshade : theme.grey.shade7;

  const cbRef = useCallback(
    (node: any) => {
      if (node !== null) autoScrollToTop(history, node);
    },
    [history.location]
  );

  return (
    <DashboardContainer openSidebar={openSidebar}>
      <MenuOverlay
        openSidebar={openSidebar}
        onClick={() => setOpenSidebar(!openSidebar)}
      />

      <Sidebar openSidebar={openSidebar}>
        <div>
          <div className="logo-container">
            <Visible xs sm>
              <div
                className="close-container"
                onClick={() => setOpenSidebar(false)}
              >
                <Close fill={theme.brand.primary} height={20} width={20} />
              </div>
              <ShoretradeLogo fill={theme.grey.noshade} />
            </Visible>
            <Visible md lg xl xxl>
              <ShoretradeLogo2 />
            </Visible>
          </div>
          {routes.map((route) => (
            <NavLink
              onClick={() => {
                if (openSidebar) {
                  setOpenSidebar(false);
                }
              }}
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
        shouldUseFullWidth={
          props.shouldUseFullWidth ? props.shouldUseFullWidth : false
        }
        background={background}
        screenBackground={screenBackground}
        color={color}
        ref={cbRef}
      >
        {useOuterWrapper ? (
          <Container
            className="container"
            style={{ width: '100%', height: '100%' }}
          >
            <HeaderWrapper>
              <Header
                pageTitle={pageTitle}
                userData={userData}
                textColor={headerTextColor || (isSeller ? 'noshade' : 'shade9')}
                onClick={() => setOpenSidebar(!openSidebar)}
                openSidebar={openSidebar}
                onBack={onBack}
                cartItems={cartItems}
                onClickAccount={onClickAccount}
                useOuterWrapper
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
      </Content>
    </DashboardContainer>
  );
};

export default DashboardView;
