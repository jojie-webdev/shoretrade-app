import styled from 'utils/styled';

export const Container = styled.div`
  padding-bottom: 16px;

  .breadcrumb-container {
    margin-bottom: 40px;
  }

  .gradient-container {
    position: relative;

    .profile-image {
      position: absolute;
      top: 17px;
      left: 17px;
    }

    img {
      width: 34px;
      height: 34px;
      border-radius: 50%;
    }
  }

  .summary-row {
    margin-top: 12px;

    .summary-item {
      display: flex;
      align-items: center;
      margin-bottom: 10px;

      .summary-item-text {
        margin-left: 8px;
      }
    }
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  padding: 16px 24px;
  background: ${({ theme }) => theme.grey.noshade};
  border: ${({ theme }) => `2px solid ${theme.grey.shade3}`};
  border-radius: 8px;
  margin-bottom: 32px;

  .owner-container {
    margin-left: 16px;
    align-self: center;
  }

  .percent-badge {
    margin-left: auto;
    height: fit-content;
  }
`;
