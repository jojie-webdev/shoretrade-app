import { Lock } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import FormikTextField from 'components/module/FormikTextField';
import styled from 'utils/styled';

export const Container = styled.div`
  padding: 40px 40px 24px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
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

export const Email = styled(FormikTextField)`
  margin-top: 48px;
`;

export const Password = styled(FormikTextField)`
  margin-top: 36px;
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
