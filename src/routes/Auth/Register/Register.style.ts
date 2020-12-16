import AlertInfo from 'components/base/AlertInfo';
import Button from 'components/base/Button';
import Select from 'components/base/Select';
import { Download, ArrowLeft } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import FormikTextField from 'components/module/FormikTextField';
import LocationSearch from 'components/module/LocationSearch';
import PhoneTextField from 'components/module/PhoneTextField';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Form } from 'formik';
import styled from 'utils/styled';
import theme from 'utils/Theme';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 100%;
`;
export const BackIcon = styled(ArrowLeft)``;
export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 32px;
  margin-top: 8px;
`;

export const RenderContainer = styled.div<{ step?: number }>`
margin-top:60px;
  /* margin-top: ${({ step }) =>
    (theme.appType === 'seller' && step === 7) || step === 6
      ? '60px'
      : (theme.appType === 'buyer' && step === 6) || step === 5
      ? '60px'
      : '80px'}; */
  height: 100vh;
  max-height: 100vh;
  overflow: auto;

  @media ${BREAKPOINTS['sm']} {
    margin-top: 40px;
    margin-bottom: 20px;
    overflow: auto;
  }
`;

export const NextButton = styled(Button)`
  margin-right: 8px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const GetStartedButton = styled(Button)`
  width: 148px;
  margin-top: 32px;
`;

export const Spacer = styled.div`
  min-height: 16px;
  max-height: 16px;
`;

export const ColumnWrapper = styled.div`
  display: 'flex';
  flex: 1;
  flex-direction: 'column';
  overflow-y: auto;
  overflow-x: hidden;
`;

export const FormikContainer = styled(Form)`
  display: 'flex';
  flex: 1;
  flex-direction: 'column';
  padding-bottom: 64px;
  overflow-x: hidden;
  overflow-y: auto;

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
`;

export const GetStartedTitle = styled(Typography)`
  color: ${({ theme }) =>
    theme.appType === 'seller' ? theme.grey.shade1 : theme.grey.shade7};
  font-weight: 400;
  b {
    color: ${({ theme }) =>
      theme.appType === 'seller' ? theme.grey.noshade : theme.grey.shade9};
  }
`;

export const StepCount = styled(Typography)`
  color: ${({ theme }) => theme.grey.shade6};
  font-weight: 900;
`;

export const Title = styled(Typography)`
  color: ${({ theme }) =>
    theme.appType === 'seller' ? theme.grey.shade1 : theme.grey.shade8};
  font-weight: 400;
  margin-top: 4px;
`;

export const TextField = styled(FormikTextField)`
  margin-top: 24px;
`;

export const Footer = styled.div`
  display: flex;
  min-height: 64px;
  max-height: 64px;
  justify-content: center;
  align-items: center;
  padding: 0px 32px;
  background-color: ${({ theme }) => theme.grey.shade9};
`;

export const InputContainer = styled.div`
  margin-top: 24px;
`;

export const DownloadTermsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const DownloadIcon = styled(Download)`
  margin-right: 11px;
`;

export const DownloadTermsText = styled(Typography)``;

export const ShippingInfo = styled(AlertInfo)`
  margin-top: 24px;
`;

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
  margin-left: 4px;
`;

export const MarketSectorItemContainer = styled.div`
  flex: 0 50%;
  height: 162px;
  width: 162px;
  margin: 0px 0px 24px 0px;
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
  margin-bottom: 8px;
  width: 100%;
  .interactions {
    padding: 8px;
    border-radius: 8px;
  }
`;

export const BadgeContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 16px;
`;

export const BadgeItemContainer = styled.div`
  margin-right: 8px;
  margin-top: 8px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const SellerSummaryContainer = styled.div`
  margin-top: 24px;
  padding: 8px;
`;

export const SelectMarketSelector = styled(Select)``;
