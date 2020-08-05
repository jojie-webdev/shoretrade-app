import React, { useState } from 'react';

import { storiesOf } from '@storybook/react';

import {
  /* PLOP_INJECT_IMPORT */
  DropdownArrow,
  Pen,
  ChevronRight,
  ChevronLeft,
  Search,
  CheckFilled,
  CloseFilled,
  ExclamationFilled,
  QuestionFilled,
  InfoFilled,
  Close,
  Eye,
  EyeOff,
} from '../../../src/components/base/SVG';
import Container from '../../components/Container';

// eslint-disable-next-line react/prop-types
const Content = ({ children }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' }}>
      {children}
    </div>
  );
};

// eslint-disable-next-line react/prop-types
const Wrapper = ({ children, label }) => {
  return (
    <div
      style={{
        marginLeft: 16,
        marginTop: 16,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      {children}
      <div style={{ marginTop: '8px' }}>{label}</div>
    </div>
  );
};

storiesOf('base/SVG', module).add('Summary', () => {
  const [text, setText] = useState('');
  // eslint-disable-next-line react/prop-types
  const Wrapper = ({ children, label }) => {
    return (
      <div
        style={{
          marginLeft: 16,
          marginTop: 16,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        {children}
        <div style={{ marginTop: '8px' }}>{label}</div>
      </div>
    );
  };

  return (
    <Container>
      <Content>
        {/* PLOP_INJECT_INSTANCE*/}
        <Wrapper label="DropdownArrow">
          <DropdownArrow width={30} height={30} />
        </Wrapper>
        <Wrapper label="Pen">
          <Pen width={30} height={30} />
        </Wrapper>
        <Wrapper label="ChevronRight">
          <ChevronRight width={30} height={30} />
        </Wrapper>
        <Wrapper label="ChevronLeft">
          <ChevronLeft width={30} height={30} />
        </Wrapper>
        <Wrapper label="Search">
          <Search width={30} height={30} />
        </Wrapper>
        <Wrapper label="CheckFilled">
          <CheckFilled width={30} height={30} />
        </Wrapper>
        <Wrapper label="CloseFilled">
          <CloseFilled width={30} height={30} />
        </Wrapper>
        <Wrapper label="ExclamationFilled">
          <ExclamationFilled width={30} height={30} />
        </Wrapper>
        <Wrapper label="QuestionFilled">
          <QuestionFilled width={30} height={30} />
        </Wrapper>
        <Wrapper label="InfoFilled">
          <InfoFilled width={30} height={30} />
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
