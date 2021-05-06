import React from 'react';

import { storiesOf } from '@storybook/react';

import MobileModal from '../../../src/components/layout/MobileModal';
import Container from '../../components/Container';

storiesOf('layout/MobileModal', module).add('Summary', () => (
  <Container>
    <MobileModal isOpen={true} />
  </Container>
));
