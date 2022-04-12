import React, { ChangeEvent, useEffect, useState } from 'react';

import { isEmpty } from 'ramda';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getSellerMarketPricesSearch } from 'services/company';
import { GetSpecieResponseItem } from 'types/store/GetSpeciesState';
import { Store } from 'types/store/Store';

import { SpeciesGeneratedProps, SpecieSelectionItem } from './Species.props';
import SpeciesView from './Species.view';

const Species = (): JSX.Element => {
  const location = useLocation();
  const token = useSelector((state: Store) => state.auth.token) || '';
  //mock
  const productsImSelling: GetSpecieResponseItem[] = [
    {
      id: '001',
      name: 'Corel Crab',
      price: 12.5,
    },
    { id: '002', name: 'Canadian Crab', price: 12.5 },
  ];

  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [selectedSpecies, setSelectedSpecies] = useState<SpecieSelectionItem[]>(
    [...productsImSelling]
  );

  const onChangeSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const resetSearchValue = () => {
    setSearchValue('');
    setResults([]);
  };

  const search = async () => {
    setLoading(true);

    try {
      const res = await getSellerMarketPricesSearch(searchValue, token);
      setResults(res.data?.data?.data || []);
    } catch (e) {
      setResults([]);
    }
    setLoading(false);
  };

  const handleItemOnClick = (item: SpecieSelectionItem) => {
    // add to selected also

    if (item.selected) {
      setSelectedSpecies(
        selectedSpecies.map((j) => {
          if (j.id === item.id) {
            return {
              ...j,
              selected: false,
            };
          }
          return j;
        })
      );
    } else {
      setSelectedSpecies(
        selectedSpecies.map((j) => {
          if (j.id === item.id) {
            return {
              ...j,
              selected: true,
            };
          }
          return j;
        })
      );
    }
  };

  useEffect(() => {
    setSearchValue(searchValue);

    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
    if (searchValue.length > 2) {
      const timerId = setTimeout(() => {
        search();
      }, 800);
      setTimer(timerId);
    } else if (searchValue.length <= 2 && isEmpty(results)) {
      search();
    }
    // eslint-disable-next-line
  }, [searchValue]);

  const generatedProps: SpeciesGeneratedProps = {
    productsImSelling,
    selectedSpecies,
    handleItemOnClick,
  };
  return <SpeciesView {...generatedProps} />;
};

export default Species;
