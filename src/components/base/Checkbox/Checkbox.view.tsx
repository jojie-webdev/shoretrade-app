import React from 'react';

import { CheckboxProps } from './Checkbox.props';
import {
  Container,
  HiddenCheckbox,
  CustomCheckbox,
  InnerCheck,
  Label,
  Error,
} from './Checkbox.style';

const Checkbox = ({
  checked = false,
  disabled = false,
  error = '',
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
      <div className="box-group">
        <HiddenCheckbox
          onChange={(event) => event.stopPropagation()}
          checked={checked}
          type="checkbox"
          disabled={disabled}
          {...props}
        />
        <CustomCheckbox
          borderColor={props?.borderColor}
          checked={checked}
          size={size}
          disabled={disabled}
        >
          {(() => {
            if (checked) {
              if (CustomIcon) return <CustomIcon fill="#fff" />;
              return <InnerCheck disabled={disabled} scale={scale} />;
            }
          })()}
        </CustomCheckbox>
        {label && (
          <Label {...typographyProps} disabled={disabled} variant="label">
            {label}
          </Label>
        )}
      </div>
      {(error || '').length > 0 && (
        <Error variant="caption" color="error">
          {error}
        </Error>
      )}
    </Container>
  );
};

export default React.memo(Checkbox);
