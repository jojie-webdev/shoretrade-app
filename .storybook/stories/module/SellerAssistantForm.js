import React from 'react';

import { storiesOf } from '@storybook/react';

import SellerAssistantForm from '../../../src/components/module/SellerAssistantForm';
import Container from '../../components/Container';

const formikInitial: FormikForm = {
  initialValues: {
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
  },
  onSubmit: () => {},
};

const props = {
  type: 'EDIT',
  formikInitial,
  callingCode: '61',
  pending: false,
  loading: false,
  onClickDelete: () => {},
};

storiesOf('module/SellerAssistantForm', module).add('Summary', () => (
  <Container>
    <SellerAssistantForm {...props} />
  </Container>
));
