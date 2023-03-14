import React, { useEffect, useReducer, useState } from 'react';

import { Option } from 'components/module/ShippingCard/ShippingCard.props';
import { BUYER_ROUTES, clickAndCollectAddress2 } from 'consts';
import { ADDITIONAL_INFOS } from 'consts/listingAdditionalInfos';
import { pathOr, omit } from 'ramda';
import equals from 'ramda/es/equals';
import groupBy from 'ramda/es/groupBy';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { OrderItem } from 'routes/Buyer/Checkout/Checkout.props';
import { syncAASBalance } from 'services/aas';
import { getNegotiationById } from 'services/negotiations';
import {
  getShippingQuoteActions,
  orderActions,
  getCartByEmployeeIdAndNegotiationIdActions,
  removeCartItemActions,
  selectedDeliveryMethodActions,
  getNegotiationByIdActions,
  getListingBoxesActions,
} from 'store/actions';
import getUserActions from 'store/actions/getUser';
import { GetDefaultCompany } from 'store/selectors/buyer';
import {
  GetCartDataItem,
  GetCartListingDataItem,
  NegotiationItem,
} from 'types/store/GetCartByEmployeeIdAndNegotiationIdState';
import { UserCompany } from 'types/store/GetUserState';
import { OrderCartItem, OrderShipping } from 'types/store/OrderState';
import { Store } from 'types/store/Store';
import { getOrderListingKey } from 'utils/getOrderListingKey';
import { createUpdateReducer } from 'utils/Hooks/createUpdateReducer';
import { isPaymentMethodAvailable } from 'utils/isPaymentMethodAvailable';
import { sizeToString } from 'utils/Listing';
import { parsePrice } from 'utils/parsePrice';
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

import { TRANSACTION_VALUE_FEE_PERCENTAGE } from './NegotiationCheckout.constants';
import { cartItemsToPayload } from './NegotiationCheckout.transform';
import NegotiationCheckoutView from './NegotiationCheckout.view';

