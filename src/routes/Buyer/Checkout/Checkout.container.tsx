import React, { useEffect, useReducer } from 'react';

import {
  BUYER_ROUTES,
  clickAndCollectAddress,
  clickAndCollectAddress2,
} from 'consts';
import equals from 'ramda/es/equals';
import groupBy from 'ramda/es/groupBy';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { OrderItem } from 'routes/Buyer/Checkout/Checkout.props';
import {
  getShippingQuoteActions,
  orderActions,
  cartActions,
} from 'store/actions';
import { CartItem } from 'types/store/CartState';
import { OrderCartItem, OrderShipping } from 'types/store/OrderState';
import { Store } from 'types/store/Store';
import { createUpdateReducer } from 'utils/Hooks/createUpdateReducer';
import { sizeToString } from 'utils/Listing';
import { toPrice } from 'utils/String/toPrice';

import {
  shipmentModeToString,
  serviceNameToString,
  estimatedDeliveryToString,
  shipmentModeToDeliveryMethod,
  serviceNameToDeliveryOption,
} from './Checkout.transform';
import CheckoutView from './Checkout.view';

const Checkout = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();

  const removeItem = (id: string) => {
    dispatch(cartActions.remove(id));
  };

  const [selectedShippingId, setSelectedShippingId] = useReducer(
    createUpdateReducer<Record<string, number>>(),
    {}
  );

  const addresses =
    useSelector((store: Store) => store.getAddresses.data?.data.addresses) ||
    [];

  const currentAddress = addresses.find((a) => a.default);

  const loadingShippingQuotes =
    useSelector((store: Store) => store.getShippingQuote.pending) || false;

  const shippingQuotes =
    useSelector((store: Store) => store.getShippingQuote.data?.data) || {};

  const orderError = useSelector((store: Store) => store.order.error) || '';

  useEffect(() => {
    if (!loadingShippingQuotes) {
      const defaultShippingIds = Object.keys(shippingQuotes).reduce(
        (accumulator, key) => ({
          ...accumulator,
          ...(shippingQuotes[key].priceResult.length > 0
            ? { [key]: shippingQuotes[key].priceResult[0].priceId }
            : {}),
        }),
        {}
      );
      setSelectedShippingId(defaultShippingIds);
    }
  }, [loadingShippingQuotes]);

  const cart = useSelector((store: Store) => store.cart) || {};

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

  const groupOrdersByVendor = groupBy((order: OrderItem) => order.vendorId);
  const groupedOrders = groupOrdersByVendor(orders);

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
  const total = toPrice(totalValue, false);

  const processingOrder =
    useSelector((store: Store) => store.order.pending) || false;

  const keepShopping = () => {
    history.push(BUYER_ROUTES.CATEGORIES);
  };

  const placeOrder = () => {
    if (currentAddress && !processingOrder) {
      const groupCartItemByCompany = groupBy(
        (item: CartItem) => item.companyId
      );
      const groupedCartItems = groupCartItemByCompany(cartItems);
      const payload = Object.keys(groupedCartItems).reduce(
        (orderData: OrderCartItem[][], companyId) => {
          const companySpecificOrder = groupedCartItems[companyId].map(
            (item) => ({
              ...item,
              shipping: selectedShipping[item.companyId],
            })
          );
          return [...orderData, companySpecificOrder];
        },
        []
      );
      dispatch(
        orderActions.request({
          cart: payload,
          currentAddress,
          totalPrice: totalValue,
        })
      );
    }
  };

  // Logic for generating shipping quote request

  const previousShippingQuotesRequestError =
    useSelector((store: Store) => store.getShippingQuote.error) || '';

  const previousShippingQuotesRequestAddress = useSelector(
    (store: Store) => store.getShippingQuote.request?.destination
  );

  const previousShippingQuotesRequestSellers =
    useSelector((store: Store) => store.getShippingQuote.request?.sellers) ||
    {};

  const previousShippingQuotesListingIds = Object.keys(
    previousShippingQuotesRequestSellers
  ).reduce((listingIds: string[], key) => {
    return [
      ...listingIds,
      ...previousShippingQuotesRequestSellers[key].map((listing) => listing.id),
    ];
  }, []);

  const groupBySeller = groupBy(
    (listing: {
      id: string;
      companyId: string;
      boxes: { id: string; weight: number; quantity: number; count: number }[];
    }) => listing.companyId
  );

  useEffect(() => {
    if (cartItems.length > 0) {
      if (currentAddress) {
        const listings = cartItems.map((cartItem) => ({
          id: cartItem.listing.id,
          companyId: cartItem.companyId,
          boxes: cartItem.orderBoxes,
        }));

        const currentListingIds = listings.map((listing) => listing.id);
        const sellerGroup = groupBySeller(listings);
        // Remove companyId
        const sellers = Object.keys(sellerGroup).reduce((accum, current) => {
          return {
            ...accum,
            [current]: sellerGroup[current].map((listing) => ({
              id: listing.id,
              boxes: listing.boxes,
            })),
          };
        }, {});

        const destination = {
          administrativeAreaLevel1: currentAddress.state,
          countryCode: currentAddress.countryCode,
          level: currentAddress.level,
          locality: currentAddress.suburb,
          postcode: currentAddress.postcode,
          route: currentAddress.streetName,
          streetNumber: currentAddress.streetNumber,
          unitNumber: currentAddress.unitNumber,
        };

        // Prevent action being fired when listing data is the same
        if (
          !(
            equals(previousShippingQuotesListingIds, currentListingIds) &&
            previousShippingQuotesRequestError.length === 0 &&
            JSON.stringify(destination) ===
              JSON.stringify(previousShippingQuotesRequestAddress)
          )
        ) {
          dispatch(
            getShippingQuoteActions.request({
              destination,
              sellers,
            })
          );
        }
      }
    } else {
      if (previousShippingQuotesListingIds.length > 0) {
        dispatch(getShippingQuoteActions.clear());
      }
    }
  }, [cartItems.length]);

  const generatedProps = {
    groupedOrders,
    total,
    keepShopping,
    placeOrder,
    loadingShippingQuotes,
    selectedShippingId,
    setSelectedShippingId,
    processingOrder,
    removeItem,
    orderError,
  };

  return <CheckoutView {...generatedProps} />;
};

export default Checkout;
