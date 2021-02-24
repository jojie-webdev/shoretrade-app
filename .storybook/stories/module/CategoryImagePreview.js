import React from 'react';

import { storiesOf } from '@storybook/react';

import CategoryImagePreview from '../../../src/components/module/CategoryImagePreview';
import Container from '../../components/Container';

storiesOf('module/CategoryImagePreview', module).add('Summary', () => (
  <Container appType="buyer">
    <CategoryImagePreview
      categoryName="Sample Category"
      caption="Nulla occaecat commodo cillum laborum ullamco amet adipisicing consequat officia magna. Quis in exercitation Lorem minim. "
      imgSrc="https://picsum.photos/id/995/500/500.jpg"
    />
  </Container>
));
