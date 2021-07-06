import React from 'react';

import { RadioProps } from './Radio.props';
import {
  Container,
  HiddenRadio,
  InnerCircle,
  CustomRadio,
  Label,
} from './Radio.style';

const Radio = ({
  checked = false,
  label,
  size = 24,
  typographyProps,
  ...props
}: RadioProps): JSX.Element => {
  return (
    <Container className="radio" onClick={props.onClick}>
      <HiddenRadio
        onChange={(event) => event.stopPropagation()}
        checked={checked}
        type="radio"
        {...props}
      />
      <CustomRadio checked={checked} size={size}>
        {checked && <InnerCircle size={size} />}
      </CustomRadio>
      {label && (
        <Label {...typographyProps} variant="label">
          {label}
        </Label>
      )}
    </Container>
  );
};

export default React.memo(Radio);
