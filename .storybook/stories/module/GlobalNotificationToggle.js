import React, { useState } from 'react';

import { storiesOf } from '@storybook/react';

import { Desktop } from '../../../src/components/base/SVG';
import GlobalNotificationToggle from '../../../src/components/module/GlobalNotificationToggle';
import Container from '../../components/Container';

const Base = () => {
  const [checked, setChecked] = useState(false);

  return (
    <>
      <p>{checked ? 'on' : 'off'}</p>
      <GlobalNotificationToggle
        title="Browser"
        description="Push Notifications"
        onClick={() => setChecked(!checked)}
        checked={checked}
        icon={<Desktop />}
      />
    </>
  );
};

storiesOf('module/GlobalNotificationToggle', module).add('Buyer', () => (
  <Container appType="buyer">
    <Base />
  </Container>
));

storiesOf('module/GlobalNotificationToggle', module).add('Seller', () => (
  <Container appType="seller">
    <Base />
  </Container>
));
