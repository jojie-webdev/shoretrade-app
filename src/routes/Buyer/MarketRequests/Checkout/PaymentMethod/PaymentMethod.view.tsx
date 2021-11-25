import React, { useRef, useState } from 'react';

import Alert from 'components/base/Alert';
import Breadcrumbs from 'components/base/Breadcrumbs';
import Button from 'components/base/Button';
import Checkbox from 'components/base/Checkbox/Checkbox.view';
import Radio from 'components/base/Radio';
import SegmentedControls from 'components/base/SegmentedControls/SegmentedControls.view';
import {
  Amex,
  InfoFilled,
  Mastercard,
  Paypal,
  Visa,
  Zippay,
} from 'components/base/SVG';
import TextField from 'components/base/TextField';
import TotalCard from 'components/base/TotalCard';
import Typography from 'components/base/Typography';
import ConfirmationModal from 'components/module/ConfirmationModal';
import FormikTextField from 'components/module/FormikTextField';
import LoadingOverlay from 'components/module/LoadingOverlay';
import { BREAKPOINTS } from 'consts/breakpoints';
import { BUYER_MARKET_REQUEST_ROUTES, BUYER_ROUTES } from 'consts/routes';
import { connect, FormikProps } from 'formik';
import { Col, Hidden, Row } from 'react-grid-system';
import { useSelector, useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { useHistory, useLocation } from 'react-router';
import { useParams } from 'react-router-dom';
import { CCImageRow } from 'routes/Buyer/Account/Card/Card.style';
import { marketRequestAcceptOfferActions } from 'store/actions';
import { AcceptOffer } from 'types/store/MarketOfferState';
import { Store } from 'types/store/Store';
import { toPrice } from 'utils/String/toPrice';
import { useTheme } from 'utils/Theme';

import { ROUTES } from './../../../../index.routes';
import { PAYMENT_METHODS, TABS } from './PaymentMethod.constants';
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
  MobileTopRow,
  StyledCreditCard,
  StyledTotalCardColumn,
} from './PaymentMethod.style';

