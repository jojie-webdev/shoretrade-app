import React, { useState } from 'react';

import Accordion from 'components/base/Accordion/Accordion.view';
import Button from 'components/base/Button';
import { Crab } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { BoxContainer } from 'components/layout/BoxContainer';
import CheckoutCard from 'components/module/CheckoutCard/CheckoutCard.view';
import Loading from 'components/module/Loading';
import ShippingCard from 'components/module/ShippingCard/ShippingCard.view';
import { BUYER_ROUTES } from 'consts';
import { isEmpty } from 'ramda';
import { Col, Row } from 'react-grid-system';
import { useHistory } from 'react-router-dom';
import PaymentMethod from 'routes/Buyer/Checkout/PaymentMethod';
import { toPrice } from 'utils/String/toPrice';
import { useTheme } from 'utils/Theme';

import { CheckoutGeneratedProps, OrderItem } from './Checkout.props';
import {
  Container,
  EmptyContainer,
  SVGContainer,
  Footer,
} from './Checkout.style';

const Orders = (props: CheckoutGeneratedProps) => {
  const {
    groupedOrders,
    selectedShippingId,
    setSelectedShippingId,
    removeItem,
  } = props;
  const theme = useTheme();

  const orders = Object.keys(groupedOrders).reduce(
    (data: { id: string; listings: OrderItem[] }[], vendorId) => [
      ...data,
      { id: vendorId, listings: groupedOrders[vendorId] },
    ],
    []
  );

  return orders.map((item, i) => (
    <div className="accordion-container" key={`orders-${i}`}>
      <Accordion title={item.listings[0].vendor} withBackground isOpen>
        <div className="accordion-content-container">
          <Row>
            <Col
              style={{
                marginTop: i !== 0 ? 32 : 0,
              }}
            >
              {item.listings.map((listing) => (
                <CheckoutCard
                  key={listing.cartId}
                  onRemove={() => removeItem(listing.cartId)}
                  {...listing}
                />
              ))}
            </Col>
          </Row>

          <Row>
            <Col>
              <Typography
                className="checkout-shipping"
                variant="overline"
                color="shade6"
              >
                Shipping
              </Typography>

              <ShippingCard
                selectedPriceId={selectedShippingId[item.listings[0].vendorId]}
                options={item.listings[0].shippingOptions.sort((a, b) => {
                  if (a.est < b.est) return -1;
                  if (a.est > b.est) return 1;
                  return 0;
                })}
                onPress={(priceId) =>
                  setSelectedShippingId({
                    [item.listings[0].vendorId]: priceId,
                  })
                }
              />
            </Col>
          </Row>
        </div>
      </Accordion>
    </div>
  ));
};

const CheckoutView = (props: CheckoutGeneratedProps) => {
  const theme = useTheme();
  const history = useHistory();
  const {
    groupedOrders,
    totalValue,
    keepShopping,
    placeOrder,
    selectedShipping,
    loadingShippingQuotes,
    selectedShippingId,
    processingOrder,
    orderError,
  } = props;

  const [showPaymentMethod, setShowPaymentMethod] = useState(false);

  const total = toPrice(totalValue, false);

  const totalCartGroups = Object.keys(groupedOrders).length;
  const totalSelectedShipping = Object.keys(selectedShippingId).reduce(
    (sum, companyId) => sum + (selectedShippingId[companyId] === 0 ? 0 : 1),
    0
  );
  const disablePlaceOrder = totalSelectedShipping < totalCartGroups;

  if (showPaymentMethod) {
    return (
      <PaymentMethod
        totalValue={totalValue}
        orderError={orderError}
        selectedShipping={selectedShipping}
        processingOrder={processingOrder}
        placeOrder={placeOrder}
        onBack={() => setShowPaymentMethod(false)}
      />
    );
  }

  return (
    <Container>
      {loadingShippingQuotes ? (
        <div className="center">
          <Loading label="Loading Shipping Quotes" color="shade6" />
        </div>
      ) : (
        <>
          {isEmpty(groupedOrders) ? (
            <BoxContainer>
              <EmptyContainer>
                <Row nogutter className="row">
                  <Typography variant="title4">No orders yet</Typography>
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
            </BoxContainer>
          ) : (
            //  @ts-ignore
            <Orders {...props} />
          )}
        </>
      )}

      {!isEmpty(groupedOrders) && !loadingShippingQuotes && (
        <Footer>
          <Typography color="shade6">Total</Typography>
          <Typography variant="title5" color="shade8" weight="900">
            ${total}
          </Typography>
          <div className="footer-separator">
            <div className="keep-shopping-wrapper">
              <Button
                text="Keep Shopping"
                variant="outline"
                onClick={keepShopping}
              />
            </div>

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
    </Container>
  );
};

export default CheckoutView;
