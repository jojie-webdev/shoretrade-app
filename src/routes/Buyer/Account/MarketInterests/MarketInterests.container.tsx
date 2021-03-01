import React, { useEffect, useState } from 'react';

import { isEmpty } from 'ramda';
import { useDispatch, useSelector } from 'react-redux';
import { Listing } from 'routes/Buyer/Account/MarketInterests/MarketInterests.props';
import MarketInterestsView from 'routes/Buyer/Account/MarketInterests/MarketInterests.view';
import { getAvailableCategories } from 'services/category';
import { getInactiveTypesByCategory } from 'services/listing';
import {
  getMarketInterestsActions,
  updateMarketInterestsActions,
} from 'store/actions';
import { GetDefaultCompany } from 'store/selectors/buyer';
import { Category } from 'types/store/GetCategories';
import { Store } from 'types/store/Store';

const MarketInterests = (): JSX.Element => {
  const dispatch = useDispatch();

  const currentCompany = GetDefaultCompany();
  const buying =
    useSelector((store: Store) => store.getMarketInterests.data?.data.buying) ||
    [];
  const updateMarketInterests = useSelector(
    (store: Store) => store.updateMarketInterests
  );

  const companyId = currentCompany?.id || '';

  const [isInner, setIsInner] = useState(false);

  const [categories, setCategories] = useState<Category[]>([]);
  const [innerCategories, setInnerCategories] = useState<Listing[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<Listing[]>([]);

  const [loadingInnerCategories, setLoadingInnerCategories] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const callAvailableCategories = async () => {
      const { data } = await getAvailableCategories();
      setCategories(data.data.categories);
    };

    callAvailableCategories();
  }, []);

  useEffect(() => {
    if (companyId) {
      dispatch(
        getMarketInterestsActions.request({
          companyId,
        })
      );
    }
  }, [companyId]);

  useEffect(() => {
    if (!isEmpty(buying)) setSelectedCategories(buying as Listing[]);
  }, [buying]);

  useEffect(() => {
    if (updateMarketInterests?.data?.status === 200) {
      dispatch(
        getMarketInterestsActions.request({
          companyId,
        })
      );
    }
  }, [updateMarketInterests?.data?.status]);

  const onPressCategory = async (id: string) => {
    setIsInner(true);
    setSearchTerm('');
    setLoadingInnerCategories(true);

    const { data } = await getInactiveTypesByCategory(id);
    const newInnerCategories: Listing[] = data.data.type;

    setLoadingInnerCategories(false);
    setInnerCategories(newInnerCategories);
  };

  const onPressInnerCategory = (l: Listing) => {
    const exists = selectedCategories.some((c) => c.id === l.id);

    if (exists) {
      setSelectedCategories((prevState) =>
        prevState.filter((c) => c.id !== l.id)
      );
    } else {
      setSelectedCategories([...selectedCategories, l]);
    }
  };

  const onSave = () => {
    dispatch(
      updateMarketInterestsActions.request({
        companyId,
        buying: selectedCategories,
        selling: [],
      })
    );
  };

  let categoriesFiltered = categories;
  if (!isInner) {
    categoriesFiltered = categories.filter((c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  let innerCategoriesFiltered = innerCategories;
  if (isInner) {
    innerCategoriesFiltered = innerCategories.filter((c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const generatedProps = {
    isInner,
    setIsInner,
    searchTerm,
    setSearchTerm,
    selectedCategories,
    setSelectedCategories,

    buying,
    categories: categoriesFiltered,
    innerCategories: innerCategoriesFiltered,
    loadingInnerCategories,

    onPressCategory,
    onPressInnerCategory,
    onSave,

    isSaving: updateMarketInterests?.pending || false,
  };
  return <MarketInterestsView {...generatedProps} />;
};

export default MarketInterests;
