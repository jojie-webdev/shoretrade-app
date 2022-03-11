import Touchable from 'components/base/Touchable';
import Typography from 'components/base/Typography';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Link, NavLink } from 'react-router-dom';
import { SpecialColors } from 'utils/SFMTheme';
import styled from 'utils/styled';
import { pxToRem } from 'utils/Theme';

const dashboardWidth = (isSeller: boolean) =>
  isSeller ? 'calc(100% - 150px)' : 'calc(100% - 150px)';

export const DashboardContainer = styled.div<{
  openSidebar?: boolean;
}>`
  width: 100%;
  display: flex;

  height: 100vh;
  @media ${BREAKPOINTS['sm']} {
    height: auto;
    margin-top: 48px;
  }

  ${({ openSidebar }) =>
    openSidebar && ` height: calc(var(--vh, 1vh) * 100); margin-top: 0px;`}
  flex-direction: row;
  position: relative;
  z-index: 2222;
`;

export const MenuIcon = styled.div`
  display: none;
  height: 24px;
  width: 24px;

  @media ${BREAKPOINTS['sm']} {
    display: block;
    margin-right: 24px;
  }
`;

export const HamburgerWrapper = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.theme.isSFM && props.theme.appType === 'buyer'
      ? SpecialColors.deepSea
      : props.theme.grey.shade8};
  border-radius: 8px;

  margin-bottom: 64px;

  @media ${BREAKPOINTS.nonDesktop} {
    width: 37px;
    height: 37px;
    margin-bottom: 0;
  }
`;

export const MenuOverlay = styled.div<{ openSidebar: boolean }>`
  position: absolute;
  display: none;
  background-color: ${(props) => props.theme.grey.shade9};
  opacity: 0.5;
  top: 0;
  left: 0;
  /* height: 100vh; */

  width: 100%;
  height: 100%;
  overflow: hidden;

  @media ${BREAKPOINTS['genericTablet']} {
    z-index: 2222;
    display: ${(props) => (props.openSidebar ? 'block' : 'none')};
  }

  @media ${BREAKPOINTS['sm']} {
    z-index: 2222;
    display: ${(props) => (props.openSidebar ? 'block' : 'none')};
  }
`;

export const Sidebar = styled.aside<{ openSidebar: boolean }>`
  -webkit-transform: translate3d(0, 0, 0);
  padding: 0 24px;
  background: ${({ theme }) =>
    theme.isSFM && theme.appType === 'buyer'
      ? SpecialColors.ocean
      : theme.grey.shade10};
  width: 270px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.1s ease-in-out;
  overflow: hidden;
  z-index: 2222;

  .wrapper {
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: space-between;
  }

  @media (max-height: 768px) {
    .nav-items-container {
      overflow-y: scroll;

      max-height: ${({ theme }) =>
        theme.appType === 'buyer' ? '50vh' : '68vh'};

      ${({ theme }) => {
        if (theme.isSFM) {
          return `
            max-height: ${theme.appType === 'buyer' ? '40vh' : '50vh'};
          `;
        }
      }}
    }
  }

  @media ${BREAKPOINTS['sm']} {
    .nav-items-container {
      margin-bottom: 2rem;
      max-height: 50vh;
      overflow-y: scroll;
    }
    .wrapper {
      height: auto;
    }
  }

  @media ${BREAKPOINTS['genericTablet']} {
    display: static;
    width: 50%;
    position: absolute;
    top: 0;
    left: ${(props) => (props.openSidebar ? '0px' : '-50%')};
    z-index: 2222;
    min-height: 100vh;
  }

  @media ${BREAKPOINTS['sm']} {
    display: static;
    width: 100%;
    position: fixed;
    top: 0;
    left: ${(props) => (props.openSidebar ? '0px' : '-100%')};
    z-index: 2222;
    min-height: 100vh;
  }
`;

export const SidebarLogoContainer = styled.div`
  margin-top: 70px;
  margin-bottom: 40px;
  display: flex;
  align-items: center;

  .close-container {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    width: 38px;
    height: 38px;
    background-color: ${({ theme }) =>
      theme.isSFM && theme.appType === 'buyer'
        ? SpecialColors.deepSea
        : theme.grey.shade8};
    cursor: pointer;
    margin-right: 12px;

    @media (min-width: 835px) {
      display: none;
    }
  }

  @media ${BREAKPOINTS['sm']} {
    margin-top: 36px;
    margin-bottom: 36px;
  }
