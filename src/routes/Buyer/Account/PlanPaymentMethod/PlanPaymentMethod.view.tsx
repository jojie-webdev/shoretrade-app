import React, { useReducer, useState } from 'react';

import Breadcrumbs from 'components/base/Breadcrumbs';
import Button from 'components/base/Button';
import Checkbox from 'components/base/Checkbox';
import SegmentedControls from 'components/base/SegmentedControls';
import { Amex, Mastercard, TrashCan, Visa, Pen } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import FormikTextField from 'components/module/FormikTextField';
import { BUYER_ACCOUNT_ROUTES } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Form, Formik, useFormikContext } from 'formik';
import { Col, Row } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router-dom';
import { createUpdateReducer } from 'utils/Hooks';
import { cardExpiryInputFilter } from 'utils/InputFilters/cardExpiryInputFilter';
import { cardNumberInputFilter } from 'utils/InputFilters/cardNumberInputFilter';
import { useTheme } from 'utils/Theme';

import { PlanPaymentMethodGeneratedProps } from './PlanPaymentMethod.props';
import {
  BreadcrumbsContainer,
  ButtonMobileContainer,
  CCImageCol,
  Container,
  CreditCardInteraction,
  FormContainer,
  FormikRow,
} from './PlanPaymentMethod.style';
import { validateCard } from './PlanPaymentMethod.validation';

