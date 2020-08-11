import { LinePathProps } from 'components/module/LinePath/LinePath.props';
import styled from 'utils/styled';

export const Container = styled.div<Partial<LinePathProps>>`
  width: ${({ cWidth }) => (cWidth ? `${cWidth}px` : '100%')};
  height: ${({ cHeight }) => (cHeight ? `${cHeight}px` : '100%')};
`;
