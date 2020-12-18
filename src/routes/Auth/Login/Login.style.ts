import { Lock } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import FormikTextField from 'components/module/FormikTextField';
import styled from 'utils/styled';
import { pxToRem } from 'utils/Theme';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex: 1;
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
  flex-wrap: wrap;
`;

export const RegisterLinkPrefix = styled(Typography)`
  margin-right: 4px;
`;

export const RegisterLinkAction = styled.div`
  cursor: pointer;
  margin-right: 4px;
  border-bottom: ${({ theme }) => `1px solid ${theme.brand.primary}`};
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
  margin-top: 28px;
`;

export const ForgotPasswordContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: ${({ theme }) =>
    `1px solid ${
      theme.appType === 'buyer' ? theme.grey.shade4 : theme.grey.shade7
    }`};
`;

export const ForgotPasswordIcon = styled(Lock)`
  margin-right: 11px;
  margin-bottom: 2px;
`;

export const ForgotPasswordText = styled(Typography)`
  font-size: ${pxToRem(14)};
`;
