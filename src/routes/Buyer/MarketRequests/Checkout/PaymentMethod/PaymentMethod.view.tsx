import React, { useState } from 'react';

import Alert from 'components/base/Alert';
import Breadcrumbs from 'components/base/Breadcrumbs';
import Button from 'components/base/Button';
import Checkbox from 'components/base/Checkbox/Checkbox.view';
import Radio from 'components/base/Radio';
import {
  Amex,
  InfoFilled,
  Mastercard,
  OrderPlaced,
  Visa,
} from 'components/base/SVG';
import TextField from 'components/base/TextField';
import TotalCard from 'components/base/TotalCard';
import Typography from 'components/base/Typography';
import ConfirmationModal from 'components/module/ConfirmationModal';
import LoadingOverlay from 'components/module/LoadingOverlay';
import { BREAKPOINTS } from 'consts/breakpoints';
import { BUYER_MARKET_REQUEST_ROUTES, BUYER_ROUTES } from 'consts/routes';
import { Col, Hidden, Row } from 'react-grid-system';
import { useSelector, useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import { CCImageRow } from 'routes/Buyer/Account/Card/Card.style';
import { marketRequestAcceptOfferActions } from 'store/actions';
import { AcceptOffer } from 'types/store/MarketOfferState';
import { Store } from 'types/store/Store';
import { useTheme } from 'utils/Theme';

import { PAYMENT_METHODS } from './PaymentMethod.constants';
import { PaymentMethodGeneratedProps } from './PaymentMethod.props';
import {
  Container,
  Method,
  BottomRow,
  Footer,
  CCImage,
  StyledCreditCard,
  StyledTotalCardColumn,
  OrderPlacedIconContainer,
} from './PaymentMethod.style';

const PaymentMethodView = (props: PaymentMethodGeneratedProps) => {
  const { cards, isLoading } = props;

  const theme = useTheme();
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
        onClickClose={() => props.onCloseConfirmedModal()}
        title="Thanks for your payment!"
        action={() => props.onConfirmSentOffer()}
        actionText="View Order"
        hideCancel={true}
        description={
          <>
            <OrderPlacedIconContainer>
              <OrderPlaced width={240} height={240} />
            </OrderPlacedIconContainer>
            <Typography
              style={{ marginBottom: 16 }}
              color="shade6"
              variant="body"
            >
              We have successfully processed your transaction.
            </Typography>
            <Typography
              style={{ marginBottom: 16 }}
              color="shade6"
              variant="body"
            >
              An order has been generated and the seller will begin preparing
              your product.
            </Typography>
            <Typography
              style={{ marginBottom: 16 }}
              color="shade6"
              variant="body"
            >
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
        altFont
      >
        Select Payment Method
      </Typography>

      <Row>
        <Col>
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
                    alt=""
                  />
                  <div>
                    <Typography
                      variant={isMobile ? 'label' : 'body'}
                      align="center"
                    >
                      {p.label}
                    </Typography>
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
        </BottomRow>
      ) : (
        <Footer>
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
        style={{ padding: 32 }}
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
                exp_month: parseInt(expiryDate.split('/')[0]),
                exp_year: parseInt(expiryDate.split('/')[1]),
                cvc,
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
