import React, { useState } from 'react';

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

  const id = location.state ? location.state.id : '';
  const image = location.state ? location.state.image : '';
  const type = location.state ? location.state.type : '';
  const status = location.state ? location.state.status : '';
  const offersTotal = location.state ? location.state.offersTotal : 0;
  const expiry = location.state ? location.state.expiry : '';

  const [searchTerm, setSearchTerm] = useState('');

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
  };

  return <MarketRequestDetailView {...generatedProps} />;
};

export default MarketRequestDetail;
