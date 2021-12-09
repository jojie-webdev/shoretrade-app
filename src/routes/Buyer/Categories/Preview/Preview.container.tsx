import React, { ChangeEvent, useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  getBuyerSearchFilterDataActions,
  getListingsByTypeActions,
  currentAddressActions,
} from 'store/actions';
import { Store } from 'types/store/Store';
import useLocalStorage from 'utils/Hooks/useLocalStorage';

import { FilterData } from './Preview.props';
import {
  getFilters,
  getSize,
  getSpecifications,
  getCatchmentArea,
  isUngraded,
} from './Preview.transform';
import CategoriesPreviewView from './Preview.view';

const CategoriesPreview = (): JSX.Element => {
  const dispatch = useDispatch();
  const { id: typeIdParsed } = useParams<any>();

  const [searchValue, setSearchValue] = useState('');

  const addressesData = useSelector(
    (state: Store) => state.getAddresses.data?.data.addresses
  );

  const isPendingAccount =
    addressesData !== undefined &&
    !(addressesData || []).some((a) => a.approved === 'APPROVED');

  const results = (
    useSelector(
      (state: Store) => state.getListingsByType.data?.data.listings
    ) || []
  ).filter((result) => {
    return searchValue
      ? result.coop.name.toLowerCase().includes(searchValue.toLowerCase())
      : true;
  });

  const isLoadingResults =
    useSelector((state: Store) => state.getListingsByType.pending) || false;

  const selectAddress = (id: string) => {
    dispatch(
      currentAddressActions.update({
        id,
      })
    );
  };

  const onLoad = (typeId: string) => {
    dispatch(getBuyerSearchFilterDataActions.request({ typeId: typeId }));
    // dispatch(getListingsByTypeActions.request({ typeId: typeId }));
  };

  const onChangeSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const onResetSearchValue = () => {
    setSearchValue('');
  };

  //Filters
  const [isOpen, setVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<any[]>([]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedCheckboxFilters, setSelectedCheckboxFilters] = useState<any[]>(
    []
  );

  const getBuyerSearchFilterData =
    useSelector((state: Store) => state.getBuyerSearchFilterData) || {};
  // const filterData = getBuyerSearchFilterData.data?.data;
  const modalFilters = getFilters(getBuyerSearchFilterData);
  const ungraded = isUngraded(getBuyerSearchFilterData);
  const checkboxFilters = !ungraded
    ? [{ label: 'Show Only Ungraded', value: 'showUngraded' }]
    : [];

  const onReset = () => {
    setSelectedFilters([]);
    setSelectedSize(null);
    setSelectedCheckboxFilters([]);
  };

  const onClickClose = () => {
    setVisible(!isOpen);
  };

  // used by FilterModal
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
  const [filterState, setFilterState] = useLocalStorage<FilterData>(
    'filter-storage',
    {
      catchmentArea,
      sizeRangeFrom,
      sizeRangeTo,
      specifications,
      showUngraded: selectedCheckboxFilters[0] ? true : false,
    }
  );
  const [prevTypeId, setPrevTypeId] = useLocalStorage('prev-type-id', '');

  useEffect(() => {
    setPrevTypeId(typeIdParsed);
    // eslint-disable-next-line
  }, [typeIdParsed]);

  useEffect(() => {
    const {
      catchmentArea,
      showUngraded,
      sizeRangeFrom,
      sizeRangeTo,
      specifications,
    } = filterState;

    onLoad(typeIdParsed);

    if (prevTypeId === typeIdParsed) {
      dispatch(
        getListingsByTypeActions.request({
          typeId: typeIdParsed,
          filterData: {
            ...(sizeRangeFrom ? { sizeRangeFrom } : {}),
            ...(sizeRangeTo ? { sizeRangeTo } : {}),
            ...(catchmentArea ? { catchmentArea } : {}),
            ...(specifications ? { specifications } : {}),
            ...(showUngraded
              ? { showUngraded: true }
              : { showUngraded: false }),
          },
        })
      );
    } else if (prevTypeId !== typeIdParsed) {
      dispatch(getListingsByTypeActions.request({ typeId: typeIdParsed }));
      setFilterState({
        catchmentArea: null,
        sizeRangeFrom: null,
        sizeRangeTo: null,
        specifications: [],
        showUngraded: false,
      });
    }
    // eslint-disable-next-line
  }, [typeIdParsed, filterState]);

  const onApply = () => {
    setVisible(false);
    setFilterState({
      catchmentArea,
      sizeRangeFrom,
      sizeRangeTo,
      specifications,
      showUngraded: selectedCheckboxFilters[0] ? true : false,
    });
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
  // const onChangeFilter = (f: {
  //   catchmentArea?: string;
  //   sizeRangeFrom?: number | string;
  //   sizeRangeTo?: number | string;
  //   specifications?: string;
  //   showUngraded?: boolean;
  // }) => {
  //   dispatch(
  //     getListingsByTypeActions.request({
  //       typeId: typeIdParsed,
  //       filterData: f,
  //     })
  //   );
  // };

  const generatedProps = {
    searchValue,
    onChangeSearchValue,
    onResetSearchValue,
    results,
    isLoadingResults,
    typeId: typeIdParsed,
    selectAddress,
    onLoad,
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
    isPendingAccount,

    //filterData,
    // onChangeFilter,
  };
  return <CategoriesPreviewView {...generatedProps} />;
};

export default CategoriesPreview;
