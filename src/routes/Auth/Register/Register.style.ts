import Badge from 'components/base/Badge';
import Button from 'components/base/Button';
import { ArrowLeft } from 'components/base/SVG';
import Touchable from 'components/base/Touchable';
import Typography from 'components/base/Typography';
import FormikTextField from 'components/module/FormikTextField';
import PhoneTextField from 'components/module/PhoneTextField';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Form } from 'formik';
import styled from 'utils/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 100%;

  @media ${BREAKPOINTS['sm']} {
    margin-bottom: 100px;
  }
`;

export const BackIcon = styled(ArrowLeft)``;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 32px;
  margin-top: 8px;

  .back-badge {
    margin-left: 35px;

    @media ${BREAKPOINTS['sm']} {
      margin-left: 0px;
    }
  }
`;

export const RenderContainer = styled.div<{ step?: number }>`
  margin-top: 60px;
  height: 100vh;
  max-height: 100vh;
  overflow: auto;
  padding-right: 2em;

  @media ${BREAKPOINTS['sm']} {
    margin-top: 0px;
    padding-top: 24px;
  }
`;

export const TopContainer = styled.div`
  /*
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  background: ${({ theme }) =>
    theme.appType === 'seller' ? theme.grey.shade8 : 'transparent'};
  
   */
`;

export const NextButton = styled(Button)`
  margin-right: 8px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const GetStartedWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  @media ${BREAKPOINTS['sm']} {
    margin-bottom: 100px;
  }
`;

export const GetStartedButton = styled(Button)`
  width: 148px;
  margin-top: 32px;
`;

export const GetStartedTitle = styled(Typography)`
  ${({ theme }) => {
    if (theme.isSFM) {
      return `
      color: ${
        theme.appType === 'seller' ? theme.grey.noshade : theme.brand.secondary
      };
      `;
    }
    return `
      color: ${
        theme.appType === 'seller' ? theme.grey.noshade : theme.grey.shade9
      };
    `;
  }}
  ${({ theme }) => {
    if (theme.isSFM && theme.appType === 'seller') {
      return `
        opacity: 75%;
      `;
    }
  }}
`;

export const Spacer = styled.div`
  min-height: 16px;
  max-height: 16px;
`;

export const FormikContainer = styled(Form)`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding-bottom: 64px;
  overflow-x: hidden;
  overflow-y: auto;
  padding-left: 35px;

  .select-container {
    margin-top: 24px;
  }

  .credit-line-info {
    margin-top: 24px;
  }

  .market-sector-description {
    margin-top: 8px;
  }

  .market-sector-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 16px;
  }

  .market-sector-item {
    margin-right: 8px;
    margin-bottom: 8px;
  }

  @media ${BREAKPOINTS['sm']} {
    padding-left: 0px;
  }
`;

export const StepCount = styled(Typography)`
  padding-left: 33px;

  @media ${BREAKPOINTS['sm']} {
    padding-left: 0px;
  }
`;

export const Title = styled(Typography)`
  ${({ theme }) => {
    if (theme.isSFM) {
      return `
    color: ${
      theme.appType === 'seller' ? theme.grey.noshade : theme.brand.secondary
    };
  `;
    }
    return `
color: ${theme.appType === 'seller' ? theme.grey.shade1 : theme.grey.shade8};
`;
  }}
  margin-top: 4px;
`;

export const StyledFormikTextField = styled(FormikTextField)`
  margin-top: 24px;
`;

export const InputContainer = styled.div`
  margin-top: 24px;
`;

export const DownloadTermsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const DownloadTermsText = styled(Typography)``;

export const LocationField = styled.div`
  margin-top: 24px;
`;

export const Error = styled(Typography)`
  margin-top: 4px;
`;

export const BusinessLogoLabel = styled(Typography)`
  margin-top: 24px;
  margin-bottom: 4px;
`;

export const MobileField = styled(PhoneTextField)`
  margin-top: 24px;
`;

