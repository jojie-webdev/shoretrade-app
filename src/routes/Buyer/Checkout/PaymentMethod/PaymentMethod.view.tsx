import React, { useState } from 'react';

// import { useTheme } from 'utils/Theme';
import Alert from 'components/base/Alert';
import Breadcrumbs from 'components/base/Breadcrumbs/Breadcrumbs.view';
import Button from 'components/base/Button';
import Checkbox from 'components/base/Checkbox/Checkbox.view';
import Radio from 'components/base/Radio';
import {
  Amex,
  Cart,
  Mastercard,
  Paypal,
  Visa,
  Zippay,
} from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { BoxContainer } from 'components/layout/BoxContainer';
import ConfirmationModal from 'components/module/ConfirmationModal';
import FormikTextField from 'components/module/FormikTextField';
import { Form, Formik, connect } from 'formik';
import { Col, Row } from 'react-grid-system';
import accountCredit from 'res/images/pm-account-credit.svg';
import credit from 'res/images/pm-credit.svg';
import finance from 'res/images/pm-finance-invoice.svg';
import payLater from 'res/images/pm-pay-later.svg';
import { toPrice } from 'utils/String/toPrice';
import { useTheme } from 'utils/Theme';

import {
  CardDetails,
  PaymentMethodGeneratedProps,
} from './PaymentMethod.props';
import { Container, Method, CCImage } from './PaymentMethod.style';
import { isValid } from './PaymentMethod.validation';

const PAYMENT_METHODS = [
  { label: 'Account Credit', value: 'account', img: accountCredit },
  { label: 'Credit Card', value: 'card', img: credit },
  { label: 'Buy Now, Pay Later', value: '', img: payLater, disabled: true },
  { label: 'Finance & Invoice', value: '', img: finance, disabled: true },
];

//TODO: refactor with field set card
const CardFields = (props: { formik?: any }) => {
  const { formik } = props;

  return (
    <>
      <Row>
        <Col className="form-card-col" md={12} xl={4}>
          <FormikTextField
            type="text"
            name="number"
            id="number"
            label="CARD NUMBER"
            placeholder="•••• •••• •••• ••••"
            maxLength={19}
            onChangeText={(value) => {
              const digits = value.trim().replace(/\s/g, '');
              const isMaxLen = digits.length > 16;

              if (digits.length == 16) {
                // formik.setFieldValue('number', value, false);
                const visaString =
                  digits.substring(0, 4) +
                  ' ' +
                  digits.substring(4, 8) +
                  ' ' +
                  digits.substring(8, 12) +
                  ' ' +
                  digits.substring(12);
                formik.setFieldValue('number', visaString.trim(), false);
              } else if (digits.length === 15) {
                const amexString =
                  digits.substring(0, 4) +
                  ' ' +
                  digits.substring(4, 10) +
                  ' ' +
                  digits.substring(10, 15) +
                  ' ' +
                  digits.substring(15);
                formik.setFieldValue('number', amexString.trim(), false);
              } else if (isMaxLen) {
                // Prevent value to exceed 16 digits + 3 spaces
                formik.setFieldValue(
                  'number',
                  value.slice(0, 19).trim(),
                  false
                );
              }
            }}
          />
        </Col>
      </Row>

      <Row>
        <Col className="form-card-col" md={12} lg={6} xl={2}>
          <FormikTextField
            type="text"
            name="exp"
            id="exp"
            label="EXPIRY DATE"
            placeholder="MM / YY"
            onChangeText={(value) => {
              const text = value.trim().replace(/\s/g, '');
              const isFirstHalf = value.length === 2;
              const isMaxLen = text.replace('/', '').length >= 4;

              if (isFirstHalf) {
                formik.setFieldValue('exp', value + ' / ', false);
              } else if (isMaxLen) {
                formik.setFieldValue('exp', value.substr(0, 7), false);
              }
            }}
            onKeyUp={(e) => {
              if (e.key === 'Backspace' || e.key === 'Delete') {
                formik.setFieldValue('exp', '', false);
              }
            }}
          />
        </Col>
        <Col className="form-card-col" md={12} lg={6} xl={2}>
          <FormikTextField
            type="text"
            name="cvc"
            id="cvc"
            label="CVC"
            placeholder="CVC"
          />
        </Col>
      </Row>

      <Row>
        <Col className="form-card-col" md={12} lg={6} xl={4}>
          <FormikTextField
            type="text"
            name="name"
            id="name"
            label="NAME ON CARD"
            placeholder="Name on Card"
          />
        </Col>
      </Row>
    </>
  );
};

