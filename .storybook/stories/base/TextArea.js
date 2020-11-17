import React from 'react';

import { storiesOf } from '@storybook/react';

import TextArea from '../../../src/components/base/TextArea';
import Container from '../../components/Container';

storiesOf('module/TextArea', module).add('Summary', () => (
  <Container>
    <TextArea label="Description" />
  </Container>
));
