import React, { useState } from 'react';

import { Eye, EyeOff, InfoFilled } from 'components/base/SVG';
import Touchable from 'components/base/Touchable';
import Typography from 'components/base/Typography';
import { useTheme } from 'utils/Theme';

import { TextFieldProps } from './TextField.props';
import {
  Container,
  LeftComponentContainer,
  FieldContainer,
  Field,
  VisibilityContainer,
  Error,
  Alert,
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
    className = undefined,
    onBlur = () => null,
    style,
    alert,
  } = props;

  const [showSecuredText, setShowSecuredText] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event);
    onChangeText(event.target.value);
  };

  const VisibilityIcon = showSecuredText ? EyeOff : Eye;
  const defaultInputType = type || 'text';

  return (
    <Container className={className} style={style}>
      <Typography variant="overline" color={'shade6'}>
        {label}
      </Typography>
      <FieldContainer error={(error || '').length > 0}>
        {LeftComponent && (
          <LeftComponentContainer>{LeftComponent}</LeftComponentContainer>
        )}
        {prefix && <Prefix>{prefix}</Prefix>}
        <Field
          id={id}
          type={secured && !showSecuredText ? 'password' : defaultInputType}
          value={value}
          onChange={handleChange}
          onBlur={onBlur}
          placeholder={placeholder}
        />
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

      {alert && <Alert label={alert} />}
    </Container>
  );
};

export default TextField;
