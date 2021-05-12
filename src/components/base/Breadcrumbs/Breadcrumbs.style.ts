import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const Container = styled.div`
  display: flex;
  align-items: center;

  @media ${BREAKPOINTS['sm']} {
    flex-wrap: wrap;
  }

  .divider {
    margin: 0 16px;
  }

  a > p:hover {
    color: ${({ theme }) => theme.brand.primary};
  }

  .alt-link {
    cursor: pointer;
    &:hover {
      color: ${({ theme }) => theme.brand.primary};
    }
  }
`;
