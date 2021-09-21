import React, { useEffect, useReducer, useState } from 'react';

import { BUYER_ROUTES } from 'consts';
import moment from 'moment';
import { groupBy, sortBy } from 'ramda';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import {
  serviceNameToDeliveryOption,
  shipmentModeToDeliveryMethod,
} from 'utils/String/toShipmentDateString';
import { MarketRequestDetailProps } from 'routes/Buyer/MarketRequests/RequestDetails/RequestDetails.props';
import {
  deleteMarketRequestActions,
  getActiveOffersActions,
  getAllMarketRequestActions,
  getMarketRequestBuyerFiltersActions,
  marketRequestAcceptOfferActions,
  deleteMarketRequestOfferActions,
  cartActions,
  orderActions,
  marketOfferActions,
} from 'store/actions';
import marketRequestNegotiateOfferActions from 'store/actions/marketRequestNegotiation';
import { OrderCartItem, OrderShipping } from 'types/store/AddCardAndPayState';
import { CartItem } from 'types/store/CartState';
import { Negotiations, Offer } from 'types/store/GetActiveOffersState';
import { AcceptOfferItem } from 'types/store/MarketOfferState';
import { Store } from 'types/store/Store';
import { createUpdateReducer } from 'utils/Hooks';
import { isPaymentMethodAvailable } from 'utils/isPaymentMethodAvailable';

import PaymentMethod from './../Checkout/PaymentMethod/PaymentMethod.container';
import {
  getFavouriteSellers,
  getLocation,
  getRating,
  requestToModalFilter,
} from './RequestDetails.transform';
import MarketRequestDetailView from './RequestDetails.view';

