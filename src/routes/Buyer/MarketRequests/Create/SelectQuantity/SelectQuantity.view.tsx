import React, { useState } from 'react';

import Button from 'components/base/Button';
import { ArrowLeft } from 'components/base/SVG';
import Touchable from 'components/base/Touchable';
import TypographyView from 'components/base/Typography';
import CategoryImagePreviewView from 'components/module/CategoryImagePreview';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';
import theme from 'utils/Theme';

import {
  ContainerWithCategoryImagePreview,
  CreateRequestHeaderContainer,
} from '../Create.style';
import { SelectQuantityProps } from './SelectQuantity.props';
import { QuantityFormContainer, StyledTextField } from './SelectQuantity.style';

const SelectQuantityView = (props: SelectQuantityProps) => {
  const {
    stepCountComponent,
    listingFormData,
    onBack,
    setSelectedQuantity,
    selectedCategory,
  } = props;

  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const handleSubmit = () => {
    setSelectedQuantity({ from, to });
  };

  return (
    <>
      <CreateRequestHeaderContainer>
        <div>
          {stepCountComponent}
          <div className="title-container">
            <Touchable
              className="back-button-container"
              onPress={() => onBack()}
            >
              <ArrowLeft fill={theme.grey.shade7} height={24} width={24} />
            </Touchable>
            <TypographyView variant="title4">Select Quantity</TypographyView>
          </div>
        </div>
      </CreateRequestHeaderContainer>
      <ContainerWithCategoryImagePreview>
        <CategoryImagePreviewView
          categoryName={selectedCategory.name}
          imgSrc={listingFormData?.defaultPhoto}
          caption="Select your product quantity for this request."
        />
        <QuantityFormContainer>
          <StyledTextField
            type="number"
            label="From"
            value={from}
            onChangeText={(v) => {
              if (!Number.isNaN(Number(v))) {
                setFrom(v);
              }
            }}
            min={1}
            onBlur={() => {
              if (from !== '' && to !== '' && Number(from) > Number(to)) {
                setTo(from);
              }
            }}
            LeftComponent={
              <TypographyView variant="label" color="shade6">
                {formatMeasurementUnit(listingFormData?.measurementUnit)}
              </TypographyView>
            }
          />
          <StyledTextField
            type="number"
            label="To"
            value={to}
            onChangeText={(v) => {
              if (!Number.isNaN(Number(v))) {
                setTo(v);
              }
            }}
            onBlur={() => {
              if (from !== '' && to !== '' && Number(from) > Number(to)) {
                setFrom(to);
              }
            }}
            min={1}
            LeftComponent={
              <TypographyView variant="label" color="shade6">
                {formatMeasurementUnit(listingFormData?.measurementUnit)}
              </TypographyView>
            }
          />

          <Button
            onClick={() => handleSubmit()}
            className="submit-btn"
            disabled={from === '' || to === ''}
            text="Select This Quantity"
            variant="primary"
          />
        </QuantityFormContainer>
      </ContainerWithCategoryImagePreview>
    </>
  );
};

export default SelectQuantityView;
