import Touchable from 'components/base/Touchable';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Link } from 'react-router-dom';
import styled from 'utils/styled';

export const DashboardContainer = styled.div<{ openSidebar?: boolean }>`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: row;
  position: relative;
  overflow: ${(props) => (props.openSidebar ? 'hidden' : 'auto')};
`;

export const MenuIcon = styled.div`
  display: none;
  height: 24px;
  width: 24px;

  @media ${BREAKPOINTS['md']} {
    display: block;
    margin-right: 32px;
  }

  @media ${BREAKPOINTS['sm']} {
    display: block;
    margin-right: 24px;
  }
`;

export const MenuOverlay = styled.div<{ openSidebar: boolean }>`
  position: absolute;
  display: none;
  background-color: ${(props) => props.theme.grey.shade9};
  opacity: 0.5;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;

  @media ${BREAKPOINTS['md']} {
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
  background: ${(props) =>
    props.theme.appType === 'buyer' ? props.theme.grey.shade2 : '#020a13'};

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.3s ease-in-out;

  .logo-container {
    margin-top: 68px;
    margin-bottom: 60px;
  }

  @media ${BREAKPOINTS['md']} {
    width: 225px;
    position: absolute;
    top: 0;
    left: ${(props) => (props.openSidebar ? '0px' : '-225px')};
    z-index: 9999;
    height: 100vh;
  }

  @media ${BREAKPOINTS['sm']} {
    width: 225px;
    position: absolute;
    top: 0;
    left: ${(props) => (props.openSidebar ? '0px' : '-225px')};
    z-index: 9999;
    height: 100vh;
  }
`;

export const SidebarItem = styled(Link)`
  height: 24px;
  width: 100%;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  border-bottom: none;
  text-decoration: none;

  .icon-container {
    margin-right: 12px;
  }
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
  shouldUseFullWidth: boolean;
  background?: string;
  screenBackground?: string;
  color?: string;
}>`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease-in-out;
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

      width: ${(props) => (props.shouldUseFullWidth ? '100%' : '65%')};
      height: 100%;
      padding: ${(props) => (props.shouldIncludePadding ? '40px 80px' : '0')};
      border-radius: 2px;
      overflow-x: hidden;
      overflow-y: auto;

      .container {
        height: 100%;
        width: 100%;
      }
    }
  }

  @media ${BREAKPOINTS['md']} {
    margin-left: ${(props) => (props.openSidebar ? '225px' : '0')};
    padding-left: ${(props) => (props.openSidebar ? '50px' : '0')};

    .screen-wrapper {
      overflow: ${(props) => (props.openSidebar ? 'hidden' : 'auto')};
      .screen {
        width: 100%;
        padding: ${(props) => (props.shouldIncludePadding ? '40px' : '0')};
      }
    }
  }

  @media ${BREAKPOINTS['sm']} {
    margin-left: ${(props) => (props.openSidebar ? '225px' : '0')};
    padding-left: 0;

    .screen-wrapper {
      height: 100%;
      overflow: ${(props) => (props.openSidebar ? 'hidden' : 'auto')};
      position: relative;
      .screen {
        height: 100%;
        width: 100%;
        padding: 40px 20px;

        .container {
          position: static !important; // needed to override react-grid-system .container
        }
      }
    }
  }
`;

export const HeaderContainer = styled.nav`
  display: flex;
  flex-direction: row;
  margin-top: 40px;
  margin-bottom: 24px;
  align-items: center;
  justify-content: space-between;
  width: 65%;

  .left-content {
    display: flex;
    align-items: flex-start;
  }

  .title-container {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .back-button-container {
    margin-right: 8px;
  }

  .right-content {
    display: flex;
    align-items: center;

    .cart-container {
      margin-right: 45px;
    }

    .cart-wrapper {
      cursor: pointer;
      position: relative;
    }

    .text-container {
      margin-right: 8px;
    }

    img {
      height: 56px;
      width: 56px;
      border-radius: calc(56px / 2);
    }
  }

  @media ${BREAKPOINTS['md']} {
    width: 80%;
  }

  @media ${BREAKPOINTS['sm']} {
    width: 100%;
    padding: 0 24px;
    margin-top: 8px;
    margin-bottom: 8px;
  }
`;

export const CreditBalanceContainer = styled.div`
  background: ${(props) => props.theme.grey.shade1};
  padding: 16px;
  border: 1px solid ${(props) => props.theme.grey.shade2};
  box-sizing: border-box;
  border-radius: 4px;
  margin-bottom: 24px;

  display: flex;
  flex-direction: column;
  justify-content: center;

  .amount {
    margin-top: 4px;
  }
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
