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
import { SpecificationFormContainer } from './SelectSpecification.style';
import { SelectSpecificationProps } from './SelectSpecifications.props';

const SelectSpecificationsView = (props: SelectSpecificationProps) => {
  const { step, stepCountComponent, onBack, selectedCategory } = props;
  const history = useHistory();

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
            <TypographyView variant="title4">
              Select Specifications
            </TypographyView>
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
        <SpecificationFormContainer>
          <div className="spec-row">
            <Checkbox label="Fresh"></Checkbox>
            <Checkbox label="Frozen"></Checkbox>
            <Checkbox label="Third Option"></Checkbox>
          </div>
          <div className="spec-row">
            <Checkbox label="Whole"></Checkbox>
            <Checkbox label="Cleaned"></Checkbox>
          </div>
          <div className="spec-row">
            <Checkbox label="Tenderized"></Checkbox>
            <Checkbox label="Not Tenderized"></Checkbox>
          </div>
          <Button text="Select Specification" variant="primary" />
        </SpecificationFormContainer>
      </ContainerWithCategoryImagePreview>
    </>
  );
};

export default SelectSpecificationsView;
