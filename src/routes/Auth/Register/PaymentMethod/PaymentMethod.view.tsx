import React from 'react';

import Select from 'components/base/Select';
import { Amex, Mastercard, Visa } from 'components/base/SVG';
import FormikTextField from 'components/module/FormikTextField';
import COUNTRY_STATES from 'consts/countryStates';
import { connect } from 'formik';
import { Row, Col } from 'react-grid-system';
import { PlaceData } from 'types/PlaceData';
import { cardExpiryInputFilter } from 'utils/InputFilters/cardExpiryInputFilter';
import { cardNumberInputFilter } from 'utils/InputFilters/cardNumberInputFilter';
import { useTheme } from 'utils/Theme';

import {
  AUSTRALIA_COUNTRY_CODE,
  DEFAULT_NEW_ZEALAND_PROVINCES_CODE,
  NEW_ZEALAND_COUNTRY_CODE,
} from './PaymentMethod.constants';
import { PaymentMethodProps } from './PaymentMethod.props';
import {
  Container,
  CCImagesRow,
  CCImageCol,
  FormContainer,
  FormikRow,
} from './PaymentMethod.style';

export const PaymentMethod = connect((props: PaymentMethodProps) => {
  const {
    details,
    formik,
    otherErrors,
    setOtherErrors,
    updateRegistrationDetails,
  } = props;
  const theme = useTheme();
  const cardState = formik.initialValues.cardState;

  const states = COUNTRY_STATES.filter(({ isoCode, countryCode }) => {
    if (details.address?.countryCode === NEW_ZEALAND_COUNTRY_CODE) {
      if (DEFAULT_NEW_ZEALAND_PROVINCES_CODE.includes(isoCode)) {
        return (
          countryCode.toLowerCase() === NEW_ZEALAND_COUNTRY_CODE.toLowerCase()
        );
      } else return false;
    }

    return countryCode.toLowerCase() === AUSTRALIA_COUNTRY_CODE.toLowerCase();
  });

  const initialState = states.find((state) => state.isoCode === cardState);

  if (
    cardState.length > 3 &&
    details.address?.countryCode === NEW_ZEALAND_COUNTRY_CODE
  ) {
    const stateObj = states.find((state) => state.name.includes(cardState));

    const modifiedAddress: PlaceData = {
      ...details.address,
      administrativeAreaLevel1: stateObj?.isoCode || '',
    };
    updateRegistrationDetails({ address: modifiedAddress });
  }

  return (
    <Container>
      <CCImagesRow gutterWidth={8}>
        <CCImageCol xs="content">
          <div>
            <Visa height={32} />
          </div>
        </CCImageCol>
        <CCImageCol xs="content">
          <div>
            <Mastercard height={32} />
          </div>
        </CCImageCol>
        <CCImageCol xs="content">
          <div>
            <Amex height={32} />
          </div>
        </CCImageCol>
      </CCImagesRow>

      <FormContainer>
        <FormikRow nogutter>
          <Col>
            <FormikTextField
              borderRadius="12px"
              type="text"
              inputType="numeric"
              name="cardNumber"
              id="cardNumber"
              label="CARD NUMBER"
              color={theme.appType === 'seller' ? 'shade4' : 'shade6'}
              placeholder="•••• •••• •••• ••••"
              maxLength={19}
              onChangeText={(value) => {
                cardNumberInputFilter('cardNumber', value, formik);
                setOtherErrors({ cardNumber: '' });
              }}
              otherError={otherErrors.cardNumber}
            />
          </Col>
        </FormikRow>

        <FormikRow gutterWidth={16}>
          <Col>
            <FormikTextField
              borderRadius="12px"
              type="text"
              inputType="numeric"
              name="cardExpiryDate"
              id="cardExpiryDate"
              label="EXPIRY DATE"
              color={theme.appType === 'seller' ? 'shade4' : 'shade6'}
              placeholder="MM / YY"
              onChangeText={(value) => {
                cardExpiryInputFilter('cardExpiryDate', value, formik);
                setOtherErrors({ cardExpiryDate: '' });
              }}
              onKeyUp={(e) => {
                if (e.key === 'Backspace' || e.key === 'Delete') {
                  formik.setFieldValue('cardExpiryDate', '', false);
                }
              }}
              otherError={otherErrors.cardExpiryDate}
            />
          </Col>

          <Col>
            <FormikTextField
              borderRadius="12px"
              type="text"
              inputType="numeric"
              name="cardCvc"
              id="cardCvc"
              label="CVC"
              color={theme.appType === 'seller' ? 'shade4' : 'shade6'}
              placeholder="CVC"
              otherError={otherErrors.cardCvc}
              onChangeText={(value) => setOtherErrors({ cardCvc: '' })}
            />
          </Col>
        </FormikRow>

        <FormikRow nogutter>
          <Col>
            <FormikTextField
              borderRadius="12px"
              type="text"
              name="cardName"
              id="cardName"
              label="NAME ON CARD"
              color={theme.appType === 'seller' ? 'shade4' : 'shade6'}
              placeholder="Name on Card"
              otherError={otherErrors.cardName}
              onChangeText={(value) => setOtherErrors({ cardName: '' })}
            />
          </Col>
        </FormikRow>

        <FormikRow nogutter>
          <Col>
            <FormikTextField
              borderRadius="12px"
              type="text"
              name="cardBillingAddress"
              id="cardBillingAddress"
              label="BILLING ADDRESS"
              color={theme.appType === 'seller' ? 'shade4' : 'shade6'}
              placeholder="Billing Address"
              otherError={otherErrors.cardBillingAddress}
              onChangeText={(value) =>
                setOtherErrors({ cardBillingAddress: '' })
              }
            />
          </Col>
        </FormikRow>

        <FormikRow gutterWidth={16}>
          <Col>
            <FormikTextField
              borderRadius="12px"
              type="text"
              inputType="numeric"
              name="cardZipCode"
              id="cardZipCode"
              label="ZIP CODE"
              color={theme.appType === 'seller' ? 'shade4' : 'shade6'}
              otherError={otherErrors.cardZipCode}
              onChangeText={(value) => setOtherErrors({ cardZipCode: '' })}
            />
          </Col>

          <Col>
            <FormikTextField
              borderRadius="12px"
              type="text"
              inputType="numeric"
              name="cardCity"
              id="cardCity"
              label="CITY"
              color={theme.appType === 'seller' ? 'shade4' : 'shade6'}
              placeholder="City"
              otherError={otherErrors.cardCity}
              onChangeText={(value) => setOtherErrors({ cardCity: '' })}
            />
          </Col>
        </FormikRow>

        <FormikRow nogutter>
          <Col>
            <Select
              borderRadius="12px"
              label={
                details.address?.countryCode === NEW_ZEALAND_COUNTRY_CODE
                  ? 'PROVINCE'
                  : 'STATE'
              }
              placeholder={
                details.address?.countryCode === NEW_ZEALAND_COUNTRY_CODE
                  ? 'province'
                  : 'State'
              }
              value={initialState?.name}
              options={states.map((state) => ({
                value: state.isoCode,
                label: state.name,
              }))}
              onChange={(option) => {
                formik.setFieldValue('cardState', option.value, false);
              }}
              border={`1px solid ${theme.grey.shade5}`}
            />
          </Col>
        </FormikRow>
      </FormContainer>
    </Container>
  );
});
