import Typography from 'components/base/Typography';
import { LineChartProps } from 'components/module/LineChart/LineChart.props';
import styled from 'utils/styled';

export const Container = styled.div`
  position: relative;
`;

export const YAxisContainer = styled.div<Partial<LineChartProps>>`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: ${({ cHeight }) => (cHeight ? `${cHeight}px` : '100%')};
  background-color: ${({ theme }) => theme.grey.shade9};
  border-radius: 4px;
`;

export const XAxisContainer = styled.div`
  width: 100%;
  margin-top: 12px;
`;

export const Title = styled(Typography)`
  color: ${({ theme }) => theme.grey.shade6};
  margin-bottom: 8px;
`;
