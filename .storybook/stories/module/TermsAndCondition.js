import React from 'react';

import { storiesOf } from '@storybook/react';

import TermsAndCondition from '../../../src/components/module/TermsAndCondition';
import Container from '../../components/Container';

storiesOf('module/TermsAndCondition', module).add('Summary', () => (
  <Container>
    <TermsAndCondition />
  </Container>
));
