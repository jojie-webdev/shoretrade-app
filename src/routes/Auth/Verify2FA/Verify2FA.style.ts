import { Help } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { BREAKPOINTS } from 'consts/breakpoints';
import { MOBILE_HEADER_HEIGHT } from 'consts/mobileHeader';
import { fontStyle } from 'consts/textField';
import styled from 'utils/styled';

export const MobileContainer = styled.div`
  padding: 16px 24px 24px 24px;
  min-height: calc(100vh - ${MOBILE_HEADER_HEIGHT}px);

  background-color: ${({ theme }) =>
    theme.appType === 'buyer' ? theme.grey.shade1 : theme.grey.shade8};

  .code-field {
    width: 100% !important;

    .styles_react-code-input__CRulA {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }

    input {
      box-sizing: border-box;
      border-radius: 4px;
      border: 1px solid ${({ theme }) => theme.grey.shade5} !important;
      background-color: ${({ theme }) => theme.grey.noshade} !important;

      ${fontStyle};
      font-family: 'Basis Grotesque Pro', sans-serif;
      color: ${({ theme }) => theme.grey.shade10};
    }
  }

  .__react_component_tooltip {
    border-radius: 6px;
  }
`;

export const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  .code-field {
    width: 100% !important;

    .styles_react-code-input__CRulA {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }

    input {
      box-sizing: border-box;
      border-radius: 4px;
      border: 1px solid ${({ theme }) => theme.grey.shade5} !important;
      background-color: ${({ theme }) => theme.grey.noshade} !important;

      ${fontStyle};
      font-family: 'Basis Grotesque Pro', sans-serif;
      color: ${({ theme }) => theme.grey.shade10};
    }
  }

  .__react_component_tooltip {
    border-radius: 6px;
  }
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
  margin-bottom: 4px;
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
  cursor: pointer;
`;

export const FooterTooltipContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`;

export const FooterIcon = styled(Help)`
  margin-right: 11px;
  margin-bottom: 2px;
`;

export const FooterLink = styled(Typography)`
  border-bottom: 1px solid ${({ theme }) => theme.grey.shade6};
`;
