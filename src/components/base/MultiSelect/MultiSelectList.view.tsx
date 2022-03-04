import React, { useState, useEffect } from 'react';

import Checkbox from 'components/base/Checkbox';
import { uniq } from 'ramda';

// import { useTheme } from 'utils/Theme';
import { OptionsType } from '../Select/Select.props';
import { MultiSelectListProps } from './MultiSelect.props';
import {
  Divider,
  CheckboxContainer,
  SelectListContainer,
} from './MultiSelect.style';

const MultiSelectList = (props: MultiSelectListProps): JSX.Element => {
  const { options, selected = [], updateSelected, show } = props;

  const [stateSelected, setStateSelected] = useState(selected);

  const selectedList = stateSelected?.map((option) => option.value) || [];
  const optionsList = options?.map((option: any) => option.value) || [];
  if (uniq(optionsList).length !== options.length) {
    throw Error('MultiSelectList : Duplicate found in list of options');
  }

  const isAllSelected: boolean =
    selectedList.sort().join('') === optionsList.sort().join('');

  const isSelected = (values: Array<OptionsType>, value: string): boolean =>
    !!values?.find((v) => v.value === value);

  const handleClick = (option: OptionsType | 'all', isTicked: boolean) => {
    let newSelected: Array<OptionsType> = [];

    if (option === 'all') {
      if (isTicked) {
        const allOpt =
          options.map((opt: any) => ({
            value: opt.value,
            label: opt.label,
          })) || [];
        setStateSelected(allOpt);
      }
      if (!isTicked) setStateSelected(newSelected);
    } else {
      const { value, label } = option;
      if (isTicked) {
        newSelected.push({ value, label });
        setStateSelected(newSelected.concat(stateSelected));
      } else {
        newSelected =
          stateSelected?.filter((s) => s.value !== option.value) || [];
        setStateSelected(newSelected);
      }
    }
  };

  useEffect(() => {
    updateSelected?.(stateSelected);
  }, [stateSelected]);

  useEffect(() => {
    setStateSelected(selected);
  }, [selected]);

  return (
    <SelectListContainer style={{ display: show ? undefined : 'none' }}>
      <CheckboxContainer>
        <Checkbox
          label="Select All"
          checked={isAllSelected}
          onClick={() => {
            handleClick('all', !isAllSelected);
          }}
        />

        <Divider />

        {options.map((option: any, idx) => {
          const isTicked =
            isSelected(stateSelected, option.value) || isAllSelected;
          return (
            <Checkbox
              key={idx}
              label={option.label}
              checked={isTicked}
              onClick={() => {
                handleClick(option, !isTicked);
              }}
            />
          );
        })}
      </CheckboxContainer>
    </SelectListContainer>
  );
};

export default MultiSelectList;
