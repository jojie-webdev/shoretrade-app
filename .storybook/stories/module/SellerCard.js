import React from 'react';

import { storiesOf } from '@storybook/react';

import SellerCard from '../../../src/components/module/SellerCard';
import mockImage from '../../../src/res/images/seller-profile-default.png';
import Container from '../../components/Container';

storiesOf('module/SellerCard', module).add('Summary', () => (
  <Container style={{ width: '250px' }}>
    <SellerCard companyImage={mockImage} companyName="Mock Company Name" />
  </Container>
));
