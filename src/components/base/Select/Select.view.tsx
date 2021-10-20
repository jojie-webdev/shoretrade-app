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

const Select = ({
  label,
  error,
  border,
  background,
  marginTop,
  borderRadius,
  ...props
}: SelectProps): JSX.Element => {
  const theme = useTheme();

  return (
    <Container label={label} marginTop={marginTop}>
      {label ? (
        <Label variant="overline" color="shade6">
          {label}
        </Label>
      ) : null}
      <StyledDropdown
        border={border}
        background={background}
        {...props}
        unbordered={props.unbordered}
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
              // fill={props.disabled ? theme.grey.shade6 : theme.brand.primary}
              fill={
                props.disabled
                  ? theme.grey.shade6
                  : theme.appType === 'buyer'
                  ? theme.brand.primary
                  : theme.grey.shade7
              }
            />
          </ArrowContainer>
        }
        arrowOpen={
          <ArrowContainer size={props.size} flipped>
            <DropdownArrow
              fill={
                theme.appType === 'buyer'
                  ? theme.brand.primary
                  : theme.grey.shade7
              }
            />
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
