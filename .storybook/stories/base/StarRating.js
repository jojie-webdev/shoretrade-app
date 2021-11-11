import React from 'react';

import { storiesOf } from '@storybook/react';

import StarRating from '../../../src/components/base/StarRating';
import Container from '../../components/Container';

storiesOf('base/StarRating', module).add('Summary', () => (
  <Container>
    <StarRating />
  </Container>
));