//TODO: refactor with field set card
const CardFields = (props: { formik?: any }) => {
  const { formik } = props;

  return (
    <>
      <Row>
        <Col className="form-card-col" md={12} xl={10}>
          <FormikTextField
            type="text"
            inputType="numeric"
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
            inputType="numeric"
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
            inputType="numeric"
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
  const { cards, cardDetails, setCardDetails, isLoading } = props;

  const theme = useTheme();

  const formRef = useRef<FormikProps<CardDetails>>(null);

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'account' | 'card' | ''>(
    ''
  );

  const [isDefault, setIsDefault] = useState<boolean>(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCVC] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');

  const marketOffer = useSelector((store: Store) => store.marketOffer);

  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });
  const isTablet = useMediaQuery({ query: BREAKPOINTS['genericTablet'] });

  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams<{ id: string }>();
  const { id } = params;

  const renderBrand = (brand: string) => {
    brand = brand ? brand.toLowerCase() : '';

    switch (brand) {
      case 'visa':
        return <Visa />;
      case 'mastercard':
        return <Mastercard />;
      case 'zippay':
        return <Zippay />;
      case 'paypal':
        return <Paypal />;
      case 'american express':
        return <Amex />;
      default:
        return null;
    }
  };

  const offerBreadCrumb = [
    { label: 'My Requests', link: BUYER_ROUTES.MARKET_REQUESTS },
    {
      label: 'Request Details',
      onClick: () => {
        history.push(BUYER_MARKET_REQUEST_ROUTES.MARKET_REQUEST_DETAILS(id));
      },
    },
    {
      label: 'Offer Details',
      onClick: () => {
        props.onBack();
      },
    },
    {
      label: 'Payment',
    },
  ];

  return (
    <Container>
      <ConfirmationModal
        isOpen={props.showPaymentSuccessModal}
        onClickClose={() => props.onConfirmSentOffer()}
        title="Thanks for your payment!"
        action={() => props.onCloseConfirmedModal()}
        actionText="View Order"
        hideCancel={true}
        description={
          <>
            <Typography color="shade8" variant="body">
              We have successfully processed your transaction.
            </Typography>
            <Typography color="shade8" variant="body">
              An order has been generated and the seller will begin preparing
              your product.
            </Typography>
            <Typography color="shade8" variant="body">
              We will let you know when your order is on its way.
            </Typography>
          </>
        }
      />
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
            content={`Payment unsuccessful: ${props.addCardAndPayError}`}
          />
        </div>
      )}

      <Hidden xs sm>
        <div style={{ marginBottom: 24 }}>
          <Breadcrumbs sections={offerBreadCrumb} />
        </div>
      </Hidden>

      <Typography
        className="header-text"
        variant="title5"
        weight="700"
        color="shade9"
      >
        Select Payment Method
      </Typography>

      <Row>
        <Col>
          {/* {isMobile && (
            <MobileTopRow>
              {PAYMENT_METHODS.map((p) => (
                <div
                  key={p.label}
                  className={`method ${
                    p.value === paymentMethod ? 'method-active' : ''
                  }`}
                  onClick={() => {
                    // if (p.disabled) return;
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
          )} */}

          <Row
            className="payment-methods"
            align="center"
            justify="start"
            style={{ zIndex: 0 }}
          >
            {PAYMENT_METHODS.map(({ ...p }) => (
              <Col
                id="col"
                key={p.label}
                width={isTablet || isMobile ? '50%' : 255}
                className="payment-method-col"
              >
                <Method
                  id="method"
                  onClick={() => setPaymentMethod(p.value as any)}
                  disabled={false}
                  style={{ boxShadow: '0px 6px 12px rgba(41, 43, 50, 0.12)' }}
                >
                  <div className="radio">
                    <Radio checked={paymentMethod === p.value} />
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
                    {/* <Typography
                        variant="overlineSmall"
                        color="shade5"
                        align="center"
                      >
                        ADDITIONAL INFO
                      </Typography> */}
                  </div>
                </Method>
                {!isMobile && (
                  <div className="tooltip">
                    <InfoFilled
                      width={20}
                      height={20}
                      fill={theme.brand.info}
                    />
                    <span className="tooltip-text">{p.verbiage}</span>
                  </div>
                )}
              </Col>
            ))}
          </Row>
        </Col>

        {!(isMobile && paymentMethod === 'card') && (
          <StyledTotalCardColumn lg={4}>
            <TotalCard
              totalOrderValue={props.totalValue}
              removeCredits={paymentMethod !== 'account'}
            />
          </StyledTotalCardColumn>
        )}
      </Row>

      {paymentMethod === 'card' && (
        <Row style={{ marginBottom: 24 }}>
          {/* {isMobile && (
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
          )} */}

          <Col lg={9}>
            <Typography color="shade6" variant="label">
              Your saved Credit Cards
            </Typography>

            {cards.map((card) => (
              <StyledCreditCard
                key={card.id}
                {...card}
                type="radio"
                pressed={props.selectedCard === card.id}
                onClick={() => {
                  props.setSelectedCard((prevState) => {
                    if (prevState === card.id) return '';
                    else return card.id;
                  });
                }}
              />
            ))}

            <Typography
              color="shade6"
              variant="label"
              style={{ marginTop: '40px' }}
            >
              Add new Credit Card
            </Typography>

            <div style={{ marginTop: '15px', display: 'flex' }}>
              <CCImageRow>
                <CCImage>
                  <Visa height={32} />
                </CCImage>
                <CCImage>
                  <Mastercard height={32} />
                </CCImage>
                <CCImage>
                  <Amex height={32} />
                </CCImage>
              </CCImageRow>
            </div>

            {/* <Typography
              color="shade6"
              variant="small"
              style={{ marginTop: '15px' }}
            >
              CARD NUMBER
            </Typography> */}
            <TextField
              label="CARD NUMBER"
              borderRadius="15px"
              style={{
                marginTop: '20px',
              }}
              value={cardNumber}
              maxLength={19}
              onChange={(e) => {
                setCardNumber(e.target.value);
              }}
              onKeyDown={(e) => {
                const { keyCode, key } = e;
                if (isNaN(parseInt(key))) {
                  return;
                }

                if (keyCode === 8) {
                  setCardNumber((value) => value);
                  return;
                }

                if (cardNumber || cardNumber === ' ') {
                  if (
                    cardNumber.length === 4 ||
                    cardNumber.length === 9 ||
                    cardNumber.length === 14
                  ) {
                    setCardNumber((value) => value + ' ');
                  }
                }
              }}
              placeholder="**** **** **** ****"
            />

            <div style={{ display: 'flex' }}>
              <TextField
                label="EXPIRY DATE"
                borderRadius="15px"
                style={{
                  width: '150px',
                  marginTop: '15px',
                  marginRight: '15px',
                }}
                value={expiryDate}
                maxLength={5}
                onChange={(e) => {
                  const { value } = e.target;
                  const splits = value.split('');
                  const lastInput = splits[splits.length - 1];

                  if (
                    !isNaN(parseInt(splits.pop() || '0')) &&
                    parseInt(splits.pop() || '0') === 0
                  ) {
                    setExpiryDate(e.target.value);
                  } else {
                    if (
                      !isNaN(parseInt(lastInput)) &&
                      parseInt(lastInput) > 2 &&
                      value.length === 2
                    ) {
                      return;
                    }

                    if (
                      !isNaN(parseInt(lastInput)) &&
                      parseInt(lastInput) > 1 &&
                      value.length === 1
                    ) {
                      return;
                    }
                  }

                  setExpiryDate(e.target.value);
                }}
                onKeyDown={(e) => {
                  const { keyCode, key } = e;
                  if (isNaN(parseInt(key))) {
                    return;
                  }

                  if (keyCode === 8) {
                    setExpiryDate((value) => value);
                    return;
                  }

                  if (expiryDate || expiryDate === ' ') {
                    if (expiryDate.length === 2) {
                      setExpiryDate((value) => value + '/');
                    }
                  }
                }}
                placeholder="MM/YY"
              />
              <TextField
                label="CVC"
                borderRadius="15px"
                style={{
                  width: '150px',
                  marginTop: '15px',
                }}
                value={cvc}
                maxLength={4}
                onChange={(e) => {
                  setCVC(e.target.value);
                }}
                placeholder="123"
              />
            </div>

            <TextField
              label="NAME ON CARD"
              borderRadius="5px"
              style={{
                marginTop: '15px',
              }}
              value={nameOnCard}
              onChange={(e) => {
                setNameOnCard(e.target.value);
              }}
            />

            <div style={{ display: 'flex', marginTop: '15px' }}>
              <Checkbox
                onClick={() => setIsDefault(!isDefault)}
                className="checkbox"
                checked={isDefault}
              />
              <Typography
                weight="700"
                variant="label"
                color="shade9"
                style={{ marginLeft: '8px', fontFamily: 'Basis Grotesque Pro' }}
              >
                Set as default card
              </Typography>
            </div>
          </Col>

          {/* {currentTab === TABS[0] ? (
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
          )}*/}
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
              disabled={isLoading || paymentMethod === ''}
              onClick={() => setShowConfirmationModal(true)}
              style={{ borderRadius: '12px', marginTop: '20px' }}
            />
          </div>

          {/* <div className="balances">
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
          </div> */}
        </BottomRow>
      ) : (
        <Footer>
          {/* <div className="balances">
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
          </div> */}

          <div className="btns-container">
            <Button
              className="pay-btn"
              text={
                paymentMethod === 'card'
                  ? 'Pay using credit card'
                  : 'Pay using this method'
              }
              disabled={
                isLoading ||
                paymentMethod === '' ||
                (paymentMethod === 'card' && !props.selectedCard)
              }
              onClick={() => setShowConfirmationModal(true)}
              takeFullWidth
            />
          </div>
        </Footer>
      )}

      <ConfirmationModal
        title="Final Order Confirmation"
        description="Press proceed to confirm you want to place this order."
        isOpen={showConfirmationModal}
        onClickClose={() => {
          setShowConfirmationModal(false);
        }}
        cancel={() => {
          setShowConfirmationModal(false);
        }}
        action={() => {
          setShowConfirmationModal(false);

          const processCheckoutWithExistingCard = () => {
            const payload: AcceptOffer = {
              marketOfferId: marketOffer.marketOfferId.toString(),
              marketNegotiationId: marketOffer.marketNegotiationId.toString(),
              marketRequestId: marketOffer.marketRequestId.toString(),
              existingCard: props.selectedCard,
              paymentMode: 'CREDIT_CARD',
            };

            dispatch(marketRequestAcceptOfferActions.request(payload));
          };

          const processCheckoutWithNewCard = () => {
            const payload: AcceptOffer = {
              marketOfferId: marketOffer.marketOfferId.toString(),
              marketNegotiationId: marketOffer.marketNegotiationId.toString(),
              marketRequestId: marketOffer.marketRequestId.toString(),
              default: isDefault,
              paymentMode: 'CREDIT_CARD',
              card: {
                number: parseInt(cardNumber.replaceAll(/\s/g, '')),
                exp_month: expiryDate.split('/')[0],
                exp_year: expiryDate.split('/')[1],
                cvc: parseInt(cvc),
                name: nameOnCard,
              },
            };

            dispatch(marketRequestAcceptOfferActions.request(payload));
          };

          const processCheckoutWithAccount = () => {
            if (marketOffer && marketOffer.marketOfferId) {
              const payload: AcceptOffer = {
                marketOfferId: marketOffer.marketOfferId.toString(),
                marketNegotiationId: marketOffer.marketNegotiationId.toString(),
                marketRequestId: marketOffer.marketRequestId.toString(),
                paymentMode: 'ACCT_CRED',
              };

              dispatch(marketRequestAcceptOfferActions.request(payload));
            }
          };

          if (paymentMethod === 'account') {
            processCheckoutWithAccount();
          }

          if (paymentMethod === 'card') {
            if (props.selectedCard) {
              processCheckoutWithExistingCard();
            } else {
              processCheckoutWithNewCard();
            }
          }
        }}
        actionText="Proceed"
        cancelText="Cancel"
      />

      {isLoading && <LoadingOverlay />}
    </Container>
  );
};

export default PaymentMethodView;
