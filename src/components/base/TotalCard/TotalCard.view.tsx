import React, { useMemo, useReducer } from 'react';

import { clickAndCollectAddress, clickAndCollectAddress2 } from 'consts';
import { useSelector } from 'react-redux';
import { OrderItem } from 'routes/Buyer/Checkout/Checkout.props';
import {
  estimatedDeliveryToString,
  serviceNameToDeliveryOption,
  serviceNameToString,
  shipmentModeToDeliveryMethod,
  shipmentModeToString,
} from 'routes/Buyer/Checkout/Checkout.transform';
import { OrderShipping } from 'types/store/AddCardAndPayState';
import { Store } from 'types/store/Store';
import { createUpdateReducer } from 'utils/Hooks';
import { sizeToString } from 'utils/Listing';
import { toPrice } from 'utils/String/toPrice';

import Divider from '../Divider';
import Typography from '../Typography';
import { TotalCardProps } from './TotalCard.props';
import { Container } from './TotalCard.style';

const TotalCard = (props: TotalCardProps): JSX.Element => {
  const { removeCredits } = props;

  const getUser = useSelector((state: Store) => state.getUser);
  const cart = useSelector((store: Store) => store.cart) || {};
  const shippingQuotes =
    useSelector((store: Store) => store.getShippingQuote.data?.data) || {};

  const cartItems = Object.keys(cart).map((key) => ({
    ...cart[key],
    cartId: key,
  }));

  const orders = cartItems.map(
    (cartItem): OrderItem => ({
      cartId: cartItem.cartId || '',
      title: 'Order Summary',
      uri: cartItem.listing.image,
      name: cartItem.listing.type,
      price: cartItem.subTotal.toFixed(2),
      tags: cartItem.listing.specifications.map((label) => ({ label })),
      weight: cartItem.weight.toFixed(2),
      unit: cartItem.listing.measurementUnit,
      size: sizeToString(
        cartItem.listing.metric,
        cartItem.listing.sizeFrom,
        cartItem.listing.sizeTo
      ),
      location: cartItem.listing.origin.state,
      vendor: cartItem.companyName,
      vendorId: cartItem.companyId,
      shippingOptions: shippingQuotes
        ? (
            shippingQuotes[cartItem.companyId] || { priceResult: [] }
          ).priceResult.map((data) => {
            const shipmentMode = shipmentModeToString(data.shipmentMode);
            const serviceName = serviceNameToString(data.serviceName);
            return {
              priceId: data.priceId,
              name:
                data.serviceName === 'CLICK AND COLLECT'
                  ? `${serviceName} ${clickAndCollectAddress}`
                  : `${shipmentMode} ${serviceName}`,
              ...(data.serviceName === 'CLICK AND COLLECT'
                ? { secondName: clickAndCollectAddress2 }
                : {}),
              price: toPrice(data.grossPrice, false),
              est: estimatedDeliveryToString(
                data.minTransitTime,
                data.maxTransitTime
              ),
            };
          })
        : [],
    })
  );

  const [selectedShippingId, setSelectedShippingId] = useReducer(
    createUpdateReducer<Record<string, number>>(),
    {}
  );

  const selectedShipping = Object.keys(shippingQuotes).reduce(
    (selectedShippingData: Record<string, OrderShipping>, companyId) => {
      const data = shippingQuotes[companyId];
      const selectedPriceData = shippingQuotes[companyId].priceResult.find(
        (pricing) => pricing.priceId === selectedShippingId[companyId]
      );
      return {
        ...selectedShippingData,
        [companyId]: {
          carrierName: selectedPriceData?.carrierName || '',
          deliveryMethod: shipmentModeToDeliveryMethod(
            selectedPriceData?.shipmentMode || ''
          ),
          deliveryOption: serviceNameToDeliveryOption(
            selectedPriceData?.serviceName || ''
          ),
          gstCharge: selectedPriceData?.gst || 0,
          maxTransitTime: selectedPriceData?.maxTransitTime || '',
          minTransitTime: selectedPriceData?.minTransitTime || '',
          netCharge: selectedPriceData?.netPrice || 0,
          price: selectedPriceData?.grossPrice || 0,
          priceId: selectedPriceData?.priceId || 0,
          quoteId: data.quoteId,
          serviceName: selectedPriceData?.serviceName || '',
        },
      };
    },
    {}
  );

  const totalValue =
    orders.reduce(
      (totalItemsPrice, currentItem) =>
        totalItemsPrice + Number(currentItem.price),
      0
    ) +
    Object.keys(selectedShipping).reduce(
      (totalItemsPrice, companyId) =>
        totalItemsPrice + selectedShipping[companyId].price,
      0
    );

  const defaultCompany = useMemo(() => {
    if (!getUser) return null;

    return getUser.data?.data.user.companies.length
      ? getUser.data?.data.user.companies[0]
      : null;
  }, [getUser]);

  const credit = defaultCompany?.credit;

  return (
    <Container>
      <div
        style={{
          borderRadius: '16px',
          border: '1px solid #E5E8F5',
          padding: '20px',
          backgroundColor: '#fff',
        }}
      >
        <div>
          <Typography
            variant="label"
            color="shade6"
            style={{ textAlign: 'right' }}
          >
            Total Value
          </Typography>
          <Typography
            variant="title3"
            weight="900"
            style={{ textAlign: 'right' }}
          >
            <sup className="sup-text-2">$</sup>
            {props?.totalOrderValue
              ? toPrice(props?.totalOrderValue).replace('$', '')
              : '0.00'}
          </Typography>
        </div>

        {!removeCredits && (
          <>
            <div style={{ marginTop: '10px' }}>
              <Typography
                variant="label"
                color="shade6"
                style={{ textAlign: 'right' }}
              >
                Credits Balance
              </Typography>
              <Typography
                variant="title5"
                weight="900"
                style={{ textAlign: 'right' }}
              >
                <sup className="sup-text">$</sup>
                {credit ? toPrice(credit).replace('$', '') : '0.00'}
              </Typography>
            </div>

            <Divider spacing={20} />

            <div style={{ marginTop: '10px' }}>
              <Typography
                variant="label"
                color="shade6"
                style={{ textAlign: 'right' }}
              >
                Credit Balance after Purchase
              </Typography>
              <Typography
                variant="title5"
                weight="900"
                style={{ textAlign: 'right' }}
              >
                <sup className="sup-text">$</sup>
                {toPrice(
                  parseFloat(credit as string) - props?.totalOrderValue
                ).replace('$', '')}
              </Typography>
            </div>
          </>
        )}
      </div>
    </Container>
  );
};

export default React.memo(TotalCard);