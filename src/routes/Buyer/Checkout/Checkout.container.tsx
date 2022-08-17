import React, { useEffect, useReducer, useState } from 'react';

import { Option } from 'components/module/ShippingCard/ShippingCard.props';
import { BUYER_ROUTES, clickAndCollectAddress2 } from 'consts';
import { ADDITIONAL_INFOS } from 'consts/listingAdditionalInfos';
import { pathOr } from 'ramda';
import equals from 'ramda/es/equals';
import groupBy from 'ramda/es/groupBy';
import omit from 'ramda/es/omit';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { OrderItem } from 'routes/Buyer/Checkout/Checkout.props';
import { syncAASBalance } from 'services/aas';
import {
  getShippingQuoteActions,
  orderActions,
  getCartActions,
  removeCartItemActions,
  selectedDeliveryMethodActions,
} from 'store/actions';
import getUserActions from 'store/actions/getUser';
import { GetDefaultCompany } from 'store/selectors/buyer';
import {
  GetCartDataItem,
  GetCartListingDataItem,
} from 'types/store/GetCartState';
import { UserCompany } from 'types/store/GetUserState';
import { OrderCartItem, OrderShipping } from 'types/store/OrderState';
import { Store } from 'types/store/Store';
import { getOrderListingKey } from 'utils/getOrderListingKey';
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

import { cartItemsToPayload } from './Checkout.transform';
import CheckoutView from './Checkout.view';

