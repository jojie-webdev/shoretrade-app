import styled from 'utils/styled';

export const Container = styled.div<{ isRead: boolean; fullView?: boolean }>`
  display: flex;
  height: 100%;
  max-height: ${({ fullView }) => (fullView ? '400px' : '200px')};
  cursor: pointer;
  min-height: 72px;
  width: 100%;
  margin-bottom: ${({ fullView }) => (fullView ? '10px' : '0')};
  background-color: ${({ theme }) =>
    theme.appType === 'seller' ? theme.grey.shade9 : theme.grey.noshade};
  width: 100%;
  // max-width: 375px;
  dispaly: flex;
  align-items: center;
  padding: 16px;
  position: relative;

  .horizontal-style-container {
    background-color: ${({ theme, isRead }) =>
      isRead ? '' : theme.brand.primary};
    height: inherit;
    width: 4px;
    left: 0;
    position: absolute;
  }

  .content-container {
    margin-right: 10px;

    .content {
      display: block;
      line-height: 1.5;
    }

    .see-more-link-text {
      font-style: italic;
      display: inline;

      :hover {
        text-decoration: underline;
      }
    }
  }
`;

export const NotifAvatarContainer = styled.div`
  background-color: ${({ theme }) =>
    theme.appType === 'seller' ? theme.grey.shade8 : theme.grey.shade2};
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
  padding: 10px 6px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 20px;

  min-height: 20px;
  .dot {
    width: 8px;
    margin-right: 4px;
    height: 8px;
    border-radius: 50%;
    min-width: 8px;
    background-color: ${({ theme }) => theme.brand.primary};
  }

  .text {
    margin: 0;
    padding: 0;
    position: relative;
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
