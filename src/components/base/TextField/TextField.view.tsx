import React, { useState } from 'react';

import Alert from 'components/base/Alert';
import { Eye, EyeOff, InfoFilled } from 'components/base/SVG';
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
  } = props;

  const [showSecuredText, setShowSecuredText] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!props.readOnly) {
      onChange(event);
      onChangeText(event.target.value);
    }
  };

  const VisibilityIcon = showSecuredText ? EyeOff : Eye;
  const defaultInputType = type || 'text';

  return (
    <Container className={className} style={style}>
      <Typography variant={variant || 'overline'} color={color || 'shade6'}>
        {label}
      </Typography>
      <FieldContainer
        error={(error || '').length > 0}
        readOnly={props.readOnly}
      >
        {LeftComponent && (
          <LeftComponentContainer>{LeftComponent}</LeftComponentContainer>
        )}
        {!readOnly && (prefix || '').length > 0 && <Prefix>{prefix}</Prefix>}
        <Field
          id={id}
          type={secured && !showSecuredText ? 'password' : defaultInputType}
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
          min={props.min}
        />
        {RightComponent && (
          <RightComponentContainer>{RightComponent}</RightComponentContainer>
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

      {alert && <Alert variant="info" content={alert} fullWidth />}
    </Container>
  );
};

export default TextField;
