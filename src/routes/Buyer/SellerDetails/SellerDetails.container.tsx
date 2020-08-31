import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllCategory } from 'services/category';
import { getSellerByCompanyId } from 'services/company';
import { updateFavouriteSeller } from 'services/favourite';
import { Store } from 'types/store/Store';

import SellerDetailsView from './SellerDetails.view';

const SellerDetails = (): JSX.Element => {
  const { id } = useParams();
  const token = useSelector((state: Store) => state.auth.token) || '';
  const [loading, setLoading] = useState(true);
  const [seller, setSeller] = useState({});
  const [categories, setCategories] = useState([]);
  const [searchString, setSearchString] = useState('');

  // TODO: Decoupling by converting to saga ?
  const fetchSellerData = async (sellerId: string, token: string) => {
    try {
      const resp = await getSellerByCompanyId({ sellerId }, token);
      const sellerData = resp.data?.data?.seller || {};

      setSeller(sellerData);
      setLoading(false);
    } catch (error) {
      setSeller({});
    }
  };

  const fetchAllCategory = async () => {
    const resp = await getAllCategory();
    const categories = resp.data?.data?.categories || [];

    setCategories(categories);
  };

  // TODO: Decoupling by converting to saga ?
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

  const onSearch = (searchString: string) => {
    // TODO: Optimization, delay search to 250ms after last input
    setSearchString(searchString);
  };

  useEffect(() => {
    fetchSellerData(id, token);
    fetchAllCategory();
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
    search: searchString,
    categories,
    ...seller,
    onSearch,
    onFavourite: (favourite: boolean) => {
      return onFavourite(id, favourite, token);
    },
  };

  return <SellerDetailsView {...generatedProps} />;
};

export default SellerDetails;
