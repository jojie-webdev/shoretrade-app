import React from 'react';

import { storiesOf } from '@storybook/react';

import Tag from '../../../src/components/base/Tag';
import Container from '../../components/Container';

storiesOf('base/Tag', module).add('Buyer', () => (
  <Container appType="buyer">
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
      }}
    >
      <Tag label="Label" />
      <Tag label="Label" selected />
    </div>
  </Container>
));

storiesOf('base/Tag', module).add('Seller', () => (
  <Container background="none" appType="seller">
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
      }}
    >
      <Tag label="Label" />
      <Tag label="Label" selected />
      <Tag alt label="Label" onClickRemove={() => console.log('removed')} />
    </div>
  </Container>
));
