import React, { useState } from 'react';

import AlertView from 'components/base/Alert';
import Breadcrumbs from 'components/base/Breadcrumbs';
import Button from 'components/base/Button';
import Checkbox from 'components/base/Checkbox';
import {
  ArrowLeft,
  Group194,
  Group195,
  Group196,
  Group204,
  ShoretradeAnchor,
  Wave31,
  Wave41,
  Wave51,
  WaveNew31,
  NewWave51,
} from 'components/base/SVG';
import Touchable from 'components/base/Touchable';
import Typography from 'components/base/Typography';
import MobileFooter from 'components/layout/MobileFooter';
import CategoryImagePreviewView from 'components/module/CategoryImagePreview';
import { isEmpty, uniq, groupBy, dropLast, prop } from 'ramda';
import { Hidden } from 'react-grid-system';
import { EmptyContainer } from 'routes/Buyer/Checkout/Checkout.style';
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

  return (
    <>
      <CreateRequestHeaderContainer>
        <MainContainer>
          <Breadcrumbs
            color="shade5"
            sections={[
              {
                label: 'Category',
                isDone: true,
                onClick: () => {
                  onBack(1);
                },
              },
              {
                label: 'Specifications',
              },
              {
                label: 'Size',
                onClick: () => {},
              },
              {
                label: 'Quantity',
                onClick: () => {},
              },
              {
                label: 'Summary',
                onClick: () => {},
              },
            ]}
          />
          <TitleContainer>
            <Typography
              variant="title5"
              weight="500"
              style={{ fontFamily: 'Media Sans', marginBottom: 12 }}
            >
              {listingFormData?.type.name}
            </Typography>
            <Typography variant="label" weight="400" color="shade7">
              Below are the different ways you can purchase your product. You
              can select more than one from each section to let Sellers know
              that you would be satisfied with either specification.
            </Typography>
          </TitleContainer>
        </MainContainer>
      </CreateRequestHeaderContainer>
      <RequestRow>
        <ContainerWithCategoryImagePreview>
          <SpecificationFormContainer>
            {getFilteredSpecifications().map((group, index) => (
              <div key={group[0].groupOrder} className="interaction-group">
                <Typography
                  variant="overline"
                  color="shade6"
                  style={{ marginBottom: 12 }}
                >
                  {`Specs ${index + 1}`}
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
              />
            </MobileFooter>
          </SpecificationFormContainer>
        </ContainerWithCategoryImagePreview>
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
      </RequestRow>
    </>
  );
};

export default SelectSpecificationsView;
