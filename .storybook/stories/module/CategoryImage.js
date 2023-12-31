import React from 'react';

import { storiesOf } from '@storybook/react';

import CategoryImage from '../../../src/components/module/CategoryImage';
import Container from '../../components/Container';

// eslint-disable-next-line react/prop-types
const Wrapper = ({ children }) => <div style={{ margin: 20 }}>{children}</div>;

storiesOf('module/CategoryImage', module).add('Summary', () => (
  <Container background="white">
    <div style={{ display: 'flex', width: 1000, flexWrap: 'wrap' }}>
      <Wrapper>
        <CategoryImage id="8123E9D4-9A96-4398-9A7B-2F169E99690E" circled />
      </Wrapper>
      <Wrapper>
        <CategoryImage id="BD1EA44F-63E9-44E8-8BD6-5213BE85DA7C" circled />
      </Wrapper>
      <Wrapper>
        <CategoryImage id="48B46427-82D3-434C-AFC4-492000FFD5C2" circled />
      </Wrapper>
      <Wrapper>
        <CategoryImage id="3AE0F9A5-15C2-4EFE-9A75-1956762019A9" circled />
      </Wrapper>
      <Wrapper>
        <CategoryImage id="A13DA4C1-C103-4390-81F6-3ACB0BDC9FDB" circled />
      </Wrapper>
      <Wrapper>
        <CategoryImage id="53A435E4-5355-4949-81A5-1C94DEE95317" circled />
      </Wrapper>
      <Wrapper>
        <CategoryImage id="E6E7DCAB-126F-4E22-B1ED-681D086C6B31" circled />
      </Wrapper>
      <Wrapper>
        <CategoryImage id="B920A5A8-EF5D-4BF9-95A0-0FECC19BFB2F" circled />
      </Wrapper>
      <Wrapper>
        <CategoryImage id="C07B5FFD-E668-4DF3-B9FC-462F414D4E46" circled />
      </Wrapper>
      <Wrapper>
        <CategoryImage id="A6DFB3C8-7F9B-4CF4-B436-5B0E84872024" circled />
      </Wrapper>
      <Wrapper>
        <CategoryImage id="F9679552-7B86-4911-8EB7-FACEAB4D7BAE" circled />
      </Wrapper>
      <Wrapper>
        <CategoryImage id="08714EE7-AAE7-43FD-B692-996A5C06B433" circled />
      </Wrapper>
      <Wrapper>
        <CategoryImage id="964087D2-3F9E-46DC-A446-1BDAE606601E" circled />
      </Wrapper>
      <Wrapper>
        <CategoryImage id="3C984EEA-3040-4E88-8686-5019C7455698" circled />
      </Wrapper>
      <Wrapper>
        <CategoryImage id="3A6714A2-6D6F-4BEF-8FDA-8E4D70289CA1" circled />
      </Wrapper>
      <Wrapper>
        <CategoryImage id="3B44272B-E8FC-42DE-B797-0B7DD5AA81D2" circled />
      </Wrapper>
      <Wrapper>
        <CategoryImage id="50645A22-5018-4C6D-A3B8-1B789CC2EEC8" circled />
      </Wrapper>
    </div>
  </Container>
));
