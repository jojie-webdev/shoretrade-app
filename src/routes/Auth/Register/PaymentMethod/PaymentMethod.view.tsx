import React from 'react';

import { Amex, Mastercard, Visa } from 'components/base/SVG';
import FormikTextField from 'components/module/FormikTextField';
import { connect } from 'formik';
import { Row, Col } from 'react-grid-system';
import { cardExpiryInputFilter } from 'utils/InputFilters/cardExpiryInputFilter';
import { cardNumberInputFilter } from 'utils/InputFilters/cardNumberInputFilter';
import { useTheme } from 'utils/Theme';

import { PaymentMethodProps } from './PaymentMethod.props';
import {
  Container,
  CCImagesRow,
  CCImageCol,
  FormContainer,
  FormikRow,
} from './PaymentMethod.style';

export const PaymentMethod = connect((props: PaymentMethodProps) => {
  const { formik, otherErrors, setOtherErrors } = props;
  const theme = useTheme();

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
            <FormikTextField
              borderRadius="12px"
              type="text"
              name="cardState"
              id="cardState"
              label="STATE"
              color={theme.appType === 'seller' ? 'shade4' : 'shade6'}
              placeholder="State"
              otherError={otherErrors.cardState}
              onChangeText={(value) => setOtherErrors({ cardState: '' })}
            />
          </Col>
        </FormikRow>
      </FormContainer>
    </Container>
  );
});
