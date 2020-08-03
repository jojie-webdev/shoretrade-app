import React, { useState } from 'react';

import { storiesOf } from '@storybook/react';

import {
  /* PLOP_INJECT_IMPORT */
  ChevronRight,
  ChevronLeft,
  Close,
  Eye,
  EyeOff,
} from '../../../src/components/base/SVG';
import Container from '../../components/Container';

storiesOf('base/SVG', module).add('Summary', () => {
  const [text, setText] = useState('');

  // eslint-disable-next-line react/prop-types
  const Content = ({ children }) => {
    return (
      <div
        style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' }}
      >
        {children}
      </div>
    );
  };

  // eslint-disable-next-line react/prop-types
  const Wrapper = ({ children, label }) => {
    return (
      <div style={{ marginLeft: 16, marginTop: 16 }}>
        {children}
        <div>{label}</div>
      </div>
    );
  };

  return (
    <Container>
      <Content>
        {/* PLOP_INJECT_INSTANCE*/}
        <Wrapper label="ChevronRight">
          <ChevronRight width={30} height={30} />
        </Wrapper>
        <Wrapper label="ChevronLeft">
          <ChevronLeft width={30} height={30} />
        </Wrapper>
        <Wrapper label="Close">
          <Close width={30} height={30} />
        </Wrapper>
        <Wrapper label="Eye">
          <Eye width={30} height={30} />
        </Wrapper>
        <Wrapper label="EyeOff">
          <EyeOff width={30} height={30} />
        </Wrapper>
      </Content>
    </Container>
  );
});
