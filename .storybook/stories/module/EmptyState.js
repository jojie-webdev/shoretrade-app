import React from 'react';

import styled from '@emotion/styled';
import { storiesOf } from '@storybook/react';

import { Crab } from '../../../src/components/base/SVG';
import EmptyState from '../../../src/components/module/EmptyState';
import Container from '../../components/Container';

const MainContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
`;

const SellerContainer = styled.div`
  flex: 1;
  background: #111e2b;
  height: 100%;
`;

const BuyerContainer = styled.div`
  flex: 1;
  background: #edeffa;
  height: 100%;
`;

const EMPTY_STATE_PROPS = {
  title: 'The are no listings here at the moment',
  buttonText: 'Add a product',
  Svg: Crab,
  onButtonClicked: () => {},
};

storiesOf('module/EmptyState', module).add('Summary', () => (
  <MainContainer>
    <SellerContainer>
      <Container appType="seller">
        <EmptyState {...EMPTY_STATE_PROPS} />
      </Container>
    </SellerContainer>
    <BuyerContainer>
      <Container appType="buyer">
        <EmptyState {...EMPTY_STATE_PROPS} />
      </Container>
    </BuyerContainer>
  </MainContainer>
));
