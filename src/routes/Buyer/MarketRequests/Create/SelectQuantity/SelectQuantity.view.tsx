import React, { useEffect, useState } from 'react';

// import { useTheme } from 'utils/Theme';
import Badge from 'components/base/Badge';
import Button from 'components/base/Button';
import Checkbox from 'components/base/Checkbox';
import Spinner from 'components/base/Spinner';
import { ArrowLeft, Filter } from 'components/base/SVG';
import Touchable from 'components/base/Touchable';
import TypographyView from 'components/base/Typography';
import { BoxContainer } from 'components/layout/BoxContainer';
import CategoryImagePreviewView from 'components/module/CategoryImagePreview';
import { BUYER_ROUTES } from 'consts';
import { Row, Col, Container } from 'react-grid-system';
import { useHistory, Link } from 'react-router-dom';
import theme from 'utils/Theme';

import { CreateStepProps } from '../Create.props';
import {
  ContainerWithCategoryImagePreview,
  CreateRequestHeaderContainer,
} from '../Create.style';
import { SpecificationFormContainer } from '../SelectSpecifications/SelectSpecification.style';
import { SelectQuantityProps } from './SelectQuantity.props';
import { QuantityFormContainer, StyledTextField } from './SelectQuantity.style';

const SelectQuantityView = (props: SelectQuantityProps) => {
  const {
    step,
    stepCountComponent,
    onBack,
    setSelectedQuantity,
    selectedCategory,
  } = props;
  const history = useHistory();

  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);

  const handleSubmit = () => {
    //MOCK
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
          imgSrc="http://placekitten.com/474/280"
          caption="Aliquip ullamco dolore amet sunt ullamco. 
  Voluptate aliquip velit et commodo reprehenderit tempor laboris amet. 
  Sint ea nulla velit mollit amet sint ea."
        />
        <QuantityFormContainer>
          <StyledTextField
            type="number"
            label="From"
            value={from}
            onChangeText={(v) => {
              setFrom(Number(v));
            }}
            min={1}
            LeftComponent={
              <TypographyView variant="label" color="shade6">
                {'Kg'}
              </TypographyView>
            }
          />
          <StyledTextField
            type="number"
            label="To"
            value={to}
            onChangeText={(v) => {
              setTo(Number(v));
            }}
            min={1}
            LeftComponent={
              <TypographyView variant="label" color="shade6">
                {'Kg'}
              </TypographyView>
            }
          />

          <Button
            onClick={() => handleSubmit()}
            className="submit-btn"
            text="Select This Quantity"
            variant="primary"
          />
        </QuantityFormContainer>
      </ContainerWithCategoryImagePreview>
    </>
  );
};

export default SelectQuantityView;
