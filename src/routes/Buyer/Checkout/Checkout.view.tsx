import React, { useState } from 'react';

import Accordion from 'components/base/Accordion/Accordion.view';
import Alert from 'components/base/Alert/Alert.view';
import Button from 'components/base/Button';
import { Crab } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import CheckoutCard from 'components/module/CheckoutCard/CheckoutCard.view';
import ConfirmationModal from 'components/module/ConfirmationModal';
import EmptyState from 'components/module/EmptyState/EmptyState.view';
import Loading from 'components/module/Loading';
import ShippingCard from 'components/module/ShippingCard/ShippingCard.view';
import { BUYER_ROUTES } from 'consts';
import { isEmpty } from 'ramda';
import { Col, Row } from 'react-grid-system';
import { useHistory } from 'react-router-dom';
import { useTheme } from 'utils/Theme';

import { CheckoutGeneratedProps, OrderItem } from './Checkout.props';
import { Container, Footer } from './Checkout.style';

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
    total,
    keepShopping,
    placeOrder,
    loadingShippingQuotes,
    selectedShippingId,
    processingOrder,
    orderError,
  } = props;

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const totalCartGroups = Object.keys(groupedOrders).length;
  const totalSelectedShipping = Object.keys(selectedShippingId).reduce(
    (sum, companyId) => sum + (selectedShippingId[companyId] === 0 ? 0 : 1),
    0
  );
  const disablePlaceOrder = totalSelectedShipping < totalCartGroups;

  return (
    <Container>
      <ConfirmationModal
        title="Final Order Confirmation?"
        description="Just confirming you want to place this order?"
        isOpen={showConfirmationModal}
        onClickClose={() => {
          setShowConfirmationModal(false);
        }}
        action={() => {
          setShowConfirmationModal(false);
          placeOrder();
        }}
        actionText="Proceed"
        cancelText="Keep Shopping"
      />
      {loadingShippingQuotes ? (
        <div className="center">
          <Loading label="Loading Shipping Quotes" color="shade6" />
        </div>
      ) : (
        <>
          {isEmpty(groupedOrders) ? (
            <Row className="row" align="center" justify="center">
              <Col>
                <EmptyState
                  title="No orders yet"
                  buttonText="Start an order"
                  Svg={Crab}
                  onButtonClicked={() => history.push(BUYER_ROUTES.SEARCH)}
                />
              </Col>
            </Row>
          ) : (
            //  @ts-ignore
            <Orders {...props} />
          )}
        </>
      )}

      {!isEmpty(groupedOrders) && !loadingShippingQuotes && (
        <Footer>
          {orderError && (
            <div className="box-error-container">
              <Alert
                fullWidth
                alignText="center"
                variant="error"
                content={orderError}
              />
            </div>
          )}

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
                setShowConfirmationModal(true);
              }}
              loading={processingOrder}
            />
          </div>
        </Footer>
      )}
    </Container>
  );
};

export default CheckoutView;
