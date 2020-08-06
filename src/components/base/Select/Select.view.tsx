import React from 'react';

import 'react-dropdown/style.css';

import { DropdownArrow } from 'components/base/SVG';
import { useTheme } from 'utils/Theme';

import { SelectProps } from './Select.props';
import { PREFIX, ArrowContainer, StyledDropdown } from './Select.style';

const Select = (props: SelectProps): JSX.Element => {
  const theme = useTheme();

  return (
    <StyledDropdown
      {...props}
      controlClassName={`${PREFIX}Container`}
      placeholderClassName={`${PREFIX}Placeholder`}
      menuClassName={`${PREFIX}Menu`}
      arrowClosed={
        <ArrowContainer>
          <DropdownArrow
            fill={props.disabled ? theme.grey.shade6 : undefined}
          />
        </ArrowContainer>
      }
      arrowOpen={
        <ArrowContainer flipped>
          <DropdownArrow />
        </ArrowContainer>
      }
    />
  );
};

export default React.memo(Select);
