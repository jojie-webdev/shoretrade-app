import React, { useState, useEffect } from 'react';

import {
  CheckboxFilter,
  Filters,
} from 'components/module/FilterModal/FilterModal.props';

import { MarketPriceDetailGeneratedProps } from './MarketPriceDetail.props';
import MarketPriceDetailView from './MarketPriceDetail.view';

const MarketPriceDetail = (): JSX.Element => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedCheckboxFilters, setSelectedCheckboxFilters] = useState<
    string[]
  >([]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const filters: Filters[] = [
    {
      label: 'Size',
      type: 'size_input',
      values: ['3000', '5000'],
      unit: 'Kg',
    },
    {
      label: 'Type',
      values: ['Frozen', 'Fresh'],
      type: 'choice',
    },
  ];

  const checkboxFilters = [
    { label: 'Show Only Ungraded', value: 'ungraded' },
    { label: 'Next Day Delivery Only', value: 'nextDay' },
  ];

  useEffect(() => {
    console.log(selectedCheckboxFilters);
  }, [selectedCheckboxFilters]);

  const onReset = () => {
    setSelectedFilters([]);
    setSelectedCheckboxFilters([]);
  };

  const onApply = () => {
    console.log(selectedFilters);
    console.log(selectedSize);
  };

  const openFilterModal = () => setIsFilterModalOpen(true);
  const closeFilterModal = () => setIsFilterModalOpen(false);

  const generatedProps: MarketPriceDetailGeneratedProps = {
    isOpen: isFilterModalOpen,
    openFilterModal,
    onClickClose: closeFilterModal,
    filters,
    checkboxFilters,
    selectedFilters,
    setSelectedFilters,
    selectedCheckboxFilters,
    setSelectedCheckboxFilters,
    selectedSize,
    setSelectedSize,
    onReset,
    onApply,
  };
  return <MarketPriceDetailView {...generatedProps} />;
};

export default MarketPriceDetail;
