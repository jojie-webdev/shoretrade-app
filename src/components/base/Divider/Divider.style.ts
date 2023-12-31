import styled from 'utils/styled';

export const Container = styled.div<{
  spacing?: number;
  backgroundColor?: string;
  thickness?: number;
}>`
  height: ${({ thickness }) => thickness || 2}px;
  margin-top: ${(props) => (props.spacing ? `${props.spacing}px` : `24px`)};
  margin-bottom: ${(props) => (props.spacing ? `${props.spacing}px` : `24px`)};
  background-color: ${({ backgroundColor }) => backgroundColor || '#edeffa'};
  width: 100%;
`;
