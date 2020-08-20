import React, { useState, Fragment, useReducer } from 'react';

import Button from 'components/base/Button';
import Checkbox from 'components/base/Checkbox';
import Touchable from 'components/base/Touchable';
import Typography from 'components/base/Typography';
import AuthContainer from 'components/layout/AuthContainer';
import AddImage from 'components/module/AddImage';
import DialogModal from 'components/module/DialogModal';
import StepDetails from 'components/module/StepDetails';
import { Formik } from 'formik';
import { props } from 'ramda';
import { createUpdateReducer } from 'utils/Hooks';
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
  LocationField,
  Error,
  BusinessLogoLabel,
  MobileField,
} from './Register.style';
import {
  validateUserDetails,
  validateBusinessDetails,
  validateBankDetails,
  validateBusinessAddress,
  validateAgreement,
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
    prefix?: string;
  }[];
}
const StepForm = ({
  formikProps,
  step,
  fields,
  registrationDetails,
  updateRegistrationDetails,
  isPending,
}: StepFormProps) => {
  const theme = useTheme();
  const isSeller = theme.appType === 'seller';
  const [otherErrors, setOtherErrors] = useReducer(
    createUpdateReducer<Record<string, string>>(),
    {}
  );
  return (
    <Formik
      key={step}
      {...formikProps}
      onSubmit={(values) => {
        if (step === 1) {
          formikProps.onSubmit(values);
        } else if (step === 2) {
          const error = validateBusinessAddress({
            address: registrationDetails.address,
          });
          if (error.address) {
            setOtherErrors({ address: error.address });
          } else {
            setOtherErrors({ address: '' });
            formikProps.onSubmit(values);
          }
        } else if (step === 3) {
          const error = validateAgreement({
            agreement: registrationDetails.tncAgreement,
          });
          if (error.agreement) {
            setOtherErrors({ agreement: error.agreement });
          } else {
            setOtherErrors({ agreement: '' });
            formikProps.onSubmit(values);
          }
        }
      }}
    >
      <FormikContainer>
        <Container>
          <Content>
            <StepCount variant="overline">{`STEP ${step} / ${MAX_STEP}`}</StepCount>
            <Title variant="title5">{SELLER_STEPS[step - 1].title}</Title>
            {fields.map(({ key, type, secured, label, alert, prefix }) => (
              <Fragment key={key}>
                <TextField
                  name={key}
                  type={type}
                  label={label}
                  secured={secured}
                  alert={alert}
                  LeftComponent={
                    (prefix || '').length > 0 ? (
                      <Typography variant="label" color="shade6">
                        {prefix}
                      </Typography>
                    ) : undefined
                  }
                />
              </Fragment>
            ))}
            {step === 1 && (
              <MobileField
                name="mobile"
                label="MOBILE"
                callingCode={registrationDetails.callingCode}
                setCallingCode={(value) =>
                  updateRegistrationDetails({ callingCode: value })
                }
              />
            )}
            {step === 2 && (
              <>
                <LocationField
                  value={registrationDetails.address?.address || ''}
                  onSelect={(address) =>
                    updateRegistrationDetails({
                      address,
                    })
                  }
                  label="Address you will be shipping from"
                  error={otherErrors.address}
                />
                <ShippingInfo
                  label={
                    isSeller ? SELLER_LOCATION_NOTES : BUYER_LOCATION_NOTES
                  }
                />
                <BusinessLogoLabel variant="overline" color={'shade6'}>
                  Business Logo
                </BusinessLogoLabel>
                <AddImage
                  image={registrationDetails.businessLogo}
                  onSelectImage={(image) =>
                    updateRegistrationDetails({ businessLogo: image })
                  }
                  onRemoveImage={() => {
                    updateRegistrationDetails({ businessLogo: null });
                  }}
                />
              </>
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
                  {(otherErrors.agreement || '').length > 0 && (
                    <Error variant="caption" color="error">
                      {otherErrors.agreement}
                    </Error>
                  )}
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
          <Button
            loading={isPending && step === 3}
            style={{ width: '100%' }}
            text={step === 3 ? 'REGISTER' : 'NEXT'}
            type="submit"
          />
        </Footer>
      </FormikContainer>
    </Formik>
  );
};

const RegisterView = (props: RegisterGeneratedProps) => {
  const theme = useTheme();
  const {
    backToLogin,
    registrationDetails,
    updateRegistrationDetails,
    register,
    isPending,
    isSuccess,
  } = props;
  const [isTriggered, setIsTriggered] = useState(false);
  const showSuccessModal =
    theme.appType === 'seller' && isTriggered && isSuccess;

  const [step, setStep] = useState(0);

  const nextStep = () => {
    setStep((s) => (s < MAX_STEP ? ++s : MAX_STEP));
  };

  const previousStep = () => {
    setStep((s) => (s > 0 ? --s : 0));
  };

  const userDetailsFormikProps = {
    initialValues: {
      firstName: registrationDetails.firstName,
      lastName: registrationDetails.lastName,
      email: registrationDetails.email,
      password: registrationDetails.password,
      passwordConfirm: registrationDetails.passwordConfirm,
      mobile: registrationDetails.mobile,
    },
    validate: validateUserDetails,
    onSubmit: (values: Record<string, string>) => {
      updateRegistrationDetails(values);
      nextStep();
    },
  };

  const businessDetailsFormikProps = {
    initialValues: {
      businessName: registrationDetails.businessName,
      abn: registrationDetails.abn,
    },
    validate: validateBusinessDetails,
    onSubmit: (values: Record<string, string>) => {
      updateRegistrationDetails(values);
      nextStep();
    },
  };

  const bankDetailsFormikProps = {
    initialValues: {
      accountName: registrationDetails.accountName,
      bsb: registrationDetails.bsb,
      accountNumber: registrationDetails.accountNumber,
    },
    validate: validateBankDetails,
    onSubmit: (values: Record<string, string>) => {
      updateRegistrationDetails(values);
      // combine previous values to existing registration details
      // to make sure that we get the updated state
      register({
        ...registrationDetails,
        ...values,
      });

      setIsTriggered(true);
    },
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
      <DialogModal
        title="Thanks for signing up!"
        overline="Your account is pending approval."
        isOpen={showSuccessModal}
        onClickClose={() => backToLogin()}
      >
        <Typography variant="body" color="noshade" weight="Medium">
          We need to check a few things before you can start selling.
        </Typography>
        <br />
        <Typography variant="body" color="noshade" weight="Medium">
          We’ll send you and email and notification when your account is
          approved. This normally takes less than 24 hours.
        </Typography>
      </DialogModal>
    </AuthContainer>
  );
};

export default RegisterView;
