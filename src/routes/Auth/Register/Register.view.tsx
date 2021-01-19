import React, {
  useState,
  Fragment,
  useReducer,
  useRef,
  useEffect,
} from 'react';

import Alert from 'components/base/Alert';
import AlertInfoView from 'components/base/AlertInfo';
import Badge from 'components/base/Badge';
import Button from 'components/base/Button';
import Checkbox from 'components/base/Checkbox';
import Interactions from 'components/base/Interactions';
import InteractionsV2 from 'components/base/InteractionsV2';
import Select from 'components/base/Select';
import { Search } from 'components/base/SVG';
import BaseTextField from 'components/base/TextField';
import Touchable from 'components/base/Touchable';
import Typography from 'components/base/Typography';
import AuthContainer from 'components/layout/AuthContainer';
import AddFile from 'components/module/AddFile';
import AddImage from 'components/module/AddImage';
import CategoryImageView from 'components/module/CategoryImage';
import DialogModal from 'components/module/DialogModal';
import LocationSearch from 'components/module/LocationSearch';
import MarketSectorItem from 'components/module/MarketSectorItem';
import SearchAddressView from 'components/module/SearchAddress';
import StepDetails from 'components/module/StepDetails';
import { Formik, FormikProps } from 'formik';
import {
  Category,
  CategoryType,
  CategoryPayload,
} from 'types/store/GetCategories';
import { createUpdateReducer } from 'utils/Hooks';
import { useTheme } from 'utils/Theme';

