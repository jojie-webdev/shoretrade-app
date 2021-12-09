import styled from 'utils/styled';

export const CellValueContainer = styled.span<{
  isClickable?: boolean;
}>`
  :hover {
    cursor: ${({ isClickable }) => (isClickable ? 'pointer' : 'auto')};
  }
`;
