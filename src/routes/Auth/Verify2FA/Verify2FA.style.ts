import { Help } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { BREAKPOINTS } from 'consts/breakpoints';
import { MOBILE_HEADER_HEIGHT } from 'consts/mobileHeader';
import styled from 'utils/styled';

export const MobileContainer = styled.div`
  padding: 16px 24px 24px 24px;
  min-height: calc(100vh - ${MOBILE_HEADER_HEIGHT}px);
  background-color: ${({ theme }) =>
    theme.appType === 'buyer' ? theme.grey.shade1 : theme.grey.shade8};
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
  position: absolute;
  bottom: 0;
  left: 5%;
  margin-bottom: 16px;
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

export const GuideContainer = styled.div`
  margin-top: 8px;
  margin-bottom: 24px;
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
  margin-top: 24px;

  @media ${BREAKPOINTS['sm']} {
    margin-top: 32px;
  }
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

export const FooterLink = styled(Typography)`
  border-bottom: 1px solid ${({ theme }) => theme.grey.shade6};
`;
