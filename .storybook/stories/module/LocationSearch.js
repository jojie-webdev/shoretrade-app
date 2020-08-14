import React from 'react';

import { storiesOf } from '@storybook/react';

import LocationSearch from '../../../src/components/module/LocationSearch';
import Container from '../../components/Container';

storiesOf('module/LocationSearch', module).add('Summary', () => (
  <Container background="white">
    <LocationSearch />
  </Container>
));
