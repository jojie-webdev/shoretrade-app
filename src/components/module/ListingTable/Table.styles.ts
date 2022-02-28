import styled from 'utils/styled';

export const Container = styled.div`
  font-size: 14px;
  overflow: auto;
  // margin-top: 16px;
`;

export const Table = styled.div<{ count: number }>`
  display: grid;
  position: relative;
  grid-template-columns: repeat(${({ count }) => `${count}, ${100 / count}%`});

  .table-value-container {
    display: flex;
    align-items: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .table-value {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const PreloaderWrapper = styled.div`
  padding: 24px 0;
`;

export const SVGContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 48px 0;

  div {
    margin-top: 24px;
    color: ${({ theme }) => theme.grey.shade7};
    font-weight: 500;
  }
`;
