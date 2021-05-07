import React from 'react';

import { storiesOf } from '@storybook/react';

import NumberedHero from '../../../src/components/module/NumberedHero';
import Container from '../../components/Container';

storiesOf('module/NumberedHero', module).add('Summary', () => (
  <Container>
    <NumberedHero />
  </Container>
));
