import Typography from 'components/base/Typography';
import FormikTextField from 'components/module/FormikTextField';
import { BREAKPOINTS } from 'consts/breakpoints';
import { MOBILE_HEADER_HEIGHT } from 'consts/mobileHeader';
import styled from 'utils/styled';

export const MobileContainer = styled.div`
  padding: 24px;
  min-height: calc(100vh - ${MOBILE_HEADER_HEIGHT}px);
  background-color: ${({ theme }) => theme.grey.shade1};
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 32px;
`;

export const Title = styled(Typography)`
  margin-left: 8px;
`;

export const PasswordField = styled(FormikTextField)`
  margin-top: 32px;

  @media ${BREAKPOINTS['sm']} {
    margin-top: 24px;
  }
`;

export const ResetPasswordButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 24px;

  @media ${BREAKPOINTS['sm']} {
    margin-top: 36px;
  }
`;
