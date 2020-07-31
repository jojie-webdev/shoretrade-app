import React from 'react';

import { CheckboxProps } from './Checkbox.props';
import {
  Container,
  HiddenCheckbox,
  Checkbox,
  InnerCheck,
  Label,
} from './Checkbox.style';

const CheckboxView = ({
  checked = false,
  label,
  size = 24,
  scale = 1,
  typographyProps,
  ...props
}: CheckboxProps): JSX.Element => {
  return (
    <Container onClick={props.onClick}>
      <HiddenCheckbox
        onChange={(event) => event.stopPropagation()}
        checked={checked}
        type="checkbox"
        {...props}
      />
      <Checkbox checked={checked} size={size}>
        {checked && <InnerCheck scale={scale} />}
      </Checkbox>
      {label && (
        <Label {...typographyProps} variant="label">
          {label}
        </Label>
      )}
    </Container>
  );
};

export default CheckboxView;
