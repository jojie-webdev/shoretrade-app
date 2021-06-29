import React, {
  useState,
  Fragment,
  useReducer,
  useRef,
  useEffect,
  RefObject,
} from 'react';

import Alert from 'components/base/Alert';
import Badge from 'components/base/Badge';
import Button from 'components/base/Button';
import Checkbox from 'components/base/Checkbox';
import Interactions from 'components/base/Interactions';
import Select from 'components/base/Select';
import { CloseFilled, FileCheck, Search, Subtract } from 'components/base/SVG';
import BaseTextField from 'components/base/TextField';
import Touchable from 'components/base/Touchable';
import Typography from 'components/base/Typography';
import AuthContainer from 'components/layout/AuthContainer';
import MobileNav from 'components/layout/MobileNav';
import Add from 'components/module/Add/Add.view';
import AddImage from 'components/module/AddImage';
import CategoryImageView from 'components/module/CategoryImage';
import LocationSearch from 'components/module/LocationSearch';
import MarketSectorItem from 'components/module/MarketSectorItem';
import StepDetails from 'components/module/StepDetails';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Formik, FormikProps } from 'formik';
import { isEmpty } from 'ramda';
import { useMediaQuery } from 'react-responsive';
import { validateAccount } from 'services/auth';
import {
  Category,
  CategoryType,
  CategoryPayload,
} from 'types/store/GetCategories';
import { createUpdateReducer } from 'utils/Hooks';
import { getTermsAndConditions } from 'utils/Links';
import { useTheme } from 'utils/Theme';

import { Image, CategoryItems } from './Categories.style';
import {
  BUYER_STEPS,
  SELLER_STEPS,
  USER_DETAIL_FIELDS,
  BUSINESS_DETAIL_FIELDS,
  BANK_DETAIL_FIELDS,
  SELLER_LOCATION_NOTES,
  BUYER_LOCATION_NOTES,
  PAYMENT_METHOD_OPTIONS,
  SELLER_VARIATIONS,
  BUYER_VARIATIONS,
  BUYER_STEP_SUBTITLE,
  SELLER_STEP_SUBTITLE,
  BUYER_PAYMENT_METHOD_DETAILS,
  INTERESTED_SHOREPAY_OPTIONS,
} from './Register.constants';
import { RegisterGeneratedProps, StepFormProps } from './Register.props';
import {
  Container,
  Content,
  GetStartedTitle,
  GetStartedButton,
  StepCount,
  Title,
  StyledFormikTextField,
  FormikContainer,
  GetStartedWrapper,
  InputContainer,
  DownloadTermsContainer,
  DownloadIcon,
  DownloadTermsText,
  LocationField,
  Error,
  BusinessLogoLabel,
  MobileField,
  PaymentMethodDetails,
  PaymentMethodOverline,
  Spacer,
  BackIcon,
  TitleContainer,
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
  TopContainer,
  LicensePreview,
  LogInLinkContainer,
  LogInLinkPrefix,
  LogInLinkAction,
  LogInLink,
  SignUpHeader,
  AppTypeTitle,
  MobileFooter,
} from './Register.style';
import { addressToPlaceData } from './Register.transform';
import {
  validateUserDetails,
  validateBusinessDetails,
  validateBankDetails,
  validateBusinessAddress,
  validateAgreement,
  validateCategoryMarketSector,
} from './Register.validation';

