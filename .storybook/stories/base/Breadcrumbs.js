import React from 'react';

import { storiesOf } from '@storybook/react';

import Breadcrumbs from '../../../src/components/base/Breadcrumbs';
import Container from '../../components/Container';

storiesOf('base/Breadcrumbs', module).add('Summary', () => (
  <Container background="white">
    <Breadcrumbs
      sections={[
        { label: 'Link 1', link: 'a' },
        { label: 'Link 2', link: 'b' },
        { label: 'Link 3' },
      ]}
    />
  </Container>
));
