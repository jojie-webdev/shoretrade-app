import React, { useState } from 'react';

import Breadcrumbs from 'components/base/Breadcrumbs';
import Button from 'components/base/Button';
import { ChevronRight } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import MobileFooter from 'components/layout/MobileFooter';
import { Hidden, Visible } from 'react-grid-system';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';

import {
  ButtonContainer,
  ContainerWithCategoryImagePreview,
  CreateRequestHeaderContainer,
  DetailsContainer,
  FriendlyTextContainer,
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
              className="breadcrumbs"
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
            <Visible xs sm>
              {stepCountComponent}
            </Visible>
            <Typography
              variant="title5"
              weight="500"
              style={{ marginBottom: 12 }}
              altFont
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
            <FriendlyTextContainer>
              <Typography
                color="shade10"
                className="row-label-friendly-text"
                altFont
              >
                How much product do you want to purchase?
              </Typography>
            </FriendlyTextContainer>
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
                <Typography variant="label" color="shade6">
                  {formatMeasurementUnit(listingFormData?.measurementUnit)}
                </Typography>
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
                <Typography variant="label" color="shade6">
                  {formatMeasurementUnit(listingFormData?.measurementUnit)}
                </Typography>
              }
            />
            <Hidden xs>
              <ButtonContainer>
                <PreviousButton
                  text="Back"
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
