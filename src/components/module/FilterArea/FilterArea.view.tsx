import React, { useEffect, useReducer, useState } from 'react';

import CheckBox from 'components/base/Checkbox';
import Select from 'components/base/Select';
import Slider from 'components/base/Slider';
import slice from 'ramda/es/slice';
import sortBy from 'ramda/es/sortBy';
import { createUpdateReducer } from 'utils/Hooks';

import { FilterAreaProps } from './FilterArea.props';
import {
  Container,
  FilterLabel,
  LabeledCheckBox,
  CheckBoxLabel,
} from './FilterArea.style';

const FilterArea = (props: FilterAreaProps): JSX.Element => {
  const { filterData, onChangeFilter } = props;
  const stateGroup = filterData?.specifications || [];
  const sortStateByGroup = sortBy(
    (v: { groupOption: number }[]) => v[0].groupOption
  );
  const sortedStateGroup = sortStateByGroup(stateGroup);

  const regions = ['All', ...(filterData?.origin || [])];

  const [specifications, updateSpecifications] = useReducer(
    createUpdateReducer<Record<string, boolean>>(),
    {}
  );

  const typeMetric = (filterData?.typeMetric || 'GRAMS').toUpperCase();
  const sizeFrom = filterData?.sizeFrom || 0;
  const sizeTo = filterData?.sizeTo || 0;
  const filteredSizeOptions = (function () {
    const sizeOptions = filterData?.sizeOptions || [];
    if (typeMetric !== 'GRAMS' && typeMetric !== 'UNITS PER POUND') {
      const startIndex = sizeOptions.findIndex(
        (v) => v === sizeFrom.toString()
      );
      const lastIndex = sizeOptions.findIndex((v) => v === sizeTo.toString());
      return slice(startIndex, lastIndex + 1, sizeOptions);
    }
    return sizeOptions;
  })();
  const maxRange = (function () {
    if (typeMetric === 'GRAMS' || typeMetric === 'UNITS PER POUND') {
      return Number(sizeTo) - Number(sizeFrom);
    }

    return filteredSizeOptions.length - 1;
  })();

  const [sizeRange, setSizeRange] = useState([0, maxRange]);
  const [isSizeModified, setIsSizeModified] = useState(false);

  useEffect(() => {
    setSizeRange([0, maxRange]);
  }, [maxRange]);

  const [showOnlyUngraded, setShowOnlyUngraded] = useState(false);
  const [currentRegion, setCurrentRegion] = useState('All');

  const maskSizeValue = (v: number) => {
    if (typeMetric === 'GRAMS' || typeMetric === 'UNITS PER POUND') {
      return `${v + Number(sizeFrom)}`;
    }
    return `${filteredSizeOptions[v]}`;
  };

  const handleUpdate = () => {
    const selectedSpecifications = Object.keys(specifications).reduce(
      (accum: string[], current) => {
        if (specifications[current]) {
          return [current, ...accum];
        }
        return accum;
      },
      []
    );
    const payload = {
      ...(sizeFrom && isSizeModified
        ? { sizeRangeFrom: maskSizeValue(sizeRange[0]) }
        : {}),
      ...(sizeTo && isSizeModified
        ? { sizeRangeTo: maskSizeValue(sizeRange[1]) }
        : {}),
      ...(selectedSpecifications.length > 0
        ? { specifications: selectedSpecifications.join() }
        : {}),
      ...(showOnlyUngraded ? { showUngraded: true } : {}),
      ...(currentRegion.length > 0 && currentRegion !== 'All'
        ? { catchmentArea: currentRegion }
        : {}),
    };

    onChangeFilter(payload);
  };

  useEffect(() => {
    handleUpdate();
  }, [specifications, showOnlyUngraded, currentRegion, isSizeModified]);
  return (
    <Container>
      <FilterLabel variant="overline">Product Specifications</FilterLabel>
      {sortedStateGroup.map((stateOptions, index) => (
        <div
          key={stateOptions[0].groupOption}
          style={{ marginTop: index !== 0 ? 32 : 0 }}
        >
          {stateOptions.map((stateOption, index) => (
            <LabeledCheckBox
              key={stateOption.state.id}
              style={{ marginTop: index !== 0 ? 12 : 0 }}
            >
              <CheckBoxLabel>{stateOption.state.name}</CheckBoxLabel>
              <CheckBox
                checked={specifications[stateOption.state.id]}
                onClick={() =>
                  updateSpecifications({
                    [stateOption.state.id]: !specifications[
                      stateOption.state.id
                    ],
                  })
                }
              />
            </LabeledCheckBox>
          ))}
        </div>
      ))}

      {filterData?.sizeFrom && (
        <>
          <FilterLabel variant="overline" style={{ marginTop: 40 }}>
            Size
          </FilterLabel>

          {sizeTo !== sizeFrom && maxRange && (
            <Slider
              value={sizeRange}
              onChange={(v) => {
                if (v && typeof v === 'object') {
                  setSizeRange(v);
                }
              }}
              max={maxRange}
              maskValue={maskSizeValue}
              onAfterChange={() => {
                if (!isSizeModified) {
                  setIsSizeModified(true);
                } else {
                  if (
                    sizeFrom.toString() === maskSizeValue(sizeRange[0]) &&
                    sizeTo.toString() === maskSizeValue(sizeRange[1])
                  ) {
                    setIsSizeModified(false);
                  } else {
                    handleUpdate();
                  }
                }
              }}
            />
          )}

          <LabeledCheckBox style={{ marginTop: 12 }}>
            <CheckBoxLabel>Show only Ungraded</CheckBoxLabel>
            <CheckBox
              checked={showOnlyUngraded}
              onClick={() => setShowOnlyUngraded((v) => !v)}
            />
          </LabeledCheckBox>
        </>
      )}
      <FilterLabel variant="overline" style={{ marginTop: 40 }}>
        Catchment Region
      </FilterLabel>
      <Select
        value={currentRegion}
        options={regions}
        onChange={(option) => setCurrentRegion(option.value)}
      />
    </Container>
  );
};

export default React.memo(FilterArea);
