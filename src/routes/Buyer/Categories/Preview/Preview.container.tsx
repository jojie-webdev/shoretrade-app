import React, { ChangeEvent, useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
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
  const dispatch = useDispatch();
  const { id: typeIdParsed } = useParams();

  const [searchValue, setSearchValue] = useState('');

  const addressesData = useSelector(
    (state: Store) => state.getAddresses.data?.data.addresses
  );

  const isPendingAccount =
    addressesData !== undefined &&
    !(addressesData || []).some((a) => a.approved === 'APPROVED');

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
    dispatch(getListingsByTypeActions.request({ typeId: typeId }));
  };

  const onChangeSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

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
    onChangeSearchValue,
    searchValue,
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