const StepForm = ({
  formikProps,
  step,
  fields,
  registrationDetails,
  updateRegistrationDetails,
  isPending,
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
  setSearchTerm,
  isSuccess,
  backToLogin,
  setSummaryEdit,
  interestedInShorePay,
  handleSelectShorePay,
  handleDownloadApplicationForm,
}: StepFormProps) => {
  const theme = useTheme();
  const isSeller = theme.appType === 'seller';
  const isSmallScreen = useMediaQuery({ query: BREAKPOINTS['sm'] });
  const MAX_STEP: number = !isSeller ? 6 : 7;

  const [license, setLicense] = useState<{
    file: File | null;
    fileName: string;
  }>({
    file: null,
    fileName: '',
  });
  const [licenseError, setLicenseError] = useState('');
  const [currentCategory, setCurrentCategory] = useState({
    name: '',
    id: '',
  });

  const [otherErrors, setOtherErrors] = useReducer(
    createUpdateReducer<Record<string, string>>(),
    {}
  );

  const CategoryChildren = (result: Category) => (
    <>
      <CategoryItems>
        <div style={{ width: 48 }}>
          <CategoryImageView
            id={result.id}
            containerHeight={30}
            maxHeight={30}
          />
        </div>

        <Typography
          color={isSeller ? 'noshade' : 'shade9'}
          variant="label"
          className="category-text"
        >
          {result.name}
        </Typography>
      </CategoryItems>
    </>
  );

  const CategoryItemsChildren = (result: CategoryType) => (
    <CategoryItems>
      <Image src={result.thumbnail} />
      <Typography variant="label" color={isSeller ? 'noshade' : 'shade9'}>
        {result.name}
      </Typography>
    </CategoryItems>
  );

  const formRef = useRef<FormikProps<Record<string, string>> | null>(null);

  const onAddMoreLicense = () => {
    if (!license.file) {
      setLicenseError('Please add a license file');
    } else if (license.file && license.fileName.length === 0) {
      setLicenseError('Please add a license name');
    } else {
      setLicenseError('');
      updateRegistrationDetails({
        licenses: [
          ...registrationDetails.licenses.filter(
            (f) => f.fileName !== license.fileName
          ),
          license,
        ],
      });
    }
  };

  const onDeleteLicense = (fileName: string) => {
    updateRegistrationDetails({
      licenses: [
        ...registrationDetails.licenses.filter((f) => f.fileName !== fileName),
      ],
    });
  };

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
      if (registrationDetails.licenses.length > 0) {
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
        {isGotoDetails && (
          <Typography
            variant="title5"
            color={isSeller ? 'noshade' : 'shade9'}
            style={{ marginBottom: 8 }}
          >
            {currentCategory.name}
          </Typography>
        )}

        <CategorySearchInputContainer>
          <Search height={16} width={16} />
          <input
            type="search"
            placeholder="Search for a product"
            onChange={(e) => onChangeSearch(e.target.value)}
            value={searchTerm}
          />
          <span onClick={() => setSearchTerm('')} style={{ cursor: 'pointer' }}>
            <CloseFilled
              fill={
                searchTerm.length === 0 ? theme.grey.shade3 : theme.grey.shade6
              }
              height={16}
              width={16}
            />
          </span>
        </CategorySearchInputContainer>

        {!isGotoDetails && (
          <>
            {searchCategory.map((result) => {
              const selected = selectedCategoryTypes.filter(
                (s) => s.categoryId === result.id
              );

              return (
                <>
                  <InteractionsContainer key={result.id}>
                    <Interactions
                      onClick={() => {
                        setCurrentCategory({
                          name: result.name,
                          id: result.id,
                        });
                        getCategoryItem(result.id);
                        showDetails();
                      }}
                      padding="16px 20px 16px 8px"
                    >
                      <CategoryChildren {...result} />
                    </Interactions>
                  </InteractionsContainer>

                  {!isEmpty(selected) && (
                    <BadgeContainer
                      style={{
                        marginBottom: 12,
                      }}
                    >
                      {selected.map((selection) => (
                        <BadgeItemContainer key={selection.id}>
                          <Badge badgeColor={theme.grey.shade3}>
                            <Typography variant="overline" color="shade9">
                              {selection.name}
                            </Typography>
                          </Badge>
                        </BadgeItemContainer>
                      ))}
                    </BadgeContainer>
                  )}
                </>
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
                      const value = {
                        id: result.id,
                        name: result.name,
                        categoryId: currentCategory.id,
                      };
                      addSelected(value);
                    }}
                    padding="8px 20px 8px 16px"
                  >
                    <CategoryItemsChildren {...result} />
                  </Interactions>
                </InteractionsContainer>
              );
            })}
          </>
        )}
      </CategoryContainer>
    );
  };

  const summaryUI = () => {
    const CustomInteraction = ({ label, value, arrayValue, onClick }: any) => {
      return (
        <Interactions padding="15px 24px" type={'edit'} onClick={onClick}>
          <div>
            <Typography variant="overlineSmall" color="shade6">
              {label}
            </Typography>
            {arrayValue && (
              <BadgeContainer>
                {arrayValue.map((selection: CategoryPayload) => (
                  <BadgeItemContainer key={selection.id}>
                    <Badge badgeColor={theme.grey.shade3}>
                      <Typography variant="overline" color="shade9">
                        {selection.name}
                      </Typography>
                    </Badge>
                  </BadgeItemContainer>
                ))}
              </BadgeContainer>
            )}

            {value && (
              <Typography
                variant="label"
                color={isSeller ? 'noshade' : 'shade9'}
              >
                {value}
              </Typography>
            )}
          </div>
        </Interactions>
      );
    };

    return (
      <>
        <SellerSummaryContainer>
          <CustomInteraction
            label="First Name"
            value={registrationDetails.firstName}
            onClick={() => {
              summaryHandleStep(1);
              setSummaryEdit();
            }}
          />
          <CustomInteraction
            label="Last Name"
            value={registrationDetails.lastName}
            onClick={() => {
              summaryHandleStep(1);
              setSummaryEdit();
            }}
          />
          <CustomInteraction
            label="Email"
            value={registrationDetails.email}
            onClick={() => {
              summaryHandleStep(1);
              setSummaryEdit();
            }}
          />
          <CustomInteraction
            label="Mobile"
            value={`+${registrationDetails.callingCode}${registrationDetails.mobile}`}
            onClick={() => {
              summaryHandleStep(1);
              setSummaryEdit();
            }}
          />
          <CustomInteraction
            label="Business Name"
            value={registrationDetails.businessName}
            onClick={() => {
              summaryHandleStep(2);
              setSummaryEdit();
            }}
          />

          {isSeller && (
            <CustomInteraction
              label="Business Number"
              value={registrationDetails.abn}
              onClick={() => {
                summaryHandleStep(2);
                setSummaryEdit();
              }}
            />
          )}

          <CustomInteraction
            label="Address"
            value={
              registrationDetails.address !== null
                ? addressToPlaceData(
                    registrationDetails.address,
                    registrationDetails.unitNumber
                  ).address
                : ''
            }
            onClick={() => {
              summaryHandleStep(2);
              setSummaryEdit();
            }}
          />

          {isSeller && (
            <>
              <CustomInteraction
                label="Bank Account Name"
                value={registrationDetails.accountName}
                onClick={() => {
                  summaryHandleStep(3);
                  setSummaryEdit();
                }}
              />
              <CustomInteraction
                label="BSB"
                value={registrationDetails.bsb}
                onClick={() => {
                  summaryHandleStep(3);
                  setSummaryEdit();
                }}
              />
              <CustomInteraction
                label="Account Number"
                value={registrationDetails.accountNumber}
                onClick={() => {
                  summaryHandleStep(3);
                  setSummaryEdit();
                }}
              />
              <CustomInteraction
                label="Fishing Licenses"
                value={
                  registrationDetails.licenses.length > 0
                    ? `${registrationDetails.licenses[0].fileName}...`
                    : ''
                }
                onClick={() => {
                  summaryHandleStep(4);
                  setSummaryEdit();
                }}
              />
              <CustomInteraction
                label="Market Sector"
                value={
                  !isEmpty(registrationDetails.categoryMarketSector)
                    ? SELLER_VARIATIONS.filter(
                        (i) =>
                          i.key === registrationDetails.categoryMarketSector
                      )[0].label
                    : ''
                }
                onClick={() => {
                  summaryHandleStep(5);
                  setSummaryEdit();
                }}
              />
            </>
          )}

          {!isSeller && (
            <>
              <CustomInteraction
                label="Market Sector"
                value={
                  !isEmpty(registrationDetails.categoryMarketSector)
                    ? BUYER_VARIATIONS.filter(
                        (i) =>
                          i.key === registrationDetails.categoryMarketSector
                      )[0].label
                    : ''
                }
                onClick={() => {
                  summaryHandleStep(4);
                  setSummaryEdit();
                }}
              />

              <CustomInteraction
                label="Payment Method"
                value={
                  interestedInShorePay
                    ? 'ShorePay'
                    : PAYMENT_METHOD_OPTIONS[1].label
                }
                onClick={() => {
                  summaryHandleStep(3);
                  setSummaryEdit();
                }}
              />
            </>
          )}

          <CustomInteraction
            label={isSeller ? 'Selling Products' : 'Buying Products'}
            arrayValue={selectedCategoryTypes}
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
            onPress={() => getTermsAndConditions(isSeller)}
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
              fullWidth
              style={{
                marginTop: 16,
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
            validateAccount(values.email)
              .then(({ data }) => {
                if (data.status === 200) {
                  formikProps.onSubmit(values);
                } else {
                  setOtherErrors({ email: 'Email already in use' });
                }
              })
              .catch(() => {
                setOtherErrors({ email: 'Email already in use' });
              });
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
            formikProps.onSubmit(values);
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
              formikProps.onSubmit(values);
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
                  <StyledFormikTextField
                    name={key}
                    type={type}
                    label={label}
                    secured={secured}
                    alert={alert}
                    onChangeText={() => {
                      if (key === 'email' && otherErrors[key]) {
                        setOtherErrors({ email: '' });
                      }
                    }}
                    LeftComponent={
                      (prefix || '').length > 0 ? (
                        <Typography variant="label" color="shade6">
                          {prefix}
                        </Typography>
                      ) : undefined
                    }
                    otherError={otherErrors[key]}
                  />
                </Fragment>
              ))}

              {step === 1 && (
                <>
                  <MobileField
                    name="mobile"
                    label="MOBILE NUMBER"
                    callingCode={registrationDetails.callingCode}
                    setCallingCode={(value) =>
                      updateRegistrationDetails({ callingCode: value })
                    }
                  />
                  <Alert
                    variant={isSeller ? 'info' : 'infoAlert'}
                    fullWidth
                    content={`You can add more people to your ${
                      isSeller ? 'seller' : 'buyer'
                    } account once you’re approved`}
                    style={{ marginTop: 8 }}
                  />
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

                  <BaseTextField
                    label="Unit number (optional)"
                    value={registrationDetails.unitNumber}
                    onChangeText={(v) =>
                      updateRegistrationDetails({
                        unitNumber: v,
                      })
                    }
                    error={otherErrors.unitNumber || ''}
                    style={{ marginBottom: 8, marginTop: 24 }}
                  />

                  <Alert
                    variant={isSeller ? 'info' : 'infoAlert'}
                    fullWidth
                    content={
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
                    <>
                      <div>
                        {BUYER_PAYMENT_METHOD_DETAILS.map((bpmd) => (
                          <>
                            <PaymentMethodOverline variant="overline">
                              {bpmd.label}
                            </PaymentMethodOverline>
                            <PaymentMethodDetails variant="label">
                              {bpmd.text}
                            </PaymentMethodDetails>
                          </>
                        ))}
                      </div>
                      <div className="select-container">
                        <Select
                          value={
                            interestedInShorePay
                              ? INTERESTED_SHOREPAY_OPTIONS[0].value
                              : INTERESTED_SHOREPAY_OPTIONS[1].value
                          }
                          onChange={(option) => {
                            handleSelectShorePay(option.value === '1');
                          }}
                          options={INTERESTED_SHOREPAY_OPTIONS}
                          label="Are you interested in applying for ShorePay?"
                        />
                        {interestedInShorePay && (
                          <Button
                            text="Download Application Form"
                            variant="outline"
                            onClick={(e) => {
                              e.preventDefault();
                              handleDownloadApplicationForm();
                            }}
                            takeFullWidth
                            icon={
                              <DownloadIcon
                                fill={theme.brand.primary}
                                height={15}
                                width={20}
                              />
                            }
                            style={{ margin: '10px 0' }}
                          />
                        )}
                      </div>
                    </>
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
                      <Add
                        onClickFile={(file) => {
                          if (file) {
                            const { name } = file;
                            const fileName = name.substring(
                              0,
                              name.lastIndexOf('.')
                            );

                            setLicense({
                              file: file,
                              fileName: fileName,
                            });
                          }
                        }}
                        title="Add a File"
                        Svg={FileCheck}
                      />
                      <BaseTextField
                        value={license.fileName}
                        onChangeText={(v) =>
                          setLicense((prevState) => ({
                            ...prevState,
                            fileName: v,
                          }))
                        }
                        label="License Name"
                        type="text"
                        error={licenseError || ''}
                        style={{ marginBottom: 8, marginTop: 16 }}
                      />

                      {registrationDetails.licenses.map((l, index) => (
                        <LicensePreview key={index}>
                          <Typography variant="overline" color="shade6">
                            License
                          </Typography>
                          <div className="license-details">
                            <Typography variant="label" color="noshade">
                              {l.fileName}
                            </Typography>
                            <button
                              type="button"
                              onClick={() => onDeleteLicense(l.fileName)}
                            >
                              <Subtract
                                innerFill={theme.brand.error}
                                fill={theme.grey.noshade}
                              />
                              <Typography
                                color="shade2"
                                variant="label"
                                style={{ marginLeft: 4 }}
                              >
                                Delete
                              </Typography>
                            </button>
                          </div>
                        </LicensePreview>
                      ))}
                    </>
                  )}
                  {!isSeller && (
                    <MarketSectorContainer>
                      {BUYER_VARIATIONS.map((variant) => (
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
                        We’ll send you an email when your account is approved.
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
                  takeFullWidth={isSmallScreen}
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
              <NextButton
                takeFullWidth={isSmallScreen}
                text={'ADD MORE'}
                onClick={() => hideDetails()}
              />
            )}

            {step === 4 && isSeller && (
              <NextButton
                takeFullWidth={isSmallScreen}
                text={'ADD'}
                type={'button'}
                onClick={() => onAddMoreLicense()}
              />
            )}

            {isSuccess && (
              <NextButton
                takeFullWidth={isSmallScreen}
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
  const {
    backToLogin,
    registrationDetails,
    updateRegistrationDetails,
    register,
    isPending,
    isSuccess,
    setSummaryEdit,
    isSummaryEdit,
    goToLogIn,
  } = props;

  const theme = useTheme();
  const isSeller = theme.appType === 'seller';
  const steps = isSeller ? SELLER_STEPS : BUYER_STEPS;
  const isSmallScreen = useMediaQuery({ query: BREAKPOINTS['sm'] });

  const renderRef = useRef<HTMLDivElement | null>(null);

  const [step, setStep] = useState(0);
  const MAX_STEP = !isSeller ? 6 : 7;

  const summaryHandleStep = (step: number) => {
    setStep(step);
  };

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
      nextStep();
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
        <GetStartedWrapper>
          <SignUpHeader>
            <AppTypeTitle variant="title3" weight="700">
              {isSeller ? 'Seller' : 'Buyer'} Sign Up
            </AppTypeTitle>
            <LogInLinkContainer>
              <LogInLinkPrefix
                variant="label"
                color={isSeller ? 'shade6' : 'shade7'}
              >
                Already have an account?
              </LogInLinkPrefix>
              <LogInLinkAction onClick={() => goToLogIn()}>
                <LogInLink variant="label" color="primary">
                  Log In
                </LogInLink>
              </LogInLinkAction>
            </LogInLinkContainer>
          </SignUpHeader>
          <GetStartedTitle variant="title5">
            Signing up is free and complete with {isSeller ? '6' : '5'} simple
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
          {!isSmallScreen ? (
            <GetStartedButton text="GET STARTED" onClick={() => nextStep()} />
          ) : (
            <MobileFooter>
              <Button
                takeFullWidth
                text="GET STARTED"
                onClick={() => nextStep()}
              />
            </MobileFooter>
          )}
        </GetStartedWrapper>
      );
    }
  };

  useEffect(() => {
    if (renderRef) renderRef.current?.scrollTo(0, 0);
  }, [step, renderRef]);

  return (
    <MobileNav
      {...(step > 0
        ? {
            onBackOverride: () => setStep((prevState) => prevState - 1),
          }
        : {})}
    >
      <AuthContainer
        isRegister
        noLogo={isSmallScreen}
        logoContainerMarginBottomHeight={1}
        currentStep={step + 1}
        totalSteps={MAX_STEP + 1}
        containerBackground={isSeller ? theme.grey.shade8 : theme.grey.shade1}
        minHeight={'660px'}
      >
        <RenderContainer step={step} ref={renderRef}>
          {!props.isGotoDetails && step > 0 && !isSuccess && (
            <TopContainer>
              <StepCount
                variant="overline"
                color="shade6"
              >{`STEP ${step} / ${MAX_STEP}`}</StepCount>
              <TitleContainer>
                {!isSmallScreen && (
                  <Touchable dark onPress={() => previousStep()}>
                    <BackIcon
                      width={16}
                      height={16}
                      fill={theme.brand.primary}
                    />
                  </Touchable>
                )}
                <Title
                  variant="title5"
                  weight="500"
                  color={isSeller ? 'noshade' : 'shade8'}
                >
                  {steps[step - 1].title}
                </Title>
              </TitleContainer>

              {!isSeller && BUYER_STEP_SUBTITLE[step] && (
                <Typography
                  variant="label"
                  color="shade6"
                  style={{ marginLeft: isSmallScreen ? 0 : 35 }}
                >
                  {BUYER_STEP_SUBTITLE[step]}
                </Typography>
              )}

              {isSeller && SELLER_STEP_SUBTITLE[step] && (
                <Typography
                  variant="label"
                  color="shade6"
                  style={{ marginLeft: isSmallScreen ? 0 : 35 }}
                >
                  {SELLER_STEP_SUBTITLE[step]}
                </Typography>
              )}
            </TopContainer>
          )}

          {props.isGotoDetails && (
            <>
              <TitleContainer>
                <Button
                  className="back-badge"
                  text="Back"
                  size="sm"
                  iconPosition="before"
                  textVariant="overline"
                  textWeight="900"
                  textColor={theme.appType === 'buyer' ? 'shade9' : 'noshade'}
                  icon={
                    <BackIcon
                      fill={theme.brand.primary}
                      height={16}
                      width={16}
                    />
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
    </MobileNav>
  );
};

export default RegisterView;
