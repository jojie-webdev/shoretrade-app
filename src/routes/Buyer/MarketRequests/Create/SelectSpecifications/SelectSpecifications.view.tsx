import React, { useState } from 'react';

import Breadcrumbs from 'components/base/Breadcrumbs';
import Button from 'components/base/Button';
import Checkbox from 'components/base/Checkbox';
import { ShoretradeAnchor, ChevronRight } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import MobileFooter from 'components/layout/MobileFooter';
import { isEmpty, uniq, groupBy, dropLast, prop } from 'ramda';
import { Hidden, Visible } from 'react-grid-system';
import theme from 'utils/Theme';

import {
  ContainerWithCategoryImagePreview,
  CreateRequestHeaderContainer,
  TitleContainer,
  RequestRow,
  RequestDetailsContainer,
  DetailsContainer,
  DetailsHeaderContainer,
  MainContainer,
  MultipleTopAbsoContainer,
  MultipleTopGroupContainer,
  MultipleBottomAbsoContainer,
  MultipleBottomGroupContainer,
  MultipleLeftAbsoContainer,
  MultipleLeftGroupContainer,
} from '../Create.style';
import {
  SpecificationFormContainer,
  ProceedButton,
  PreviousButton,
  ButtonContainer,
  AnchorContainer,
  CheckboxContainer,
  CheckboxGroupContainer,
  SpecsContainer,
  StyledTitle,
} from './SelectSpecification.style';
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
    didFinishStep,
    setDidFinishStep,
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
  }>({ selectedStates: [...selectedSpecifications.items] });

  const groupOrders = uniq(stateOptions.flat().map((so) => so.groupOrder));

  const selectedGroups =
    uniq(selectedState.selectedStates.map((ss) => ss.groupOrder)) || [];

  const handleSelectSpecs = () => {
    setSelectedSpecifications({ items: selectedState.selectedStates });
    setStep(3);
    setDidFinishStep(2);
  };

  const getFilteredSpecifications = () => {
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

  const handleStateCheck = (v: any) => {
    if (selectedState.selectedStates.some((state) => state.value === v.value)) {
      setSelectedState(({ selectedStates }) => {
        if (v.label === 'Live') {
          return {
            selectedStates: selectedStates.filter(
              (state) => state.value !== v.value && v.label !== 'Whole'
            ),
          };
        } else {
          return {
            selectedStates: selectedStates.filter(
              (state) => state.value !== v.value
            ),
          };
        }
      });
    } else {
      if (v.label === 'Live') {
        let wholeFinder: any;

        stateOptions.map((option) => {
          return option.find((i) => {
            if (i.label === 'Whole') {
              wholeFinder = i;
            }

            return wholeFinder;
          });
        });

        setSelectedState(({ selectedStates }) => {
          const initial = selectedStates.concat(v);

          return {
            selectedStates: wholeFinder ? initial.concat(wholeFinder) : initial,
          };
        });
      } else {
        setSelectedState(({ selectedStates }) => {
          return {
            selectedStates: selectedStates.concat(v),
          };
        });
      }
    }
  };

  const isDisabled =
    getFilteredSpecifications().length !== selectedGroups.length &&
    getFilteredSpecifications().length >= selectedGroups.length;

  const getSpecsByGroup = (index: number) => {
    const specs =
      index === 0 ? 'Preservations' : index === 1 ? 'State' : 'Condition';

    return specs;
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
                  onClick: () => {
                    if (didFinishStep >= 4) {
                      onBack(4);
                    }
                  },
                  isDone: didFinishStep >= 4,
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
            <StyledTitle
              variant="title5"
              weight="500"
              style={{ marginBottom: 12 }}
            >
              {listingFormData?.type.name}
            </StyledTitle>
            <Typography variant="label" weight="400" color="shade7">
              Do you want your product a certain way? Set the specifications
              here by selecting at least one from each section.
            </Typography>
          </TitleContainer>
        </MainContainer>
      </CreateRequestHeaderContainer>
      <RequestRow>
        <ContainerWithCategoryImagePreview>
          <SpecificationFormContainer>
            <Hidden xs sm>
              {getFilteredSpecifications().map((group, index) => (
                <div key={group[0].groupOrder} className="interaction-group">
                  <Typography
                    variant="overline"
                    color="shade6"
                    style={{ marginBottom: 12 }}
                  >
                    {getSpecsByGroup(index)}
                  </Typography>
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
            </Hidden>
            <Visible xs sm>
              <SpecsContainer>
                {getFilteredSpecifications().map((group, index) => (
                  <div key={`spec-${index}`} style={{ marginBottom: '32px' }}>
                    <Typography
                      variant="overline"
                      color="shade6"
                      style={{ marginBottom: 12 }}
                    >
                      {`Specs ${index + 1}`}
                    </Typography>

                    <CheckboxGroupContainer>
                      {group?.map((item) => (
                        <CheckboxContainer>
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
                            style={{ margin: '0px 16px 0px 0px' }}
                            borderColor={theme.grey.shade6}
                          />
                        </CheckboxContainer>
                      ))}
                    </CheckboxGroupContainer>
                  </div>
                ))}
              </SpecsContainer>
            </Visible>
            <Hidden xs>
              <ButtonContainer>
                <PreviousButton
                  text="<"
                  variant="outline"
                  onClick={() => onBack(1)}
                />
                <ProceedButton
                  onClick={() => handleSelectSpecs()}
                  disabled={isEmpty(groupOrders) || isDisabled}
                  text="Proceed >"
                  variant="primary"
                />
              </ButtonContainer>
            </Hidden>
            <MobileFooter>
              <Button
                onClick={() => handleSelectSpecs()}
                disabled={isEmpty(groupOrders) || isDisabled}
                text="Proceed"
                variant="primary"
                takeFullWidth
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
          </SpecificationFormContainer>
        </ContainerWithCategoryImagePreview>

        <Hidden xs sm>
          <RequestDetailsContainer currentStep={1}>
            <DetailsHeaderContainer>
              <Typography
                style={{
                  marginBottom: 8,
                  fontFamily: 'Wilderness',
                  fontSize: 48,
                }}
              >
                Summary
              </Typography>
            </DetailsHeaderContainer>
            <AnchorContainer>
              <ShoretradeAnchor />
            </AnchorContainer>
          </RequestDetailsContainer>
        </Hidden>
      </RequestRow>
    </>
  );
};

export default SelectSpecificationsView;