export const PaymentMethodOverline = styled(Typography)`
  margin-top: 24px;
  color: ${({ theme }) => theme.grey.shade6};
  margin-bottom: 8px;
`;

export const PaymentMethodDetails = styled(Typography)`
  color: ${({ theme }) => theme.grey.shade8};
`;

export const UploadLabel = styled(Typography)`
  margin-top: 24px;
  margin-bottom: 4px;
`;

export const MarketSectorContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 32px;

  @media ${BREAKPOINTS['sm']} {
    justify-content: space-evenly;
  }
`;

export const MarketSectorItemContainer = styled.div`
  flex: 0 50%;
  margin-bottom: 24px;

  @media ${BREAKPOINTS['sm']} {
    flex: 0;
  }
`;

export const CategoryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 32px;
`;

export const CategorySearchInputContainer = styled.div`
  margin-bottom: 16px;
  background: #ffffff;
  border: ${(props) => `1px solid ${props.theme.grey.shade5}`};
  border-radius: 100px;
  width: 100%;
  height: 50px;
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .close-svg-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  input {
    flex: 1;
    border: 0;
    margin: 0 10px;
    height: 100%;

    :focus {
      outline: none;
      border: none;
    }

    ::placeholder {
      color: ${(props) => props.theme.grey.shade5};
    }
  }
`;

export const InteractionsContainer = styled.div`
  margin-top: 12px;
  width: 100%;
`;

export const BadgeContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const BadgeItemContainer = styled.div`
  margin-right: 8px;
  margin-top: 8px;
`;

export const SellerSummaryContainer = styled.div`
  margin-top: 24px;

  .interactions {
    margin-bottom: 8px;
  }
`;

export const LicensePreview = styled.div`
  margin-top: 24px;

  .license-details {
    margin-top: 6px;
  }

  button {
    padding: 4px 8px;
    background: ${(props) => props.theme.brand.error};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    border: none;

    :focus {
      outline: none;
    }
  }
`;

export const SignUpHeader = styled.div`
  margin-bottom: 32px;
`;

export const LogInLinkContainer = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
`;

export const LogInLinkPrefix = styled(Typography)`
  margin-right: 6px;
`;

export const LogInLinkAction = styled.div`
  cursor: pointer;
  border-bottom: ${({ theme }) => `1px solid ${theme.brand.primary}`};
`;

export const LogInLink = styled(Typography)`
  font-weight: bold;
`;

export const AppTypeTitle = styled(Typography)`
  ${({ theme }) => {
    if (theme.isSFM) {
      return `
      color: ${
        theme.appType === 'seller' ? theme.grey.noshade : theme.brand.secondary
      };
    `;
    }
    return `
    color: ${
      theme.appType === 'seller' ? theme.grey.noshade : theme.grey.shade9
    };
  `;
  }}
`;

// @ts-ignore
const footerStyle = ({ theme }) => `
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 24px;
  background-color: ${
    theme.appType === 'seller' ? theme.grey.shade9 : theme.grey.shade2
  };
  width: 100%;
  z-index: 999;
  position: fixed;
  bottom: 0;
  left: 0;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  @media ${BREAKPOINTS['sm']} {
    ${footerStyle};
    flex-wrap: nowrap;
  }
`;

export const MobileFooter = styled.div`
  ${footerStyle};
`;

export const StyledBadge = styled(Badge)`
  display: flex;
`;

export const StyledTouchable = styled(Touchable)`
  padding: 0;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  margin-top: 16px;

  button {
    width: fit-content;
  }

  button:nth-of-type(2) {
    margin-left: 8px;
  }
`;

export const DownloadApplicationFormButton = styled(Button)`
  margin: 10px 0;
  padding: 16px;
`;

export const SFMOption = styled.div`
  background: ${({ theme }) => theme.grey.noshade};
  margin-top: 8px;
  padding: 16px 24px;
  border-radius: 12px;
  display: flex;
`;
