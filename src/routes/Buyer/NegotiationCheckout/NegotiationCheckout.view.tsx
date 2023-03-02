import React, { useState } from 'react';

import Accordion from 'components/base/Accordion';
import Button from 'components/base/Button';
import { Crab, Crate, Fee, ShoppingTrolley } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import CheckoutCard from 'components/module/CheckoutCard';
import Loading from 'components/module/Loading';
import LoadingOverlay from 'components/module/LoadingOverlay';
import { XRefreshCreditButton } from 'components/module/RefreshCreditButton';
import ShippingCard from 'components/module/ShippingCard';
import { BUYER_ROUTES } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import { isEmpty } from 'ramda';
import { Col, Row } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router-dom';
import { getOrderListingKey } from 'utils/getOrderListingKey';
import { sizeToString } from 'utils/Listing';
import { toPrice } from 'utils/String/toPrice';
import { useTheme } from 'utils/Theme';

// import { useTheme } from 'utils/Theme';
import { BottomRow } from '../Checkout/PaymentMethod/PaymentMethod.style';
import { NegotiationCheckoutGeneratedProps } from './NegotiationCheckout.props';
import {
  CheckoutCardRow,
  Container,
  CrateFee,
  EmptyContainer,
  Footer,
  ShippingRow,
  SVGContainer,
  TransactionFee,
} from './NegotiationCheckout.style';

const Orders = (props: NegotiationCheckoutGeneratedProps) => {
  const {
    // groupedOrders,
    selectedShippingId,
    removeItem,
    onDeliveryMethodSelection,
    transactionValueFeePercent,
    negotiation,
  } = props;
  const theme = useTheme();
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });
  // const orders = Object.keys(groupedOrders).reduce(
  //   (
  //     data: {
  //       id: string;
  //       isFreeShipping: boolean;
  //       listings: OrderItem[];
  //       totalCrateFee: number;
  //       totalTransactionFee: number;
  //     }[],
  //     vendorId
  //   ) => [
  //     ...data,
  //     {
  //       id: vendorId,
  //       isFreeShipping: groupedOrders[vendorId][0].isFreeShipping,
  //       listings: groupedOrders[vendorId],
  //       totalCrateFee: groupedOrders[vendorId].reduce(
  //         (totalFee, listing) => totalFee + Number(listing.crateFee || 0),
  //         0
  //       ),
  //       totalTransactionFee: groupedOrders[vendorId].reduce(
  //         (totalFee, listing) => totalFee + Number(listing.transactionFee || 0),
  //         0
  //       ),
  //     },
  //   ],
  //   []
  // );

  const excludeShipmentByAir = (shippingOptions: any) => {
    const modifiedShippingOptions = shippingOptions.filter(
      (shippingOption: any) => shippingOption.shipmentMode !== 'AIR'
    );

    return modifiedShippingOptions;
  };

  // const getShippingOptions = (orderItem: OrderItem) => {
  //   let shippingOptions = orderItem.shippingOptions.sort((a, b) => {
  //     if (a.est < b.est) return -1;
  //     if (a.est > b.est) return 1;
  //     return 0;
  //   });

  //   shippingOptions = shippingOptions.reduce(
  //     (prevValue: any, curValue: any) => {
  //       if (
  //         curValue.shipmentMode === 'DEPOT' ||
  //         curValue.nameId.toLowerCase().includes('pickup at')
  //       ) {
  //         return [curValue, ...prevValue];
  //       } else {
  //         return [...prevValue, curValue];
  //       }
  //     },
  //     []
  //   );

  //   if (theme.isSFM) {
  //     shippingOptions = excludeShipmentByAir(shippingOptions);
  //   }

  //   return shippingOptions;
  // };

  const getFinalPrice = () => {
    let price = negotiation?.price_per_kilo;

    if (negotiation?.counter_offer) {
      price = negotiation?.counter_offer;
    }

    if (negotiation?.history?.negotiation_request?.counter_offer?.toString()) {
      price =
        negotiation?.history?.negotiation_request?.counter_offer?.toString();
    }

    if (negotiation?.history?.negotiation_offer?.counter_offer?.toString()) {
      price =
        negotiation?.history?.negotiation_offer?.counter_offer?.toString();
    }

    return price;
  };

  const checkoutCardProps = {
    uri: negotiation?.thumbnail || '',
    name: negotiation?.name || '',
    price: getFinalPrice() || '',
    weight: negotiation?.desired_quantity?.toString() || '',
    size:
      sizeToString(
        negotiation?.metric || negotiation?.active_size_unit || '',
        negotiation?.size_from,
        negotiation?.size_to
      ) || '',
    vendor: 'Seller name',
    unit: negotiation?.metric || '',
    tags: negotiation?.specifications?.map((spec) => ({
      label: spec.name,
      type: 'plain',
    })),
    // onRemove: () => {
    //   console.log('checkoutCardProps > onRemove > clicked');
    // },
  };

  return (
    <div className="accordion-container">
      <Accordion title={'Seller name'} withBackground isOpen>
        <div className="accordion-content-container">
          <CheckoutCardRow nogutter>
            <Col
              style={{
                marginTop: 32,
              }}
            >
              {/* {item.listings.map((listing) => (
                <CheckoutCard
                  key={listing.cartItemId}
                  onRemove={() =>
                    removeItem(
                      listing.cartItemId,
                      getOrderListingKey(item.listings[0])
                    )
                  }
                  {...listing}
                />
              ))} */}
              <CheckoutCard
                onRemove={() =>
                  // removeItem(
                  //   listing.cartItemId,
                  //   getOrderListingKey(item.listings[0])
                  // )
                  console.log('CheckoutCardRow > onRemove > clicked')
                }
                {...checkoutCardProps}
              />
            </Col>
          </CheckoutCardRow>

          {transactionValueFeePercent ? (
            <TransactionFee>
              <div className="transaction-fee-label">
                <Fee fill={theme.grey.shade6} />
                <div>
                  <Typography variant="label" weight="700">
                    {transactionValueFeePercent}% Transaction Fees
                  </Typography>
                  <Typography color="shade6" variant="caption">
                    {`An additional ${transactionValueFeePercent}% transaction fee is charged
        on the product under the Essentials Subscription.`}
                  </Typography>
                </div>
              </div>
              <div className="transaction-fee-value">
                {isMobile ? (
                  <Typography variant="caption" weight="700">
                    {/* {toPrice(item.totalTransactionFee)} */}
                    {toPrice('1.00')}
                  </Typography>
                ) : (
                  <Typography color="shade8">
                    {/* {toPrice(item.totalTransactionFee)} */}
                    {toPrice('1.00')}
                  </Typography>
                )}
              </div>
            </TransactionFee>
          ) : (
            <></>
          )}

          {/* {!!item.totalCrateFee && item.totalCrateFee > 0 && ( */}
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
                  {/* {toPrice(item.totalCrateFee)} */}
                  {toPrice('10.00')}
                </Typography>
              ) : (
                <Typography color="shade8">
                  {/* {toPrice(item.totalCrateFee)} */}
                  {toPrice('10.00')}
                </Typography>
              )}
            </div>
          </CrateFee>
          {/* )} */}

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
                // isFreeShipping={item.isFreeShipping}
                isFreeShipping
                // selectedDeliveryMethod={
                //   selectedShippingId[getOrderListingKey(item.listings[0])]
                // }
                selectedDeliveryMethod={''}
                // options={getShippingOptions(item.listings[0])}
                options={[]}
                onPress={(id, o) => {
                  onDeliveryMethodSelection(
                    o,
                    // getOrderListingKey(item.listings[0])
                    ''
                  );
                }}
              />
            </Col>
          </ShippingRow>
        </div>
      </Accordion>
    </div>
  );
};

