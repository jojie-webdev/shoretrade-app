import React from 'react';

import { storiesOf } from '@storybook/react';

import FavoriteButton from '../../../src/components/base/FavoriteButton';
import Container from '../../components/Container';

storiesOf('base/FavoriteButton', module).add('Summary', () => (
  <Container>
    <FavoriteButton />
  </Container>
));
