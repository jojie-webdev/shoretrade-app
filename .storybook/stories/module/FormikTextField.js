import React from 'react';

import { storiesOf } from '@storybook/react';
import { useFormik, Form, Formik } from 'formik';

import Button from '../../../src/components/base/Button';
import FormikTextField from '../../../src/components/module/FormikTextField';
import Container from '../../components/Container';

// eslint-disable-next-line react/prop-types
const Component = () => {
  return (
    <Formik
      initialValues={{
        email: '',
      }}
      onSubmit={(values) => console.log(values)}
    >
      <Form>
        <FormikTextField type="email" label="EMAIL" name="email" />
        <Button type="submit" text="Submit" />
      </Form>
    </Formik>
  );
};

storiesOf('module/FormikTextField', module).add('Summary', () => {
  return (
    <Container>
      <Component />
    </Container>
  );
});
