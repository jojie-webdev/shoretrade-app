import React from 'react';

import { Minus } from 'components/base/SVG';

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
  style,
  CustomIcon,
  ...props
}: CheckboxProps): JSX.Element => {
  return (
    <Container style={style || {}} onClick={props.onClick}>
      <HiddenCheckbox
        onChange={(event) => event.stopPropagation()}
        checked={checked}
        type="checkbox"
        {...props}
      />
      <CustomCheckbox
        borderColor={props?.borderColor}
        checked={checked}
        size={size}
      >
        {(() => {
          if (checked) {
            if (CustomIcon) return <CustomIcon fill="#fff" />;
            return <InnerCheck scale={scale} />;
          }
        })()}
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
