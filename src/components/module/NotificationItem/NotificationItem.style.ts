import styled from 'utils/styled';

export const Container = styled.div`
  display: flex;
  height: 100%;
  max-height: 200px;
  min-height: 72px;
  background-color: ${({ theme }) =>
    theme.appType === 'seller' ? theme.grey.shade9 : theme.grey.noshade};
  width: 100%;
  max-width: 375px;
  box-shadow: 0 4px 12px rgba(41, 43, 50, 0.04);
  border-radius: 8px;
  dispaly: flex;
  align-items: center;
  padding: 16px;
  position: relative;

  .horizontal-style-container {
    background-color: ${({ theme }) => theme.brand.primary};
    height: inherit;
    width: 4px;
    left: 0;
    position: absolute;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  .content-container {
    margin-right: 10px;
  }
`;

export const NotifAvatarContainer = styled.div`
  background-color: ${({ theme }) => theme.grey.shade8};
  height: 52px;
  width: 52px;
  min-width: 52px;
  margin-right: 10px;

  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NewIndicatorContainer = styled.div`
  background-color: rgba(227, 93, 50, 0.1);
  padding: 4px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 20px;

  max-width: 45px;

  min-height: 20px;
  .dot {
    width: 8px;
    margin-right: 4px;
    height: 8px;
    border-radius: 50%;
    min-width: 8px;
    background-color: ${({ theme }) => theme.brand.primary};
  }
`;

export const MoreMenuContainer = styled.div<{ isOpen: boolean }>`
  margin-left: 10px;

  .dropdown-container{
    display: block;
    position: relative;
    z-index: 3;
    filter: drop-shadow(0px 12px 24px rgba(41, 43, 50, 0.25));
    .dropdown{
      position: relative;
      cursor: pointer;
      z-index: 3;
    }
    .dropdown-menu{
      position: absolute;
      display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
      z-index: 1;
      left: -240px;
      min-height: 10px;
      min-width: 10px;
      // width: 230px;
      width: 280px;
      .dropdown-header{
        background: ${({ theme }) =>
          theme.appType === 'buyer' ? theme.grey.noshade : theme.grey.shade10};
        position: relative;
        text-align: center;
        color: gray;
        font-weight: bold;
        border-radius: 10px 10px 0 0;
        .triangle{
          position: absolute;
          top: -8px;
          left: 250px;
          height: 15px;
          width: 15px;
          border-radius: 6px 0px 0px 0px;
          transform: rotate(45deg);
          background: ${({ theme }) =>
            theme.appType === 'buyer'
              ? theme.grey.noshade
              : theme.grey.shade10};
        }
        .count{
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
      .dropdown-body{
        max-height: 292px;
        min-height: 72px;
        background: ${({ theme }) =>
          theme.appType === 'buyer' ? theme.grey.noshade : theme.grey.shade10};
        overflow-y: auto;
        overflow-x: hidden;
        border-radius: 6px;

        .dropdown-content {
          display: flex;
          padding: 24px;
          flex-direction: column;
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

export const RightComponentContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  flex: 1 0 auto;
  align-items: center;
`;
