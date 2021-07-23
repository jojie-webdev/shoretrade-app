import React from 'react';

import { storiesOf } from '@storybook/react';

import NotificationSettingsCategoryItem from '../../../src/components/module/NotificationSettingsCategoryItem';
import Container from '../../components/Container';

storiesOf('module/NotificationSettingsCategoryItem', module).add('Summary', () => (
  <Container>
    <NotificationSettingsCategoryItem />
  </Container>
));
