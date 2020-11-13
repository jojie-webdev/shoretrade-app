import React, { useState, Fragment, useReducer, useRef } from 'react';

import Alert from 'components/base/Alert';
import Button from 'components/base/Button';
import Checkbox from 'components/base/Checkbox';
import Select from 'components/base/Select';
import BaseTextField from 'components/base/TextField';
import Touchable from 'components/base/Touchable';
import Typography from 'components/base/Typography';
import AuthContainer from 'components/layout/AuthContainer';
import AddImage from 'components/module/AddImage';
import DialogModal from 'components/module/DialogModal';
import LocationSearch from 'components/module/LocationSearch';
import MarketSectorItem from 'components/module/MarketSectorItem';
import StepDetails from 'components/module/StepDetails';
import { Formik, FormikProps } from 'formik';
import { createUpdateReducer } from 'utils/Hooks';
import { useTheme } from 'utils/Theme';

import {
  BUYER_STEPS,
  SELLER_STEPS,
  USER_DETAIL_FIELDS,
  BUSINESS_DETAIL_FIELDS,
  BANK_DETAIL_FIELDS,
  SELLER_LOCATION_NOTES,
  BUYER_LOCATION_NOTES,
  PAYMENT_METHOD_OPTIONS,
  BUYER_MARKET_STEP,
  CREDIT_LINE_NOTES,
  CREDIT_LINE_TERMS,
  CREDIT_LINE_TERMS_LABEL,
  MARKET_SECTORS,
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
  PaymentMethodDetails,
  PaymentMethodOverline,
  Spacer,
} from './Register.style';
import {
  validateUserDetails,
  validateBusinessDetails,
  validateBankDetails,
  validateBusinessAddress,
  validateAgreement,
  validateAnnualRevenue,
  validateMarketSector,
} from './Register.validation';

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
  isApplicationForLineCredit,
  error: registerError,
}: StepFormProps) => {
  const theme = useTheme();
  const isSeller = theme.appType === 'seller';
  const buyerSteps = isApplicationForLineCredit
    ? [...BUYER_STEPS, BUYER_MARKET_STEP]
    : BUYER_STEPS;
  const steps = isSeller ? SELLER_STEPS : buyerSteps;
  const MAX_STEP = isApplicationForLineCredit ? 4 : 3;
  const [otherErrors, setOtherErrors] = useReducer(
    createUpdateReducer<Record<string, string>>(),
    {}
  );

  const formRef = useRef<FormikProps<Record<string, string>> | null>(null);

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  return (
    <>
      <Formik
        key={step}
        innerRef={formRef}
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
            const error = {
              ...validateAgreement({
                agreement: registrationDetails.tncAgreement,
              }),
              ...(isApplicationForLineCredit
                ? validateAnnualRevenue({
                    estimatedAnnualRevenue:
                      registrationDetails.estimatedAnnualRevenue,
                  })
                : {}),
            };
            if (error.agreement || error.estimatedAnnualRevenue) {
              setOtherErrors(error);
            } else {
              setOtherErrors({ agreement: '', estimatedAnnualRevenue: '' });
              formikProps.onSubmit(values);
            }
          } else if (step === 4) {
            const error = validateMarketSector({
              selectedMarketSector: registrationDetails.selectedMarketSector,
            });

            if (error.selectedMarketSector) {
              setOtherErrors(error);
            } else {
              setOtherErrors({ selectedMarketSector: '' });
              formikProps.onSubmit(values);
            }
          }
        }}
      >
        <FormikContainer>
          <Container>
            <Content>
              <StepCount variant="overline">{`STEP ${step} / ${MAX_STEP}`}</StepCount>
              <Title variant="title5">{steps[step - 1].title}</Title>
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
                  <LocationField>
                    <LocationSearch
                      onSelect={(address) =>
                        updateRegistrationDetails({
                          address,
                        })
                      }
                      textFieldProps={{
                        value: registrationDetails.address?.address || '',
                        label: 'Address you will be shipping from',
                        error: otherErrors.address,
                      }}
                    />
                  </LocationField>
                  <ShippingInfo
                    label={
                      isSeller ? SELLER_LOCATION_NOTES : BUYER_LOCATION_NOTES
                    }
                  />
                  {isSeller && (
                    <>
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
                </>
              )}
              {step === 3 && (
                <>
                  {!isSeller && (
                    <div className="select-container">
                      <Select
                        value={registrationDetails.selectedPaymentMethod}
                        onChange={(option) => {
                          updateRegistrationDetails({
                            selectedPaymentMethod: option.value,
                          });
                        }}
                        options={PAYMENT_METHOD_OPTIONS}
                        label="SELECT FROM THE OPTIONS BELOW"
                      />
                    </div>
                  )}

                  {isApplicationForLineCredit && (
                    <div className="credit-line-info">
                      <PaymentMethodDetails variant="label">
                        {CREDIT_LINE_NOTES}
                      </PaymentMethodDetails>
                      <PaymentMethodOverline variant="overline">
                        {CREDIT_LINE_TERMS_LABEL}
                      </PaymentMethodOverline>

                      {CREDIT_LINE_TERMS.map((term) => (
                        <PaymentMethodDetails key={term} variant="label">
                          {term}
                        </PaymentMethodDetails>
                      ))}

                      <BaseTextField
                        value={registrationDetails.estimatedAnnualRevenue}
                        onChangeText={(v) =>
                          updateRegistrationDetails({
                            estimatedAnnualRevenue: v,
                          })
                        }
                        label="Estimated annual revenue"
                        LeftComponent={
                          <Typography color="shade6">$</Typography>
                        }
                        type="number"
                        error={otherErrors.estimatedAnnualRevenue || ''}
                      />
                    </div>
                  )}
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
                  {step === MAX_STEP && registerError.length > 0 && (
                    <Alert
                      content={registerError}
                      variant="error"
                      style={{
                        marginTop: 16,
                        width: '100%',
                      }}
                    />
                  )}
                </>
              )}
              {step === 4 && (
                <>
                  <div className="market-sector-description">
                    <PaymentMethodDetails variant="label">
                      {BUYER_MARKET_STEP.description}
                    </PaymentMethodDetails>
                  </div>
                  <div className="market-sector-list">
                    {MARKET_SECTORS.map((variant) => (
                      <div key={variant} className="market-sector-item">
                        <MarketSectorItem
                          variant={variant}
                          selected={
                            registrationDetails.selectedMarketSector === variant
                          }
                          onPress={() => {
                            updateRegistrationDetails({
                              selectedMarketSector: variant,
                            });
                          }}
                        />
                      </div>
                    ))}
                    {(otherErrors.selectedMarketSector || '').length > 0 && (
                      <Error variant="caption" color="error">
                        {otherErrors.selectedMarketSector}
                      </Error>
                    )}
                    {registerError.length > 0 && (
                      <Alert
                        content={registerError}
                        variant="error"
                        style={{
                          marginTop: 16,
                          width: '100%',
                        }}
                      />
                    )}
                  </div>
                </>
              )}
              <Spacer />
            </Content>
          </Container>
        </FormikContainer>
      </Formik>
      <Footer>
        <Button
          loading={isPending && step === MAX_STEP}
          style={{ width: '100%' }}
          text={step === MAX_STEP ? 'REGISTER' : 'NEXT'}
          onClick={() => handleSubmit()}
        />
      </Footer>
    </>
  );
};

