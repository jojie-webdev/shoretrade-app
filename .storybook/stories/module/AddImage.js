import React, { useState } from 'react';

import { storiesOf } from '@storybook/react';

import AddImage from '../../../src/components/module/AddImage';
import Container from '../../components/Container';

const Component = () => {
  const [image, setImage] = useState(null);
  return (
    <AddImage
      image={image}
      onSelectImage={setImage}
      onRemoveImage={() => setImage(null)}
    />
  );
};

storiesOf('module/AddImage', module).add('Summary', () => (
  <Container>
    <Component />
  </Container>
));
