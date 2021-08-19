import React from 'react';

import { storiesOf } from '@storybook/react';

import NotificationMenu from '../../../src/components/module/NotificationMenu';
import Container from '../../components/Container';

storiesOf('module/NotificationMenu', module).add('Buyer', () => (
  <Container center appType="buyer">
    <NotificationMenu notifTotal={1} />
  </Container>
));
