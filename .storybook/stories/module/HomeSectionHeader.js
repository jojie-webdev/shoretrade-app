import React from 'react';

import { storiesOf } from '@storybook/react';

import HomeSectionHeader from '../../../src/components/module/HomeSectionHeader';
import Container from '../../components/Container';

storiesOf('module/HomeSectionHeader', module).add('Summary', () => (
  <Container appType="buyer">
    <HomeSectionHeader title="Categories" onClick={() => {}} />
  </Container>
));
