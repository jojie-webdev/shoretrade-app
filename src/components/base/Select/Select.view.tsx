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
        controlClassName={
          props.size === 'small'
            ? `${PREFIX}ContainerThin`
            : `${PREFIX}Container`
        }
        placeholderClassName={`${PREFIX}Placeholder`}
        menuClassName={`${PREFIX}Menu`}
        arrowClosed={
          <ArrowContainer size={props.size}>
            <DropdownArrow
              fill={props.disabled ? theme.grey.shade6 : theme.brand.primary}
            />
          </ArrowContainer>
        }
        arrowOpen={
          <ArrowContainer size={props.size} flipped>
            <DropdownArrow fill={theme.brand.primary} />
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
