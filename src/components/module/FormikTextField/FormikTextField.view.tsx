import React from 'react';

// import { useTheme } from 'utils/Theme';

import TextField from 'components/base/TextField';
import { useField } from 'formik';

import { FormikTextFieldProps } from './FormikTextField.props';
import { Container } from './FormikTextField.style';

const FormikTextField = (props: FormikTextFieldProps): JSX.Element => {
  // const theme = useTheme();
  const { name, ...textFieldProps } = props;
  const [field, meta] = useField<string>(name);

  const onChange = (event: React.ChangeEvent<any>) => {
    if (!props.readOnly) {
      field.onChange(event);
    }
  };

  return (
    <TextField
      {...field}
      {...textFieldProps}
      onChange={onChange}
      id={name}
      error={meta.touched ? meta.error : undefined}
    />
  );
};

export default React.memo(FormikTextField);
