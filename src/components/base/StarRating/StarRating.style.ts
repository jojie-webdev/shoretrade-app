import styled from 'utils/styled';

export const Container = styled.div<{
  starSpacing: number;
}>`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: ${({starSpacing}) => starSpacing}px;
  width: fit-content;
`;

export const StarHolder = styled.div<{
  editable?: boolean;
}>`
  :hover {
    cursor: ${({editable}) => editable ? 'pointer' : 'auto'};
  }
`;