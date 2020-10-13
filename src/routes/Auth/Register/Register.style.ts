import AlertInfo from 'components/base/AlertInfo';
import { Download } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import FormikTextField from 'components/module/FormikTextField';
import LocationSearch from 'components/module/LocationSearch';
import PhoneTextField from 'components/module/PhoneTextField';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Form } from 'formik';
import styled from 'utils/styled';

export const Container = styled.div`
  padding: 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 100%;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
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
