import styled from 'utils/styled';

export const Container = styled.div`
  .header {
    margin-bottom: 40px;
  }

  .interactions {
    margin-top: 12px;

    .category-container {
      display: flex;
      align-items: center;

      img {
        width: 48px;
        height: 48px;
        border-radius: 8px;
        margin-right: 16px;
      }
    }

    .category-text {
      margin-left: 8px;
    }
  }

  button {
    margin-top: 32px;
  }
`;

export const BadgeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 4px;

  .badge-item-container {
    margin-right: 8px;
    margin-top: 8px;
  }
`;
