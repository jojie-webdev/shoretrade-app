import { Help, ArrowLeft } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import FormikTextField from 'components/module/FormikTextField';
import styled from 'utils/styled';

export const Container = styled.div`
  padding: 40px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const ContentWrapper = styled.div`
  width: 360px;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const Footer = styled.div`
  height: 64px;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 32px;
`;

export const BackIcon = styled(ArrowLeft)``;

export const Title = styled(Typography)`
  font-weight: bold;
  margin-left: 8px;
`;

export const GuideContainer = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const GuideText = styled(Typography)`
  margin-right: 4px;
`;

export const Email = styled(FormikTextField)`
  margin-top: 32px;
`;

export const ForgotPasswordButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 28px;
`;

export const FooterContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const FooterIcon = styled(Help)`
  margin-right: 11px;
`;

export const FooterText = styled(Typography)``;

export const FooterLink = styled(Typography)`
  border-bottom: 1px solid ${({ theme }) => theme.grey.shade6};
`;
