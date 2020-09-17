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
  Error,
} from './Select.style';

const Select = ({ label, error, ...props }: SelectProps): JSX.Element => {
  const theme = useTheme();

  return (
    <Container label={label}>
      {label ? (
        <Label variant="overline" color="shade6">
          {label}
        </Label>
      ) : null}
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

      {(error || '').length > 0 && (
        <Error variant="caption" color="error">
          {error}
        </Error>
      )}
    </Container>
  );
};

export default React.memo(Select);
