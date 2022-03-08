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
  const token = useSelector((store: Store) => store.auth.token);

  const companyId = currentCompany?.id || '';

  const [isInner, setIsInner] = useState(false);

  const [categories, setCategories] = useState<Category[]>([]);
  const [innerCategories, setInnerCategories] = useState<Listing[]>([]);
  const [currentCategoryId, setCurrentCategoryId] = useState('');

  const [selectedCategories, setSelectedCategories] = useState<
    {
      id: string;
      name: string;
      categoryId: string;
    }[]
  >([]);

  const [loadingInnerCategories, setLoadingInnerCategories] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isInner) {
      if (timer) {
        clearTimeout(timer);
        setTimer(null);
      }

      const timerId = setTimeout(() => {
        const callAvailableCategories = async () => {
          const { data } = await getAvailableCategories(searchTerm);

          const categories: any[] = data.data.categories;
          if (!searchTerm) {
            setInnerCategories([]);
          } else {
            setInnerCategories(
              categories
                .map((c: { id: string; types: Listing[] }) => {
                  if (c.types) {
                    return c.types.map((t) => ({
                      ...t,
                      categoryId: c.id,
                    }));
                  } else {
                    return [];
                  }
                })
                .flat()
            );
          }
          setCategories(categories);
        };

        callAvailableCategories();
      }, 500);

      setTimer(timerId);
    }
    // eslint-disable-next-line
  }, [searchTerm, isInner]);

  useEffect(() => {
    if (companyId) {
      dispatch(
        getMarketInterestsActions.request({
          companyId,
        })
      );
    }
    // eslint-disable-next-line
  }, [companyId]);

  useEffect(() => {
    if (!isEmpty(buying)) setSelectedCategories(buying);
  }, [buying]);

  useEffect(() => {
    if (updateMarketInterests?.data?.status === 200) {
      dispatch(
        getMarketInterestsActions.request({
          companyId,
        })
      );
      // eslint-disable-next-line
      setIsInner(false);
    }
    // eslint-disable-next-line
  }, [updateMarketInterests?.data?.status]);

  const onPressCategory = async (id: string) => {
    setIsInner(true);
    setCurrentCategoryId(id);
    setSearchTerm('');
    setLoadingInnerCategories(true);

    const { data } = await getInactiveTypesByCategory(id, token);
    const newInnerCategories: Listing[] = data.data.type;

    setLoadingInnerCategories(false);
    setInnerCategories(newInnerCategories);
  };

  const onPressInnerCategory = (l: {
    id: string;
    name: string;
    categoryId: string;
  }) => {
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
        selling: [],
        buying: selectedCategories.map((a) => ({
          id: a.id,
          name: a.name,
          categoryId: a.categoryId,
        })),
      })
    );
  };

  let innerCategoriesFiltered = innerCategories;
  if (isInner) {
    innerCategoriesFiltered = innerCategories.filter((c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const generatedProps = {
    isInner,
    setIsInner,
    currentCategoryId,
    setCurrentCategoryId,
    searchTerm,
    setSearchTerm,
    selectedCategories,
    setSelectedCategories,
    setCategories,
    setInnerCategories,

    buying,
    categories,
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
