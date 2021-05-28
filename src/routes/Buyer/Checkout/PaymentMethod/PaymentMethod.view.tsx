import React, { useRef, useState } from 'react';

import Alert from 'components/base/Alert';
import Breadcrumbs from 'components/base/Breadcrumbs/Breadcrumbs.view';
import Button from 'components/base/Button';
import Checkbox from 'components/base/Checkbox/Checkbox.view';
import Radio from 'components/base/Radio';
import SegmentedControls from 'components/base/SegmentedControls/SegmentedControls.view';
import { Amex, Cart, Mastercard, Visa } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { BoxContainer } from 'components/layout/BoxContainer';
import ConfirmationModal from 'components/module/ConfirmationModal';
import FormikTextField from 'components/module/FormikTextField';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Form, Formik, connect, FormikProps } from 'formik';
import { Col, Row } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import {
  PAYMENT_METHODS,
  TABS,
} from 'routes/Buyer/Checkout/PaymentMethod/PaymentMethod.constants';
import { toPrice } from 'utils/String/toPrice';
import { useTheme } from 'utils/Theme';

import {
  CardDetails,
  PaymentMethodGeneratedProps,
} from './PaymentMethod.props';
import {
  Container,
  Method,
  BottomRow,
  Footer,
  CCImage,
  CreditCardInteraction,
  MobileTopRow,
} from './PaymentMethod.style';
import { isValid } from './PaymentMethod.validation';

