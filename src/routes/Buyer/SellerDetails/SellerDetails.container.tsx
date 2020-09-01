import React, { useState, useEffect } from 'react';

import { SellerRatingProps } from 'components/module/SellerRating/SellerRating.props';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSellerByCompanyId } from 'services/company';
import { updateFavouriteSeller } from 'services/favourite';
import { Seller } from 'types/store/GetSellerByIdState';
import { Store } from 'types/store/Store';

import SellerDetailsView from './SellerDetails.view';

const SellerDetails = (): JSX.Element => {
  const { id } = useParams();
  const token = useSelector((state: Store) => state.auth.token) || '';
  const [loading, setLoading] = useState(true);
  const [seller, setSeller] = useState<Partial<Seller>>({});
  const [result, setResult] = useState<any[]>([]);
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

  // TODO: Decoupling by converting to saga ?
  const onFavourite = async (favorite: boolean): Promise<any> => {
    try {
      if (seller) {
        await updateFavouriteSeller(
          {
            sellerId: id || '',
            favorite,
          },
          token
        );
      }
    } catch (error) {
      setSeller({});
    } finally {
      await fetchSellerData(id, token);
    }
  };

  const onSearch = (searchString: string) => {
    // TODO: Optimization, delay search to 250ms after last input
    setSearchString(searchString);
  };

  useEffect(() => {
    fetchSellerData(id, token);
  }, []);

  useEffect(() => {
    console.log({ seller });
  }, [seller]);

  useEffect(() => {
    const listings = seller?.listings || [];
    const r = listings.filter((r) => r.type.includes(searchString));
    debugger
    setResult(r);
  }, [seller, searchString]);

  const sellerRatingProps: SellerRatingProps = {
    companyName: seller?.companyName || '',
    companyImage: seller?.companyImage || '',
    companyLocation: seller?.companyLocation,
    rating: seller?.rating || 0,
    isFavourite: seller?.isFavourite,
    onFavourite,
  }
  const generatedProps = {
    sellerRatingProps,
    loading,
    search: searchString,
    result,
    onSearch,
    // onFavourite: (favourite: boolean) => {
    //   return onFavourite(id, favourite, token);
    // },
  };

  return <SellerDetailsView {...generatedProps} />;
};

export default SellerDetails;
