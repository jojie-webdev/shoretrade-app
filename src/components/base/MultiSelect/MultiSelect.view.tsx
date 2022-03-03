import React, { useState } from 'react';

import { useTheme } from 'utils/Theme';

import Select from '../Select';
import { MultiSelectProps } from './MultiSelect.props';
import { Container } from './MultiSelect.style';
import MultiSelectList from './MultiSelectList.view';

const MultiSelect = (props: MultiSelectProps): JSX.Element => {
  const { selectedAllText, options, selected, updateSelected } = props;
  const [showMenu, setShowMenu] = useState(false);
  const theme = useTheme();

  const dropdownValue =
    selected.length === options.length && selectedAllText
      ? selectedAllText
      : selected.map((s) => s.label).join(', ');

  return (
    <Container>
      <Select
        {...props}
        isMulti
        value={dropdownValue}
        customMenu={
          showMenu && (
            <MultiSelectList
              updateSelected={updateSelected}
              options={props.options}
              selected={selected}
            />
          )
        }
        customOpenMenu={() => setShowMenu((v) => !v)}
      />
    </Container>
  );
};

export default React.memo(MultiSelect);
