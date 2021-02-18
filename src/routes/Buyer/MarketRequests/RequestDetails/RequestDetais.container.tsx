import React, { useState } from 'react';

import { BUYER_ROUTES } from 'consts';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import { MarketRequestDetailProps } from './RequestDetails.prop';
import MarketRequestDetailView from './RequestDetails.view';

const MarketRequestDetail = (): JSX.Element => {
  // MARK:- States / Variables
  const location = useLocation<{
    id: string;
    type: string;
    image: string;
    status: string;
    offersTotal: number;
    expiry: string;
  }>();
  const history = useHistory();

  const marketRequestOffers = [];

  const id = location.state ? location.state.id : '';
  const image = location.state ? location.state.image : '';
  const type = location.state ? location.state.type : '';
  const status = location.state ? location.state.status : '';
  const offersTotal = location.state ? location.state.offersTotal : 0;
  const expiry = location.state ? location.state.expiry : '';

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
        history.push(BUYER_ROUTES.MARKET_REQUEST_DETAILS_OFFER_LIST(id), {
          type,
          image,
          status,
          offersTotal,
          expiry,
          id,
        });
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

  const onClickItem = (row: any) => {
    history.push(BUYER_ROUTES.MARKET_REQUEST_DETAILS_OFFER(row.id), {
      id,
      type,
      image,
      status,
      offersTotal,
      expiry,
      offer: row,
    });
  };

  const generatedProps: MarketRequestDetailProps = {
    currentPath: location.pathname,
    data: {
      id,
      type,
      image,
      status,
      offersTotal,
      expiry,
    },
    searchTerm,
    setSearchTerm,
    onClickItem,
    breadCrumbSections,
  };

  return <MarketRequestDetailView {...generatedProps} />;
};

export default MarketRequestDetail;
