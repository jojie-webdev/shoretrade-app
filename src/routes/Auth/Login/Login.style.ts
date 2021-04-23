import { Help, Lock } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import FormikTextField from 'components/module/FormikTextField';
import { BREAKPOINTS } from 'consts/breakpoints';
import styled from 'utils/styled';

export const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;

  .row {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }
`;

export const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  @media ${BREAKPOINTS['sm']} {
    .touchable {
      justify-content: flex-start;
      padding-left: 0px;
      padding-right: 0px;
    }
  }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 64px;
`;

export const RegisterLinkContainer = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
`;

export const RegisterLinkPrefix = styled(Typography)`
  margin-right: 6px;
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

  @media ${BREAKPOINTS['sm']} {
    margin-top: 12px;
  }
`;

export const Password = styled(FormikTextField)`
  margin-top: 36px;
`;

export const LoginButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 28px;

  @media ${BREAKPOINTS['sm']} {
    margin-top: 44px;
    margin-bottom: 8px;
  }
`;

export const ForgotPasswordContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: ${({ theme }) =>
    `1px solid ${
      theme.appType === 'buyer' ? theme.grey.shade4 : theme.grey.shade7
    }`};

  @media ${BREAKPOINTS['sm']} {
    border-bottom: none;
  }
`;

export const ForgotPasswordIcon = styled(Lock)`
  margin-right: 11px;
  margin-bottom: 2px;
`;

export const SignupContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Signup = styled(Typography)`
  margin-left: 8px;
  border-bottom: ${({ theme }) =>
    `1px solid ${
      theme.appType === 'buyer' ? theme.grey.shade4 : theme.grey.shade7
    }`};
`;

export const SignupIcon = styled(Help)`
  margin-right: 11px;
  margin-bottom: 2px;
`;
