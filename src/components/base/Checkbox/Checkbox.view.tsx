import React from 'react';

import { CheckboxProps } from './Checkbox.props';
import {
  Container,
  HiddenCheckbox,
  CustomCheckbox,
  InnerCheck,
  Label,
} from './Checkbox.style';

const Checkbox = ({
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
      <CustomCheckbox checked={checked} size={size}>
        {checked && <InnerCheck scale={scale} />}
      </CustomCheckbox>
      {label && (
        <Label {...typographyProps} variant="label">
          {label}
        </Label>
      )}
    </Container>
  );
};

export default React.memo(Checkbox);
