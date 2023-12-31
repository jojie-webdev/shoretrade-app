import { BREAKPOINTS } from 'consts/breakpoints';
import { SpecialColors } from 'utils/SFMTheme';
import styled from 'utils/styled';

export const Container = styled.div<{ isOpenMenu: boolean }>`
  margin-left: 8px;
  @media ${BREAKPOINTS.sm} {
    margin-right: 0px;
  }

  .icon-wrapper {
    cursor: pointer;
    position: relative;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid
    border: 1px solid
      ${({ theme }) =>
        theme.appType === 'buyer' ? theme.grey.shade4 : theme.grey.shade10};
    background: ${({ theme }) =>
      theme.appType === 'buyer' ? theme.grey.shade2 : theme.grey.shade8};
    border-radius: 12px;
    @media ${BREAKPOINTS.nonDesktop} {
      width: 32px;
      height: 32px;
      border: 1px solid ${({ theme }) =>
        theme.isSFM && theme.appType === 'buyer'
          ? SpecialColors.ocean
          : theme.grey.shade10};
      background: ${({ theme }) => {
        if (theme.appType === 'buyer') {
          if (theme.isSFM && theme.appType === 'buyer') {
            return `${SpecialColors.deepSea};`;
          }
          return `${theme.grey.shade8};`;
        }
        return `${theme.grey.shade8};`;
      }}
    }

    .menu-container {
      display: block;
      position: relative;
      filter: drop-shadow(0px 12px 24px rgba(41, 43, 50, 0.25));
      .menu {
        position: relative;
        cursor: pointer;
        z-index: 2;
      }
      .notif-menu {
        position: absolute;
        display: ${({ isOpenMenu }) => (isOpenMenu ? 'block' : 'none')};
        z-index: 1;
        top: 32px;
        left: -474px;
        min-height: 10px;
        min-width: 10px;
        width: 488px;
        .menu-header {
          padding: 16px;
          display: flex;
          justify-content: space-between;
          background: ${({ theme }) =>
            theme.appType === 'buyer'
              ? theme.grey.noshade
              : theme.grey.shade10};
          position: relative;
          text-align: center;
          color: gray;
          font-weight: bold;
          border-radius: 10px 10px 0 0;
          .triangle {
            position: absolute;
            top: -8px;
            left: 448px;
            height: 15px;
            width: 15px;
            border-radius: 6px 0px 0px 0px;
            transform: rotate(45deg);
            background: ${({ theme }) =>
              theme.appType === 'buyer'
                ? theme.grey.noshade
                : theme.grey.shade10};
          }
          .count {
            position: static;
            height: 25px;
            width: 25px;
            display: inline-block;
            line-height: 24px;
            margin-left: 8px;
            font-size: 12px;
            vertical-align: middle;
          }
        }
        .menu-body {
          max-height: 484px;
          min-height: 72px;
          background: ${({ theme }) =>
            theme.appType === 'buyer'
              ? theme.grey.noshade
              : theme.grey.shade10};
          overflow-y: auto;
          overflow-x: hidden;

          .menu-content {
            display: flex;
            flex-direction: column;
            background: ${({ theme }) =>
              theme.appType === 'buyer'
                ? theme.grey.noshade
                : theme.grey.shade10};
          }
          .menu-footer {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 16px 24px;
            background: ${({ theme }) =>
              theme.appType === 'seller'
                ? theme.grey.shade10
                : theme.grey.noshade};
          }
        }
      }
    }
  }
`;

export const NotifCount = styled.div`
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

export const DropdownItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  .text {
    margin-left: 10px;
  }
`;
