import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSellerByCompanyId } from 'services/company';
import { updateFavouriteSeller } from 'services/favourite';
import { Store } from 'types/store/Store';

import SellerDetailsView from './SellerDetails.view';

const SellerDetails = (): JSX.Element => {
  const { id } = useParams();
  const token = useSelector((state: Store) => state.auth.token) || '';
  const [loading, setLoading] = useState(true);
  const [seller, setSeller] = useState({});

  // TODO: decouple by converting to saga ?
  const fetchSellerData = async (sellerId: string, token: string) => {
    try {
      const resp = await getSellerByCompanyId({ sellerId }, token);
      setSeller(resp.data.data.seller);
      setLoading(false);
    } catch (error) {
      setSeller({});
    }
  };

  // TODO: decouple by converting to saga ?
  const onFavourite = async (
    sellerId: string,
    favorite: boolean,
    token: string
  ) => {
    try {
      await updateFavouriteSeller({ sellerId, favorite }, token);
      await fetchSellerData(sellerId, token);
    } catch (error) {
      setSeller({});
    }
  };

  useEffect(() => {
    fetchSellerData(id, token);
  }, []);

  useEffect(() => {
    console.log({ seller });
  }, [seller]);

  const generatedProps = {
    loading,
    companyName: '',
    companyImage: '',
    companyLocation: {
      state: '',
      countryCode: '',
    },
    rating: 0,
    isFavourite: false,
    ...seller,
    onFavourite: (favourite: boolean) => {
      return onFavourite(id, favourite, token);
    },
  };

  return <SellerDetailsView {...generatedProps} />;
};

export default SellerDetails;
