import React, { useState } from 'react';

import { storiesOf } from '@storybook/react';

import Tabs from '../../../src/components/base/Tabs';
import Container from '../../components/Container';

storiesOf('base/Tabs', module).add('Summary', () => {
  const [tab, setTab] = useState('Tab 1');

  return (
    <Container>
      <Tabs
        tabs={['Tab 1', 'Tab 2']}
        selectedTab={tab}
        onClickTab={(tab) => setTab(tab)}
      />
    </Container>
  );
});
