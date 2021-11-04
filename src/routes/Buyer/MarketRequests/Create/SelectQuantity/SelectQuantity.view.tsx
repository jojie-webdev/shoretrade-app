import React, { useState } from 'react';

import Breadcrumbs from 'components/base/Breadcrumbs';
import Button from 'components/base/Button';
import { ArrowLeft, ChevronRight } from 'components/base/SVG';
import Touchable from 'components/base/Touchable';
import TypographyView from 'components/base/Typography';
import Typography from 'components/base/Typography';
import MobileFooter from 'components/layout/MobileFooter';
import CategoryImagePreviewView from 'components/module/CategoryImagePreview';
import { Hidden } from 'react-grid-system';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';
import theme from 'utils/Theme';

import {
  ButtonContainer,
  ContainerWithCategoryImagePreview,
  CreateRequestHeaderContainer,
  DetailsContainer,
  MainContainer,
  PreviousButton,
  ProceedButton,
  RequestDetailsContainer,
  RequestRow,
  TitleContainer,
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
    detailsListComponent,
    didFinishStep,
    setDidFinishStep,
  } = props;

  const [from, setFrom] = useState(selectedQuantity.from);
  const [to, setTo] = useState(selectedQuantity.to);

  const handleSubmit = () => {
    setSelectedQuantity({ from, to });
    setDidFinishStep(5);
    setStep(5);
  };

  return (
    <>
      <CreateRequestHeaderContainer>
        <MainContainer>
          <Hidden xs sm>
            <Breadcrumbs
              color="shade5"
              sections={[
                {
                  label: 'Category',
                  onClick: () => {
                    if (didFinishStep >= 1) {
                      onBack(1);
                    }
                  },
                  isDone: didFinishStep >= 1,
                },
                {
                  label: 'Specifications',
                  onClick: () => {
                    if (didFinishStep >= 2) {
                      onBack(2);
                    }
                  },
                  isDone: didFinishStep >= 2,
                },
                {
                  label: 'Size',
                  onClick: () => {
                    if (didFinishStep >= 3) {
                      onBack(3);
                    }
                  },
                  isDone: didFinishStep >= 3,
                },
                {
                  label: 'Quantity',
                },
                {
                  label: 'Summary',
                  onClick: () => {
                    if (didFinishStep >= 5) {
                      onBack(5);
                    }
                  },
                  isDone: didFinishStep >= 5,
                },
              ]}
            />
          </Hidden>
          <TitleContainer>
            <Typography
              variant="title5"
              weight="500"
              style={{ fontFamily: 'Media Sans', marginBottom: 12 }}
            >
              {listingFormData?.type.name}
            </Typography>
            <Typography variant="label" weight="400" color="shade7">
              Let the Sellers know how much you want to purchase by entering a
              range in the boxes below.
            </Typography>
          </TitleContainer>
        </MainContainer>
      </CreateRequestHeaderContainer>
      <RequestRow>
        <ContainerWithCategoryImagePreview>
          <QuantityFormContainer>
            <StyledTextField
              type="number"
              inputType="decimal"
              color="shade10"
              label="Quantity From"
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
              className="quantity-to"
              type="number"
              color="shade10"
              inputType="decimal"
              label="Quantity  To"
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
              <ButtonContainer>
                <PreviousButton
                  text="<"
                  variant="outline"
                  onClick={() => onBack(3)}
                />
                <ProceedButton
                  onClick={() => handleSubmit()}
                  className="submit-btn"
                  disabled={from === '' || to === ''}
                  text="Next"
                  variant="primary"
                />
              </ButtonContainer>
            </Hidden>
          </QuantityFormContainer>
          <MobileFooter>
            <Button
              takeFullWidth
              onClick={() => handleSubmit()}
              className="submit-btn"
              disabled={from === '' || to === ''}
              text="Next"
              variant="primary"
              icon={
                <ChevronRight
                  width={14}
                  height={12}
                  fill="white"
                  style={{ paddingBottom: '2px' }}
                />
              }
            />
          </MobileFooter>
        </ContainerWithCategoryImagePreview>
        <Hidden xs sm>
          <RequestDetailsContainer>
            <DetailsContainer>{detailsListComponent}</DetailsContainer>
          </RequestDetailsContainer>
        </Hidden>
      </RequestRow>
    </>
  );
};

export default SelectQuantityView;
