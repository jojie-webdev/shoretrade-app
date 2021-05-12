import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const Container = styled.div`
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

    @media ${BREAKPOINTS['sm']} {
      margin-top: 12px;
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

    @media ${BREAKPOINTS['sm']} {
      margin-left: 13px;
      margin-top: 14px;
    }
  }

  .percent-badge {
    margin-left: auto;
    height: fit-content;

    @media ${BREAKPOINTS['sm']} {
      position: absolute;
      right: 32px;
    }
  }

  @media ${BREAKPOINTS['sm']} {
    border: none;
    border-radius: 4px;
    padding: 8px 8px 21px 21px;
    box-shadow: 0px 6px 12px rgba(41, 43, 50, 0.12);
  }
`;