const MarketRequestDetail = (): JSX.Element => {
  const location = useLocation();
  const params = useParams<{ id: string }>();
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = params;

  const [offerId, setOfferId] = useState<string>('');

  useEffect(() => {
    if (location.pathname.includes('/offer')) {
      const splits = location.pathname.split('/');
      const offerId = splits[splits.length - 1];
      setOfferId(offerId);
    } else {
      setShowPaymentMethod(false);
    }
  }, [location.pathname]);

  const goTolist = () => {
    history.push(BUYER_ROUTES.MARKET_REQUEST_DETAILS_OFFER_LIST(id));
  };

  const user = useSelector((state: Store) => state.getUser.data?.data.user);
  const activeOffers = useSelector((store: Store) => store.getActiveOffers);
  const activeOffersData = (activeOffers.data?.data.marketOffers || []).filter(
    (d) => moment().diff(moment(d.marketRequest.createdAt), 'days') < 7
  );

  const buyerRequestsFilters = useSelector(
    (store: Store) => store.getMarketRequestBuyerFilters.data?.data
  );

  const { filters } = requestToModalFilter(buyerRequestsFilters);

  let breadCrumbSections = [];
  const offerListBreadCrumb = [
    { label: 'My Requests', link: BUYER_ROUTES.MARKET_REQUESTS },
    {
      label: 'Request Details',
    },
  ];

  const offerBreadCrumb = [
    { label: 'My Requests', link: BUYER_ROUTES.MARKET_REQUESTS },
    {
      label: 'Request Details',
      onClick: () => {
        goTolist();
      },
    },
    {
      label: 'Offer Details',
    },
  ];

  if (
    location.pathname.includes(
      BUYER_ROUTES.MARKET_REQUEST_DETAILS_OFFER_LIST(id)
    )
  ) {
    breadCrumbSections = offerListBreadCrumb;
  } else {
    breadCrumbSections = offerBreadCrumb;
  }
  const [searchTerm, setSearchTerm] = useState('');
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [initial, setInitial] = useState(true);
  const [currentMR, setCurrentMR] = useState<any>();

  const [negotiating, setNegotiating] = useState(false);
  const [currentOfferId, setCurrentOfferId] = useState('');
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [closeOnAccept, setCloseOnAccept] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showNotEnoughCreditAlert, setShowNotEnoughCreditAlert] = useState(
    false
  );

  //filters
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<any[]>([]);
  const [showPaymentMethod, setShowPaymentMethod] = useState(false);

  const acceptOffer = useSelector(
    (store: Store) => store.marketRequestAcceptOffer
  );

  const buyerRequests = useSelector(
    (store: Store) => store.getAllMarketRequest
  );

  const filteredBuyerRequests = buyerRequests.data?.data?.marketRequests.filter(
    (mR) => mR.status !== 'DELETED' && mR.status !== 'CLOSED'
  );

  const filteredBuyerRequest = filteredBuyerRequests?.find(
    (filteredBuyerRequest) => filteredBuyerRequest.id === id
  );

  const onClickItem = (row: any, company: any) => {
    setCurrentOfferId(row.id);
    setSelectedOffer(row);
    setSelectedCompany(company);
    history.push(BUYER_ROUTES.MARKET_REQUEST_DETAILS_OFFER(id, row.id));
  };

  const onClickFilterButton = () => {
    setIsFilterModalOpen((prevState) => !prevState);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [showPaymentMethod]);

  const handleAcceptOffer = () => {
    // history.push(BUYER_ROUTES.CHECKOUT);
    setShowPaymentMethod(true);

    const getMarketNegotiationId = () => {
      if (!selectedOffer?.negotiations) {
        return '';
      }

      return selectedOffer?.negotiations[0]?.id || '';
    };

    const payload: AcceptOfferItem = {
      marketOfferId: selectedOffer?.id || '',
      marketNegotiationId: getMarketNegotiationId(),
      marketRequestId: filteredBuyerRequest?.id || '',
    };

    dispatch(marketOfferActions.add(payload));
  };

  const onClickDelete = () => {
    if (id) {
      dispatch(
        deleteMarketRequestActions.request({
          id,
        })
      );
    }
  };

  const onOfferDelete = (offerIdToDelete: string) => {
    if (offerIdToDelete) {
      dispatch(
        deleteMarketRequestOfferActions.request({
          id: offerIdToDelete,
          marketRequestId: id,
        })
      );
    }
  };

  const submitNegotiation = (counterOffer: number) => {
    if (selectedOffer) {
      dispatch(
        marketRequestNegotiateOfferActions.request({
          marketRequestId: id,
          marketOfferId: selectedOffer.id,
          price: counterOffer,
          // closeOnAccept: closeOnAccept,
        })
      );
    }
    setNegotiating(false);
  };

  const onApply = () => {
    setIsFilterModalOpen(false);

    dispatch(
      getActiveOffersActions.request({
        queryParams: {
          marketRequestId: id,
          searchTerm: searchTerm,
          location: getLocation(selectedFilters, buyerRequestsFilters!),
          rating: getRating(selectedFilters, buyerRequestsFilters!),
          favouriteSellers: getFavouriteSellers(
            selectedFilters,
            buyerRequestsFilters!
          ),
        },
      })
    );
  };

  const onReset = () => {
    setSelectedFilters([]);
  };

  useEffect(() => {
    dispatch(
      getActiveOffersActions.request({
        queryParams: {
          marketRequestId: id,
        },
      })
    );
  }, []);

  useEffect(() => {
    setInitial(false);
    if (activeOffersData[0]?.marketRequest) {
      setCurrentMR(activeOffersData[0].marketRequest);
    }
  }, [activeOffers]);

  useEffect(() => {
    if (initial) return;

    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }

    const timerId = setTimeout(() => {
      dispatch(
        getActiveOffersActions.request({
          queryParams: {
            marketRequestId: id,
            term: searchTerm,
            location: getLocation(selectedFilters, buyerRequestsFilters!),
            rating: getRating(selectedFilters, buyerRequestsFilters!),
            favouriteSellers: getFavouriteSellers(
              selectedFilters,
              buyerRequestsFilters!
            ),
          },
        })
      );
    }, 800);

    setTimer(timerId);
  }, [searchTerm]);

  useEffect(() => {
    dispatch(
      getMarketRequestBuyerFiltersActions.request({
        buyerId: user?.id || '',
      })
    );
  }, [user]);

  useEffect(() => {
    if (acceptOffer.error) {
      setShowNotEnoughCreditAlert(true);
    }
  }, [acceptOffer]);

  useEffect(() => {
    activeOffers.data?.data.marketOffers.forEach((marketOffer) =>
      marketOffer.offers.forEach((offer) => {
        if (offer.id === offerId) {
          setSelectedOffer(offer);
          return;
        }
      })
    );
  }, [offerId, activeOffers]);

  const sortByDate = sortBy((data: { created_at: string }) => data.created_at);

  let counterOffer = '';
  let newOffer = '';
  let deliveryTotal;
  let counterOfferLatest;
  let newOfferLatest;
  let hideNegotiate = false;
  let thereIsNewOffer = false;
  let discountPercentage = '';
  let discountValue = 0;
  let disableAccept = false;
  let isAccepted = false;

  let sortedNegotiations: Negotiations[] = [];
  let lastNegotiationsOffers: Negotiations[] = [];
  if (selectedOffer) {
    if (selectedOffer.negotiations !== null) {
      sortedNegotiations = sortByDate(selectedOffer.negotiations);
      const newOfferArr = sortedNegotiations.filter(
        (i: any) => i.type === 'NEW_OFFER'
      );
      const counterOfferArr = sortedNegotiations.filter(
        (i: any) => i.type === 'COUNTER_OFFER'
      );

      newOfferLatest = newOfferArr.slice(-1)[0];
      counterOfferLatest = counterOfferArr.slice(-1)[0];

      const acceptedOffer = sortedNegotiations.find((a) => a.is_accepted);

      // if (counterOfferArr.length > 0 && counterOfferArr) {
      //   counterOfferLatest = counterOfferArr.reduce((a: any, b: any) =>
      //     a.updated_at > b.updated_at ? a : b
      //   );
      // }

      // if (newOfferArr.length > 0 && newOfferArr) {
      //   newOfferLatest = newOfferArr.reduce((a: any, b: any) =>
      //     a.updated_at > b.updated_at ? a : b
      //   );
      // }

      lastNegotiationsOffers = sortedNegotiations.slice(
        Math.max(
          sortedNegotiations.length - (sortedNegotiations.length >= 2 ? 2 : 1),
          0
        )
      );

      // counterOfferArr.forEach((off, index) => {
      //   const find = lastNegotiationsOffers.find((ltn) => off.id === ltn.id);
      //   if (find !== undefined) {
      //     find.ordinal = index + 1;
      //   }
      // });

      // newOfferArr.forEach((off, index) => {
      //   const find = lastNegotiationsOffers.find((ltn) => off.id === ltn.id);
      //   if (find !== undefined) {
      //     if (index === 0) {
      //       find.ordinal = index + 2;
      //     } else {
      //       find.ordinal = index + 1;
      //     }
      //   }
      // });

      const currentOfferPrice =
        acceptedOffer?.price || newOfferLatest?.price || selectedOffer.price;

      // counterOfferArr is always greater or equal newOfferArr
      // if counterOfferArr is greater than newOfferArr, updatedPrice is latestBuyerNego
      const updatedPrice =
        counterOfferArr.length > newOfferArr.length
          ? counterOfferLatest?.price || 0 // 0 should never happen
          : currentOfferPrice;

      // if counterOfferArr is greater than newOfferArr, initialPrice is currentOfferPrice
      // initially counterOfferArr is 0 so we fallback to currentOfferPrice
      const initialPrice =
        counterOfferArr.length > newOfferArr.length
          ? currentOfferPrice
          : counterOfferLatest?.price || currentOfferPrice;

      discountValue = updatedPrice - initialPrice;

      // standard change in price formula
      discountValue = updatedPrice - initialPrice;
      discountPercentage = ((discountValue / initialPrice) * 100).toFixed(2);
    }

    newOffer = newOfferLatest ? newOfferLatest.price.toString() : '';
    counterOffer = counterOfferLatest
      ? counterOfferLatest.price.toString()
      : '';

    deliveryTotal = newOfferLatest
      ? newOfferLatest.price * selectedOffer.weight
      : selectedOffer.price * selectedOffer.weight;

    thereIsNewOffer =
      selectedOffer.negotiations &&
      //@ts-ignore
      newOfferLatest?.updated_at > counterOfferLatest?.updated_at;

    hideNegotiate =
      (selectedOffer.status === 'OPEN' &&
        !thereIsNewOffer &&
        selectedOffer.negotiations !== null) ||
      selectedOffer.status === 'ACCEPTED';

    disableAccept =
      selectedOffer.status !== 'OPEN' ||
      (!thereIsNewOffer && selectedOffer.negotiations !== null);

    isAccepted = selectedOffer.status === 'ACCEPTED';
  }

  const generatedProps: MarketRequestDetailProps = {
    currentPath: location.pathname,
    currentOfferId,
    totalOffers: activeOffersData.length || 0,
    deliveryTotal,
    counterOffer,
    newOffer,
    selectedOffer,
    marketRequestId: id,
    data: currentMR || {},
    measurementUnit: activeOffersData[0]?.offers[0].measurementUnit || '',
    sellerOffers: activeOffersData || [],
    searchTerm,
    negotiating,
    setNegotiating,
    setSearchTerm,
    onClickItem,
    selectedCompany,
    breadCrumbSections,
    handleAcceptOffer,
    submitNegotiation,
    hideNegotiate,
    closeOnAccept,
    setCloseOnAccept,
    thereIsNewOffer,
    discountPercentage,
    discountValue,
    disableAccept,
    isAccepted,
    onClickDelete,
    showDelete,
    setShowDelete,
    sortedNegotiations,
    lastNegotiationsOffers,
    isLoading: activeOffers.pending || false,
    filterModalProps: {
      isOpen: isFilterModalOpen,
      filters,
      selectedFilters,
      setSelectedFilters,
      onApply,
      onReset,
      onClickClose: () => setIsFilterModalOpen(false),
    },
    onClickFilterButton,
    showNotEnoughCreditAlert,
    setShowNotEnoughCreditAlert,
    onOfferDelete,
  };

  const getPrice = () => {
    if (!selectedOffer?.negotiations) {
      return selectedOffer?.price || 0;
    }

    return selectedOffer?.negotiations[0]?.price || 0;
  };

  if (showPaymentMethod) {
    return (
      <PaymentMethod
        totalValue={getPrice() * (selectedOffer?.weight || 0) || 0}
        orderError={''}
        selectedShipping={{}}
        placeOrder={() => {}}
        onBack={() => setShowPaymentMethod(false)}
      />
    );
  }

  return <MarketRequestDetailView {...generatedProps} />;
};

export default MarketRequestDetail;
