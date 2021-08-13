import styled from 'utils/styled';

export const Container = styled.div``;

export const GlobalNotificationsContainer = styled.div`
  .items-container {
    display: flex;
    flex-directon: row;

    flex-wrap: wrap;
  }

  .item {
    margin-right: 8px;
    margin-bottom: 8px;
  }

  .section-title {
    margin-bottom: 16px;
    color: ${({ theme }) =>
      theme.appType === 'seller' ? theme.grey.noshade : theme.grey.shade9};
  }
`;

export const CategoryItemContainer = styled.div`
  margin-top: 24px;
  > div {
    margin-bottom: 8px;
  }
`;

export const FooterContainer = styled.div`
  margin-top: 24px;
`;
