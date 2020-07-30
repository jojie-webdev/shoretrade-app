import React from 'react';

import Typography from 'components/base/Typography';

import { TextFieldProps } from './TextField.props';
import { Container, Field } from './TextField.style';

const TextField = (props: TextFieldProps): JSX.Element => {
  const { label, value, onChangeText } = props;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeText(event.target.value);
  };

  return (
    <Container>
      <Typography variant="overline" color={'shade6'}>
        {label}
      </Typography>
      <Field type="text" value={value} onChange={handleChange} />
    </Container>
  );
};

export default TextField;
