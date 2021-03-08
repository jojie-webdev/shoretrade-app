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
  align-items: center;
`;

export const BreakdownRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

export const Col = styled.div`
  display: flex;
  flex-direction: column;
`;
