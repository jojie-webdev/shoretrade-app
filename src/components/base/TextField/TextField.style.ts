import AlertInfo from 'components/base/AlertInfo';
import Typography from 'components/base/Typography';
import styled from 'utils/styled';

export const Container = styled.div``;

const fontStyle = `
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  
`;

export const FieldContainer = styled.div<{ error: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 4px;
  width: 100%;
  height: 48px;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid
    ${({ theme, error }) => (error ? theme.brand.error : theme.grey.shade5)};
  background-color: ${({ theme }) => theme.grey.noshade};
`;

export const Field = styled.input`
  background-color: ${({ theme }) => theme.grey.noshade};
  display: flex;
  flex: 1;
  border-radius: 4px;
  padding: 12px 16px;
  border: 0;
  width: 100%;
  height: 100%;
  color: 1px solid ${({ theme }) => theme.grey.shade9};
  :focus {
    outline: none;
  }
  ${fontStyle};
`;

export const LeftComponentContainer = styled.div`
  display: flex;
  width: 48px;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-right: 1px solid ${({ theme }) => theme.grey.shade5};
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

export const Alert = styled(AlertInfo)`
  margin-top: 8px;
`;

export const Prefix = styled.span`
  padding-left: 12px;
  color: ${(props) => props.theme.grey.shade8};
  ${fontStyle};
`;
