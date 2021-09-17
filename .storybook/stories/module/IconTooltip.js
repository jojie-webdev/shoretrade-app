import React from 'react';

import { storiesOf } from '@storybook/react';

import IconTooltip from '../../../src/components/module/IconTooltip';
import Container from '../../components/Container';

storiesOf('module/IconTooltip', module).add('Summary', () => (
  <Container>
    <IconTooltip
      variant="info"
      content="Toggle the notification mediums On and Off to update your preferences for all notifications."
    />
  </Container>
));
