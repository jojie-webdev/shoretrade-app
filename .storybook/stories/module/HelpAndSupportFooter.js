import React from 'react';

import { storiesOf } from '@storybook/react';

import HelpAndSupportFooter from '../../../src/components/module/HelpAndSupportFooter';
import Container from '../../components/Container';

storiesOf('module/HelpAndSupportFooter', module).add('Summary', () => (
  <Container>
    <HelpAndSupportFooter />
  </Container>
));
