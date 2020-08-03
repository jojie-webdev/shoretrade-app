import React from 'react';

import { storiesOf } from '@storybook/react';

import { Close } from '../../../src/components/base/SVG';
import Touchable from '../../../src/components/base/Touchable';
import Typography from '../../../src/components/base/Typography';
import Container from '../../components/Container';

// eslint-disable-next-line react/prop-types
const Wrapper = ({ dark = false, children }) => {
  return (
    <div
      style={{
        display: 'flex',
        marginTop: 18,
        backgroundColor: dark ? '#000' : '#fff',
      }}
    >
      {children}
    </div>
  );
};

storiesOf('base/Touchable', module).add('Summary', () => (
  <Container>
    <Wrapper>
      <Touchable
        circle
        width={32}
        onPress={() => console.log('TOUCHABLE_ACTION')}
      >
        <Close />
      </Touchable>
    </Wrapper>
    <Wrapper>
      <Touchable onPress={() => console.log('TOUCHABLE_ACTION')}>
        <Typography>Light Text</Typography>
      </Touchable>
    </Wrapper>
    <Wrapper dark>
      <Touchable dark onPress={() => console.log('TOUCHABLE_ACTION')}>
        <Typography color="noshade">Dark Text</Typography>
      </Touchable>
    </Wrapper>
  </Container>
));
