import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const Container = styled.div`
  padding: 12px 16px;
  background: ${({ theme }) => theme.grey.noshade};
  border-radius: 12px;
  margin-bottom: 0.5rem;

  @media ${BREAKPOINTS['xxl']} {
    height: 388px;
  }
`;

export const NumberContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const HeroContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const TitleContainer = styled.div``;