import { Image, DetailsContainer, ResultContainer } from './Categories.style';
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
  LICENSES_FIELDS,
  SELLER_VARIATIONS,
  BUYER_VARIATION,
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
  BackIcon,
  TitleContainer,
  GetStartedButton,
  RenderContainer,
  NextButton,
  UploadLabel,
  MarketSectorContainer,
  MarketSectorItemContainer,
  CategorySearchInputContainer,
  CategoryContainer,
  InteractionsContainer,
  BadgeContainer,
  BadgeItemContainer,
  ButtonContainer,
  SellerSummaryContainer,
  SelectMarketSelector,
  TopContainer,
} from './Register.style';
import { addressToPlaceData } from './Register.transform';
import {
  validateUserDetails,
  validateBusinessDetails,
  validateBankDetails,
  validateBusinessAddress,
  validateAgreement,
  validateAnnualRevenue,
  validateMarketSector,
  validateCategoryMarketSector,
  validateLicense,
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
  categories: Category[];
  getCategoryItem: (id: string) => void;
  showDetails: () => void;
  hideDetails: () => void;
  selectedCategoryTypes: CategoryPayload[];
  addSelected: (category: CategoryPayload) => void;
  summaryHandleStep: (step: number) => void;
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
  categories,
  getCategoryItem,
  categoryItems,
  isGotoDetails,
  showDetails,
  hideDetails,
  selectedCategoryTypes,
  addSelected,
  summaryHandleStep,
  onChangeSearch,
  searchCategory,
  searchCategoryType,
  searchTerm,
  isSuccess,
  backToLogin,
  setSummaryEdit,
}: StepFormProps) => {
  const theme = useTheme();
  const isSeller = theme.appType === 'seller';
  const buyerSteps = isApplicationForLineCredit
    ? [...BUYER_STEPS, BUYER_MARKET_STEP]
    : BUYER_STEPS;
  const steps = isSeller ? SELLER_STEPS : buyerSteps;
  const MAX_STEP: number = !isSeller ? 6 : 7;
  const [otherErrors, setOtherErrors] = useReducer(
    createUpdateReducer<Record<string, string>>(),
    {}
  );
  const CategoryChildren = (result: Category) => (
    <>
      <CategoryImageView
        id={result.id}
        maxHeight={30}
        containerHeight={30}
        cBorderRadius={'4px 4px 0px 0px'}
      />
      <DetailsContainer>
        <ResultContainer>
          <Typography
            variant="label"
            color={isSeller ? 'noshade' : 'shade9'}
            className="per"
          >
            {result.name}
          </Typography>
        </ResultContainer>
      </DetailsContainer>
    </>
  );

  const CategoryItemsChildren = (result: CategoryType) => (
    <>
      <Image src={result.thumbnail} />
      <DetailsContainer>
        <ResultContainer>
          <Typography variant="caption" color="shade6" className="per">
            {result.name}
          </Typography>
        </ResultContainer>
      </DetailsContainer>
    </>
  );

  const formRef = useRef<FormikProps<Record<string, string>> | null>(null);

  const handleSubmit = () => {
    if (buttonTextHandler(step) === 'SKIP') {
      hideDetails();
    }
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };

  const buttonTextHandler = (step: number) => {
    if (isSeller && step === 4) {
      if (
        registrationDetails.licenseFile ||
        registrationDetails.licenseName.length > 0
      ) {
        return 'NEXT';
      }
      return 'SKIP';
    } else if (theme.appType === 'seller' && step === 6) {
      if (selectedCategoryTypes.length > 0) {
        return 'NEXT';
      }
      return 'SKIP';
    } else if (theme.appType === 'buyer' && step === 5) {
      if (selectedCategoryTypes.length > 0) {
        return 'NEXT';
      }
      return 'SKIP';
    } else if (step === MAX_STEP) {
      return 'REGISTER';
    } else {
      return 'NEXT';
    }
  };

  const categoryPicker = () => {
    return (
      <CategoryContainer>
        <CategorySearchInputContainer>
          <Search height={16} width={16} />
          <input
            type="search"
            placeholder="Search for a product"
            onChange={(e) => onChangeSearch(e.target.value)}
            value={searchTerm}
          />
        </CategorySearchInputContainer>

        {!isGotoDetails && (
          <>
            <BadgeContainer>
              {selectedCategoryTypes &&
                selectedCategoryTypes.map((selection: CategoryPayload) => {
                  return (
                    <BadgeItemContainer key={selection.id}>
                      <Badge badgeColor={theme.grey.shade3}>
                        <Typography variant="overline" color="shade9">
                          {selection.name}
                        </Typography>
                      </Badge>
                    </BadgeItemContainer>
                  );
                })}
            </BadgeContainer>
            {searchCategory.map((result) => {
              return (
                <InteractionsContainer
                  onClick={() => {
                    getCategoryItem(result.id);
                    showDetails();
                  }}
                  key={result.id}
                >
                  <Interactions
                    // eslint-disable-next-line react/no-children-prop
                    children={CategoryChildren(result)}
                    isHover
                  />
                </InteractionsContainer>
              );
            })}
          </>
        )}
        {isGotoDetails && categoryItems && (
          <>
            {searchCategoryType.map((result) => {
              return (
                <InteractionsContainer key={result.id}>
                  <Interactions
                    type="checkbox"
                    pressed={selectedCategoryTypes.some(
                      (i: CategoryPayload) => i.id === result.id
                    )}
                    onClick={() => {
                      const value: CategoryPayload = {
                        id: result.id,
                        name: result.name,
                      };
                      addSelected(value);
                    }}
                    // eslint-disable-next-line react/no-children-prop
                    children={CategoryItemsChildren(result)}
                    isHover
                  />
                </InteractionsContainer>
              );
            })}
          </>
        )}
      </CategoryContainer>
    );
  };

  const summaryUI = () => {
    return (
      <>
        <SellerSummaryContainer>
          <InteractionsV2
            label="First Name"
            value={registrationDetails.firstName}
            type={'edit'}
            onClick={() => {
              summaryHandleStep(1);
              setSummaryEdit();
            }}
          />
          <InteractionsV2
            label="Last Name"
            value={registrationDetails.lastName}
            type={'edit'}
            onClick={() => {
              summaryHandleStep(1);
              setSummaryEdit();
            }}
          />
          <InteractionsV2
            label="Email"
            value={registrationDetails.email}
            type={'edit'}
            onClick={() => {
              summaryHandleStep(1);
              setSummaryEdit();
            }}
          />
          <InteractionsV2
            label="Mobile"
            value={`+${registrationDetails.callingCode}${registrationDetails.mobile}`}
            type={'edit'}
            onClick={() => {
              summaryHandleStep(1);
              setSummaryEdit();
            }}
          />
          <InteractionsV2
            label="Business Name"
            value={registrationDetails.businessName}
            type={'edit'}
            onClick={() => {
              summaryHandleStep(2);
              setSummaryEdit();
            }}
          />

          {isSeller && (
            <InteractionsV2
              label="Business Number"
              value={registrationDetails.abn}
              type={'edit'}
              onClick={() => {
                summaryHandleStep(2);
                setSummaryEdit();
              }}
            />
          )}

          <InteractionsV2
            label="Address"
            type={'edit'}
            value={
              registrationDetails.address !== null
                ? addressToPlaceData(registrationDetails.address).address
                : ''
            }
            onClick={() => {
              summaryHandleStep(2);
              setSummaryEdit();
            }}
          />

          {isSeller && (
            <>
              <InteractionsV2
                label="Bank Account Name"
                value={registrationDetails.accountName}
                type={'edit'}
                onClick={() => {
                  summaryHandleStep(3);
                  setSummaryEdit();
                }}
              />
              <InteractionsV2
                label="BSB"
                value={registrationDetails.bsb}
                type={'edit'}
                onClick={() => {
                  summaryHandleStep(3);
                  setSummaryEdit();
                }}
              />
              <InteractionsV2
                label="Account Number"
                value={registrationDetails.accountNumber}
                type={'edit'}
                onClick={() => {
                  summaryHandleStep(3);
                  setSummaryEdit();
                }}
              />
              <InteractionsV2
                label="Fishing License"
                value={registrationDetails.licenseName}
                type={'edit'}
                onClick={() => {
                  summaryHandleStep(4);
                  setSummaryEdit();
                }}
              />
              <InteractionsV2
                label="Market Sector"
                value={
                  SELLER_VARIATIONS.filter(
                    (i) => i.key === registrationDetails.categoryMarketSector
                  )[0].label
                }
                type={'edit'}
                onClick={() => {
                  summaryHandleStep(5);
                  setSummaryEdit();
                }}
              />
            </>
          )}

          {!isSeller && (
            <InteractionsV2
              label="Payment Method"
              type={'edit'}
              value={
                PAYMENT_METHOD_OPTIONS[
                  parseInt(registrationDetails.selectedPaymentMethod)
                ].label
              }
              onClick={() => {
                summaryHandleStep(3);
                setSummaryEdit();
              }}
            />
          )}

          <InteractionsV2
            label={isSeller ? 'Selling Products' : 'Buying Products'}
            arrayValue={selectedCategoryTypes}
            type={'edit'}
            onClick={() => {
              summaryHandleStep(isSeller ? 6 : 5);
              setSummaryEdit();
            }}
          />

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
        </SellerSummaryContainer>
      </>
    );
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
            if (!isSeller) {
              if (isApplicationForLineCredit) {
                const error = {
                  ...validateMarketSector({
                    selectedMarketSector:
                      registrationDetails.selectedMarketSector,
                  }),
                  ...(isApplicationForLineCredit
                    ? validateAnnualRevenue({
                        estimatedAnnualRevenue:
                          registrationDetails.estimatedAnnualRevenue,
                      })
                    : {}),
                };
                if (
                  error.selectedMarketSector ||
                  error.estimatedAnnualRevenue
                ) {
                  setOtherErrors(error);
                } else {
                  setOtherErrors({ estimatedAnnualRevenue: '' });
                  formikProps.onSubmit(values);
                }
              } else {
                formikProps.onSubmit(values);
              }
            } else {
              formikProps.onSubmit(values);
            }
          } else if (step === 4) {
            if (!isSeller) {
              const error = validateCategoryMarketSector({
                categoryMarketSector: registrationDetails.categoryMarketSector,
              });

              if (error.categoryMarketSector) {
                setOtherErrors(error);
              } else {
                setOtherErrors({ categoryMarketSector: '' });
                formikProps.onSubmit(values);
              }
            } else {
              if (
                registrationDetails.licenseFile ||
                registrationDetails.licenseName.length > 0
              ) {
                const error = validateLicense({
                  licenseName: registrationDetails.licenseName,
                  licenseFile: registrationDetails.licenseFile,
                });

                if (error.licenseName || error.licenseFile) {
                  setOtherErrors(error);
                } else {
                  setOtherErrors({ licenseName: '', licenseFile: '' });
                  formikProps.onSubmit(values);
                }
              } else {
                formikProps.onSubmit(values);
              }
            }
          } else if (step === 5) {
            if (isSeller) {
              const error = validateCategoryMarketSector({
                categoryMarketSector: registrationDetails.categoryMarketSector,
              });

              if (error.categoryMarketSector) {
                setOtherErrors(error);
              } else {
                setOtherErrors({ categoryMarketSector: '' });
                formikProps.onSubmit(values);
              }
            } else {
              formikProps.onSubmit(values);
            }
          } else if (step === 6) {
            if (!isSeller) {
              const error = {
                ...validateAgreement({
                  agreement: registrationDetails.tncAgreement,
                }),
              };
              if (error.agreement) {
                setOtherErrors(error);
              } else {
                setOtherErrors({ agreement: '' });
                formikProps.onSubmit(values);
              }
            } else {
              formikProps.onSubmit(values);
            }
          } else if (step === 7) {
            const error = {
              ...validateAgreement({
                agreement: registrationDetails.tncAgreement,
              }),
            };
            if (error.agreement) {
              setOtherErrors(error);
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
                <>
                  <MobileField
                    name="mobile"
                    label="MOBILE"
                    callingCode={registrationDetails.callingCode}
                    setCallingCode={(value) =>
                      updateRegistrationDetails({ callingCode: value })
                    }
                  />
                  <div style={{ marginTop: '8px' }}>
                    <AlertInfoView
                      label={
                        'You can add more people to your seller account once you’re approved'
                      }
                    />
                  </div>
                </>
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
                        label: `Address you will be ${
                          isSeller ? 'shipping from' : 'buying from'
                        }`,
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
                        style={{ marginBottom: 8, marginTop: 8 }}
                      />

                      <SelectMarketSelector
                        value={registrationDetails.selectedMarketSector}
                        onChange={(option) => {
                          updateRegistrationDetails({
                            selectedMarketSector: option.value,
                          });
                        }}
                        options={BUYER_VARIATION.map((i) => {
                          return { label: i.label, value: i.key };
                        })}
                        label="Market Sector"
                        error={otherErrors.selectedMarketSector}
                      />
                    </div>
                  )}
                </>
              )}
              {step === 4 && (
                <>
                  {isSeller && (
                    <>
                      <UploadLabel variant="overline" color={'shade6'}>
                        License File
                      </UploadLabel>
                      <AddFile //Todo: alter to proper data
                        file={registrationDetails.licenseFile}
                        onSelectFile={(file) =>
                          updateRegistrationDetails({ licenseFile: file })
                        }
                        onRemoveFile={() => {
                          updateRegistrationDetails({ licenseFile: null });
                        }}
                      />
                      {(otherErrors.licenseFile || '').length > 0 && (
                        <Error variant="caption" color="error">
                          {otherErrors.licenseFile}
                        </Error>
                      )}
                      <BaseTextField
                        value={registrationDetails.licenseName}
                        onChangeText={(v) =>
                          updateRegistrationDetails({
                            licenseName: v,
                          })
                        }
                        label="License Name"
                        type="text"
                        error={otherErrors.licenseName || ''}
                        style={{ marginBottom: 8, marginTop: 16 }}
                      />
                    </>
                  )}
                  {!isSeller && (
                    <MarketSectorContainer>
                      {BUYER_VARIATION.map((variant) => (
                        <MarketSectorItemContainer key={variant.key}>
                          <MarketSectorItem
                            variant={variant.key}
                            selected={
                              registrationDetails.categoryMarketSector ===
                              variant.key
                            }
                            onPress={() => {
                              updateRegistrationDetails({
                                categoryMarketSector: variant.key,
                              });
                            }}
                          />
                        </MarketSectorItemContainer>
                      ))}
                      {(otherErrors.categoryMarketSector || '').length > 0 && (
                        <Error variant="caption" color="error">
                          {otherErrors.categoryMarketSector}
                        </Error>
                      )}
                    </MarketSectorContainer>
                  )}
                </>
              )}
              {step === 5 && (
                <>
                  {isSeller && (
                    <MarketSectorContainer>
                      {SELLER_VARIATIONS.map((variant) => (
                        <MarketSectorItemContainer key={variant.key}>
                          <MarketSectorItem
                            variant={variant.key}
                            selected={
                              registrationDetails.categoryMarketSector ===
                              variant.key
                            }
                            onPress={() => {
                              updateRegistrationDetails({
                                categoryMarketSector: variant.key,
                              });
                            }}
                          />
                        </MarketSectorItemContainer>
                      ))}
                      {(otherErrors.categoryMarketSector || '').length > 0 && (
                        <Error variant="caption" color="error">
                          {otherErrors.categoryMarketSector}
                        </Error>
                      )}
                    </MarketSectorContainer>
                  )}

                  {!isSeller && categoryPicker()}
                </>
              )}
              {step === 6 && (
                <>
                  {isSeller && categoryPicker()}
                  {!isSeller && summaryUI()}
                </>
              )}
              {step === 7 && (
                <>
                  {isSeller && !isSuccess ? (
                    summaryUI()
                  ) : isSeller && isSuccess ? (
                    <>
                      <Typography
                        variant="title5"
                        color="noshade"
                        weight="400"
                        style={{ marginBottom: 32 }}
                      >
                        Thanks for signing up!
                      </Typography>
                      <Typography
                        variant="overline"
                        color="alert"
                        weight="Medium"
                        style={{ marginBottom: 8 }}
                      >
                        Your account is pending approval.
                      </Typography>
                      <Typography
                        variant="body"
                        color="noshade"
                        weight="Medium"
                      >
                        We need to check a few things before you can start
                        selling.
                      </Typography>

                      <Typography
                        variant="body"
                        color="noshade"
                        weight="Medium"
                      >
                        We’ll send you and email and notification when your
                        account is approved. This normally takes less than 24
                        hours.
                      </Typography>
                    </>
                  ) : null}
                </>
              )}
              <Spacer />
            </Content>
          </Container>
          <ButtonContainer>
            {!isSuccess ? (
              <>
                <NextButton
                  loading={isPending && step === MAX_STEP}
                  type={step === MAX_STEP ? 'submit' : 'button'}
                  text={buttonTextHandler(step)}
                  onClick={() => handleSubmit()}
                  variant={
                    buttonTextHandler(step) === 'SKIP' ? 'outline' : 'primary'
                  }
                />
              </>
            ) : null}
            {isGotoDetails && (
              <NextButton text={'ADD MORE'} onClick={() => hideDetails()} />
            )}

            {isSuccess && (
              <NextButton
                text={'OK'}
                type="button"
                onClick={() => backToLogin()}
              />
            )}
          </ButtonContainer>
        </FormikContainer>
      </Formik>
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
    setSummaryEdit,
    isSummaryEdit,
  } = props;

  const [step, setStep] = useState(0);
  const MAX_STEP = !isSeller ? 6 : 7;

  const summaryHandleStep = (step: number) => {
    setStep(step);
  };

  // useEffect(() => {
  //   setStep(4);
  // }, []);

  const nextStep = () => {
    if (isSummaryEdit) {
      setStep(isSeller ? 7 : 6);
    } else {
      setStep((s) => (s < MAX_STEP ? ++s : MAX_STEP));
    }

    props.hideDetails();
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
      nextStep();
    },
  };

  const licensesFormikProps = {
    initialValues: {},
    onSubmit: (values: Record<string, string>) => {
      updateRegistrationDetails(values);
      nextStep();
    },
  };

  const paymentMethodFormikProps = {
    initialValues: {},
    onSubmit: (values: Record<string, string>) => {
      updateRegistrationDetails(values);

      if (isApplicationForLineCredit) {
        nextStep();
      } else {
        nextStep();
      }
    },
  };

  const summaryFormikProps = {
    initialValues: {},
    onSubmit: (values: Record<string, string>) => {
      updateRegistrationDetails(values);
      register({
        ...registrationDetails,
        ...values,
      });
    },
  };

  const renderCurrentStep = () => {
    if (step === 1) {
      return (
        <>
          <StepForm
            {...props}
            formikProps={userDetailsFormikProps}
            step={step}
            fields={USER_DETAIL_FIELDS}
            summaryHandleStep={summaryHandleStep}
          />
        </>
      );
    } else if (step === 2) {
      return (
        <StepForm
          {...props}
          formikProps={businessDetailsFormikProps}
          step={step}
          fields={BUSINESS_DETAIL_FIELDS}
          summaryHandleStep={summaryHandleStep}
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
          summaryHandleStep={summaryHandleStep}
        />
      );
    } else if (step === 4) {
      return (
        <StepForm
          {...props}
          formikProps={licensesFormikProps}
          step={step}
          fields={[]}
          summaryHandleStep={summaryHandleStep}
        />
      );
    } else if (step === 5) {
      return (
        <>
          <StepForm
            {...props}
            formikProps={userDetailsFormikProps}
            step={step}
            fields={[]}
            summaryHandleStep={summaryHandleStep}
          />
        </>
      );
    } else if (step === 6) {
      return (
        <>
          <StepForm
            {...props}
            getCategoryItem={props.getCategoryItem}
            formikProps={isSeller ? userDetailsFormikProps : summaryFormikProps}
            step={step}
            fields={[]}
            summaryHandleStep={summaryHandleStep}
          />
        </>
      );
    } else if (step === 7) {
      return (
        <StepForm
          {...props}
          formikProps={summaryFormikProps}
          step={7}
          fields={[]}
          summaryHandleStep={summaryHandleStep}
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
                {steps
                  .filter((i) => i.title !== 'Summary')
                  .map((step, index) => (
                    <StepDetails
                      key={step.title}
                      step={index + 1}
                      title={step.title}
                      description={step.description}
                      style={{ marginTop: index === 0 ? 24 : 32 }}
                    />
                  ))}
                <GetStartedButton
                  text="GET STARTED"
                  onClick={() => nextStep()}
                />
              </Content>
            </Container>
          </ColumnWrapper>
        </>
      );
    }
  };
  return (
    <AuthContainer
      isRegister
      noLogo
      currentStep={step + 1}
      totalSteps={MAX_STEP + 1}
      containerBackground={isSeller ? theme.grey.shade8 : theme.grey.shade1}
      minHeight={'660px'}
    >
      <RenderContainer step={step}>
        {!props.isGotoDetails && step > 0 && !isSuccess && (
          <TopContainer>
            <StepCount variant="overline">{`STEP ${step} / ${MAX_STEP}`}</StepCount>
            <TitleContainer>
              <Touchable
                dark
                onPress={() => (step <= 1 ? backToLogin() : previousStep())}
              >
                <BackIcon width={16} height={16} fill={theme.brand.primary} />
              </Touchable>
              <Title
                variant="title5"
                weight="500"
                color={isSeller ? 'noshade' : 'shade8'}
              >
                {steps[step - 1].title}
              </Title>
            </TitleContainer>
          </TopContainer  >
        )}

        {props.isGotoDetails && (
          <>
            <TitleContainer>
              <Button
                text="Back"
                size="sm"
                iconPosition="before"
                textVariant="overline"
                textWeight="900"
                textColor={theme.appType === 'buyer' ? 'shade9' : 'noshade'}
                icon={
                  <BackIcon fill={theme.brand.primary} height={16} width={16} />
                }
                onClick={() => props.hideDetails()}
                style={{
                  background:
                    theme.appType === 'seller'
                      ? theme.grey.shade9
                      : theme.grey.shade3,
                }}
              />
            </TitleContainer>
          </>
        )}

        {renderCurrentStep()}
      </RenderContainer>
    </AuthContainer>
  );
};

export default RegisterView;
