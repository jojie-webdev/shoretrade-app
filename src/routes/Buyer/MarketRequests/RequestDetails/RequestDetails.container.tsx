import React, { useState, useEffect } from 'react';

import { BUYER_ROUTES } from 'consts';
import { act } from 'react-dom/test-utils';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { getActiveOffersActions } from 'store/actions';
import { Store } from 'types/store/Store';

import { MarketRequestDetailProps } from './RequestDetails.prop';
import MarketRequestDetailView from './RequestDetails.view';

const MarketRequestDetail = (): JSX.Element => {
  // MARK:- States / Variables
  const location = useLocation<{
    id: string;
    type: string;
    image: string;
    status: string;
    offers: number;
    expiry: string;
    measurementUnit: string;
    weight: {
      from: number;
      to: number;
    };
  }>();
  const history = useHistory();
  const dispatch = useDispatch();

  const goTolist = () => {
    history.push(BUYER_ROUTES.MARKET_REQUEST_DETAILS_OFFER_LIST(id), {
      type,
      image,
      status,
      offers,
      expiry,
      id,
    });
  };

  const id = location.state ? location.state.id : '';
  const image = location.state ? location.state.image : '';
  const type = location.state ? location.state.type : '';
  const status = location.state ? location.state.status : '';
  const offers = location.state ? location.state.offers : 0;
  const expiry = location.state ? location.state.expiry : '';
  const measurementUnit = location.state ? location.state.measurementUnit : '';
  const weight = location.state ? location.state.weight : { from: 0, to: 0 };

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

  //TEMP Breadcrumb dynamic functionality

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
  const [selectedOffer, setSelectedOffer] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');

  if (
    !selectedOffer &&
    location.pathname.includes(BUYER_ROUTES.MARKET_REQUEST_DETAILS_OFFER(id))
  ) {
    goTolist();
  }

  const onClickItem = (row: any, company: any) => {
    setCurrentOfferId(row.id);
    setSelectedOffer(row);
    setSelectedCompany(company);
    history.push(BUYER_ROUTES.MARKET_REQUEST_DETAILS_OFFER(row.id), {
      id,
      type,
      image,
      status,
      offers,
      expiry,
      weight,
      measurementUnit,
    });
  };

  const generatedProps: MarketRequestDetailProps = {
    currentPath: location.pathname,
    currentOfferId,
    selectedOffer,
    data: {
      id,
      type,
      image,
      status,
      offers,
      expiry,
      weight,
      measurementUnit,
    },
    sellerOffers: activeOffers.data?.data.marketOffers || [],
    searchTerm,
    negotiating,
    setNegotiating,
    setSearchTerm,
    onClickItem,
    selectedCompany,
    breadCrumbSections,
  };

  return <MarketRequestDetailView {...generatedProps} />;
};

export default MarketRequestDetail;
