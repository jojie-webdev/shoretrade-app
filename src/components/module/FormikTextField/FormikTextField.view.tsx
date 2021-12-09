import React from 'react';

// import { useTheme } from 'utils/Theme';

import TextField from 'components/base/TextField';
import { useField } from 'formik';

import { FormikTextFieldProps } from './FormikTextField.props';

const FormikTextField = (props: FormikTextFieldProps): JSX.Element => {
  // const theme = useTheme();
  const { name, otherError } = props;
  const [field, meta] = useField<string>(name);

  const onChange = (event: React.ChangeEvent<any>) => {
    if (!props.readOnly) {
      field.onChange(event);
    }
  };

  return (
    <TextField
      {...field}
      {...props}
      onChange={onChange}
      id={name}
      error={
        (otherError || '').length > 0
          ? otherError
          : meta.touched
          ? meta.error
          : undefined
      }
    />
  );
};

export default FormikTextField;
