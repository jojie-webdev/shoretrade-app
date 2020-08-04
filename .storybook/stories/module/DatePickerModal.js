import React from 'react';

import { storiesOf } from '@storybook/react';

import DatePickerModal from '../../../src/components/module/DatePickerModal';
import Container from '../../components/Container';

const modalProps = {
  isOpen: true,
};

storiesOf('module/DatePickerModal', module).add('Summary', () => (
  <Container>
    <DatePickerModal {...modalProps} />
  </Container>
));
