import React, { useState } from 'react';

import AlertView from 'components/base/Alert';
import Button from 'components/base/Button';
import Checkbox from 'components/base/Checkbox';
import { ArrowLeft } from 'components/base/SVG';
import Touchable from 'components/base/Touchable';
import TypographyView from 'components/base/Typography';
import MobileFooter from 'components/layout/MobileFooter';
import CategoryImagePreviewView from 'components/module/CategoryImagePreview';
import { isEmpty, uniq, groupBy, dropLast, prop } from 'ramda';
import { Hidden } from 'react-grid-system';
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
    selectedSpecifications,
    setStep,
  } = props;

  const stateOptions = (listingFormData?.stateOptions || []).map((group) =>
    group.map((item) => ({
      label: item.state.name,
      value: item.categoryStateOptionId,
      groupOrder: item.groupOrder,
    }))
  );

  const groupOrders = uniq(stateOptions.flat().map((so) => so.groupOrder));

  const [selectedState, setSelectedState] = useState<{
    selectedStates: any[];
  }>({ selectedStates: [...selectedSpecifications.items] });

  const handleSelectSpecs = () => {
    setSelectedSpecifications({ items: selectedState.selectedStates });
    setStep(3);
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

  const filteredSpecifications = () => {
    const currentSelectionByGroup = groupBy((a) => {
      return `group${a.groupOrder}`;
    }, selectedState.selectedStates);

    const firstSelection = prop('group1', currentSelectionByGroup);

    const isLiveOnly =
      firstSelection &&
      firstSelection.find((a) => a.label === 'Live') &&
      firstSelection.length === 1;
    const stepCount = Object.keys(currentSelectionByGroup);
    const specSelectionOffset = isLiveOnly
      ? stateOptions.length > 1
        ? 1
        : 0
      : stateOptions.length - (stepCount.length + 1);
    const filteredSpecList = dropLast(specSelectionOffset, stateOptions);
    return filteredSpecList;
  };

  const selectedGroups =
    uniq(selectedState.selectedStates.map((ss) => ss.groupOrder)) || [];

  const isDisabled =
    filteredSpecifications().length !== selectedGroups.length &&
    filteredSpecifications().length >= selectedGroups.length;

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
            <TypographyView variant="title5" weight="500">
              Select Specifications
            </TypographyView>
          </div>
        </div>
      </CreateRequestHeaderContainer>
      <ContainerWithCategoryImagePreview>
        <CategoryImagePreviewView
          categoryName={selectedCategory.name}
          imgSrc={listingFormData?.defaultPhoto}
          caption="Select your product specifications for this request."
          marketBoard
        />

        <SpecificationFormContainer>
          {isDisabled && (
            <AlertView
              content="Select at least 1 specification from each section"
              variant="error"
              fullWidth
              style={{
                marginBottom: 24,
              }}
            />
          )}

          {filteredSpecifications().map((group) => (
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
                  />
                ))}
              </div>
            </div>
          ))}
          <Hidden xs>
            <Button
              onClick={() => handleSelectSpecs()}
              disabled={isEmpty(groupOrders) || isDisabled}
              text="Select Specification"
              variant="primary"
            />
          </Hidden>
          <MobileFooter>
            <Button
              onClick={() => handleSelectSpecs()}
              disabled={isEmpty(groupOrders) || isDisabled}
              text="Select Specification"
              variant="primary"
              takeFullWidth
            />
          </MobileFooter>
        </SpecificationFormContainer>
      </ContainerWithCategoryImagePreview>
    </>
  );
};

export default SelectSpecificationsView;
