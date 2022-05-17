/* eslint-disable react/prop-types */
import React, {
  useState,
  Fragment,
  useReducer,
  useRef,
  useEffect,
} from 'react';

import Alert from 'components/base/Alert';
import Badge from 'components/base/Badge';
import Button from 'components/base/Button';
import Checkbox from 'components/base/Checkbox';
import Interactions from 'components/base/Interactions';
import Radio from 'components/base/Radio';
import Select from 'components/base/Select';
import { CloseFilled, Download, Search } from 'components/base/SVG';
import Tabs from 'components/base/Tabs';
import BaseTextField from 'components/base/TextField';
import Touchable from 'components/base/Touchable';
import Typography from 'components/base/Typography';
import AuthContainer from 'components/layout/AuthContainer';
import MobileNav from 'components/layout/MobileNav';
import AddFile from 'components/module/AddFile';
import AddImage from 'components/module/AddImage';
import CategoryImageView from 'components/module/CategoryImage';
import DatePickerDropdown from 'components/module/DatePickerDropdown';
import LocationSearch from 'components/module/LocationSearch';
import MarketSectorItem from 'components/module/MarketSectorItem';
import StepDetails from 'components/module/StepDetails';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Formik, FormikProps } from 'formik';
import moment from 'moment';
import { isEmpty } from 'ramda';
import { useMediaQuery } from 'react-responsive';
// import { TipsContainer } from 'routes/Seller/Account/Licenses/Licenses.style';
// import { LicenseDetails } from 'routes/Seller/Account/Licenses/Licenses.view';
import { validateAccount } from 'services/auth';
import { createCardToken } from 'services/stripe';
import {
  Category,
  CategoryType,
  CategoryPayload,
} from 'types/store/GetCategories';
import { createUpdateReducer } from 'utils/Hooks';
import { getTermsAndConditions } from 'utils/Links';
import { SpecialColors } from 'utils/SFMTheme';
import { useTheme } from 'utils/Theme';

import { Image, CategoryItems } from './Categories.style';
import { PaymentMethod } from './PaymentMethod/PaymentMethod.view';
import {
  BUYER_STEPS,
  SELLER_STEPS,
  USER_DETAIL_FIELDS,
  BUSINESS_DETAIL_FIELDS,
  BANK_DETAIL_FIELDS,
  SELLER_LOCATION_NOTES,
  BUYER_LOCATION_NOTES,
  SELLER_VARIATIONS,
  BUYER_VARIATIONS,
  BUYER_STEP_SUBTITLE,
  SELLER_STEP_SUBTITLE,
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
  DownloadTermsText,
  LocationField,
  Error,
  BusinessLogoLabel,
  MobileField,
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
  LogInLinkContainer,
  LogInLinkPrefix,
  LogInLinkAction,
  LogInLink,
  SignUpHeader,
  AppTypeTitle,
  MobileFooter,
  StyledBadge,
  StyledTouchable,
  ButtonsContainer,
  DownloadApplicationFormButton,
  SFMOption,
  TabsContainer,
} from './Register.style';
import {
  addressToPlaceData,
  resErrorToCardFieldError,
} from './Register.transform';
import {
  validateUserDetails,
  validateBusinessDetails,
  validateBankDetails,
  validateBusinessAddress,
  validateAgreement,
  validateCategoryMarketSector,
  validateCard,
} from './Register.validation';
import YourPlan from './YourPlan';

