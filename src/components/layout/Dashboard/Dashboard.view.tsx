import React from 'react';

import {
  Exit,
  Cart as CartIcon,
  PlaceholderProfile,
  ChevronRight,
  ArrowLeft,
  ShoretradeLogo,
  Close,
  SfmLogo,
  ShoretradeLogoAlt,
  LogOut,
} from 'components/base/SVG';
import Touchable from 'components/base/Touchable';
import Typography from 'components/base/Typography';
import MobileNav from 'components/layout/MobileNav';
import ConfirmationModal from 'components/module/ConfirmationModal';
import Hamburger from 'components/module/Hamburger';
import NotificationMenu from 'components/module/NotificationMenu';
import { BUYER_ACCOUNT_ROUTES, BUYER_ROUTES } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Container } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router-dom';
import { Theme } from 'types/Theme';
import useHomeOld from 'utils/Hooks/useHomeOld';
import { SpecialColors } from 'utils/SFMTheme';
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
  SidebarItem,
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
  SidebarFooter,
  PoweredByContainer,
} from './Dashboard.style';

const NavLink = ({
  to,
  color,
  iconColor,
  linkText,
  Icon,
  onClick,
  isActive,
  isAccessible,
}: NavLinkProps) => {
  const theme = useTheme();
  const disabledColor = theme.appType === 'buyer' ? 'shade6' : 'shade7';
  return (
    <SidebarItem
      activeStyle={{
        background:
          theme.isSFM && theme.appType === 'buyer'
            ? SpecialColors.deepSea
            : theme.grey.shade8,
        borderRadius: '8px',
      }}
      isAccessible={isAccessible}
      to={to}
      onClick={(e) => {
        if (isAccessible) {
          onClick();
        } else {
          e.preventDefault();
        }
      }}
    >
      <div className="icon-container">
        {Icon && (
          <Icon
            fill={isAccessible ? iconColor : theme.grey[disabledColor]}
            height={20}
            width={20}
          />
        )}
      </div>
      <Typography
        className="link"
        color={isAccessible ? color : disabledColor}
        weight="500"
      >
        {linkText}
      </Typography>
    </SidebarItem>
  );
};

