import React, { useState } from 'react';

import { storiesOf } from '@storybook/react';

import Hamburger from '../../../src/components/module/Hamburger';
import Container from '../../components/Container';

storiesOf('module/Hamburger', module).add('Summary', () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <Container>
      <Hamburger
        isActive={isActive}
        onClick={() => setIsActive(!isActive)}
        width={30}
        height={20}
      />
    </Container>
  );
});
