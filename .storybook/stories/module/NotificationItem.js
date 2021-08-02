import React from 'react';

import { storiesOf } from '@storybook/react';
import moment from 'moment';

import NotificationItem from '../../../src/components/module/NotificationItem';
import Container from '../../components/Container';

storiesOf('module/NotificationItem', module).add('Summary', () => (
  <Container>
    <NotificationItem
      isRead={false}
      type="account"
      content={`Thank you "First Name", We are so excited that you signed up to buy on ShoreTrade."`}
      date={moment()}
    />
  </Container>
));
