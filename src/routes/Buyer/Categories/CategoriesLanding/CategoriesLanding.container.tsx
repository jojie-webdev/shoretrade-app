import React, { ChangeEvent, useEffect, useState } from 'react';

import { isEmpty } from 'ramda';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getBuyerHomepage } from 'services/company';
import useSelectorSafe from 'store/selectors/useSelectorSafe';
import { Store } from 'types/store/Store';

import CategoriesLandingView from './CategoriesLanding.view';

const CategoriesLanding = (): JSX.Element => {
  const location = useLocation();
  const dispatch = useDispatch();

  const token = useSelector((state: Store) => state.auth.token) || '';
  const userData = useSelector((state: Store) => state.getUser.data?.data.user);
  const addresses =
    useSelectorSafe((state) => state.getAddresses.data?.data.addresses) || [];
  console.log(userData, addresses);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const load = async () => {
      // await getBuyerHomepage();
    };
    load();
  }, []);

  const categories = (
    useSelectorSafe(
      (state) => state.getBuyerHomepage.data?.data.data.categories
    ) || []
  ).filter((category) =>
    search ? category.name.toLowerCase().includes(search.toLowerCase()) : true
  );
  const generatedProps = {
    // generated props here
  };
  return <CategoriesLandingView {...generatedProps} />;
};

export default CategoriesLanding;
