import React, { ChangeEvent, useEffect, useState } from 'react';

import { isEmpty } from 'ramda';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
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
  const addressesData = useSelector(
    (state: Store) => state.getAddresses.data?.data.addresses
  );
  const isPendingAccount =
    addressesData !== undefined &&
    !(addressesData || []).some((a) => a.approved === 'APPROVED');
  const addresses = GetAddressOptions();
  const { id } = useParams();
  const typeIdParsed = id; // consider removing this and use `id` instead
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
  ).filter((result) => {
    return searchValue
      ? result.type.toLowerCase().includes(searchValue.toLowerCase())
      : true;
  });

  const isLoadingResults =
    useSelector((state: Store) => state.getListingsByType.pending) || false;

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

  const getBuyerSearchFilterData =
    useSelector((state: Store) => state.getBuyerSearchFilterData) || {};
  const filterData = getBuyerSearchFilterData.data?.data;
  const modalFilters = getFilters(getBuyerSearchFilterData);
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

  // used by FilterModal
  const onApply = () => {
    setVisible(false);

    const { sizeRangeFrom, sizeRangeTo } = getSize(
      getBuyerSearchFilterData,
      selectedSize
    );
    const catchmentArea = getCatchmentArea(
      getBuyerSearchFilterData,
      selectedFilters
    );
    const specifications = getSpecifications(
      getBuyerSearchFilterData,
      selectedFilters
    );

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

  // used by FilterArea
  const onChangeFilter = (f: {
    catchmentArea?: string;
    sizeRangeFrom?: number | string;
    sizeRangeTo?: number | string;
    specifications?: string;
    showUngraded?: boolean;
  }) => {
    dispatch(
      getListingsByTypeActions.request({
        typeId: typeIdParsed,
        filterData: f,
      })
    );
  };

  const generatedProps = {
    onChangeSearchValue,
    searchValue,
    resetSearchValue,
    results,
    isLoadingResults,
    typeId: typeIdParsed,
    addresses,
    selectedAddress,
    selectAddress,
    onLoad,
    setVisible,
    modalFilterProps: {
      isOpen,
      filters: modalFilters,
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
    filterData,
    onChangeFilter,
    isPendingAccount,
  };
  return <CategoriesPreviewView {...generatedProps} />;
};

export default CategoriesPreview;