const PlanPaymentMethodView = ({
  cards,
  amountDue,
  selectedCardId,
  isPaymentLoading,
  payPlanAmountDue,
  setSelectedCardId,
  onRemoveCard,
  defaultCard,
}: PlanPaymentMethodGeneratedProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });
  const history = useHistory();

  const [isDefault, setIsDefault] = useState(false);
  const [mobileActiveTab, setMobileActiveTab] = useState(
    amountDue !== undefined ? 'Add' : 'Existing'
  );
  const [otherErrors, setOtherErrors] = useReducer(
    createUpdateReducer<Record<string, string>>(),
    {}
  );

  const showExistingTab = mobileActiveTab === 'Existing';
  const hasCards = cards.length > 0;

  return (
    <Container>
      <BreadcrumbsContainer>
        <Breadcrumbs
          sections={[
            { label: 'Account', link: BUYER_ACCOUNT_ROUTES.LANDING },
            {
              label: 'Your Plan',
              link: BUYER_ACCOUNT_ROUTES.SUBSCRIPTION_PLAN,
            },
            {
              label: 'Credit Card',
            },
          ]}
        />
      </BreadcrumbsContainer>
      <Formik
        initialValues={{
          cardNumber: '',
          cardExpiryDate: '',
          cardCvc: '',
          cardName: '',
          isDefault: false,
        }}
        validate={(values) =>
          (!isMobile && !selectedCardId) || (isMobile && !showExistingTab)
            ? validateCard(values)
            : undefined
        }
        onSubmit={(values, actions) => {
          payPlanAmountDue(values);
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            {isMobile && hasCards && (
              <Row style={{ marginBottom: 24 }}>
                <Col>
                  <SegmentedControls
                    options={['Add', 'Existing']}
                    selectedOption={mobileActiveTab}
                    onClickControl={(value) => {
                      setSelectedCardId('');
                      if (!amountDue) {
                        setMobileActiveTab(value);
                      }
                    }}
                  />
                </Col>
              </Row>
            )}

            <Row gutterWidth={96}>
              {(!isMobile || (isMobile && !showExistingTab)) && amountDue && (
                <Col xs={12} sm={6}>
                  <Typography variant="copy" style={{ marginBottom: 24 }}>
                    Pay the amount due: <b>{amountDue}</b>
                  </Typography>
                  <Row gutterWidth={8}>
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
                  </Row>

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
                          color={
                            theme.appType === 'seller' ? 'shade4' : 'shade6'
                          }
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
                          color={
                            theme.appType === 'seller' ? 'shade4' : 'shade6'
                          }
                          placeholder="MM / YY"
                          onChangeText={(value) => {
                            cardExpiryInputFilter(
                              'cardExpiryDate',
                              value,
                              formik
                            );
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
                          color={
                            theme.appType === 'seller' ? 'shade4' : 'shade6'
                          }
                          placeholder="CVC"
                          otherError={otherErrors.cardCvc}
                          onChangeText={(value) =>
                            setOtherErrors({ cardCvc: '' })
                          }
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
                          color={
                            theme.appType === 'seller' ? 'shade4' : 'shade6'
                          }
                          placeholder="Name on Card"
                          otherError={otherErrors.cardName}
                          onChangeText={(value) =>
                            setOtherErrors({ cardName: '' })
                          }
                        />
                      </Col>
                    </FormikRow>

                    <FormikRow style={{ marginBottom: isMobile ? 70 : 30 }}>
                      <Col>
                        <Checkbox
                          label="Set as default card"
                          name="isDefault"
                          checked={formik.values.isDefault}
                          onClick={() => {
                            formik.setFieldValue(
                              'isDefault',
                              !formik.values.isDefault,
                              false
                            );
                          }}
                        />
                      </Col>
                    </FormikRow>

                    {!isMobile && (
                      <FormikRow>
                        <Col>
                          <Button
                            text="PAY USING CREDIT CARD"
                            variant="primary"
                            type="submit"
                            loading={isPaymentLoading}
                          />
                        </Col>
                      </FormikRow>
                    )}
                  </FormContainer>
                </Col>
              )}

              {((!isMobile && hasCards) || (isMobile && showExistingTab)) && (
                <Col xs={12} sm={6}>
                  {isMobile && amountDue ? (
                    <Typography variant="copy" style={{ marginBottom: 24 }}>
                      Pay the amount due: <b>{amountDue}</b>
                    </Typography>
                  ) : (
                    <Typography variant="copy" style={{ marginBottom: 24 }}>
                      Credit Cards
                    </Typography>
                  )}
                  {cards.map((card) => (
                    <CreditCardInteraction
                      onRemove={() => onRemoveCard(card)}
                      isDefault={defaultCard === card.id}
                      hideDetailBtn
                      key={card.id}
                      {...card}
                      type="radio"
                      pressed={selectedCardId === card.id}
                      onClick={() =>
                        setSelectedCardId((prevState) => {
                          if (prevState === card.id) return '';
                          else return card.id;
                        })
                      }
                      creditCardLabel={
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <Typography
                            variant="overline"
                            color="shade6"
                            style={{ marginRight: 5, marginTop: 0 }}
                          >
                            Credit Card
                          </Typography>
                          {defaultCard === card.id && (
                            <Typography
                              variant="caption"
                              color={
                                theme.isSFM || theme.appType === 'buyer'
                                  ? 'primary'
                                  : 'shade6'
                              }
                            >
                              default
                            </Typography>
                          )}
                        </div>
                      }
                      rightComponent={
                        <div style={{ display: 'flex' }}>
                          <Button
                            onClick={(e) => {
                              e.preventDefault();
                              history.push(BUYER_ACCOUNT_ROUTES.CREDIT_CARD, {
                                card,
                                preventGoingBack: true,
                              });
                            }}
                            size="sm"
                            icon={
                              <Pen
                                fill={theme.grey.noshade}
                                width={13}
                                height={18}
                              />
                            }
                            style={{ padding: '4px 11px', marginRight: 7 }}
                          ></Button>
                          <Button
                            disabled={cards.length === 1}
                            onClick={(e) => {
                              onRemoveCard(card);
                              e.preventDefault();
                            }}
                            size="sm"
                            icon={<TrashCan fill={theme.grey.noshade} />}
                          ></Button>
                        </div>
                      }
                    />
                  ))}
                  <Button
                    style={{ marginTop: '12px' }}
                    text="Add Card"
                    variant="primary"
                    type="button"
                    onClick={() => {
                      history.push(`${BUYER_ACCOUNT_ROUTES.CREDIT_CARD}`, {
                        card: {},
                      });
                    }}
                  />
                </Col>
              )}
            </Row>

            {isMobile && amountDue && (
              <ButtonMobileContainer>
                <Button
                  text="PAY USING CREDIT CARD"
                  variant="primary"
                  type="submit"
                  takeFullWidth
                  loading={isPaymentLoading}
                />
              </ButtonMobileContainer>
            )}
          </form>
        )}
      </Formik>
    </Container>
  );
};

export default PlanPaymentMethodView;
