import Typography from 'components/base/Typography';
import styled from 'utils/styled';

export const Container = styled.div`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px 12px 16px 12px;
  border-style: solid;
  border-radius: 4px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.grey.shade5};
  background-color: ${({ theme }) => theme.grey.noshade};
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

export const BreakdownRow = styled.div`
  display: flex;
  flex-direction: row;
`;

export const BreakDownCol = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TotalPriceWrapper = styled(Typography)`
  margin-left: auto;
  margin-top: 3px;
  font-weight: 600;
`;