//TODO: refactor with field set card
const CardFields = (props: { formik?: any }) => {
  const { formik } = props;

  return (
    <>
      <Row>
        <Col className="form-card-col" md={12} xl={10}>
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
        <Col className="form-card-col" xs={6} md={12} lg={6} xl={5}>
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
        <Col className="form-card-col" xs={6} md={12} lg={6} xl={5}>
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
        <Col className="form-card-col" md={12} lg={6} xl={10}>
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
  const {
    cards,
    cardDetails,
    setCardDetails,
    processingOrder,
    isLoading,
  } = props;
  const theme = useTheme();

  const formRef = useRef<FormikProps<CardDetails>>(null);

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'account' | 'card' | ''>(
    ''
  );
  const [currentTab, setCurrentTab] = useState(TABS[0]);

  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });
  const isTablet = useMediaQuery({ query: BREAKPOINTS['genericTablet'] });

  return (
    <Container>
      <BoxContainer>
        <div className="breadcrumb-container">
          <Breadcrumbs
            sections={[
              { label: 'Orders', onClick: props.onBack },
              {
                label: 'Payment Method',
                ...(paymentMethod === 'card'
                  ? { onClick: () => setPaymentMethod('') }
                  : {}),
              },
              ...(paymentMethod === 'card'
                ? [
                    {
                      label: 'Credit Card',
                    },
                  ]
                : []),
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

        {props.addCardAndPayError && (
          <div className="box-error-container">
            <Alert
              fullWidth
              alignText="center"
              variant="error"
              content={props.addCardAndPayError}
            />
          </div>
        )}

        {isMobile && (paymentMethod === 'card' || paymentMethod === 'account') && (
          <MobileTopRow>
            {PAYMENT_METHODS.map((p) => (
              <div
                key={p.label}
                className={`method ${
                  p.value === paymentMethod ? 'method-active' : ''
                }`}
                onClick={() => {
                  if (p.disabled) return;
                  setPaymentMethod(p.value as any);
                }}
              >
                <img src={p.img} style={{ width: p.mTopWidth }} />
                <Typography variant="caption" align="center" weight="400">
                  {p.label}
                </Typography>
              </div>
            ))}
          </MobileTopRow>
        )}

        {(paymentMethod === '' ||
          (paymentMethod === 'account' && !isMobile)) && (
          <Row className="payment-methods" align="center" justify="between">
            {PAYMENT_METHODS.map(({ disabled, ...p }) => (
              <Col
                key={p.label}
                width={isTablet || isMobile ? '50%' : 225}
                className="payment-method-col"
              >
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
                  <img
                    src={p.img}
                    style={{ width: isMobile ? p.mWidth : 'inherit' }}
                  />
                  <div>
                    <Typography
                      variant={isMobile ? 'label' : 'body'}
                      align="center"
                    >
                      {p.label}
                    </Typography>
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
          <Row style={{ marginBottom: 24 }}>
            {isMobile && (
              <Col style={{ marginBottom: 12 }}>
                <SegmentedControls
                  options={TABS}
                  selectedOption={currentTab}
                  onClickControl={(value) => {
                    props.setSelectedCard('');
                    setCurrentTab(value);
                  }}
                />
              </Col>
            )}

            {currentTab === TABS[0] ? (
              <Col md={12} xl={6}>
                <div className="cc-image-row">
                  <CCImage>
                    <Visa height={32} />
                  </CCImage>
                  <CCImage>
                    <Mastercard height={32} />
                  </CCImage>
                  <CCImage>
                    <Amex height={32} />
                  </CCImage>
                </div>

                <Formik
                  innerRef={formRef}
                  initialValues={cardDetails}
                  onSubmit={(values: CardDetails) => {
                    const finalValues = {
                      ...values,
                      isDefault: cardDetails.isDefault,
                    };
                    props.onAddCard(finalValues);
                  }}
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
                      setCardDetails({
                        isDefault: !cardDetails.isDefault,
                      });
                    }}
                  />
                </div>
              </Col>
            ) : (
              <Col xs={12}>
                {!isMobile && (
                  <Typography className="cc-title" variant="copy">
                    Credit Cards
                  </Typography>
                )}

                {cards.map((card) => (
                  <CreditCardInteraction
                    key={card.id}
                    {...card}
                    type="radio"
                    pressed={props.selectedCard === card.id}
                    onClick={() =>
                      props.setSelectedCard((prevState) => {
                        if (prevState === card.id) return '';
                        else return card.id;
                      })
                    }
                  />
                ))}
              </Col>
            )}

            {!isMobile && (
              <Col md={12} xl={6}>
                <Typography className="cc-title" variant="copy">
                  Credit Cards
                </Typography>

                {cards.map((card) => (
                  <CreditCardInteraction
                    key={card.id}
                    {...card}
                    type="radio"
                    pressed={props.selectedCard === card.id}
                    onClick={() =>
                      props.setSelectedCard((prevState) => {
                        if (prevState === card.id) return '';
                        else return card.id;
                      })
                    }
                  />
                ))}
              </Col>
            )}
          </Row>
        )}

        {!isMobile ? (
          <BottomRow>
            <div className="btns-container">
              <Button
                className="pay-btn"
                text={
                  paymentMethod === 'card'
                    ? 'Pay using credit card'
                    : 'Pay using this method'
                }
                disabled={
                  processingOrder ||
                  isLoading ||
                  paymentMethod === '' ||
                  (paymentMethod === 'account' &&
                    Number(props.balance) < Number(props.totalValue))
                }
                loading={processingOrder || isLoading}
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
                  {toPrice(props.totalValue)}
                </Typography>
              </div>

              <Cart fill={theme.grey.shade4} />
            </div>
          </BottomRow>
        ) : (
          <Footer>
            <div className="balances">
              <div>
                <Typography variant="caption" color="shade6" weight="400">
                  Credit Balance
                </Typography>
                <Typography color="shade6" weight="400">
                  {toPrice(props.balance)}
                </Typography>
              </div>

              <div className="total-value">
                <Typography
                  variant="caption"
                  color="shade6"
                  weight="400"
                  align="right"
                >
                  Total
                </Typography>
                <Typography
                  variant="body"
                  weight="bold"
                  align="right"
                  color="shade9"
                >
                  {toPrice(props.totalValue)}
                </Typography>
              </div>
            </div>

            <div className="btns-container">
              <Button
                className="pay-btn"
                text={
                  paymentMethod === 'card'
                    ? 'Pay using credit card'
                    : 'Pay using this method'
                }
                disabled={
                  processingOrder ||
                  isLoading ||
                  paymentMethod === '' ||
                  (paymentMethod === 'account' &&
                    Number(props.balance) < Number(props.totalValue)) ||
                  (currentTab === TABS[1] && !props.selectedCard)
                }
                loading={processingOrder || isLoading}
                onClick={() => setShowConfirmationModal(true)}
                takeFullWidth
              />
            </div>
          </Footer>
        )}

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

            if (paymentMethod === 'card') {
              if (props.selectedCard) {
                props.onExistingCard();
              } else if (formRef.current) {
                formRef.current.handleSubmit();
              }
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
