import styled from 'utils/styled';

export const Container = styled.div`
  padding-bottom: 16px;

  .breadcrumb-container {
    margin-bottom: 40px;
  }
`;

export const Transx = styled.div`
  flex: 1;
  padding: 18px 24px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  background-color: white;
  border: 1px solid ${({ theme }) => theme.grey.shade2};
  border-radius: 4px;
  margin-left: 0px;
  margin-right: 0px;
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
