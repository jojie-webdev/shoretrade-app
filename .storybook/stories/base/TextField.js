import React, { useState } from 'react';

import { storiesOf } from '@storybook/react';

import { DollarSign } from '../../../src/components/base/SVG';
import TextField from '../../../src/components/base/TextField';
import Typography from '../../../src/components/base/Typography';
import Container from '../../components/Container';
// eslint-disable-next-line react/prop-types
const Wrapper = ({ children }) => {
  const [email, setEmail] = useState('');
  return (
    <div
      style={{
        display: 'flex',
        marginTop: 16,
        flexDirection: 'column',
        width: 300,
      }}
    >
      {children}
    </div>
  );
};

storiesOf('base/TextField', module).add('Summary', () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [minimumOrder, setMinimumOrder] = useState('');
  const [price, setPrice] = useState('');

  return (
    <Container background="white">
      <Wrapper>
        <TextField
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="user@nomail.com"
          error="Please enter your email"
        />
      </Wrapper>

      <Wrapper>
        <TextField
          label="Password"
          value={password}
          onChangeText={setPassword}
          secured
          placeholder="******"
        />
      </Wrapper>

      <Wrapper>
        <TextField
          label="Minimum Order"
          value={minimumOrder}
          onChangeText={setMinimumOrder}
          placeholder="0"
          LeftComponent={
            <Typography variant="label" color="shade6">
              kg
            </Typography>
          }
        />
      </Wrapper>

      <Wrapper>
        <TextField
          label="Price (Excluding Freight)"
          value={price}
          onChangeText={setPrice}
          placeholder="0"
          LeftComponent={<DollarSign height={15} width={15} />}
        />
      </Wrapper>
    </Container>
  );
});
