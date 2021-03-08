import React, { useState } from 'react';

import Button from 'components/base/Button';
import Checkbox from 'components/base/Checkbox';
import { ArrowLeft } from 'components/base/SVG';
import Touchable from 'components/base/Touchable';
import TypographyView from 'components/base/Typography';
import CategoryImagePreviewView from 'components/module/CategoryImagePreview';
import theme from 'utils/Theme';

import {
  ContainerWithCategoryImagePreview,
  CreateRequestHeaderContainer,
} from '../Create.style';
import { SpecificationFormContainer } from './SelectSpecification.style';
import { SelectSpecificationProps } from './SelectSpecifications.props';

const SelectSpecificationsView = (props: SelectSpecificationProps) => {
  const {
    stepCountComponent,
    onBack,
    selectedCategory,
    setSelectedSpecifications,
    listingFormData,
  } = props;

  const stateOptions = (listingFormData?.stateOptions || []).map((group) =>
    group.map((item) => ({
      label: item.state.name,
      value: item.categoryStateOptionId,
      groupOrder: item.groupOrder,
    }))
  );

  const [selectedState, setSelectedState] = useState<{
    selectedStates: any[];
  }>({ selectedStates: [] });

  const handleSelectSpecs = () => {
    // MOCK
    setSelectedSpecifications({ items: selectedState.selectedStates });
  };

  const handleStateCheck = (v: any) => {
    if (
      selectedState.selectedStates.filter((state) => state.value === v.value)
        .length > 0
    ) {
      setSelectedState(({ selectedStates }) => {
        return {
          selectedStates: selectedStates.filter(
            (state) => state.value !== v.value
          ),
        };
      });
    } else {
      setSelectedState(({ selectedStates }) => {
        return {
          selectedStates: selectedStates.concat(v),
        };
      });
    }
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
            <TypographyView variant="title4">
              Select Specifications
            </TypographyView>
          </div>
        </div>
      </CreateRequestHeaderContainer>
      <ContainerWithCategoryImagePreview>
        <CategoryImagePreviewView
          categoryName={selectedCategory.name}
          imgSrc={listingFormData?.defaultPhoto}
          caption="Aliquip ullamco dolore amet sunt ullamco. 
        Voluptate aliquip velit et commodo reprehenderit tempor laboris amet. 
        Sint ea nulla velit mollit amet sint ea."
        />
        <SpecificationFormContainer>
          {stateOptions.map((group) => (
            <div key={group[0].groupOrder} className="interaction-group">
              <div className="spec-row">
                {group.map((item) => (
                  <Checkbox
                    checked={
                      selectedState.selectedStates.filter(
                        (state) => state.value === item.value
                      )[0]
                    }
                    value={item.value}
                    onClick={() => handleStateCheck(item)}
                    key={item.value}
                    label={item.label}
                  ></Checkbox>
                ))}
              </div>
            </div>
          ))}
          <Button
            onClick={() => handleSelectSpecs()}
            disabled={selectedState.selectedStates.length < 1}
            text="Select Specification"
            variant="primary"
          />
        </SpecificationFormContainer>
      </ContainerWithCategoryImagePreview>
    </>
  );
};

export default SelectSpecificationsView;
