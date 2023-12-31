import React, { useEffect, useState } from 'react';

import { isEmpty } from 'ramda';
import { useDispatch, useSelector } from 'react-redux';
import { Listing } from 'routes/Seller/Account/MarketInterests/MarketInterests.props';
import MarketInterestsView from 'routes/Seller/Account/MarketInterests/MarketInterests.view';
import { getAvailableCategories } from 'services/category';
import { getInactiveTypesByCategory } from 'services/listing';
import {
  getMarketInterestsActions,
  updateMarketInterestsActions,
} from 'store/actions';
import { Category } from 'types/store/GetCategories';
import { Store } from 'types/store/Store';
import { useCompany } from 'utils/Hooks';
import { GetDefaultCompany } from 'store/selectors/buyer';

const MarketInterests = (): JSX.Element => {
  const dispatch = useDispatch();

  const [companyId] = useCompany();
  const selling =
    useSelector(
      (store: Store) => store.getMarketInterests.data?.data.selling
    ) || [];
  const token = useSelector((store: Store) => store.auth.token);
  const updateMarketInterests = useSelector(
    (store: Store) => store.updateMarketInterests
  );

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
  const defaultCompany = GetDefaultCompany();
  const user = useSelector((state: Store) => state.getUser.data?.data.user);
  const companyRelationship =
    (user &&
      user.companies.find((company) => company.id === defaultCompany?.id)
        ?.relationship) ||
    '';
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
    if (!isEmpty(selling)) setSelectedCategories(selling);
  }, [selling]);

  useEffect(() => {
    if (updateMarketInterests?.data?.status === 200) {
      dispatch(
        getMarketInterestsActions.request({
          companyId,
        })
      );
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
        buying: [],
        selling: selectedCategories.map((a) => ({
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

    selling,
    categories,
    innerCategories: innerCategoriesFiltered,
    loadingInnerCategories,

    onPressCategory,
    onPressInnerCategory,
    onSave,

    isSaving: updateMarketInterests?.pending || false,
    companyRelationship,
  };
  return <MarketInterestsView {...generatedProps} />;
};

export default MarketInterests;
