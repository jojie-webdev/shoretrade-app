import React from 'react';

import { storiesOf } from '@storybook/react';

import AccountPicture from '../../../src/components/module/AccountPicture';
import Container from '../../components/Container';

storiesOf('module/AccountPicture', module).add('Summary', () => (
  <Container>
    <AccountPicture />
  </Container>
));