const ConnectedCardFields = connect(CardFields);

const PaymentMethodView = (props: PaymentMethodGeneratedProps) => {
  const { cardDetails, setCardDetails } = props;
  const theme = useTheme();

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'account' | 'card' | ''>(
    ''
  );

  return (
    <Container>
      <BoxContainer>
        <div className="breadcrumb-container">
          <Breadcrumbs
            sections={[
              { label: 'Orders', onClick: props.onBack },
              {
                label: 'Payment Method',
              },
            ]}
          />
        </div>

        {props.orderError && (
          <div className="box-error-container">
            <Alert
              fullWidth
              alignText="center"
              variant="error"
              content={props.orderError}
            />
          </div>
        )}

        {(paymentMethod === '' || paymentMethod === 'account') && (
          <Row className="payment-methods" align="center" justify="between">
            {PAYMENT_METHODS.map(({ disabled, ...p }) => (
              <Col key={p.label} width={225}>
                <Method
                  onClick={() => setPaymentMethod(p.value as any)}
                  disabled={disabled}
                >
                  <div className="radio">
                    {disabled ? (
                      <div className="disabled-radio" />
                    ) : (
                      <Radio checked={paymentMethod === p.value} />
                    )}
                  </div>
                  <img src={p.img} />
                  <div>
                    <Typography align="center">{p.label}</Typography>
                    <Typography
                      variant="overlineSmall"
                      color="shade5"
                      align="center"
                      style={{
                        opacity: disabled ? 1 : 0,
                      }}
                    >
                      COMING SOON
                    </Typography>
                  </div>
                </Method>
              </Col>
            ))}
          </Row>
        )}

        {paymentMethod === 'card' && (
          <>
            <div className="cc-image-row">
              <CCImage>
                <Visa height={32} />
              </CCImage>
              <CCImage>
                <Mastercard height={32} />
              </CCImage>
              <CCImage>
                <Zippay height={32} />
              </CCImage>
              <CCImage>
                <Paypal height={32} />
              </CCImage>
              <CCImage>
                <Amex height={32} />
              </CCImage>
            </div>

            <Formik
              initialValues={cardDetails}
              onSubmit={(values: CardDetails) => {}}
              validate={isValid}
            >
              <Form>
                <ConnectedCardFields />
              </Form>
            </Formik>

            <div className="form-card-checkbox">
              <Checkbox
                label="Set as default card"
                name="isDefault"
                checked={cardDetails.isDefault}
                onClick={() => {
                  setCardDetails({ isDefault: !cardDetails.isDefault });
                }}
              />
            </div>
          </>
        )}

        <div className="bottom-row">
          <div className="btns-container">
            <Button
              className="back-btn"
              variant="outline"
              text="Back"
              disabled={props.processingOrder}
              onClick={() => {
                if (paymentMethod === 'card') {
                  setPaymentMethod('');
                } else {
                  props.onBack();
                }
              }}
            />
            <Button
              className="pay-btn"
              text={
                paymentMethod === 'card'
                  ? 'Pay using credit card'
                  : 'Pay using this method'
              }
              disabled={props.processingOrder}
              loading={props.processingOrder}
              onClick={() => setShowConfirmationModal(true)}
            />
          </div>

          <div className="balances">
            <div>
              <Typography variant="overline" color="shade6">
                CREDIT BALANCE
              </Typography>
              <Typography
                variant="title6"
                weight="bold"
                align="right"
                color="shade6"
              >
                {toPrice(props.balance)}
              </Typography>
            </div>

            <div className="total-value">
              <Typography variant="overline" color="shade6">
                TOTAL VALUE
              </Typography>
              <Typography
                variant="title6"
                weight="bold"
                align="right"
                color="shade9"
              >
                ${props.total}
              </Typography>
            </div>

            <Cart fill={theme.grey.shade4} />
          </div>
        </div>

        <ConfirmationModal
          title="Final Order Confirmation?"
          description="Just confirming you want to place this order?"
          isOpen={showConfirmationModal}
          onClickClose={() => {
            setShowConfirmationModal(false);
          }}
          cancel={() => {
            setShowConfirmationModal(false);
          }}
          action={() => {
            setShowConfirmationModal(false);

            if (paymentMethod === 'account') {
              props.placeOrder();
            }
          }}
          actionText="Proceed"
          cancelText="Keep Shopping"
        />
      </BoxContainer>
    </Container>
  );
};

export default PaymentMethodView;
