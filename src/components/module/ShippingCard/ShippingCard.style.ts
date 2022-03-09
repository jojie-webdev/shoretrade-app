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

    .thumbnail-container {
      margin-right: 1rem;

      img {
        width: 48px;
        height: 48px;
        border-radius: 8px;
        @media ${BREAKPOINTS['sm']} {
          width: 40px;
          height: 40px;
        }
      }
    }
  }

  .shipping-option-right {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .line-through-text {
      text-decoration: line-through;
      text-decoration-color: ${({ theme }) => theme.brand.primary};
      text-decoration-thickness: 2.5px;
    }

    svg {
      margin-bottom: 4px;
      margin-left: 26px;
    }
  }

  .free-badge {
    padding: 2px 8px;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.brand.primary};
    margin: 0px 8px 8px 0px;

    p {
      font-size: 8px;
      color ${({ theme }) => theme.grey.noshade}
    }
  }
`;

export const Spacer = styled.div`
  margin-bottom: 2px;
`;
