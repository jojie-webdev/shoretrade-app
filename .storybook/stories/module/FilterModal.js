import React, { useState, useEffect } from 'react';

import { storiesOf } from '@storybook/react';

import FilterModal from '../../../src/components/module/FilterModal';
import Container from '../../components/Container';

// eslint-disable-next-line react/prop-types
const ModalComponent = ({ children }) => {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedCheckboxFilters, setSelectedCheckboxFilters] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const filters = [
    // {
    //   label: 'Size',
    //   type: 'size_dropdown',
    //   sizeDropdownValues: {
    //     from: [
    //       { label: 'Small', value: 'small' },
    //       { label: 'Medium', value: 'medium' },
    //     ],
    //     to: [
    //       { label: 'Large', value: 'large' },
    //       { label: 'Very Large', value: 'very_large' },
    //     ],
    //   },
    // },
    {
      label: 'Size',
      type: 'size_input',
      values: ['3000', '5000'],
      unit: 'kg',
    },
    {
      label: 'Type',
      values: ['Frozen', 'Fresh'],
      type: 'choice',
    },
    { label: 'Catchment Region',
      type: 'location' },

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
    setSelectedLocation(null);
    setSelectedCheckboxFilters([]);
  };

  const onApply = () => {
    
    console.log(selectedFilters);
    console.log(selectedSize);
  };

  return (
    <>
      <FilterModal
        isOpen
        filters={filters}
        checkboxFilters={checkboxFilters}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        selectedCheckboxFilters={selectedCheckboxFilters}
        setSelectedCheckboxFilters={setSelectedCheckboxFilters}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        onReset={onReset}
        onApply={onApply}
      />
    </>
  );
};

storiesOf('module/FilterModal', module).add('Seller', () => (
  <Container background="white" appType='seller'>
    <ModalComponent />
  </Container>
));

storiesOf('module/FilterModal', module).add('Buyer', () => (
  <Container background="white" appType='buyer'>
    <ModalComponent />
  </Container>
));