`;

export const SidebarItem = styled(NavLink)`
  height: 48px;
  width: 100%;
  margin-bottom: 2px;
  display: flex;
  align-items: center;
  border-bottom: none;
  text-decoration: none;
  padding-left: 14px;
  .icon-container {
    margin-right: 12px;
  }
`;

export const TabletSidebar = styled.aside`
  background: ${({ theme }) =>
    theme.isSFM && theme.appType === 'buyer'
      ? SpecialColors.ocean
      : theme.grey.shade10};
  width: 72px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;

  padding-top: 75px;
  padding-bottom: 60px;
`;

export const TabletSidebarItem = styled(Link)<{ isActive: boolean }>`
  height: 40px;
  width: 40px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: none;
  ${(props) =>
    props.isActive &&
    `background: ${props.theme.brand.primary};
      border-radius: 4px;`}
`;

export const LogoutContainer = styled.div`
  height: 24px;
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: none;
  text-decoration: none;

  .icon-container {
    margin-right: 12px;
     opacity: ${({ theme }) => (theme.appType === 'seller' ? 1 : 0.25)}}
  }
`;

export const SidebarFooter = styled.div`
  @media (max-height: 768px) {
    position: fixed;
    bottom: 0;
    background: ${({ theme }) =>
      theme.isSFM && theme.appType === 'buyer'
        ? SpecialColors.ocean
        : theme.grey.shade10};
    width: 222px;
  }
`;

export const LogoutButton = styled(Touchable)`
  margin-bottom: 24px;
`;

export const Content = styled.div<{
  shouldIncludePadding: boolean;
  openSidebar: boolean;
  background?: string;
  screenBackground?: string;
  color?: string;
  isHomeOld?: boolean;
}>`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: margin 0.3s ease-in-out, padding 0.3s ease-in-out;
  overflow-x: hidden;

  background: ${(props) =>
    props.background
      ? props.background
      : props.theme.appType === 'buyer'
      ? props.theme.grey.shade1
      : props.theme.grey.shade9};

  .screen-wrapper {
    height: 80%;
    position: relative;
    display: flex;
    width: 100%;
    justify-content: center;

    .screen {
      @media (min-width: 835px) {
        background: ${(props) =>
          props.screenBackground
            ? props.screenBackground
            : props.theme.appType === 'buyer'
            ? props.theme.grey.shade2
            : props.theme.grey.shade8};
        border-radius: 8px;
        border: ${({ theme }) => {
          return `1px solid ${
            theme.appType === 'seller' ? 'transparent' : theme.grey.shade3
          }`;
        }};
        padding: ${(props) => (props.shouldIncludePadding ? '48px' : '0')};
      }

      width: ${(props) => dashboardWidth(props.theme.appType === 'seller')};
      overflow-x: hidden;
      overflow-y: auto;

      .container {
        min-height: 100%;
        width: 100%;
      }
    }
  }

  @media ${BREAKPOINTS['sm']} {
    min-height: 100vh;

    .screen-wrapper {
      height: 100%;
      overflow: ${(props) => (props.openSidebar ? 'hidden' : 'auto')};
      position: relative;
      overflow-x: hidden;

      .screen {
        height: 100%;
        width: 100%;
        display: flex;
        padding: 24px;
        border: 0;
        border-radius: 0;
        background: ${(props) =>
          props.screenBackground
            ? props.screenBackground
            : props.theme.appType === 'buyer'
            ? props.theme.grey.shade1
            : props.theme.grey.shade8};

        .container {
          /* position: static !important; // needed to override react-grid-system .container */
        }
      }
    }
  }

  //generic tablet till xl
  @media (min-width: 577px) and (max-width: 1200px) {
    min-height: 100vh;

    .screen-wrapper {
      overflow: ${(props) => (props.openSidebar ? 'hidden' : 'auto')};

      .screen {
        width: calc(100% - 32px);
        padding: ${(props) => (props.shouldIncludePadding ? '12px' : '0')};
      }
    }

    .container {
      max-width: 100% !important;
    }
  }

  @media (max-width: 768px) {
    .screen {
      width: 100% !important;
      padding: ${(props) =>
        props.shouldIncludePadding ? '24px' : '0'} !important;
      background: ${(props) =>
        props.screenBackground
          ? props.screenBackground
          : props.theme.appType === 'buyer'
          ? props.theme.grey.shade1
          : props.theme.grey.shade8};
    }
  }

  ${(props) =>
    props.isHomeOld
      ? `
  .container {
      max-width: 100% !important;
    }
  `
      : ``}
