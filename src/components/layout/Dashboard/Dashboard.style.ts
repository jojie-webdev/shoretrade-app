import Touchable from 'components/base/Touchable';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Link } from 'react-router-dom';
import styled, { css } from 'utils/styled';

const dashboardWidth = (isSeller: boolean) =>
  isSeller ? 'calc(100% - 150px)' : 'calc(100% - 150px)';

export const DashboardContainer = styled.div<{
  openSidebar?: boolean;
}>`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: row;
  position: relative;
  /* overflow: ${(props) => (props.openSidebar ? 'hidden' : 'auto')}; */
 
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
  background-color: ${(props) => props.theme.grey.shade8};
  border-radius: 8px;

  margin-bottom: 64px;

  @media ${BREAKPOINTS['sm']} {
    width: 37px;
    height: 37px;
    margin-left: 4px;
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
    z-index: 999;
    display: ${(props) => (props.openSidebar ? 'block' : 'none')};
  }

  @media ${BREAKPOINTS['sm']} {
    z-index: 999;
    display: ${(props) => (props.openSidebar ? 'block' : 'none')};
  }
`;

export const Sidebar = styled.aside<{ openSidebar: boolean }>`
  padding: 0 24px;
  background: #050e16;
  width: 235px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.1s ease-in-out;
  overflow: hidden;

  .wrapper {
    display: flex;
    height: 100vh;
    flex-direction: column;
    justify-content: space-between;
  }

  @media ${BREAKPOINTS['sm']} {
    .wrapper {
      display: flex;
      height: auto;
      padding-bottom: 160px;
    }
  }

  @media ${BREAKPOINTS['genericTablet']} {
    display: static;
    width: 50%;
    position: absolute;
    top: 0;
    left: ${(props) => (props.openSidebar ? '0px' : '-50%')};
    z-index: 9999;
    min-height: 100vh;
  }

  @media ${BREAKPOINTS['sm']} {
    display: static;
    width: 100%;
    position: absolute;
    top: 0;
    left: ${(props) => (props.openSidebar ? '0px' : '-100%')};
    z-index: 9999;
    min-height: 100vh;
  }
`;

export const SidebarLogoContainer = styled.div`
  margin-top: 40px;
  margin-bottom: 60px;
  display: flex;
  align-items: center;

  .close-container {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    width: 38px;
    height: 38px;
    background-color: ${({ theme }) => theme.grey.shade8};
    cursor: pointer;
    margin-right: 12px;
    margin-left: 12px;
    @media (min-width: 835px) {
      display: none;
    }
  }
`;

export const SidebarItem = styled(Link)<{ isActive: boolean }>`
  height: 48px;
  width: 100%;
  margin-bottom: 2px;
  display: flex;
  align-items: center;
  border-bottom: none;
  text-decoration: none;
  padding-left: 14px;
  ${(props) =>
    props.isActive &&
    `background: ${props.theme.grey.shade8};
      border-radius: 8px;`}

  .icon-container {
    margin-right: 12px;
  }
`;

export const TabletSidebar = styled.aside`
  background: #050e16;
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

  color: ${(props) =>
    props.color
      ? props.color
      : props.theme.appType === 'buyer'
      ? props.theme.grey.shade9
      : props.theme.grey.shade1};

  .screen-wrapper {
    height: 80%;
    position: relative;
    display: flex;
    width: 100%;
    justify-content: center;

    .screen {
      background: ${(props) =>
        props.screenBackground
          ? props.screenBackground
          : props.theme.appType === 'buyer'
          ? props.theme.grey.shade1
          : props.theme.grey.shade8};

      width: ${(props) => dashboardWidth(props.theme.appType === 'seller')};
      padding: ${(props) => (props.shouldIncludePadding ? '48px' : '0')};
      border-radius: 8px;
      overflow-x: hidden;
      overflow-y: auto;

      @media ${BREAKPOINTS['sm']} {
        border-radius: 0px;
      }

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
        padding: ${(props) =>
          props.theme.appType === 'buyer' ? '0 8px' : '16px 24px'};

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
        padding: ${(props) => (props.shouldIncludePadding ? '24px' : '0')};
      }
    }

    .container {
      max-width: 100% !important;
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

export const HeaderRightContent = styled.div`
  display: flex;
  align-items: center;

  .cart-container {
    margin-right: 45px;

    @media ${BREAKPOINTS.sm} {
      margin-right: 0px;
    }
  }

  .cart-wrapper {
    cursor: pointer;
    position: relative;
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
  background: ${(props) => props.theme.grey.shade8};
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

export const CheckoutCount = styled.div`
  background: ${(props) => props.theme.brand.primary};
  width: 20px;
  height: 20px;
  border-radius: 10px;
  padding-top: 3px;
  padding-right: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -10px;
  right: -10px;
`;

export const HeaderWrapper = styled.div`
  width: ${(props) => dashboardWidth(props.theme.appType === 'seller')};
  margin: auto;
  position: relative;
`;
