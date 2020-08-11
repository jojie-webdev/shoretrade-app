import React from 'react';

import 'react-dropdown/style.css';

import { DropdownArrow } from 'components/base/SVG';
import { useTheme } from 'utils/Theme';

import { SelectProps } from './Select.props';
import {
  Container,
  Label,
  PREFIX,
  ArrowContainer,
  StyledDropdown,
} from './Select.style';

const Select = ({ label, ...props }: SelectProps): JSX.Element => {
  const theme = useTheme();

  return (
    <Container label={label}>
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
      {label ? (
        <Label variant="overline" color="shade5">
          {label}
        </Label>
      ) : null}
    </Container>
  );
};

export default React.memo(Select);
