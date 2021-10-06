import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';
import theme from 'utils/Theme';

export const Container = styled.div`
  border: 1px solid ${({ theme }) => theme.grey.shade4};
  border-radius: 8px;
  background-color: #fff;
  padding: 8px;
  margin-top: 16px;
`;

export const RequestDetailsMobileContainer = styled.div`
  display: flex;
  .thumbnail-container {
    img {
      width: 72px;
      height: 72px;
      border-radius: 8px;
      margin-right: 8px;
    }
  }
  @media ${BREAKPOINTS['sm']} {
    width: 100%;
  }

  @media (max-width: 380px) {
    .typo {
      font-size: 15px;
    }
  }
`;

export const ProgressContainer = styled.div`
  width: 100%;
  height: 4px;
  background-color: ${({ theme }) => theme.grey.shade3};
  border-radius: 1px;
  position: relative;
`;

export const DeleteButtonContainer = styled.div`
  margin: auto;

  .delete-button {
    background-color: ${theme.grey.shade2};
    height: 32px;
    width: 32px;
    border-radius: 12px;
    align-self: center;
    border: 1px solid ${theme.grey.shade4};
    path {
      fill: ${theme.grey.shade7};
    }
  }
`;