const RegisterView = (props: RegisterGeneratedProps) => {
  const theme = useTheme();
  const isSeller = theme.appType === 'seller';
  const steps = isSeller ? SELLER_STEPS : BUYER_STEPS;
  const {
    backToLogin,
    registrationDetails,
    updateRegistrationDetails,
    register,
    isPending,
    isSuccess,
    isApplicationForLineCredit,
  } = props;
  const [isTriggered, setIsTriggered] = useState(false);
  const showSuccessModal =
    theme.appType === 'seller' && isTriggered && isSuccess;

  const [step, setStep] = useState(0);
  const MAX_STEP = isApplicationForLineCredit ? 4 : 3;

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

  const paymentMethodFormikProps = {
    initialValues: {},
    onSubmit: (values: Record<string, string>) => {
      updateRegistrationDetails(values);

      if (isApplicationForLineCredit) {
        nextStep();
      } else {
        // combine previous values to existing registration details
        // to make sure that we get the updated state
        register({
          ...registrationDetails,
          ...values,
        });
        setIsTriggered(true);
      }
    },
  };

  const marketSectorFormikProps = {
    initialValues: {},
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
          formikProps={
            isSeller ? bankDetailsFormikProps : paymentMethodFormikProps
          }
          step={step}
          fields={isSeller ? BANK_DETAIL_FIELDS : []}
        />
      );
    } else if (step === 4) {
      return (
        <StepForm
          {...props}
          formikProps={marketSectorFormikProps}
          step={step}
          fields={[]}
        />
      );
    } else {
      return (
        <>
          <ColumnWrapper>
            <Container>
              <Content>
                <GetStartedTitle variant="title5">
                  Signing up is <b>free</b> and complete with <b>3 simple</b>{' '}
                  steps
                </GetStartedTitle>
                {steps.map((step, index) => (
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
          </ColumnWrapper>
          <Footer>
            <Button
              style={{ width: '100%' }}
              text="GET STARTED"
              onClick={() => nextStep()}
            />
          </Footer>
        </>
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
      containerBackground={isSeller ? theme.grey.shade8 : theme.grey.shade1}
      minHeight={'660px'}
    >
      {renderCurrentStep()}
      {isSeller && (
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
      )}
    </AuthContainer>
  );
};

export default RegisterView;
