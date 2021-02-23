import React from 'react';

import { storiesOf } from '@storybook/react';

import CategoryImagePreview from '../../../src/components/module/CategoryImagePreview';
import Container from '../../components/Container';

storiesOf('module/CategoryImagePreview', module).add('Summary', () => (
  <Container>
    <CategoryImagePreview />
  </Container>
));
