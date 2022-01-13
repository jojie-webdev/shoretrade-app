import React, { useEffect, useReducer } from 'react';

import { BUYER_ROUTES, clickAndCollectAddress2 } from 'consts';
import { ADDITIONAL_INFOS } from 'consts/listingAdditionalInfos';
import equals from 'ramda/es/equals';
import groupBy from 'ramda/es/groupBy';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { OrderItem } from 'routes/Buyer/Checkout/Checkout.props';
import {
  getShippingQuoteActions,
  orderActions,
  getCartActions,
  removeCartItemActions,
} from 'store/actions';
import { GetDefaultCompany } from 'store/selectors/buyer';
import {
  GetCartDataItem,
  GetCartListingDataItem,
} from 'types/store/GetCartState';
import { OrderCartItem, OrderShipping } from 'types/store/OrderState';
import { Store } from 'types/store/Store';
import { createUpdateReducer } from 'utils/Hooks/createUpdateReducer';
import { isPaymentMethodAvailable } from 'utils/isPaymentMethodAvailable';
import { sizeToString } from 'utils/Listing';
import { toPrice } from 'utils/String/toPrice';
import {
  shipmentModeToString,
  serviceNameToString,
  subAddressToString,
  estimatedDeliveryToString,
  shipmentModeToDeliveryMethod,
  serviceNameToDeliveryOption,
  CLICK_AND_COLLECT_SERVICE,
} from 'utils/String/toShipmentDateString';

import CheckoutView from './Checkout.view';

