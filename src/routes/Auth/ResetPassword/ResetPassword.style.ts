import Typography from 'components/base/Typography';
import FormikTextField from 'components/module/FormikTextField';
import styled from 'utils/styled';

export const Container = styled.div`
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
  flex-direction: column;
  min-height: 100%;
`;

export const Content = styled.div`
  display: flex;
  flex: 1;
  max-width: 341px;
  flex-direction: column;
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
`;

export const ResetPasswordButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 28px;
`;
