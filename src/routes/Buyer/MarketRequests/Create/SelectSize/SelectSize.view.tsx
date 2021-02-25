import React, { useEffect } from 'react';

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
import { SelectSizeProps } from './SelectSize.props';
import { SizeFormContainer } from './SelectSize.style';

const SelectSizeView = (props: SelectSizeProps) => {
  const {
    step,
    stepCountComponent,
    onBack,
    selectedCategory,
    setSelectedSize,
  } = props;
  const history = useHistory();

  const handleSubmit = () => {
    // MOCK
    setSelectedSize(['Medium']);
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
            <TypographyView variant="title4">Select Size</TypographyView>
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
        <SizeFormContainer>
          <Checkbox label="Baby"></Checkbox>
          <Checkbox label="Small"></Checkbox>
          <Checkbox label="Medium"></Checkbox>
          <Checkbox label="Large"></Checkbox>
          <Checkbox label="Giant"></Checkbox>

          <Button
            onClick={() => handleSubmit()}
            className="submit-btn"
            text="Select Size"
            variant="primary"
          />
        </SizeFormContainer>
      </ContainerWithCategoryImagePreview>
    </>
  );
};

export default SelectSizeView;
