import { Lock } from 'components/base/SVG';
import TextField from 'components/base/TextField';
import Typography from 'components/base/Typography';
import styled from 'utils/styled';

export const Container = styled.div`
  padding: 40px;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const Footer = styled.div`
  height: 64px;
`;

export const Title = styled(Typography)`
  font-weight: bold;
`;

export const RegisterLinkContainer = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const RegisterLinkPrefix = styled(Typography)`
  margin-right: 4px;
`;

export const RegisterLink = styled(Typography)`
  font-weight: bold;
`;

export const Email = styled(TextField)`
  margin-top: 48px;
`;

export const Password = styled(TextField)`
  margin-top: 16px;
`;

export const LoginButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 28px;
`;

export const ForgotPasswordContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ForgotPasswordIcon = styled(Lock)`
  margin-right: 11px;
`;

export const ForgotPasswordText = styled(Typography)``;
