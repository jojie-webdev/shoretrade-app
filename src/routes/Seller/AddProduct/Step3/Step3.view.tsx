import React, { useState, useEffect } from 'react';

import Button from 'components/base/Button';
import Interaction from 'components/base/Interactions';
import pathOr from 'ramda/es/pathOr';
import uniq from 'ramda/es/uniq';
import unnest from 'ramda/es/unnest';
import { GetCategoryData } from 'store/selectors/seller/categories';

import { Step3Props, Option } from './Step3.props';
import { Container } from './Step3.style';

function Step3({
  editableListing,
  listingFormData,
  onSelectSpecifications,
  isCustomType,
}: Step3Props) {
  const categoryData = GetCategoryData(
    editableListing?.customTypeData?.categoryId || ''
  );

  const typeName =
    (isCustomType
      ? editableListing?.customTypeData?.name
      : listingFormData?.type.name) || '';

  const stateOptions = (
    (isCustomType ? categoryData?.states : listingFormData?.stateOptions) || []
  ).map((group) =>
    group.map((item) => ({
      label: item.state.name,
      value: item.categoryStateOptionId,
      groupOrder: item.groupOrder,
    }))
  );

  const stateRules =
    (isCustomType ? categoryData?.stateRules : listingFormData?.stateRules) ||
    {};
  const preselectedSpecifications = (editableListing?.states || []).map(
    (specificationId, i) => {
      const options = pathOr<
        { label: string; value: string; groupOrder: number }[]
      >([], [i], stateOptions);
      return (
        options.find((option) => option.value === specificationId) || {
          label: '',
          value: specificationId,
          groupOrder: i,
        }
      );
    }
  );

  const [specifications, setSpecifications] = useState<Option[]>(
    preselectedSpecifications
  );

  const specificationIds = specifications.map((s) => s.value);

  const disabledOptions = uniq(
    unnest(specifications.map((s) => stateRules[s.label.toUpperCase()] || []))
  );

  const isComplete = specificationIds.length === stateOptions.length;

  useEffect(() => {
    if (
      specifications.filter(
        (spec) => spec.label === 'Live' || spec.label === 'Raw'
      ).length === 1
    ) {
      const filteredRaw = stateOptions.map((group) =>
        group.filter((item) => item.label === 'Raw')
      );
      const cleanArray = filteredRaw.filter((i) => i.length > 0)[0][0];
      specificationIds.push(cleanArray.value);
      setTimeout(() => {
        onSelectSpecifications(specificationIds);
      }, 500);
    }
  }, [specifications]);

  return (
    <Container>
      {stateOptions.slice(0, specifications.length + 1).map((group) => (
        <div key={group[0].groupOrder} className="interaction-group">
          {group
            .filter((i) => {
              if (typeName.toLowerCase().includes('meat')) {
                return i.label !== 'Live';
              }

              return i;
            })
            .map(
              (item) =>
                !disabledOptions.includes(item.label.toUpperCase()) && (
                  <div key={item.value} className="interaction-container">
                    <Interaction
                      type="radio"
                      value={item.label}
                      pressed={specificationIds.includes(item.value)}
                      onClick={() => {
                        setSpecifications([
                          ...specifications.slice(0, item.groupOrder - 1),
                          item,
                        ]);
                      }}
                    />
                  </div>
                )
            )}
        </div>
      ))}

      <div className="btn-container">
        <Button
          text="Next"
          variant={isComplete ? 'primary' : 'disabled'}
          onClick={() => {
            if (isComplete) {
              onSelectSpecifications(specificationIds);
            }
          }}
        />
      </div>
    </Container>
  );
}

export default Step3;
