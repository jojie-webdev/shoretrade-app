import styled from 'utils/styled';

export const Container = styled.div<{
  starSize?: number;
}>`
  display: flex;
  align-items: center;
  width: fit-content;
  height: ${({starSize}) => starSize || 14}px;
`;

export const StarHolder = styled.div<{
  editable?: boolean;
  starSpacing?: number;
}>`
  :not(:last-child) {
    margin-right: ${({starSpacing}) => `${starSpacing}px` || 0};
  }
  :hover {
    cursor: ${({editable}) => editable ? 'pointer' : 'auto'};
  }
`;