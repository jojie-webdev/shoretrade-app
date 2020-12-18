import { Help, ArrowLeft } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import FormikTextField from 'components/module/FormikTextField';
import styled from 'utils/styled';

export const Container = styled.div`
  padding: 40px 40px 24px;
  padding: 40px;
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
  margin-top: 347px;
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 32px;
`;

export const BackIcon = styled(ArrowLeft)``;

export const Title = styled(Typography)`
  margin-left: 8px;
`;

export const GuideContainer = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 18px;
`;

export const GuideText = styled(Typography)`
  margin-right: 4px;
`;

export const CodeFieldLabel = styled(Typography)`
  margin-top: 14px;
`;

export const CodeFieldRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 4px;
`;

export const CodeFieldContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 48px;
  width: 48px;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.grey.shade5};
  background-color: ${({ theme }) => theme.grey.noshade};
`;

export const CodeField = styled.input`
  background-color: ${({ theme }) => theme.grey.noshade};
  display: flex;
  flex: 1;
  border-radius: 4px;
  padding: 12px 16px;
  border: 0px;
  height: 100%;
  min-width: 100%;
  max-width: 100%;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  text-align: center;
  color: 1px solid ${({ theme }) => theme.appType};
  :focus {
    outline: none;
  }
`;

export const Verify2FAButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 56px;
`;

export const FooterContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const FooterIcon = styled(Help)`
  margin-right: 11px;
  margin-bottom: 2px;
`;

export const FooterText = styled(Typography)``;

export const FooterLink = styled(Typography)`
border-bottom: 1px solid ${({ theme }) => theme.grey.shade6};
  /* border-bottom: 1px solid
    ${({ theme }) =>
      theme.appType === 'seller' ? theme.grey.shade6 : theme.brand.primary}; */
  
`;
