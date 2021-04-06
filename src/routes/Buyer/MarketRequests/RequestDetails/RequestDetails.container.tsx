import React, { useEffect, useState } from 'react';

import { BUYER_ROUTES } from 'consts';
import { sortBy } from 'ramda';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { MarketRequestDetailProps } from 'routes/Buyer/MarketRequests/RequestDetails/RequestDetails.props';
import {
  deleteMarketRequestActions,
  getActiveOffersActions,
  marketRequestAcceptOfferActions,
} from 'store/actions';
import marketRequestNegotiateOfferActions from 'store/actions/marketRequestNegotiation';
import { Negotiations, Offer } from 'types/store/GetActiveOffersState';
import { Store } from 'types/store/Store';

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

  const activeOffers = useSelector((store: Store) => store.getActiveOffers);

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
  const [negotiating, setNegotiating] = useState(false);
  const [currentOfferId, setCurrentOfferId] = useState('');
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [closeOnAccept, setCloseOnAccept] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const onClickItem = (row: any, company: any) => {
    setCurrentOfferId(row.id);
    setSelectedOffer(row);
    setSelectedCompany(company);
    history.push(BUYER_ROUTES.MARKET_REQUEST_DETAILS_OFFER(id, row.id));
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

  useEffect(() => {
    dispatch(
      getActiveOffersActions.request({
        queryParams: {
          marketRequestId: id,
        },
      })
    );
  }, []);
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

      const counterOfferArr = sortedNegotiations.filter(
        (i: any) => i.type === 'COUNTER_OFFER'
      );
      const newOfferArr = sortedNegotiations.filter(
        (i: any) => i.type === 'NEW_OFFER'
      );

      if (counterOfferArr.length > 0 && counterOfferArr) {
        counterOfferLatest = counterOfferArr.reduce((a: any, b: any) =>
          a.updated_at > b.updated_at ? a : b
        );
      }

      if (newOfferArr.length > 0 && newOfferArr) {
        newOfferLatest = newOfferArr.reduce((a: any, b: any) =>
          a.updated_at > b.updated_at ? a : b
        );
      }

      lastNegotiationsOffers = sortedNegotiations
        .slice(
          Math.max(
            sortedNegotiations.length - (sortedNegotiations.length > 2 ? 2 : 1),
            0
          )
        )
        .reverse();

      counterOfferArr.forEach((off, index) => {
        const find = lastNegotiationsOffers.find((ltn) => off.id === ltn.id);
        if (find !== undefined) {
          find.ordinal = index + 1;
        }
      });

      newOfferArr.forEach((off, index) => {
        const find = lastNegotiationsOffers.find((ltn) => off.id === ltn.id);
        if (find !== undefined) {
          if (index === 0) {
            find.ordinal = index + 2;
          } else {
            find.ordinal = index + 1;
          }
        }
      });
    }

    newOffer = newOfferLatest ? newOfferLatest.price.toString() : '';
    counterOffer = counterOfferLatest
      ? counterOfferLatest.price.toString()
      : '';

    const actualPrice = newOffer ? parseFloat(newOffer) : selectedOffer.price;
    discountValue = actualPrice - parseFloat(counterOffer);

    discountPercentage = (discountValue
      ? (discountValue / actualPrice) * 100
      : 0
    ).toFixed(2);

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
    totalOffers: activeOffers.data?.data.count || 0,
    deliveryTotal,
    counterOffer,
    newOffer,
    selectedOffer,
    marketRequestId: id,
    data: activeOffers.data?.data.marketOffers[0]?.marketRequest || {},
    measurementUnit:
      activeOffers.data?.data.marketOffers[0]?.offers[0].measurementUnit || '',
    sellerOffers: activeOffers.data?.data.marketOffers || [],
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
  };

  return <MarketRequestDetailView {...generatedProps} />;
};

export default MarketRequestDetail;
