import React from 'react';

import BaseMultiSelect from 'multiselect-react-dropdown';
import { useTheme } from 'utils/Theme';

import { DropdownArrow } from '../SVG';
import { MultiSelectProps } from './MultiSelect.props';
import { Container, Label } from './MultiSelect.style';

const MultiSelect = (props: MultiSelectProps): JSX.Element => {
  const theme = useTheme();
  return (
    <Container>
      {props.label ? (
        <Label variant="overline" color="shade6">
          {props.label}
        </Label>
      ) : null}
      <BaseMultiSelect
        {...props}
        showArrow
        showCheckbox
        style={{
          multiselectContainer: {
            'margin-top': '8px',
          },
          inputField: {
            'font-family': `'Basis Grotesque Pro', sans-serif`,
            'margin-top': 0,
            'line-height': '24px',
            'font-weight': 500,
            color: '#09131D',
            height: '24px',
          },
          chips: {
            background: theme.brand.primary,
          },
          searchBox: {
            'border-radius': '12px',
            padding: '12px 16px',
            height: '48px',
            border: props.noBorder ? 0 : undefined,
            background: props.background,
          },
          option: {
            'font-family': `'Basis Grotesque Pro', sans-serif`,
            'font-size': '0.875rem',
          },
        }}
        customArrow={
          <DropdownArrow
            fill={
              props.disabled
                ? theme.grey.shade6
                : theme.appType === 'buyer'
                ? theme.brand.primary
                : theme.grey.shade7
            }
          />
        }
      />
    </Container>
  );
};

export default React.memo(MultiSelect);
