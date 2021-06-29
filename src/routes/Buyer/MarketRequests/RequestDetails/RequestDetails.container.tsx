import React, { useEffect, useState } from 'react';

import { BUYER_ROUTES } from 'consts';
import moment from 'moment';
import { sortBy } from 'ramda';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { MarketRequestDetailProps } from 'routes/Buyer/MarketRequests/RequestDetails/RequestDetails.props';
import {
  deleteMarketRequestActions,
  getActiveOffersActions,
  getAllMarketRequestActions,
  getMarketRequestBuyerFiltersActions,
  marketRequestAcceptOfferActions,
} from 'store/actions';
import marketRequestNegotiateOfferActions from 'store/actions/marketRequestNegotiation';
import { Negotiations, Offer } from 'types/store/GetActiveOffersState';
import { Store } from 'types/store/Store';

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

  //filters
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<any[]>([]);

  const onClickItem = (row: any, company: any) => {
    setCurrentOfferId(row.id);
    setSelectedOffer(row);
    setSelectedCompany(company);
    history.push(BUYER_ROUTES.MARKET_REQUEST_DETAILS_OFFER(id, row.id));
  };

  const onClickFilterButton = () => {
    setIsFilterModalOpen((prevState) => !prevState);
  };

  const handleAcceptOffer = () => {
    dispatch(
      marketRequestAcceptOfferActions.request({
        marketOfferId: currentOfferId,
        marketRequestId: id,
        marketNegotiationId:
          selectedOffer?.negotiations?.reduce((a, b) =>
            a.updated_at > b.updated_at ? a : b
          ).id || undefined,
      })
    );
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

  const submitNegotiation = (v: number) => {
    if (selectedOffer) {
      dispatch(
        marketRequestNegotiateOfferActions.request({
          marketRequestId: id,
          marketOfferId: selectedOffer.id,
          price: v,
          closeOnAccept: closeOnAccept,
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
  };

  return <MarketRequestDetailView {...generatedProps} />;
};

export default MarketRequestDetail;
