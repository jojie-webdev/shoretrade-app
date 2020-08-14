import React, { useState } from 'react';

import Alert from 'components/base/Alert';
import Button from 'components/base/Button';
import Checkbox from 'components/base/Checkbox';
import Touchable from 'components/base/Touchable';
import AuthContainer from 'components/layout/AuthContainer';
import StepDetails from 'components/module/StepDetails';
import { Formik } from 'formik';
import { useTheme } from 'utils/Theme';

import {
  SELLER_STEPS,
  USER_DETAIL_FIELDS,
  BUSINESS_DETAIL_FIELDS,
  BANK_DETAIL_FIELDS,
  SELLER_LOCATION_NOTES,
  BUYER_LOCATION_NOTES,
} from './Register.constants';
import { RegisterGeneratedProps } from './Register.props';
import {
  Container,
  Content,
  Footer,
  GetStartedTitle,
  StepCount,
  Title,
  TextField,
  FormikContainer,
  ColumnWrapper,
  InputContainer,
  DownloadTermsContainer,
  DownloadIcon,
  DownloadTermsText,
  ShippingInfo,
} from './Register.style';
import {
  validateUserDetails,
  validateBusinessDetails,
  validateBankDetails,
} from './Register.validation';

const MAX_STEP = 3;

interface StepFormProps extends RegisterGeneratedProps {
  formikProps: {
    initialValues: Record<string, string>;
    validate?: (attributes: Record<string, string>) => Record<string, string>;
    onSubmit: (values: Record<string, string>) => void;
  };
  step: number;
  fields: {
    label: string;
    key: string;
    secured?: boolean;
    alert?: string;
    type?: string;
  }[];
}
const StepForm = ({
  formikProps,
  step,
  fields,
  registrationDetails,
  updateRegistrationDetails,
}: StepFormProps) => {
  const theme = useTheme();
  const isSeller = theme.appType === 'seller';
  return (
    <Formik key={step} {...formikProps}>
      <FormikContainer>
        <Container>
          <Content>
            <StepCount variant="overline">{`STEP ${step} / ${MAX_STEP}`}</StepCount>
            <Title variant="title5">{SELLER_STEPS[step - 1].title}</Title>
            {fields.map(({ key, type, secured, label, alert }) => (
              <>
                <TextField
                  key={key}
                  name={key}
                  type={type}
                  label={label}
                  secured={secured}
                  alert={alert}
                />
              </>
            ))}
            {step === 2 && (
              <ShippingInfo
                label={isSeller ? SELLER_LOCATION_NOTES : BUYER_LOCATION_NOTES}
              />
            )}
            {step === 3 && (
              <>
                <InputContainer>
                  <Checkbox
                    checked={registrationDetails.tncAgreement}
                    onClick={() =>
                      updateRegistrationDetails({
                        tncAgreement: !registrationDetails.tncAgreement,
                      })
                    }
                    label="I agree to the terms and conditions"
                  />
                </InputContainer>
                <Touchable
                  dark
                  onPress={() => {
                    window.open(
                      `https://www.shoretrade.com/terms_${
                        isSeller ? 'seller' : 'buyer'
                      }.pdf`,
                      '_blank'
                    );
                  }}
                  justifyContent={'flex-start'}
                >
                  <DownloadTermsContainer>
                    <DownloadIcon />
                    <DownloadTermsText variant="label" color="shade6">
                      Download terms and conditions here
                    </DownloadTermsText>
                  </DownloadTermsContainer>
                </Touchable>
              </>
            )}
          </Content>
        </Container>
        <Footer>
          <Button style={{ width: '100%' }} text="NEXT" type="submit" />
        </Footer>
      </FormikContainer>
    </Formik>
  );
};

const RegisterView = (props: RegisterGeneratedProps) => {
  const { backToLogin } = props;
  const [step, setStep] = useState(0);

  const nextStep = () => {
    setStep((s) => (s < MAX_STEP ? ++s : MAX_STEP));
  };

  const previousStep = () => {
    setStep((s) => (s > 0 ? --s : 0));
  };

  const userDetailsFormikProps = {
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirm: '',
      mobile: '',
    },
    // validate: validateUserDetails,
    onSubmit: (values: Record<string, string>) => nextStep(),
  };

  const businessDetailsFormikProps = {
    initialValues: {
      businessName: '',
      abn: '',
    },
    // validate: validateBusinessDetails,
    onSubmit: (values: Record<string, string>) => nextStep(),
  };

  const bankDetailsFormikProps = {
    initialValues: {
      accountName: '',
      bsb: '',
      accountNumber: '',
    },
    validate: validateBankDetails,
    onSubmit: (values: Record<string, string>) => console.log(values),
  };

  const renderCurrentStep = () => {
    if (step === 1) {
      return (
        <StepForm
          {...props}
          formikProps={userDetailsFormikProps}
          step={step}
          fields={USER_DETAIL_FIELDS}
        />
      );
    } else if (step === 2) {
      return (
        <StepForm
          {...props}
          formikProps={businessDetailsFormikProps}
          step={step}
          fields={BUSINESS_DETAIL_FIELDS}
        />
      );
    } else if (step === 3) {
      return (
        <StepForm
          {...props}
          formikProps={bankDetailsFormikProps}
          step={step}
          fields={BANK_DETAIL_FIELDS}
        />
      );
    } else {
      return (
        <ColumnWrapper>
          <Container>
            <Content>
              <GetStartedTitle variant="title5">
                Signing up is <b>free</b> and complete with <b>3 simple</b>{' '}
                steps
              </GetStartedTitle>
              {SELLER_STEPS.map((step, index) => (
                <StepDetails
                  key={step.title}
                  step={index + 1}
                  title={step.title}
                  description={step.description}
                  style={{ marginTop: index === 0 ? 24 : 32 }}
                />
              ))}
            </Content>
          </Container>
          <Footer>
            <Button
              style={{ width: '100%' }}
              text="GET STARTED"
              onClick={() => nextStep()}
            />
          </Footer>
        </ColumnWrapper>
      );
    }
  };

  return (
    <AuthContainer
      title="Register"
      onCloseAction={() => backToLogin()}
      onBackAction={step > 0 ? () => previousStep() : undefined}
      currentStep={step + 1}
      totalSteps={MAX_STEP + 1}
    >
      {renderCurrentStep()}
    </AuthContainer>
  );
};

export default RegisterView;
