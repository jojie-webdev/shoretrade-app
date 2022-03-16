import React, { useState } from 'react';

import Accordion from 'components/base/Accordion/Accordion.view';
import Button from 'components/base/Button';
import { Cart, Crab, Crate } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import CheckoutCard from 'components/module/CheckoutCard/CheckoutCard.view';
import Loading from 'components/module/Loading';
import LoadingOverlay from 'components/module/LoadingOverlay';
import ShippingCard from 'components/module/ShippingCard/ShippingCard.view';
import { BUYER_ROUTES } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import { isEmpty } from 'ramda';
import { Col, Row } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router-dom';
import PaymentMethod from 'routes/Buyer/Checkout/PaymentMethod';
import { BottomRow } from 'routes/Buyer/Checkout/PaymentMethod/PaymentMethod.style';
import { getOrderListingKey } from 'utils/getOrderListingKey';
import { toPrice } from 'utils/String/toPrice';
import theme from 'utils/Theme';

import { CheckoutGeneratedProps, OrderItem } from './Checkout.props';
import {
  Container,
  EmptyContainer,
  CheckoutCardRow,
  ShippingRow,
  SVGContainer,
  Footer,
  CrateFee,
} from './Checkout.style';

const Orders = (props: CheckoutGeneratedProps) => {
  const {
    groupedOrders,
    selectedShippingId,
    setSelectedShippingId,
    removeItem,
  } = props;

  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });
  const orders = Object.keys(groupedOrders).reduce(
    (
      data: {
        id: string;
        isFreeShipping: boolean;
        listings: OrderItem[];
        totalCrateFee: number;
      }[],
      vendorId
    ) => [
      ...data,
      {
        id: vendorId,
        isFreeShipping: groupedOrders[vendorId][0].isFreeShipping,
        listings: groupedOrders[vendorId],
        totalCrateFee: groupedOrders[vendorId].reduce(
          (totalFee, listing) => totalFee + Number(listing.crateFee || 0),
          0
        ),
      },
    ],
    []
  );

  return orders.map((item, i) => (
    <div className="accordion-container" key={`orders-${i}`}>
      <Accordion title={item.listings[0].vendor} withBackground isOpen>
        <div className="accordion-content-container">
          <CheckoutCardRow nogutter>
            <Col
              style={{
                marginTop: i !== 0 ? 32 : 0,
              }}
            >
              {item.listings.map((listing) => (
                <CheckoutCard
                  key={listing.cartItemId}
                  onRemove={() => removeItem(listing.cartItemId)}
                  {...listing}
                />
              ))}
            </Col>
          </CheckoutCardRow>

          {!!item.totalCrateFee && item.totalCrateFee > 0 && (
            <CrateFee>
              <div className="crate-fee-label">
                <Crate fill={theme.grey.shade6} />
                {isMobile ? (
                  <Typography variant="label" weight="700">
                    Crate Fee and Levies
                  </Typography>
                ) : (
                  <Typography weight="700">Crate Fee and Levies</Typography>
                )}
              </div>
              <div className="crate-fee-value">
                {isMobile ? (
                  <Typography variant="caption" weight="700">
                    {toPrice(item.totalCrateFee)}
                  </Typography>
                ) : (
                  <Typography color="shade8">
                    {toPrice(item.totalCrateFee)}
                  </Typography>
                )}
              </div>
            </CrateFee>
          )}

          <ShippingRow nogutter>
            <Col>
              <Typography
                className="checkout-shipping"
                variant="overline"
                color="shade6"
              >
                Shipping
              </Typography>

              <ShippingCard
                isFreeShipping={item.isFreeShipping}
                selectedPriceId={
                  selectedShippingId[getOrderListingKey(item.listings[0])]
                }
                options={item.listings[0].shippingOptions.sort((a, b) => {
                  if (a.est < b.est) return -1;
                  if (a.est > b.est) return 1;
                  return 0;
                })}
                onPress={(id) =>
                  setSelectedShippingId({
                    [getOrderListingKey(item.listings[0])]: id,
                  })
                }
              />
            </Col>
          </ShippingRow>
        </div>
      </Accordion>
    </div>
  ));
};

const CheckoutView = (props: CheckoutGeneratedProps) => {
  const history = useHistory();
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });
  const {
    balance,
    groupedOrders,
    totalValue,
    keepShopping,
    placeOrder,
    selectedShipping,
    loadingShippingQuotes,
    loadingCart,
    selectedShippingId,
    orderError,
  } = props;

  const [showPaymentMethod, setShowPaymentMethod] = useState(false);

  const total = toPrice(totalValue, false);

  const totalCartGroups = Object.keys(groupedOrders).length;
  const totalSelectedShipping = Object.keys(selectedShippingId).reduce(
    (sum, companyId) => sum + (selectedShippingId[companyId] === '' ? 0 : 1),
    0
  );
  const disablePlaceOrder = totalSelectedShipping < totalCartGroups;

  if (showPaymentMethod) {
    return (
      <PaymentMethod
        totalValue={totalValue}
        orderError={orderError}
        selectedShipping={selectedShipping}
        placeOrder={placeOrder}
        onBack={() => setShowPaymentMethod(false)}
      />
    );
  }

  return (
    <Container>
      {loadingCart ? (
        <Loading />
      ) : (
        <>
          {loadingShippingQuotes && (
            <LoadingOverlay label="Loading Shipping Quotes" />
          )}
          {isEmpty(groupedOrders) ? (
            <EmptyContainer>
              <Row nogutter className="row">
                <Typography variant="title4">No Products Yet</Typography>
              </Row>
              <Row nogutter className="row">
                <Col className="svg-col-spacer" />
                <Col>
                  <SVGContainer>
                    <Crab height={268} width={268} fill={theme.grey.shade7} />
                  </SVGContainer>
                </Col>
              </Row>
              <Row nogutter className="row">
                <Button
                  text="Start an order"
                  onClick={() => history.push(BUYER_ROUTES.SEARCH)}
                />
              </Row>
            </EmptyContainer>
          ) : (
            <>
              {/*//  @ts-ignore*/}
              <Orders {...props} />
              {!isMobile ? (
                <BottomRow>
                  <div className="btns-container">
                    <Button
                      text="Keep Shopping"
                      onClick={keepShopping}
                      style={{ marginRight: 8 }}
                      variant="outline"
                    />

                    <Button
                      text="Place Order"
                      disabled={disablePlaceOrder}
                      onClick={() => {
                        setShowPaymentMethod(true);
                      }}
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
                        {toPrice(balance)}
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
                        ${total}
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
                        {toPrice(balance)}
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
                        ${total}
                      </Typography>
                    </div>
                  </div>
                  <div className="btns-container">
                    <Button
                      text="Keep Shopping"
                      onClick={keepShopping}
                      variant="outline"
                      style={{ marginRight: 16 }}
                    />
                    <Button
                      text="Place Order"
                      disabled={disablePlaceOrder}
                      onClick={() => {
                        setShowPaymentMethod(true);
                      }}
                    />
                  </div>
                </Footer>
              )}
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default CheckoutView;
