import React, { useState } from 'react';

import Button from 'components/base/Button';
import { ArrowLeft } from 'components/base/SVG';
import Touchable from 'components/base/Touchable';
import TypographyView from 'components/base/Typography';
import MobileFooter from 'components/layout/MobileFooter';
import CategoryImagePreviewView from 'components/module/CategoryImagePreview';
import { Hidden } from 'react-grid-system';
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
    selectedQuantity,
    setStep,
  } = props;

  const [from, setFrom] = useState(selectedQuantity.from);
  const [to, setTo] = useState(selectedQuantity.to);

  const handleSubmit = () => {
    setSelectedQuantity({ from, to });
    setStep(5);
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
            <TypographyView variant="title5">Select Quantity</TypographyView>
          </div>
        </div>
      </CreateRequestHeaderContainer>
      <ContainerWithCategoryImagePreview>
        <CategoryImagePreviewView
          categoryName={selectedCategory.name}
          imgSrc={listingFormData?.defaultPhoto}
          caption="Select your product quantity for this request."
          marketBoard
        />
        <QuantityFormContainer>
          <StyledTextField
            type="number"
            inputType="decimal"
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
            inputType="decimal"
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
          <Hidden xs>
            <Button
              onClick={() => handleSubmit()}
              className="submit-btn"
              disabled={from === '' || to === ''}
              text="Select This Quantity"
              variant="primary"
            />
          </Hidden>
        </QuantityFormContainer>
        <MobileFooter>
          <Button
            takeFullWidth
            onClick={() => handleSubmit()}
            className="submit-btn"
            disabled={from === '' || to === ''}
            text="Select This Quantity"
            variant="primary"
          />
        </MobileFooter>
      </ContainerWithCategoryImagePreview>
    </>
  );
};

export default SelectQuantityView;
