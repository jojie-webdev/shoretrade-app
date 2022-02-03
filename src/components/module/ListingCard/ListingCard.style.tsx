import styled from 'utils/styled';

export const Container = styled.div<{ last?: boolean }>`
  display: flex;
  justify-content: space-between;
  padding: 12px;
  background: white;
  margin-bottom: 8px;

  section {
    margin-bottom: 8px;

    div {
      font-size: 12px;
      font-weight: 500;
    }
  }
`;

export const DetailsContainer = styled.div`
  flex-grow: 1;
`;

export const ColumnGroupContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const Column = styled.section`
  width: 80%;
`;