const Cart = ({ cartItems }: { cartItems: number }) => {
  const theme = useTheme();
  const history = useHistory();

  const isNonDesktop = useMediaQuery({
    query: BREAKPOINTS.nonDesktop,
  });

  return (
    <div className="cart-container">
      <div
        className="icon-wrapper"
        onClick={() => history.push(BUYER_ROUTES.CHECKOUT)}
      >
        <CartIcon
          fill={
            isNonDesktop
              ? theme.grey.noshade
              : theme.isSFM
              ? SpecialColors.blue
              : theme.grey.shade8
          }
        />
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
  totalUnreadNotifs,
  totalNotifs,
  notifsData,
  handleMarkasRead,
  handleMarkAllasRead,
  handleOnDelete,
  handleNotifOnClick,
}: HeaderProps) => {
  const theme = useTheme();

  const isMenuVisible = useMediaQuery({
    query: '(min-width: 768px)',
  });

  const isTablet = useMediaQuery({
    query: BREAKPOINTS.genericTablet,
  });

  const isVisibleTopMenuBar = useMediaQuery({
    query: BREAKPOINTS.nonDesktop,
  });

  const isHomeOld = useHomeOld();

  return isVisibleTopMenuBar ? (
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
          <NotificationMenu
            handleNotifOnClick={handleNotifOnClick}
            handleOnDelete={handleOnDelete}
            handleMarkasRead={handleMarkasRead}
            handleMarkAllasRead={handleMarkAllasRead}
            notifsData={notifsData}
            notifTotal={totalNotifs}
            unreadTotal={totalUnreadNotifs}
          />
          {theme.appType === 'buyer' && <Cart cartItems={cartItems} />}
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
          <PageTitle altFont color={textColor}>
            {pageTitle}
          </PageTitle>
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
        <NotificationMenu
          handleNotifOnClick={handleNotifOnClick}
          handleMarkasRead={handleMarkasRead}
          handleMarkAllasRead={handleMarkAllasRead}
          handleOnDelete={handleOnDelete}
          notifsData={notifsData}
          notifTotal={totalNotifs}
          unreadTotal={totalUnreadNotifs}
        />
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
    isRouteAccessible,
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
    totalUnreadNotifs,
    totalNotifs,
    notifsData,
    handleMarkasRead,
    handleMarkAllasRead,
    handleOnDelete,
    handleNotifOnClick,
    globalModalType,
    callGlobalModalAction,
  } = props;

  const history = useHistory();
  const isSeller = theme.appType === 'seller';
  const textColor: keyof Theme['grey'] = isSeller ? 'noshade' : 'noshade';

  const iconColor =
    theme.isSFM && !isSeller ? theme.grey.noshade : theme.grey.shade7;

  const isHomeOld = useHomeOld();

  const globalModalData = (() => {
    if (globalModalType === 'CART_EXPIRY_WARNING') {
      return {
        title: 'Pending Cart Items',
        description: 'Do you still want to purchase the products in your cart?',
        actionText: 'Yes',
        cancelText: 'Remove from Cart',
      };
    }
    return {
      title: '',
      description: '',
    };
  })();

  return (
    <DashboardContainer openSidebar={openSidebar}>
      <MenuOverlay
        openSidebar={openSidebar}
        onClick={() => onClickOpenSideBar(!openSidebar)}
      />

      <ConfirmationModal
        isOpen={globalModalType !== ''}
        title={globalModalData.title}
        description={globalModalData.description}
        action={() => {
          callGlobalModalAction('POSITIVE');
        }}
        cancel={() => {
          callGlobalModalAction('NEGATIVE');
        }}
        actionText={globalModalData.actionText}
        cancelText={globalModalData.cancelText}
        onClickClose={() => {
          callGlobalModalAction('NEUTRAL');
        }}
      />

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
              {!theme.isSFM && (
                <ShoretradeLogo
                  fill={theme.grey.noshade}
                  width={133}
                  height={16}
                />
              )}
              {theme.isSFM && theme.appType === 'seller' && (
                <SfmLogo fill={theme.grey.noshade} width={122} height={32} />
              )}
              {theme.isSFM && theme.appType === 'buyer' && (
                <SfmLogo fill={theme.grey.noshade} width={122} height={32} />
              )}
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
                  isAccessible={isRouteAccessible(route)}
                />
              ))}
            </div>
          </div>
          <SidebarFooter>
            {theme.isSFM && (
              <PoweredByContainer>
                <Typography color="noshade" variant="small">
                  Powered by
                </Typography>
                <ShoretradeLogoAlt />
              </PoweredByContainer>
            )}
            {theme.appType === 'buyer' && (
              <CreditBalanceContainer
                onClick={() => {
                  if (openSidebar) {
                    onClickOpenSideBar(false);
                  }
                  history.push(BUYER_ACCOUNT_ROUTES.BANK_DETAILS);
                }}
              >
                <Typography color="primary" variant="overline" weight="900">
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
                  <LogOut
                    fill={
                      theme.isSFM && !isSeller
                        ? theme.grey.noshade
                        : theme.grey.shade7
                    }
                  />
                </div>
                <Typography
                  color={theme.isSFM ? 'noshade' : 'shade7'}
                  className="link"
                  weight="500"
                >
                  Logout
                </Typography>
              </LogoutContainer>
            </LogoutButton>
          </SidebarFooter>
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
                  handleOnDelete={handleOnDelete}
                  handleMarkasRead={handleMarkasRead}
                  handleMarkAllasRead={handleMarkAllasRead}
                  handleNotifOnClick={handleNotifOnClick}
                  pageTitle={pageTitle}
                  userData={userData}
                  totalNotifs={totalNotifs}
                  totalUnreadNotifs={totalUnreadNotifs}
                  notifsData={notifsData}
                  textColor={
                    headerTextColor ||
                    (isSeller
                      ? 'noshade'
                      : theme.isSFM
                      ? 'secondary'
                      : 'shade9')
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
                handleOnDelete={handleOnDelete}
                pageTitle={pageTitle}
                handleNotifOnClick={handleNotifOnClick}
                handleMarkasRead={handleMarkasRead}
                handleMarkAllasRead={handleMarkAllasRead}
                userData={userData}
                totalNotifs={totalNotifs}
                totalUnreadNotifs={totalUnreadNotifs}
                notifsData={notifsData}
                textColor={
                  headerTextColor ||
                  (isSeller ? 'noshade' : theme.isSFM ? 'secondary' : 'shade9')
                }
                onClick={() => onClickOpenSideBar(!openSidebar)}
                openSidebar={openSidebar}
                onBack={onBack}
                cartItems={cartItems}
                onClickAccount={onClickAccount}
              />

              <div className="screen-wrapper">
                <div id="screen" className="screen">
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
