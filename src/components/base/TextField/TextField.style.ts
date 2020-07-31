import Typography from 'components/base/Typography';
import styled from 'utils/styled';

export const Container = styled.div``;

export const FieldContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 4px;
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.grey.shade5};
  background-color: ${({ theme }) => theme.grey.noshade};
`;

export const Field = styled.input`
  background-color: ${({ theme }) => theme.grey.noshade};
  display: flex;
  flex: 1;
  border-radius: 4px;
  padding: 12px 16px;
  border: 0px;
  height: 100%;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  color: 1px solid ${({ theme }) => theme.grey.shade9};
  :focus {
    outline: none;
  }
`;

export const VisibilityContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  padding-right: 10px;
  padding-left: 4px;
`;

export const Error = styled(Typography)`
  margin-top: 4px;
`;
