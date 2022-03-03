import styled from 'utils/styled';
import theme from 'utils/Theme';

export const Container = styled.div<{
  isSeller: boolean;
}>`
  margin-bottom: 15px;
  display: grid;
  grid-row-gap: 24px;

  .icon-holder {
    display: grid;
    padding: 9px;
    border-radius: 12px;
    background: ${({ isSeller }) =>
      isSeller ? theme.grey.shade9 : theme.grey.noshade};
    border: 1px solid
      ${({ isSeller }) => (isSeller ? theme.grey.shade9 : theme.grey.shade3)};
    box-shadow: 0px 4px 12px rgba(41, 43, 50, 0.04);
  }
`;