const StepForm = ({
  formikProps,
  step,
  previousStep,
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
  onRemoveSelectedCategory,
  states,
}: StepFormProps) => {
  const theme = useTheme();
  const isSeller = theme.appType === 'seller';
  const isSmallScreen = useMediaQuery({ query: BREAKPOINTS['sm'] });
  // const MAX_STEP = isSeller ? 9 : 7;
  const MAX_STEP = 7;

  const [license, setLicense] = useState<{
    file: File | null;
    fileName: string;
  }>({
    file: null,
    fileName: '',
  });
  const [licenseBack, setLicenseBack] = useState<{
    file: File | null;
    fileName: string;
  }>({
    file: null,
    fileName: '',
  });
  const [hasLicenseBack, setHasLicenseBack] = useState(false);
  const [licenseError, setLicenseError] = useState('');
  const [licenseFileError, setLicenseFileError] = useState('');
  const [expirationDate, setExpirationDate] = useState<Date | null>();
  const [activeLicenseIdx, setActiveLicenseIdx] = useState<
    'new' | number | null
  >(null);
  const [stateId, setStateId] = useState<string>();
  const [currentCategory, setCurrentCategory] = useState({
    name: '',
    id: '',
  });
  const [hasSfmNumber, setHasSfmNumber] = useState(
    !!registrationDetails.sfmNumber || false
  );
  const [isGeneratingCardToken, setIsGeneratingCardToken] = useState(false);

  const [otherErrors, setOtherErrors] = useReducer(
    createUpdateReducer<Record<string, string>>(),
    {}
  );

  const showSFMFields = ['AU', 'NZ'].includes(
    registrationDetails.address?.countryCode || ''
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
      setLicenseFileError('Please add a license file');
      return true;
    } else if (license.file && license.fileName.length === 0) {
      setLicenseError('Please add a license name');
      return true;
    } else {
      setLicenseError('');
      setLicenseFileError('');
      const newLicense = {
        ...license,
        fileBack: licenseBack.file,
        expiredAt: expirationDate?.toISOString(),
        stateId,
      };
      updateRegistrationDetails({
        licenses: [
          ...registrationDetails.licenses.filter(
            (f, idx) => activeLicenseIdx !== idx
          ),
          newLicense,
        ],
      });
      setLicense({ file: null, fileName: '' });
      setLicenseBack({ file: null, fileName: '' });
      setExpirationDate(null);
      setStateId('');
      setActiveLicenseIdx(null);
      return false;
    }
  };

  // const onDeleteLicense = () => {
  //   updateRegistrationDetails({
  //     licenses: [
  //       ...registrationDetails.licenses.filter(
  //         (f, idx) => activeLicenseIdx !== idx
  //       ),
  //     ],
  //   });
  //   setLicense({ file: null, fileName: '' });
  //   setLicenseBack({ file: null, fileName: '' });
  //   setExpirationDate(null);
  //   setStateId('');
  //   setActiveLicenseIdx(null);
  // };

  const handleSubmitLicense = () => {
    if (isSeller) {
      const error = onAddMoreLicense();
      if (error) return;
    }
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
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
      return 'ADD LICENSE';
    } else if (step === 6) {
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

  const [selectedPlan, setSelectedPlan] = useState('Base');

  const selectedPlanHandler = (value: string) => {
    setSelectedPlan(value);

    const plan = value === 'Base' ? 'Standard' : 'Premium';
    updateRegistrationDetails({
      subscriptionType: {
        ...registrationDetails.subscriptionType,
        plan: plan,
      },
    });
  };

  const additionalSubscriptionHandler = (hasAddOn: boolean) => {
    updateRegistrationDetails({
      subscriptionType: {
        ...registrationDetails.subscriptionType,
        reverseMarketPlace: hasAddOn,
      },
    });
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
                        <StyledTouchable
                          dark
                          key={selection.id}
                          onPress={() =>
                            onRemoveSelectedCategory(selection.name)
                          }
                        >
                          <BadgeItemContainer>
                            <StyledBadge badgeColor={theme.grey.shade3}>
                              <Typography variant="overline" color="shade9">
                                {selection.name}
                              </Typography>
                              <CloseFilled
                                fill={theme.grey.shade9}
                                height={10}
                                width={10}
                              />
                            </StyledBadge>
                          </BadgeItemContainer>
                        </StyledTouchable>
                      ))}
                    </BadgeContainer>
                  )}
                  {searchCategoryType
                    .filter((i) => i.categoryId === result.id)
                    .map((innerResult) => (
                      <InteractionsContainer key={innerResult.id}>
                        <Interactions
                          type="checkbox"
                          pressed={selectedCategoryTypes.some(
                            (i: CategoryPayload) => i.id === innerResult.id
                          )}
                          onClick={() => {
                            const value = {
                              id: innerResult.id,
                              name: innerResult.name,
                              categoryId: result.id,
                            };
                            addSelected(value);
                          }}
                          padding="8px 20px 8px 16px"
                        >
                          <CategoryItemsChildren {...innerResult} />
                        </Interactions>
                      </InteractionsContainer>
                    ))}
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
              {showSFMFields && (
                <CustomInteraction
                  label="SFM Number"
                  value={registrationDetails.sfmNumber || ''}
                  onClick={() => {
                    summaryHandleStep(2);
                    setSummaryEdit();
                  }}
                />
              )}

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
                  summaryHandleStep(3);
                  setSummaryEdit();
                }}
              />
            </>
          )}

          {!isSeller && (
            <CustomInteraction
              label="Payment Method"
              value={`Credit Card ****-${registrationDetails.cardNumber.substring(
                registrationDetails.cardNumber.length - 5
              )}`}
              onClick={() => {
                summaryHandleStep(isSeller ? 7 : 5);
                setSummaryEdit();
              }}
            />
          )}

          <CustomInteraction
            label={isSeller ? 'Selling Products' : 'Buying Products'}
            arrayValue={selectedCategoryTypes}
            onClick={() => {
              summaryHandleStep(isSeller ? 8 : 6);
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
              <Download />
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
          const getCardToken = () =>
            createCardToken({
              number: parseInt(values.cardNumber.replace(/\s/g, '')),
              exp_month: parseInt(values.cardExpiryDate.split('/')[0]),
              exp_year: parseInt(values.cardExpiryDate.split('/')[1]),
              cvc: parseInt(values.cardCvc),
              name: values.cardName,
              address_line1: values.cardBillingAddress,
              address_city: values.cardCity,
              address_state: values.cardState,
              address_zip: values.cardZipCode,
            })
              .then(({ data }) => {
                setIsGeneratingCardToken(false);
                formikProps.onSubmit({ ...values, cardToken: data.id });
              })
              .catch((e) => {
                setIsGeneratingCardToken(false);
                setOtherErrors(resErrorToCardFieldError(e));
              });

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
            } else if (
              !isSeller &&
              hasSfmNumber &&
              !registrationDetails.sfmNumber?.trim()
            ) {
              setOtherErrors({ sfmNumber: 'Please enter your SFM number' });
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
            } else formikProps.onSubmit(values);
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
              setIsGeneratingCardToken(true);
              getCardToken();
            }
          } else if (step === 6) {
            formikProps.onSubmit(values);
          } else if (step === 7) {
            // if (!isSeller) {
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
            // } else {
            //   getCardToken();
            // }
          }
          // else if (step === 8) {
          //   formikProps.onSubmit(values);
          // } else if (step === 9) {
          //   const error = {
          //     ...validateAgreement({
          //       agreement: registrationDetails.tncAgreement,
          //     }),
          //   };
          //   if (error.agreement) {
          //     setOtherErrors(error);
          //   } else {
          //     setOtherErrors({ agreement: '' });
          //     formikProps.onSubmit(values);
          //   }
          // }
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
                      onSelect={(address) => {
                        updateRegistrationDetails({
                          address,
                        });

                        if (
                          !['AU', 'NZ'].includes(address?.countryCode || '')
                        ) {
                          updateRegistrationDetails({
                            sfmNumber: null,
                          });
                          setHasSfmNumber(false);
                        }
                      }}
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
                  {!isSeller && showSFMFields && (
                    <>
                      <Typography
                        variant="overline"
                        color="shade6"
                        style={{ marginTop: '30px' }}
                      >
                        Do you have a SFM Number?
                      </Typography>
                      <SFMOption>
                        <div>
                          <Typography variant="body" color="shade9">
                            No
                          </Typography>
                          <Typography
                            variant="caption"
                            color="shade6"
                            weight="400"
                            style={{ marginRight: '6px' }}
                          >
                            Click “Next” to continue the Sign up process
                          </Typography>
                        </div>
                        <Radio
                          checked={!hasSfmNumber}
                          onClick={() => {
                            setHasSfmNumber(false);
                            updateRegistrationDetails({ sfmNumber: null });
                          }}
                        />
                      </SFMOption>
                      <SFMOption>
                        <div>
                          <Typography variant="body" color="shade9">
                            Yes
                          </Typography>
                          <Typography
                            variant="caption"
                            color="shade6"
                            weight="400"
                            style={{ marginRight: '6px' }}
                          >
                            We will use your SFM number to restore your payment
                            methods and bank details from your SFM account
                          </Typography>
                        </div>
                        <Radio
                          checked={hasSfmNumber}
                          onClick={() => setHasSfmNumber(true)}
                        />
                      </SFMOption>
                      {hasSfmNumber && (
                        <BaseTextField
                          label="Your SFM Number"
                          inputType="numeric"
                          value={registrationDetails.sfmNumber || ''}
                          onChangeText={(v) =>
                            updateRegistrationDetails({
                              sfmNumber: v
                                .replace(/[^\d]/g, '')
                                .substring(0, 6),
                            })
                          }
                          error={otherErrors.sfmNumber || ''}
                          style={{ marginBottom: 8, marginTop: 24 }}
                          borderRadius="12px"
                        />
                      )}
                    </>
                  )}
                </>
              )}
              {step === 3 && !isSeller && (
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
              {step === 4 && (
                <>
                  {!isSeller && (
                    <TabsContainer>
                      <Tabs
                        tabs={['Base', 'Premium']}
                        selectedTab={selectedPlan}
                        onClickTab={(value) => selectedPlanHandler(value)}
                        textColor={theme.grey.shade6}
                        underlineColor={theme.grey.shade6}
                        activeTextColor={
                          theme.isSFM ? SpecialColors.blue : theme.grey.shade9
                        }
                      />
                    </TabsContainer>
                  )}
                  {isSeller ? (
                    <>
                      {/* {activeLicenseIdx !== null ? (*/}
                      <>
                        <UploadLabel variant="overline" color={'shade6'}>
                          License (Front)
                        </UploadLabel>
                        <AddFile
                          onSelectFile={(file) => {
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
                          file={license.file}
                          fileName={license.fileName}
                          onRemoveFile={() =>
                            setLicense({
                              file: null,
                              fileName: '',
                            })
                          }
                          error={licenseFileError}
                        />
                        {hasLicenseBack && (
                          <>
                            <UploadLabel variant="overline" color={'shade6'}>
                              License (Back)
                            </UploadLabel>
                            <AddFile
                              onSelectFile={(file) => {
                                if (file) {
                                  const { name } = file;
                                  const fileName = name.substring(
                                    0,
                                    name.lastIndexOf('.')
                                  );

                                  setLicenseBack({
                                    file: file,
                                    fileName: fileName,
                                  });
                                }
                              }}
                              file={licenseBack.file}
                              fileName={license.fileName}
                              onRemoveFile={() =>
                                setLicenseBack({
                                  file: null,
                                  fileName: '',
                                })
                              }
                            />
                          </>
                        )}
                        <Checkbox
                          checked={hasLicenseBack}
                          onClick={() => setHasLicenseBack((v) => !v)}
                          label="License Back"
                          style={{ marginTop: 16 }}
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
                          style={{ marginBottom: 16, marginTop: 16 }}
                        />
                        <DatePickerDropdown
                          placeholder="17/01/2025"
                          label="Expiration Date"
                          date={expirationDate ? moment(expirationDate) : null}
                          onDateChange={(d) =>
                            setExpirationDate(d?.toDate() || null)
                          }
                          showCalendarIcon
                        />
                        <Select
                          label="State"
                          options={states}
                          value={stateId}
                          onChange={(v) => setStateId(v.value)}
                          borderRadius="4px"
                          marginTop="16px"
                        />
                      </>
                      {/*}) : (
                        <>
                          <UploadLabel variant="overline" color={'shade6'}>
                            My Licenses
                          </UploadLabel>
                          {registrationDetails.licenses.length === 0 ? (
                            <Typography
                              variant="body"
                              color="noshade"
                              style={{ marginTop: 48, marginBottom: 48 }}
                            >
                              No licenses uploaded yet
                            </Typography>
                          ) : (
                            registrationDetails.licenses.map((l, index) => (
                              <Interactions
                                key={index}
                                onClick={() => {
                                  setActiveLicenseIdx(index);
                                  setLicense({
                                    file: l.file,
                                    fileName: l.fileName,
                                  });
                                  setLicenseBack({
                                    file: l.fileBack || null,
                                    fileName: '',
                                  });
                                  if (l.expiredAt) {
                                    setExpirationDate(new Date(l.expiredAt));
                                  }
                                  setStateId(l.stateId);
                                }}
                                type="edit"
                                padding="12px"
                                marginBottom="8px"
                              >
                                <LicenseDetails
                                  value={l.file?.name || ''}
                                  label={l.fileName}
                                  image={l.file}
                                  expiredAt={l.expiredAt}
                                  pending
                                />
                              </Interactions>
                            ))
                          )}
                        </>
                      )}*/}
                      <ButtonsContainer>
                        {/*<NextButton
                          text={
                            (typeof activeLicenseIdx === 'number'
                              ? 'EDIT'
                              : 'ADD') + ' LICENSE'
                          }
                          type={'button'}
                          onClick={
                            () =>
                              // activeLicenseIdx !== null ?
                              onAddMoreLicense()
                            // : setActiveLicenseIdx('new')
                          }
                        />*/}
                        {/* typeof activeLicenseIdx === 'number' && (
                          <NextButton
                            text="Delete"
                            type={'button'}
                            onClick={() => onDeleteLicense()}
                            variant="outline"
                          />
                        ) */}
                        {/*activeLicenseIdx === 'new' && (
                          <NextButton
                            text="Cancel"
                            type={'button'}
                            onClick={() => setActiveLicenseIdx(null)}
                            variant="outline"
                          />
                        ) */}
                      </ButtonsContainer>
                      <Alert
                        variant="info"
                        fullWidth
                        content={`You can upload more licenses to your seller account once you’re approved`}
                        style={{ marginTop: 8 }}
                      />
                      {/* {activeLicenseIdx === null && (
                        <TipsContainer style={{ marginTop: 16 }}>
                          <Typography variant="body" weight="bold">
                            How to upload a Fishing License
                          </Typography>
                          <Typography variant="body">
                            Click the “Add a License” Button. Make sure the
                            license informations are legible. The approval
                            process may take 1-2 business days
                          </Typography>
                        </TipsContainer>
                      )} */}
                    </>
                  ) : (
                    <YourPlan
                      additionalSubscriptionHandler={
                        additionalSubscriptionHandler
                      }
                      selectedPlan={registrationDetails.subscriptionType.plan}
                      currentMarketSector={
                        registrationDetails.categoryMarketSector
                      }
                      previousStep={() => previousStep && previousStep()}
                    />
                  )}
                </>
              )}
              {step === 5 && (
                <>
                  {isSeller ? (
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
                  ) : (
                    <PaymentMethod
                      otherErrors={otherErrors}
                      setOtherErrors={setOtherErrors}
                      details={registrationDetails}
                    />
                  )}
                </>
              )}
              {step === 6 && (
                <>
                  {
                    // isSeller ? (
                    //   <YourPlan
                    //     currentMarketSector={
                    //       registrationDetails.categoryMarketSector
                    //     }
                    //     previousStep={() => previousStep && previousStep()}
                    //   />
                    // ) : (
                    categoryPicker()
                    // )
                  }
                </>
              )}
              {step === 7 && (
                <>
                  {/* {isSeller ? (
                    <PaymentMethod
                      otherErrors={otherErrors}
                      setOtherErrors={setOtherErrors}
                    />
                  ) : (
                    summaryUI()
                  )} */}
                  {!isSuccess || !isSeller ? (
                    summaryUI()
                  ) : (
                    <>
                      <Typography
                        variant="title5"
                        color="noshade"
                        weight="400"
                        style={{ marginBottom: 32 }}
                      >
                        Thanks for signing up! Your account is pending approval
                      </Typography>
                      <Typography
                        variant="body"
                        color="noshade"
                        weight="Medium"
                        style={{ marginBottom: 32 }}
                      >
                        We need to check a few things before you can start
                        selling. We’ll send you and email and notification when
                        your account is approved. This normally takes less than
                        24 hours.
                      </Typography>
                      <Typography
                        variant="title5"
                        color="noshade"
                        weight="400"
                        style={{ marginBottom: 32 }}
                      >
                        1 Month Free Trial will start when your account is
                        approved
                      </Typography>
                    </>
                  )}
                </>
              )}
              {/* {step === 8 && isSeller && categoryPicker()}
              {step === 9 && isSeller && (
                <>
                  {!isSuccess ? (
                    summaryUI()
                  ) : (
                    <>
                      <Typography
                        variant="title5"
                        color="noshade"
                        weight="400"
                        style={{ marginBottom: 32 }}
                      >
                        Thanks for signing up! Your account is pending approval
                      </Typography>
                      <Typography
                        variant="body"
                        color="noshade"
                        weight="Medium"
                        style={{ marginBottom: 32 }}
                      >
                        We need to check a few things before you can start
                        selling. We’ll send you and email and notification when
                        your account is approved. This normally takes less than
                        24 hours.
                      </Typography>
                      <Typography
                        variant="title5"
                        color="noshade"
                        weight="400"
                        style={{ marginBottom: 32 }}
                      >
                        1 Month Free Trial will start when your account is
                        approved
                      </Typography>
                    </>
                  )}
                </>
              )} */}
              <Spacer />
            </Content>
          </Container>
          <ButtonContainer>
            {!isSuccess ? (
              <>
                <NextButton
                  takeFullWidth={isSmallScreen}
                  loading={
                    (isPending && step === MAX_STEP) ||
                    (step === 5 && isGeneratingCardToken)
                  }
                  type={step === MAX_STEP ? 'submit' : 'button'}
                  text={buttonTextHandler(step)}
                  onClick={() =>
                    isSeller && step === 4
                      ? handleSubmitLicense()
                      : handleSubmit()
                  }
                  variant={
                    buttonTextHandler(step) === 'SKIP' ? 'outline' : 'primary'
                  }
                />
              </>
            ) : null}
            {isSeller && step === 4 && (
              <NextButton
                takeFullWidth={isSmallScreen}
                type={'button'}
                text={'SKIP'}
                onClick={() => handleSubmit()}
                variant={'outline'}
              />
            )}
            {isGotoDetails && (
              <NextButton
                takeFullWidth={isSmallScreen}
                text={'ADD MORE'}
                onClick={() => hideDetails()}
              />
            )}

            {isSuccess && (
              <NextButton
                takeFullWidth={isSmallScreen}
                text="OK"
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
    registrationDetails,
    updateRegistrationDetails,
    register,
    isSuccess,
    isSummaryEdit,
    goToLogIn,
  } = props;

  const theme = useTheme();
  const isSeller = theme.appType === 'seller';
  const steps = isSeller ? SELLER_STEPS : BUYER_STEPS;
  const isSmallScreen = useMediaQuery({ query: BREAKPOINTS['sm'] });

  const renderRef = useRef<HTMLDivElement | null>(null);

  const [step, setStep] = useState(0);
  // const MAX_STEP = isSeller ? 9 : 7;
  const MAX_STEP = 7;

  const summaryHandleStep = (step: number) => {
    setStep(step);
  };

  const nextStep = () => {
    if (isSummaryEdit) {
      // setStep(isSeller ? 9 : 7);
      setStep(7);
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
    initialValues: {
      cardNumber: registrationDetails.cardNumber,
      cardExpiryDate: registrationDetails.cardExpiryDate,
      cardCvc: registrationDetails.cardCvc,
      cardName: registrationDetails.cardName,
      cardBillingAddress:
        registrationDetails.cardBillingAddress || registrationDetails.address
          ? `${registrationDetails.address?.streetNumber} ${registrationDetails.address?.route}`.trim()
          : '',
      cardZipCode:
        registrationDetails.cardZipCode ||
        registrationDetails.address?.postcode ||
        '',
      cardCity:
        registrationDetails.cardCity ||
        registrationDetails.address?.locality ||
        '',
      cardState:
        registrationDetails.cardState ||
        registrationDetails.address?.administrativeAreaLevel1 ||
        '',
    },
    validate: validateCard,
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
            isSeller ? bankDetailsFormikProps : userDetailsFormikProps
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
          previousStep={previousStep}
        />
      );
    } else if (step === 5) {
      return (
        <>
          <StepForm
            {...props}
            formikProps={
              isSeller ? userDetailsFormikProps : paymentMethodFormikProps
            }
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
            formikProps={userDetailsFormikProps}
            step={step}
            fields={[]}
            summaryHandleStep={summaryHandleStep}
            previousStep={previousStep}
          />
        </>
      );
    } else if (step === 7) {
      return (
        <>
          <StepForm
            {...props}
            formikProps={
              // isSeller ? paymentMethodFormikProps :
              summaryFormikProps
            }
            step={step}
            fields={[]}
            summaryHandleStep={summaryHandleStep}
          />
        </>
      );
      // } else if (step === 8) {
      //   return (
      //     <StepForm
      //       {...props}
      //       getCategoryItem={props.getCategoryItem}
      //       formikProps={userDetailsFormikProps}
      //       step={step}
      //       fields={[]}
      //       summaryHandleStep={summaryHandleStep}
      //     />
      //   );
      // } else if (step === 9) {
      //   return (
      //     <StepForm
      //       {...props}
      //       formikProps={summaryFormikProps}
      //       step={step}
      //       fields={[]}
      //       summaryHandleStep={summaryHandleStep}
      //     />
      //   );
    } else {
      return (
        <GetStartedWrapper>
          <SignUpHeader>
            <AppTypeTitle
              customFont={theme.isSFM ? 'Canela' : undefined}
              variant="title3"
              weight="700"
            >
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
            Signing up is <b>free</b> and <b>complete</b> with {MAX_STEP - 2}{' '}
            simple steps
          </GetStartedTitle>

          {steps
            .filter(
              (i) => i.title !== 'Summary' && i.title !== 'Choose Your Plan'
            )
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
                  customFont={theme.isSFM ? 'Canela' : undefined}
                >
                  {steps[step - 1].title}
                </Title>
              </TitleContainer>

              {!isSeller && BUYER_STEP_SUBTITLE[step] && (
                <Typography
                  variant="label"
                  color="shade6"
                  weight="400"
                  style={{ marginLeft: isSmallScreen ? 0 : 35 }}
                >
                  {BUYER_STEP_SUBTITLE[step]}
                </Typography>
              )}

              {isSeller && SELLER_STEP_SUBTITLE[step] && (
                <Typography
                  variant="label"
                  color="shade6"
                  weight="400"
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
