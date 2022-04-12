import Divider from 'components/base/Divider';
import Typography from 'components/base/Typography';
import { WatchListLineChartProps } from 'components/module/WatchListLineChart/WatchListLineChart.props';
import styled from 'utils/styled';

export const Container = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.grey.shade9};
  padding-bottom: 16px;
  border-radius: 12px;
`;

export const YAxisContainer = styled.div<Partial<WatchListLineChartProps>>`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: ${({ cHeight }) => (cHeight ? `${cHeight}px` : '100%')};
  border-radius: 4px;
  position: relative;
  // top: -36px;
`;

export const XAxisContainer = styled.div`
  width: 100%;
  margin-top: 16px;
  height: 30px;
  background-color: ${({ theme }) => theme.grey.shade9};
`;

export const Title = styled(Typography)`
  color: ${({ theme }) => theme.grey.shade6};
  margin-bottom: 8px;
`;

export const TopContainer = styled.div`
  padding: 24px;
  padding-bottom: 0;
  display: flex;
  justify-content: space-between;
  width: 80%;
  z-index: 9;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;

  > p {
    margin-right: 4px;
  }
`;

export const StyledDivider = styled(Divider)`
  opacity: 0.25;
`;

export const RangeList = styled.ul`
  display: flex;
  justify-content: space-around;
  list-style: none;
  width: 100%;
  margin: 0;
  padding: 0;

  width: 240px;

  > li {
    color: ${({ theme }) => theme.grey.shade7};
    font-size: 12px;
    font-family: 'Basis Grotesque Pro', sans-serif;
    font-weight: 900;
  }

  > li:hover {
    cursor: pointer;
  }

  > li.selected {
    color: ${({ theme }) => theme.brand.primary};
  }
`;

export const RangeListContainer = styled.div`
  background: rgba(17, 30, 43, 0.5);
  padding: 8px 12px;
  border-radius: 100px;
`;
