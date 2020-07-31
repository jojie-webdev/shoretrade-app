import React, { useState } from 'react';

import { Eye, EyeOff } from 'components/base/SVG';
import Touchable from 'components/base/Touchable';
import Typography from 'components/base/Typography';
import { useTheme } from 'utils/Theme';

import { TextFieldProps } from './TextField.props';
import {
  Container,
  FieldContainer,
  Field,
  VisibilityContainer,
  Error,
} from './TextField.style';

const TextField = (props: TextFieldProps): JSX.Element => {
  const theme = useTheme();
  const {
    label,
    value = '',
    onChange = () => null,
    onChangeText = () => null,
    placeholder,
    secured,
    error = '',
  } = props;

  const [showSecuredText, setShowSecuredText] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event);
    onChangeText(event.target.value);
  };

  const VisibilityIcon = showSecuredText ? EyeOff : Eye;

  return (
    <Container>
      <Typography variant="overline" color={'shade6'}>
        {label}
      </Typography>
      <FieldContainer>
        <Field
          type={secured && !showSecuredText ? 'password' : 'text'}
          value={value}
          onChange={handleChange}
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
      {error.length > 0 && (
        <Error variant="caption" color="error">
          {error}
        </Error>
      )}
    </Container>
  );
};

export default TextField;
