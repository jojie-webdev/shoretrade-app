import React from 'react';

import { storiesOf } from '@storybook/react';

import Typography from '../../../src/components/base/Typography';
import Container from '../../components/Container';

storiesOf('base/Typography', module).add('Summary', () => (
  <Container background="white">
    <Typography variant="title1">title1</Typography>
    <Typography variant="title2">title2</Typography>
    <Typography variant="title3">title3</Typography>
    <Typography variant="title4">title4</Typography>
    <Typography variant="title5">title5</Typography>
    <Typography variant="body">body</Typography>
    <Typography variant="label">label</Typography>
    <Typography variant="caption">caption</Typography>
    <Typography variant="small">small</Typography>
    <Typography variant="overline">overline</Typography>
  </Container>
));
