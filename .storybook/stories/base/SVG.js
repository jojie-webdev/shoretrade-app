import React, { useState } from 'react';

import { storiesOf } from '@storybook/react';

import {
  /* PLOP_INJECT_IMPORT */
  Check,
  Help,
  Crab,
  Calendar,
  ArrowRight,
  ArrowLeft,
  Lock,
  Spin,
  DropdownArrow,
  Pen,
  Exit,
  ShoretradeLogo,
  Dashboard,
  AddBorder,
  Cart,
  CheckBorder,
  Account,
  FileCheck,
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
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100vw',
      }}
    >
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
        marginBottom: 16,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      {children}
      <div style={{ marginTop: '8px', marginBottom: 16 }}>{label}</div>
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
    <Container background="#fff">
      <Content>
        {/* PLOP_INJECT_INSTANCE*/}
        <Wrapper label="Check">
          <Check width={30} height={30} />
        </Wrapper>
        <Wrapper label="Help">
          <Help width={30} height={30} />
        </Wrapper>
        <Wrapper label="Crab">
          <Crab width={30} height={30} />
        </Wrapper>
        <Wrapper label="Calendar">
          <Calendar width={30} height={30} />
        </Wrapper>
        <Wrapper label="ArrowRight">
          <ArrowRight width={30} height={30} />
        </Wrapper>
        <Wrapper label="ArrowLeft">
          <ArrowLeft width={30} height={30} />
        </Wrapper>
        <Wrapper label="Lock">
          <Lock width={30} height={30} fill="#000" />
        </Wrapper>
        <Wrapper label="Spin">
          <Spin width={30} height={30} />
        </Wrapper>
        <Wrapper label="DropdownArrow">
          <DropdownArrow width={30} height={30} />
        </Wrapper>
        <Wrapper label="Pen">
          <Pen width={30} height={30} />
        </Wrapper>
        <Wrapper label="Exit">
          <Exit width={30} height={30} fill="black" />
        </Wrapper>
        <Wrapper label="ShoretradeLogo">
          <ShoretradeLogo width={30} height={30} />
        </Wrapper>
        <Wrapper label="Dashboard">
          <Dashboard width={30} height={30} fill="black" />
        </Wrapper>
        <Wrapper label="AddBorder">
          <AddBorder width={30} height={30} fill="black" />
        </Wrapper>
        <Wrapper label="Cart">
          <Cart width={30} height={30} fill="black" />
        </Wrapper>
        <Wrapper label="CheckBorder">
          <CheckBorder width={30} height={30} fill="black" />
        </Wrapper>
        <Wrapper label="Account">
          <Account width={30} height={30} fill="black" />
        </Wrapper>
        <Wrapper label="FileCheck">
          <FileCheck width={30} height={30} fill="black" />
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
