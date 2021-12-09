import React, { useEffect, useState } from 'react';

import { BUYER_ROUTES } from 'consts';
import { BUYER_MARKET_REQUEST_ROUTES } from 'consts/routes';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { MarketRequestDetailProps } from 'routes/Buyer/MarketRequests/RequestDetails/RequestDetails.props';
import {
  deleteMarketRequestActions,
  getActiveOffersActions,
  getMarketRequestBuyerFiltersActions,
  deleteMarketRequestOfferActions,
} from 'store/actions';
import { Offer } from 'types/store/GetActiveOffersState';
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
  const [offerId, setOfferId] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [initial, setInitial] = useState(true);
  const [currentMR, setCurrentMR] = useState<any>();

  const [currentOfferId, setCurrentOfferId] = useState('');
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [closeOnAccept, setCloseOnAccept] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  //filters
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<any[]>([]);
  const [showPaymentMethod, setShowPaymentMethod] = useState(false);

  const goTolist = () => {
    history.push(BUYER_MARKET_REQUEST_ROUTES.MARKET_REQUEST_DETAILS(id));
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
      BUYER_MARKET_REQUEST_ROUTES.MARKET_REQUEST_DETAILS(id)
    )
  ) {
    breadCrumbSections = offerListBreadCrumb;
  } else {
    breadCrumbSections = offerBreadCrumb;
  }

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
    history.push(
      BUYER_MARKET_REQUEST_ROUTES.MARKET_REQUEST_DETAILS_OFFER(id, row.id)
    );
  };

  const onClickFilterButton = () => {
    setIsFilterModalOpen((prevState) => !prevState);
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

  const onReset = () => {
    setSelectedFilters([]);
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

  useEffect(() => {
    dispatch(
      getActiveOffersActions.request({
        queryParams: {
          marketRequestId: id,
        },
      })
    );
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [showPaymentMethod]);

  useEffect(() => {
    setInitial(false);
    if (activeOffersData[0]?.marketRequest) {
      setCurrentMR(activeOffersData[0].marketRequest);
    }
    // eslint-disable-next-line
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
    // eslint-disable-next-line
  }, [searchTerm]);

  useEffect(() => {
    dispatch(
      getMarketRequestBuyerFiltersActions.request({
        buyerId: user?.id || '',
      })
    );
    // eslint-disable-next-line
  }, [user]);

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

  useEffect(() => {
    if (location.pathname.includes('/offer')) {
      const splits = location.pathname.split('/');
      const offerId = splits[splits.length - 1];
      setOfferId(offerId);
    } else {
      setShowPaymentMethod(false);
    }
  }, [location.pathname]);

  const generatedProps: MarketRequestDetailProps = {
    currentPath: location.pathname,
    currentOfferId,
    totalOffers: activeOffersData.length || 0,
    selectedOffer,
    marketRequestId: id,
    data: currentMR || {},
    measurementUnit: activeOffersData[0]?.offers[0].measurementUnit || '',
    sellerOffers: activeOffersData || [],
    searchTerm,
    setSearchTerm,
    onClickItem,
    selectedCompany,
    breadCrumbSections,
    closeOnAccept,
    setCloseOnAccept,
    onClickDelete,
    showDelete,
    setShowDelete,
    filteredBuyerRequest,
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
    onOfferDelete,
  };

  return <MarketRequestDetailView {...generatedProps} />;
};

export default MarketRequestDetail;