const Checkout = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();

  const paymentModes = useSelector(
    (state: Store) => state.getPaymentMode.data?.data.payment_mode
  );

  const currentCompany = GetDefaultCompany();
  const [selectedCompany, setSelectedCompany] = useState<
    UserCompany | undefined
  >();

  const [selectedShippingId, setSelectedShippingId] = useReducer(
    createUpdateReducer<Record<string, string>>(),
    {}
  );

  const selectedDeliveryMethod =
    useSelector((store: Store) => store.selectedDeliveryMethod) || {};

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
        (accumulator, key) => {
          const priceResult = shippingQuotes[key].priceResult[0];

          const shipmentMode = shipmentModeToString(
            priceResult.shipmentMode,
            priceResult.serviceName
          );
          const serviceName = serviceNameToString(
            priceResult.serviceName,
            priceResult.locationName,
            cartItems.find((cartItem) => key.includes(cartItem.companyId))
              ?.companyName || ''
          );
          const deliveryMethod =
            priceResult.serviceName === CLICK_AND_COLLECT_SERVICE
              ? `${serviceName} ${priceResult.locationName} ${priceResult.carrierName}`
              : `${shipmentMode} ${serviceName} ${priceResult.carrierName}`;

          return {
            ...accumulator,
            ...(shippingQuotes[key].priceResult.length > 0
              ? { [key]: deliveryMethod }
              : {}),
          };
        },
        {}
      );

      if (!cartItems || cartItems?.length === 0) {
        dispatch(selectedDeliveryMethodActions.clear());
      }

      if (Object.keys(selectedDeliveryMethod).length > 0) {
        setSelectedShippingId(selectedDeliveryMethod);
      } else {
        setSelectedShippingId(defaultShippingIds);
      }
    }
    // eslint-disable-next-line
  }, [loadingShippingQuotes]);

  const cartData = useSelector((store: Store) => store.getCart.data?.data);

  const cartDataItems = cartData?.items || {};

  const onDeliveryMethodSelection = (
    option: Option,
    orderListingKey: string
  ) => {
    dispatch(
      selectedDeliveryMethodActions.update({
        [orderListingKey]: option.nameId,
      })
    );
    setSelectedShippingId({
      [orderListingKey]: option.nameId,
    });
  };

  const removeItem = (id: string, orderListingKey: string) => {
    const modifiedSelectedDeliveryMethod = omit(
      [orderListingKey],
      selectedDeliveryMethod
    );

    dispatch(
      selectedDeliveryMethodActions.update(modifiedSelectedDeliveryMethod)
    );

    dispatch(
      removeCartItemActions.request({
        employeeId: currentCompany?.employeeId || '',
        cartId: cartData?.id || '',
        transactionRef: id,
        orderListingKey,
      })
    );
  };

  const companyPlan = useSelector(
    (store: Store) => store.getCompanyPlan.data?.data
  );

  const activeBaseSubscription = (
    companyPlan?.activePlans || []
  ).find(({ plan }) => ['BASE', 'PRO'].includes(plan.name.toUpperCase()));
  const transactionValueFeePercent = +pathOr(
    0,
    ['plan', 'transaction_value_fee_percentage'],
    activeBaseSubscription
  );

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
        // price: Number(
        //   +cartItem.subTotal * (1 + transactionValueFeePercent / 100)
        // ).toFixed(2),
        price: (Number(cartItem.listing.price) * cartItem.weight).toFixed(2),
        transactionFee:
          Number(cartItem.listing.price) *
          (transactionValueFeePercent / 100) *
          cartItem.weight,
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
        crateFee: cartItem.crateFee,
        isFreeShipping: cartItem.isFreeShipping,
        listing: {
          isPreAuctionSale: cartItem.listing.isPreAuctionSale,
        },
        shippingOptions: shippingQuotes
          ? (
              shippingQuotes[getOrderListingKey(cartItem)] || {
                priceResult: [],
              }
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
                shipmentMode: data.shipmentMode,
                carrierName: data.carrierName,
                name:
                  data.serviceName === CLICK_AND_COLLECT_SERVICE
                    ? `${serviceName} ${data.locationName}`
                    : `${shipmentMode} ${serviceName}`,
                nameId:
                  data.serviceName === CLICK_AND_COLLECT_SERVICE
                    ? `${serviceName} ${data.locationName} ${data.carrierName}`
                    : `${shipmentMode} ${serviceName} ${data.carrierName}`,
                ...(data.serviceName === CLICK_AND_COLLECT_SERVICE
                  ? { secondName: clickAndCollectAddress2 }
                  : {}),
                price: toPrice(data.grossPrice, false),
                est: estimatedDeliveryToString(
                  data.minTransitTime,
                  data.maxTransitTime,
                  data.estimatedDate,
                  cartItem.listing.isPreAuctionSale
                    ? cartItem.listing.auctionDate
                    : undefined
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

  const groupOrdersByVendor = groupBy((order: OrderItem) => {
    return getOrderListingKey(order);
  });
  const groupedOrders = groupOrdersByVendor(orders);

  const selectedShipping = Object.keys(shippingQuotes).reduce(
    (selectedShippingData: Record<string, OrderShipping>, companyId) => {
      const data = shippingQuotes[companyId];
      const selectedPriceData = shippingQuotes[companyId].priceResult.find(
        (pricing) => {
          const shipmentMode = shipmentModeToString(
            pricing.shipmentMode,
            pricing.serviceName
          );
          const serviceName = serviceNameToString(
            pricing.serviceName,
            pricing.locationName,
            cartItems.find((cartItem) => companyId.includes(cartItem.companyId))
              ?.companyName || ''
          );
          const deliveryMethod =
            pricing.serviceName === CLICK_AND_COLLECT_SERVICE
              ? `${serviceName} ${pricing.locationName} ${pricing.carrierName}`
              : `${shipmentMode} ${serviceName} ${pricing.carrierName}`;

          return deliveryMethod === selectedShippingId[companyId];
        }
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
          sellerDropOffAddress: selectedPriceData?.sellerDropOffAddress,
          sellerDropOff: selectedPriceData?.sellerDropOff,
          viaSFM: selectedPriceData?.viaSFM,
        },
      };
    },
    {}
  );

  const totalValue =
    orders.reduce(
      (totalItemsPrice, currentItem) =>
        totalItemsPrice +
        Number(currentItem.price) +
        Number(transactionValueFeePercent ? currentItem.transactionFee : 0) +
        Number(currentItem.crateFee || 0),
      0
    ) +
    (orders[0]?.isFreeShipping
      ? 0
      : Object.keys(selectedShipping).reduce(
          (totalItemsPrice, companyId) =>
            totalItemsPrice + selectedShipping[companyId].price,
          0
        ));

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
      const payload = cartItemsToPayload(cartItems, selectedShipping);

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
      isPreAuctionSale?: boolean;
    }) => getOrderListingKey(listing)
  );

  const onRefresh = async () => {
    try {
      const { data } = await syncAASBalance(selectedCompany?.id || '');
      if (data) {
        dispatch(getUserActions.request());
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (cartItems.length > 0) {
      if (currentAddress) {
        const listings = cartItems.map((cartItem) => ({
          id: cartItem.listing.id,
          companyId: cartItem.companyId,
          boxes: cartItem.orderBoxes,
          isPreAuctionSale: cartItem.listing.isPreAuctionSale,
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
    if (selectedCompany) {
      onRefresh();
      dispatch(
        getCartActions.request({
          employeeId: selectedCompany?.employeeId || '',
        })
      );
    }
  }, [selectedCompany]);

  useEffect(() => {
    if (currentCompany && currentCompany.id !== selectedCompany?.id) {
      setSelectedCompany(currentCompany);
      onRefresh();
      dispatch(
        getCartActions.request({
          employeeId: selectedCompany?.employeeId || '',
        })
      );
    }
  }, [currentCompany, selectedCompany]);

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
    onDeliveryMethodSelection,
    onRefresh,
    transactionValueFeePercent,
  };

  return <CheckoutView {...generatedProps} />;
};

export default Checkout;
