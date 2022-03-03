import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';
import theme from 'utils/Theme';

export const Container = styled.div`
  margin-top: 45px;
`;

export const TopSection = styled.div`
  display: flex;
  margin-bottom: 30px;
  @media ${BREAKPOINTS['sm']} {
    display: grid;
    grid-row-gap: 10px;
  }
`;

export const FlexContainer = styled.div`
  display: flex;
`;

export const ChangeMarketSector = styled.div<{
  isSeller: boolean;
}>`
  margin-left: 50px;
  @media ${BREAKPOINTS['sm']} {
    margin-left: 0;
  }
  padding: 8px;
  border-radius: 12px;
  background: ${({ isSeller }) =>
    isSeller ? theme.grey.shade9 : theme.grey.noshade};
  box-shadow: 0px 4px 12px rgba(41, 43, 50, 0.04);
  ${({ isSeller }) =>
    !isSeller ? `border: 1px solid ${theme.grey.shade3};` : ''}
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 150px;
  min-width: 85px;

  p {
    text-align: center;
  }

  .change-btn:hover {
    cursor: pointer;
  }
`;
