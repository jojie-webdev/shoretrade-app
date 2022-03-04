import React, { useEffect, useState } from 'react';

import Select from '../Select';
import { MultiSelectProps } from './MultiSelect.props';
import { Container } from './MultiSelect.style';
import MultiSelectList from './MultiSelectList.view';

const MultiSelect = (props: MultiSelectProps): JSX.Element => {
  const { selectedAllText, options, selected, updateSelected } = props;
  const [showMenu, setShowMenu] = useState(false);

  const dropdownValue =
    selected.length === options.length && selectedAllText
      ? selectedAllText
      : selected.map((s) => s.label).join(', ');

  useEffect(() => {
    document.addEventListener('mouseup', function (e) {
      const container = document.getElementById('multi-select');
      // @ts-ignore
      if (container && !container.contains(e.target)) {
        setShowMenu(false);
      }
    });
  }, []);

  return (
    <Container id="multi-select">
      <Select
        {...props}
        isMulti
        value={dropdownValue}
        customMenu={
          <MultiSelectList
            show={showMenu}
            updateSelected={(v) => {
              updateSelected(v);
              setShowMenu(false);
            }}
            options={props.options}
            selected={selected}
          />
        }
        customOpenMenu={() => setShowMenu((v) => !v)}
      />
    </Container>
  );
};

export default React.memo(MultiSelect);