const NegotiationCheckout = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams<{ negotiationId: string }>();

  const paymentModes = useSelector(
    (state: Store) => state.getPaymentMode.data?.data.payment_mode
  );
  const negotiation = useSelector(
    (state: Store) => state.getNegotiationById.data?.data
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
    useSelector(
      (store: Store) => store.getCartByEmployeeIdAndNegotiationId.pending
    ) || false;

  const loadingShippingQuotes =
    useSelector((store: Store) => store.getShippingQuote.pending) || false;

  const shippingQuotes =
    useSelector((store: Store) => store.getShippingQuote.data?.data) || {};

  const orderError = useSelector((store: Store) => store.order.error) || '';

  const cartData = useSelector(
    (store: Store) => store.getCartByEmployeeIdAndNegotiationId.data?.data
  );
  const isCartDataLoading =
    useSelector(
      (store: Store) => store.getCartByEmployeeIdAndNegotiationId.pending
    ) || false;

  let cartDataItems = cartData?.items || {};
  // const negotiation = cartData?.items['negotiation_request'] as NegotiationItem;
  cartDataItems = omit(['negotiation_request'], cartDataItems);

  const cartItems = Object.keys(cartDataItems).map((key) => ({
    ...cartDataItems[key],
    cartItemId: key,
  })) as GetCartDataItem[];
  // cartItems = cartItems.filter((cartItem) => cartItem?.listing);

  useEffect(() => {
    if (!loadingShippingQuotes) {
      const defaultShippingIds = Object.keys(shippingQuotes).reduce(
        (accumulator, key) => {
          const priceResults = shippingQuotes[key].priceResult.reduce(
            (prevValue: any, curValue: any) => {
              const serviceName = serviceNameToString(
                curValue.serviceName,
                curValue.locationName
              );

              if (serviceName.toLowerCase().includes('pickup at')) {
                return [curValue, ...prevValue];
              } else {
                return [...prevValue, curValue];
              }
            },
            []
          );

          const clickCollectShipping = priceResults.filter(
            (result) => result.serviceName === 'CLICK & COLLECT'
          );

          const priceResult = clickCollectShipping
            ? clickCollectShipping[0]
            : priceResults[0];

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

      if (Object.keys(selectedDeliveryMethod).length > 0) {
        setSelectedShippingId(selectedDeliveryMethod);
      } else {
        setSelectedShippingId(defaultShippingIds);
      }
    }
    // eslint-disable-next-line
  }, [loadingShippingQuotes]);

  useEffect(() => {
    if (!isCartDataLoading && (!cartItems || cartItems?.length === 0)) {
      dispatch(selectedDeliveryMethodActions.clear());
    }
  }, [isCartDataLoading]);

  useEffect(() => {
    if (params.negotiationId) {
      dispatch(
        getNegotiationByIdActions.request({
          negotiationRequestId: params.negotiationId,
        })
      );
    }
  }, [params.negotiationId]);

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

  const activeBaseSubscription = (companyPlan?.activePlans || []).find(
    ({ plan }) => ['BASE', 'PRO'].includes(plan.name.toUpperCase())
  );

  let essentials = (companyPlan?.activePlans || []).find(
    ({ plan }) => plan?.alias === 'BASE'
  );

  let transactionValueFeePercent = +pathOr(
    0,
    ['plan', 'transaction_value_fee_percentage'],
    activeBaseSubscription
  );

  const overrideTransactionValueFeePercent = +pathOr(
    0,
    ['subscription', 'override_fee_percentage'],
    essentials
  );

  if (!overrideTransactionValueFeePercent) {
    essentials = (companyPlan?.activePlans || []).find(
      ({ plan }) => plan?.alias === 'FREE_BASE'
    );
  }

  if (essentials) {
    transactionValueFeePercent =
      overrideTransactionValueFeePercent || TRANSACTION_VALUE_FEE_PERCENTAGE;
  }

  const orders = cartItems.map((cartItem): OrderItem => {
    const additionalInfos = ADDITIONAL_INFOS.map((info) => {
      if (cartItem.listing[info.key as keyof GetCartListingDataItem]) {
        return info.display;
      } else return '';
    }).filter((info) => info !== '');

    const isGSTIncluded = cartItem.listing.isGSTIncluded;
    const subTotal = isGSTIncluded
      ? parsePrice(
          (Number(cartItem.listing.price) *
            (negotiation?.desired_quantity || 0)) /
            1.1
        )
      : parsePrice(
          Number(cartItem.listing.price) * (negotiation?.desired_quantity || 0)
        );

    const transactionFee = subTotal
      ? Number((subTotal * (transactionValueFeePercent / 100)).toFixed(2))
      : 0;

    // const negoPrice = () => {
    //   //negotiation?.history
    //   negotiation?.history.
    // }

    return {
      cartItemId: cartItem.cartItemId || '',
      title: 'Order Summary',
      uri: cartItem.listing.image,
      name: cartItem.listing.type,
      price: (
        (negotiation?.negotiation_offer?.counter_offer ||
          Number(negotiation?.counter_offer || 0)) *
        (negotiation?.desired_quantity || 0)
      ).toFixed(2), //negotiation.desired_quantity * negotiation //
      transactionFee: transactionFee,
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
      weight: (negotiation?.desired_quantity || 0).toFixed(2),
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
      isGSTIncluded: isGSTIncluded,
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
  });

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
  }, [cartItems.length, currentAddress]);

  useEffect(() => {
    if (selectedCompany && params.negotiationId) {
      onRefresh();
      dispatch(
        getCartByEmployeeIdAndNegotiationIdActions.request({
          employeeId: selectedCompany?.employeeId || '',
          negoRequestId: params.negotiationId,
        })
      );
    }
  }, [selectedCompany, params.negotiationId]);

  useEffect(() => {
    if (
      currentCompany &&
      currentCompany.id !== selectedCompany?.id &&
      currentCompany?.employeeId &&
      params.negotiationId
    ) {
      setSelectedCompany(currentCompany);
      onRefresh();
      dispatch(
        getCartByEmployeeIdAndNegotiationIdActions.request({
          employeeId: currentCompany?.employeeId || '',
          negoRequestId: params.negotiationId,
        })
      );
    }
  }, [currentCompany, selectedCompany, params.negotiationId]);

  // useEffect(() => {
  //   if (negotiation?.desired_quantity && cartItems[0].listing.id) {
  //     dispatch(getListingBoxesActions.request({
  //       listingId: cartItems[0].listing.id,
  //       weight: negotiation?.desired_quantity?.toString(),
  //     }))
  //   }
  // }, [cartItems, negotiation]);

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

  return <NegotiationCheckoutView {...generatedProps} />;
};

export default NegotiationCheckout;
