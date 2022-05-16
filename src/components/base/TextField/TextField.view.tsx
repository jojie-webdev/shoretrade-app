import React, { useRef, useState } from 'react';

import Alert from 'components/base/Alert';
import { Eye, EyeOff } from 'components/base/SVG';
import Touchable from 'components/base/Touchable';
import Typography from 'components/base/Typography';
import { useTheme } from 'utils/Theme';

import { TextFieldProps } from './TextField.props';
import {
  Container,
  LeftComponentContainer,
  RightComponentContainer,
  FieldContainer,
  Field,
  VisibilityContainer,
  Error,
  Prefix,
} from './TextField.style';

const TextField = (props: TextFieldProps): JSX.Element => {
  const theme = useTheme();
  const isSeller = theme.appType === 'seller';

  const {
    id,
    type,
    label,
    value = '',
    onChange = () => null,
    onChangeText = () => null,
    placeholder,
    secured,
    error = '',
    prefix,
    LeftComponent = null,
    RightComponent = null,
    className = undefined,
    onBlur = () => null,
    style,
    alert,
    readOnly,
    variant,
    color,
    onKeyUp,
    onKeyDown,
    disabled,
    inputType,
    maxLength,
    suffix,
    rightComponentDirection,
  } = props;

  const [showSecuredText, setShowSecuredText] = useState(false);

  const fieldRef = useRef<HTMLInputElement>(null);

  const VisibilityIcon = showSecuredText ? EyeOff : Eye;
  const defaultInputType = type || 'text';

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!props.readOnly) {
      onChange(event);
      onChangeText(event.target.value);
    }
  };

  const handleNegoFieldClick = () => {
    if (!fieldRef.current) {
      return;
    }

    const value = fieldRef.current.value;
    const output = value?.toString().substring(0, 0) + ` ${placeholder}`;
    fieldRef.current.value = output;
    fieldRef.current.selectionStart = fieldRef.current.selectionEnd = 0;
  };

  const handleFieldChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    const removeDigitsFromTheRight = () => {
      const newVal = value
        ?.toString()
        ?.split('')
        .splice(0, value?.toString()?.split('').length - 1);

      return newVal;
    };

    //check backspace
    if (e.keyCode === 8) {
      const newVal = removeDigitsFromTheRight();

      if (newVal.length === 0) {
        onChangeText('0');
        return;
      }

      onChangeText(newVal.join(''));
    }

    if (isNaN(parseInt(e.key))) {
      return;
    }

    if (Number.isInteger(parseInt(e.key))) {
      onChangeText(value + e.key);
    }
  };

  const renderTextFieldHandlesSuffix = () => (
    <Field
      className="text_field__field_container__input--with-suffix"
      id={id}
      ref={fieldRef}
      type="text"
      inputMode={inputType}
      value={
        readOnly && (prefix || '').length > 0
          ? `${prefix} ${value}`
          : value + ' ' + placeholder
      }
      onBlur={onBlur}
      placeholder={` ${placeholder}`}
      readOnly={readOnly}
      onKeyUp={onKeyUp}
      onChange={() => null}
      onKeyDown={(e) => handleFieldChange(e)}
      onClick={() => handleNegoFieldClick()}
      disabled={disabled}
      borderRadius={props?.borderRadius}
      maxLength={maxLength}
    />
  );

  const renderNormalTextField = () => (
    <Field
      className="text_field__field_container__input"
      id={id}
      type={secured && !showSecuredText ? 'password' : defaultInputType}
      inputMode={inputType}
      value={
        readOnly && (prefix || '').length > 0 ? `${prefix} ${value}` : value
      }
      onChange={handleChange}
      onBlur={onBlur}
      placeholder={placeholder}
      readOnly={readOnly}
      onKeyUp={onKeyUp}
      onKeyDown={onKeyDown}
      disabled={disabled}
      min={props?.min}
      borderRadius={props?.borderRadius}
      maxLength={maxLength}
    />
  );

  return (
    <Container className={className} style={style}>
      <Typography variant={variant || 'overline'} color={color || 'shade6'}>
        {label}
      </Typography>
      <FieldContainer
        className="text_field__field_container"
        error={(error || '').length > 0}
        readOnly={props.readOnly}
        borderRadius={props.borderRadius}
        height={props.height?.toString()}
      >
        {LeftComponent && (
          <LeftComponentContainer
            className="text_field__field_container__left_component"
            disabled={disabled}
          >
            {LeftComponent}
          </LeftComponentContainer>
        )}
        {!readOnly && (prefix || '').length > 0 && <Prefix>{prefix}</Prefix>}
        {suffix ? renderTextFieldHandlesSuffix() : renderNormalTextField()}
        {RightComponent && (
          <RightComponentContainer direction={rightComponentDirection}>
            {RightComponent}
          </RightComponentContainer>
        )}
        {secured && (
          <VisibilityContainer>
            <Touchable onPress={() => setShowSecuredText((v) => !v)}>
              <VisibilityIcon fill={theme.grey.shade7} />
            </Touchable>
          </VisibilityContainer>
        )}
      </FieldContainer>
      {(error || '').length > 0 && (
        <Error variant="caption" color="error">
          {error}
        </Error>
      )}

      {alert && (
        <Alert
          variant={isSeller ? 'info' : 'infoAlert'}
          content={alert}
          fullWidth
          style={{ marginTop: 8 }}
        />
      )}
    </Container>
  );
};

export default TextField;