const NegotiationCheckoutView = (props: NegotiationCheckoutGeneratedProps) => {
  const history = useHistory();
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });
  const {
    negotiation,
    balance,
    // groupedOrders,
    totalValue,
    // keepShopping,
    // placeOrder,
    // selectedShipping,
    // loadingShippingQuotes,
    isNegotiationPending,
    selectedShippingId,
    // orderError,
    // transactionValueFeePercent,
  } = props;
  const theme = useTheme();

  const [showPaymentMethod, setShowPaymentMethod] = useState(false);

  const total = toPrice(totalValue, false);

  // const totalCartGroups = Object.keys(groupedOrders).length;
  const totalSelectedShipping = Object.keys(selectedShippingId).reduce(
    (sum, companyId) => sum + (selectedShippingId[companyId] === '' ? 0 : 1),
    0
  );

  // const disablePlaceOrder = totalSelectedShipping < totalCartGroups;

  // if (showPaymentMethod) {
  //   return (
  //     <PaymentMethod
  //       totalValue={totalValue}
  //       orderError={orderError}
  //       selectedShipping={selectedShipping}
  //       placeOrder={placeOrder}
  //       onBack={() => setShowPaymentMethod(false)}
  //     />
  //   );
  // }

  return (
    <Container>
      {isNegotiationPending ? (
        <Loading />
      ) : (
        <>
          {isNegotiationPending && (
            <LoadingOverlay label="Loading Shipping Quotes" />
          )}
          {isEmpty(negotiation) ? (
            <EmptyContainer>
              <Row nogutter className="row">
                <Typography variant="title4">No Negotiation Yet</Typography>
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
              <Orders {...props} />
              {!isMobile ? (
                <BottomRow>
                  <div className="btns-container">
                    <Button
                      text="Keep Shopping"
                      onClick={() => {
                        history.push(BUYER_ROUTES.HOME);
                      }}
                      style={{ marginRight: 8 }}
                      variant="outline"
                    />

                    <Button
                      text="Place Order (WAITING FOR BE)"
                      disabled={true}
                      // onClick={() => {
                      //   setShowPaymentMethod(true);
                      // }}
                    />
                  </div>

                  <div className="balances">
                    <div>
                      <XRefreshCreditButton color="shade6" />
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

                    <ShoppingTrolley fill={theme.grey.shade4} />
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
                      onClick={() => {
                        history.push(BUYER_ROUTES.HOME);
                      }}
                      variant="outline"
                      style={{ marginRight: 16 }}
                    />
                    <Button
                      text="Place Order (WAITING FOR BE"
                      disabled={true}
                      // onClick={() => {
                      //   setShowPaymentMethod(true);
                      // }}
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

export default NegotiationCheckoutView;
