import React, { useState } from 'react';

import { storiesOf } from '@storybook/react';

import Interactions from '../../../src/components/base/Interactions';
import Container from '../../components/Container';

// eslint-disable-next-line react/prop-types
const Wrapper = ({ children }) => {
  return (
    <div
      style={{
        marginBottom: 40,
      }}
    >
      {children}
    </div>
  );
};

storiesOf('base/Interactions', module).add('Summary', () => (
  <Container background="white" appType="buyer">
    <Wrapper>
      <Interactions label="Next " value="Some Value" resultCount="3" />
    </Wrapper>
    <Wrapper>
      <Interactions label="Accordion" value="Some Value" type="accordion" />
    </Wrapper>
    <Wrapper>
      <Interactions label="Edit" value="Some Value" type="edit" />
    </Wrapper>
    <Wrapper>
      <Interactions label="Radio" value="Some Value" type="radio" />
    </Wrapper>
    <Wrapper>
      <Interactions label="Checkbox" value="Some Value" type="checkbox" />
    </Wrapper>
  </Container>
));
