import React from 'react';

import { storiesOf } from '@storybook/react';

import Accordion from '../../../src/components/base/Accordion';
import Typography from '../../../src/components/base/Typography/Typography.view';
import Container from '../../components/Container';

storiesOf('base/Accordion', module).add('Summary', () => (
  <Container>
    <Accordion isOpen={false} title="Accordion">
      <Typography variant="body">
        Joining and adding listings on ShoreTrade is free. We only charge a
        transaction fee per sale. Once an item sells, there is a transaction fee
        on the sale price (excluding the shipping price).
      </Typography>
    </Accordion>
  </Container>
));
