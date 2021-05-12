import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const Container = styled.div`
  width: 100%;
`;

export const Rectangle = styled.div`
  cursor: pointer;
  padding: 18px 24px;
  margin-top: 12px;
  background: #ffffff;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.grey.shade3};

  @media ${BREAKPOINTS['sm']} {
    border: none;
    box-shadow: 0px 6px 12px rgba(41, 43, 50, 0.12);
  }

  .shipping-option-left {
    display: flex;
    align-items: center;
  }

  .shipping-option-right {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    svg {
      margin-bottom: 4px;
      margin-left: 26px;
    }
  }
`;

export const Spacer = styled.div`
  margin-bottom: 2px;
`;
