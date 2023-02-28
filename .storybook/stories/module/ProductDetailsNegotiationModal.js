import React from 'react';

import { storiesOf } from '@storybook/react';

import ProductDetailsNegotiationModal from '../../../src/components/module/ProductDetailsNegotiationModal';
import Container from '../../components/Container';

storiesOf('module/ProductDetailsNegotiationModal', module).add('Summary', () => (
  <Container>
    <ProductDetailsNegotiationModal />
  </Container>
));
