import styled from 'utils/styled';

export const Container = styled.div`
  padding: 0px 8px;
`;

export const Transx = styled.div`
  flex: 1;
  padding: 18px 24px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  background-color: white;
  border-radius: 4px;
  margin-bottom: 16px;
`;

export const TransxLeft = styled.div`
  & > * {
    text-align: left;
  }
`;
export const TransxRight = styled.div`
  & > * {
    text-align: right;
  }
`;