const Checkout = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();

  const paymentModes = useSelector(
    (state: Store) => state.getPaymentMode.data?.data.payment_mode
  );

  const currentCompany = GetDefaultCompany();

  const [selectedShippingId, setSelectedShippingId] = useReducer(
    createUpdateReducer<Record<string, string>>(),
    {}
  );

  const addresses =
    useSelector((store: Store) => store.getAddresses.data?.data.addresses) ||
    [];

  const currentAddress = addresses.find((a) => a.default);

  const loadingCart =
    useSelector((store: Store) => store.getCart.pending) || false;

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
            ? { [key]: shippingQuotes[key].priceResult[0].id }
            : {}),
        }),
        {}
      );
      setSelectedShippingId(defaultShippingIds);
    }
    // eslint-disable-next-line
  }, [loadingShippingQuotes]);

  const cartData = useSelector((store: Store) => store.getCart.data?.data);

  const cartDataItems = cartData?.items || {};

  const removeItem = (id: string) => {
    dispatch(
      removeCartItemActions.request({
        employeeId: currentCompany?.employeeId || '',
        cartId: cartData?.id || '',
        transactionRef: id,
      })
    );
  };

  const cartItems: GetCartDataItem[] = Object.keys(cartDataItems).map(
    (key) => ({
      ...cartDataItems[key],
      cartItemId: key,
    })
  );

  const orders = cartItems.map(
    (cartItem): OrderItem => {
      const additionalInfos = ADDITIONAL_INFOS.map((info) => {
        if (cartItem.listing[info.key as keyof GetCartListingDataItem]) {
          return info.display;
        } else return '';
      }).filter((info) => info !== '');

      return {
        cartItemId: cartItem.cartItemId || '',
        title: 'Order Summary',
        uri: cartItem.listing.image,
        name: cartItem.listing.type,
        price: cartItem.subTotal.toFixed(2),
        tags: additionalInfos
          .map((info) => ({
            label: info,
            type: 'blue',
          }))
          .concat([
            {
              label: cartItem.listing.quality || '',
              type: 'blue',
            },
          ])
          .concat(
            cartItem.listing.specifications
              .split(',')
              .map((label) => ({ label, type: 'plain' }))
          )
          .filter((tag) => tag.label !== ''),
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
              const shipmentMode = shipmentModeToString(
                data.shipmentMode,
                data.serviceName
              );
              const serviceName = serviceNameToString(
                data.serviceName,
                data.locationName,
                cartItem.companyName
              );
              const subAddress = subAddressToString(
                cartItem.companyName,
                data.serviceName === CLICK_AND_COLLECT_SERVICE
                  ? data.marketAddress
                  : data.sellerAddress
              );
              return {
                id: data.id,
                priceId: data.priceId,
                name:
                  data.serviceName === CLICK_AND_COLLECT_SERVICE
                    ? `${serviceName} ${data.locationName}`
                    : `${shipmentMode} ${serviceName}`,
                ...(data.serviceName === CLICK_AND_COLLECT_SERVICE
                  ? { secondName: clickAndCollectAddress2 }
                  : {}),
                price: toPrice(data.grossPrice, false),
                est: estimatedDeliveryToString(
                  data.minTransitTime,
                  data.maxTransitTime,
                  data.estimatedDate
                ),
                imageUrl: data.imageUrl,
                subAddress:
                  serviceName !== 'Delivery to Door' &&
                  shipmentMode !== 'Air Freight'
                    ? subAddress || data.subAddress
                    : shipmentMode === 'Air Freight'
                    ? data.marketAddress
                    : undefined,
              };
            })
          : [],
      };
    }
  );

  const groupOrdersByVendor = groupBy((order: OrderItem) => order.vendorId);
  const groupedOrders = groupOrdersByVendor(orders);

  const selectedShipping = Object.keys(shippingQuotes).reduce(
    (selectedShippingData: Record<string, OrderShipping>, companyId) => {
      const data = shippingQuotes[companyId];
      const selectedPriceData = shippingQuotes[companyId].priceResult.find(
        (pricing) => pricing.id === selectedShippingId[companyId]
      );
      return {
        ...selectedShippingData,
        [companyId]: {
          carrierName: selectedPriceData?.carrierName || '',
          deliveryMethod: shipmentModeToDeliveryMethod(
            selectedPriceData?.shipmentMode || '',
            selectedPriceData?.serviceName || ''
          ),
          deliveryOption: serviceNameToDeliveryOption(
            selectedPriceData?.serviceName || ''
          ),
          gstCharge: selectedPriceData?.gst || 0,
          maxTransitTime: selectedPriceData?.maxTransitTime || '',
          minTransitTime: selectedPriceData?.minTransitTime || '',
          netCharge: selectedPriceData?.netPrice || 0,
          price: selectedPriceData?.grossPrice || 0,
          priceId: selectedPriceData?.priceId || '',
          quoteId: data.quoteId,
          serviceName: selectedPriceData?.serviceName || '',
          locationName: selectedPriceData?.locationName || '',
          marketAddress: selectedPriceData?.marketAddress || '',
          expDelDate: selectedPriceData?.estimatedDateISO || '',
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

  const processingOrder =
    useSelector((store: Store) => store.order.pending) || false;

  const keepShopping = () => {
    history.push(BUYER_ROUTES.CATEGORIES);
  };

  const placeOrder = () => {
    if (
      currentAddress &&
      !processingOrder &&
      isPaymentMethodAvailable(paymentModes, 'ACCT_CRED')
    ) {
      const groupCartItemByCompany = groupBy(
        (item: GetCartDataItem) => item.companyId
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
          cartId: cartData?.id || '',
          employeeId: currentCompany?.employeeId || '',
          cart: payload,
          currentAddress,
          totalPrice: totalValue,
          paymentMode: 'ACCT_CRED',
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
    // eslint-disable-next-line
  }, [cartItems.length]);

  useEffect(() => {
    if (currentCompany) {
      dispatch(
        getCartActions.request({
          employeeId: currentCompany?.employeeId || '',
        })
      );
    }
    // eslint-disable-next-line
  }, [currentCompany]);

  const generatedProps = {
    balance: currentCompany?.credit || '',
    groupedOrders,
    totalValue,
    keepShopping,
    placeOrder,
    loadingShippingQuotes,
    loadingCart,
    selectedShipping,
    selectedShippingId,
    setSelectedShippingId,
    processingOrder,
    removeItem,
    orderError,
  };

  return <CheckoutView {...generatedProps} />;
};

export default Checkout;
