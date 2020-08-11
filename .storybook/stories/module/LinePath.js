import React from 'react';

import { storiesOf } from '@storybook/react';

import LinePath from '../../../src/components/module/LinePath';
import Container from '../../components/Container';

const data = {
  dates: [
    '2019-06-23',
    '2019-06-26',
    '2019-06-30',
    '2019-07-05',
    '2019-07-08',
    '2019-07-14',
    '2019-07-21',
    '2019-07-22',
    '2019-07-27',
  ],
  values: [
    3773.7,
    6081.6,
    10806.6,
    11331.6,
    11856.6,
    13041,
    13645.8,
    14231.7,
    15416.1,
  ],
};

storiesOf('module/LinePath', module).add('Summary', () => (
  <Container background="white">
    <LinePath data={data} width={500} height={500} />
  </Container>
));