`;

export const HeaderContainer = styled.nav<{ isHomeOld?: boolean }>`
  display: flex;
  flex-direction: row;
  margin-top: ${({ isHomeOld }) => (!isHomeOld ? '0' : '45px')};
  margin-bottom: 24px;
  z-index: 10;
  align-items: center;
  justify-content: space-between;
  width: ${(props) =>
    props.isHomeOld
      ? '100%'
      : dashboardWidth(props.theme.appType === 'seller')};

  .left-content {
    display: flex;
    align-items: flex-start;
    flex: 1;
  }

  .title-container {
    display: flex;
    flex-direction: row;
    align-items: center;

    @media ${BREAKPOINTS.sm} {
      display: none;

      p {
        font-size: 1.75rem;
        line-height: 34px;
      }
    }
  }

  .back-button-container {
    margin-right: 8px;
    margin-bottom: 4px;
  }

  @media ${BREAKPOINTS['sm']} {
    width: 100%;
    padding: 8px;
    margin-top: 8px;
    margin-bottom: 8px;
  }

  //generic tablet till xl
  @media (min-width: 577px) and (max-width: 1200px) {
    width: calc(100% - 32px);
  }
`;

export const PageTitle = styled(Typography)`
  font-weight: bold;
  font-size: ${pxToRem(32)};
  line-height: 40px;
`;

export const HeaderRightContent = styled.div`
  display: flex;
  align-items: center;

  .cart-container {
    margin-left: 8px;
    @media ${BREAKPOINTS.nonDesktop} {
      margin-right: 0px;
    }
  }

  .notif-container {
    margin-left: 8px;
    @media ${BREAKPOINTS.nonDesktop} {
      margin-right: 0px;
    }
  }

  .icon-wrapper {
    cursor: pointer;
    position: relative;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;

    border: 1px solid
      ${({ theme }) =>
        theme.appType === 'buyer' ? theme.grey.shade4 : theme.grey.shade10};
    background: ${({ theme }) =>
      theme.appType === 'buyer' ? theme.grey.shade2 : theme.grey.shade8};
    @media ${BREAKPOINTS.nonDesktop} {
      width: 32px;
      height: 32px;
      border: 1px solid
        ${({ theme }) =>
          theme.isSFM ? SpecialColors.ocean : theme.grey.shade10};
      background: ${({ theme }) => {
        if (theme.appType === 'buyer') {
          if (theme.isSFM) {
            return `${SpecialColors.deepSea};`;
          }
          return `${theme.grey.shade8};`;
        }
        return `${theme.grey.shade8};`;
      }};
    }
  }

  .dashboard-account-container {
    :hover {
      background-color: transparent;
    }

    @media ${BREAKPOINTS.sm} {
      padding-right: 0;

      img {
        display: none;
      }

      svg {
        display: none;
      }
    }
  }

  .text-container {
    margin-right: 8px;
  }

  img {
    height: 48px;
    width: 48px;
    border-radius: calc(56px / 8);
  }
`;

export const CreditBalanceContainer = styled.div`
  background: ${({ theme }) =>
    theme.isSFM && theme.appType === 'buyer'
      ? SpecialColors.deepSea
      : theme.grey.shade8};
  padding: 16px;
  box-sizing: border-box;
  border-radius: 4px;
  margin-bottom: 24px;

  display: flex;
  flex-direction: column;
  justify-content: center;

  .amount {
    margin-top: 4px;
  }

  .balance-arrow {
    display: flex;
    align-items: center;

    svg {
      margin-left: 11px;
    }
  }

  cursor: pointer;
`;

export const PoweredByContainer = styled.div`
  padding: 16px;
`;

export const CheckoutCount = styled.div`
  background: ${(props) => props.theme.brand.primary};
  width: 24px;
  height: 24px;
  border-radius: 50%;
  padding-top: 3px;
  padding-right: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -10px;
  right: -10px;

  @media ${BREAKPOINTS.nonDesktop} {
    width: 20px;
    height: 20px;

    top: -6px;
    right: -6px;
  }
`;

export const HeaderWrapper = styled.div`
  width: ${(props) => dashboardWidth(props.theme.appType === 'seller')};
  margin: auto;
  position: relative;
  z-index: 10;
`;
