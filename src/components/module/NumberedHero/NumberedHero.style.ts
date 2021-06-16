import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const Container = styled.div`
  padding: 12px 16px;
  background: ${({ theme }) => theme.grey.noshade};
  border-radius: 8px;
  margin-bottom: 0.5rem;

  @media ${BREAKPOINTS['xxl']} {
    height: 286px;
  }
`;

export const NumberContainer = styled.div`
  .wrapper {
    border-radius: 50%;
    background: ${({ theme }) => theme.grey.shade9};
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.grey.noshade};
  }
`;

export const HeroContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const TitleContainer = styled.div``;
