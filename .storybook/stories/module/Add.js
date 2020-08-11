import React from 'react';

import { storiesOf } from '@storybook/react';

import { Camera, Box } from '../../../src/components/base/SVG';
import Add from '../../../src/components/module/Add';
import Container from '../../components/Container';

storiesOf('module/Add', module).add('Summary', () => (
  <Container style={{ width: '300px', height: '300px' }}>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Add title="Add a Photo" Svg={Camera} onClick={() => {}} />
      <Add title="Add a Box" Svg={Box} onClick={() => {}} />
    </div>
  </Container>
));
