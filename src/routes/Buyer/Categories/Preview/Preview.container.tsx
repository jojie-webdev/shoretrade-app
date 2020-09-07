import React, { ChangeEvent, useEffect, useState } from 'react';

import { isEmpty } from 'ramda';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { CategoriesGeneratedProps } from 'routes/Seller/Dashboard/Categories/Categories.props';
import {
  getBuyerSearchFilterDataActions,
  getListingsByTypeActions,
  currentAddressActions,
} from 'store/actions';
import { GetAddressOptions } from 'store/selectors/buyer';
import { Store } from 'types/store/Store';

import {
  getFilters,
  getSize,
  getSpecifications,
  getCatchmentArea,
} from './Preview.transform';
import CategoriesPreviewView from './Preview.view';

const CategoriesPreview = (): JSX.Element => {
  // MARK:- States / Variables
  const location = useLocation();
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const addresses = GetAddressOptions();
  const typeIdParsed = location.pathname.replace(
    '/buyer/categories/products/',
    ''
  );
  const selectedAddress =
    useSelector((state: Store) => state.currentAddress.id) || '';
  const selectAddress = (id: string) => {
    dispatch(
      currentAddressActions.update({
        id,
      })
    );
  };
  const previousId =
    useSelector(
      (state: Store) => state.getListingTypesByCategory.request?.categoryId
    ) || '';

  const results = (
    useSelector(
      (state: Store) => state.getListingsByType.data?.data.listings
    ) || []
  ).filter((result) =>
    searchValue
      ? result.coop.name.toLowerCase().includes(searchValue.toLowerCase())
      : true
  );

  // MARK:- Methods
  const onLoad = (typeId: string) => {
    dispatch(getBuyerSearchFilterDataActions.request({ typeId: typeId }));
    dispatch(getListingsByTypeActions.request({ typeId: typeId }));
  };

  const onChangeSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const resetSearchValue = () => {
    setSearchValue('');
  };
  // MARK:- Effects
  useEffect(() => {
    if (typeIdParsed && previousId !== typeIdParsed) {
      onLoad(typeIdParsed);
    }
  }, [typeIdParsed]);

  //Filters
  const [isOpen, setVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<any[]>([]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedCheckboxFilters, setSelectedCheckboxFilters] = useState<any[]>(
    []
  );

  const filterData =
    useSelector((state: Store) => state.getBuyerSearchFilterData) || {};
  const filters = getFilters(filterData);
  const checkboxFilters = [
    { label: 'Show Only Ungraded', value: 'showUngraded' },
  ];

  const onReset = () => {
    setSelectedFilters([]);
    setSelectedSize(null);
    setSelectedCheckboxFilters([]);
  };

  const onClickClose = () => {
    setVisible(!isOpen);
  };

  const onApply = () => {
    setVisible(false);

    const { sizeRangeFrom, sizeRangeTo } = getSize(filterData, selectedSize);
    const catchmentArea = getCatchmentArea(filterData, selectedFilters);
    const specifications = getSpecifications(filterData, selectedFilters);

    dispatch(
      getListingsByTypeActions.request({
        typeId: typeIdParsed,
        filterData: {
          ...(sizeRangeFrom ? { sizeRangeFrom } : {}),
          ...(sizeRangeTo ? { sizeRangeTo } : {}),
          ...(catchmentArea ? { catchmentArea } : {}),
          ...(specifications ? { specifications } : {}),
          ...(selectedCheckboxFilters[0] ? { showUngraded: true } : {}),
        },
      })
    );
  };

  const generatedProps = {
    onChangeSearchValue,
    searchValue,
    resetSearchValue,
    results,
    typeId: typeIdParsed,
    addresses,
    selectedAddress,
    selectAddress,
    onLoad,
    setVisible,
    modalFilterProps: {
      isOpen,
      filters,
      selectedFilters,
      checkboxFilters,
      selectedCheckboxFilters,
      setSelectedCheckboxFilters,
      setSelectedFilters,
      selectedSize,
      setSelectedSize,
      onApply,
      onReset,
      onClickClose,
    },
  };
  return <CategoriesPreviewView {...generatedProps} />;
};

export default CategoriesPreview;
