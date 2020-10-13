import React, { useState } from 'react';

import styled from '@emotion/styled';
import { storiesOf } from '@storybook/react';

import SearchAddress from '../../../src/components/module/SearchAddress';
import Container from '../../components/Container';

const Wrapper = styled.div`
  width: 400px;
`;
storiesOf('module/SearchAddress', module).add('Summary', () => {
  const [value, setValue] = useState('');
  <Container background="white">
    <Wrapper>
      <SearchAddress
        value={value}
        onChange={(e) => setValue(e.target.value)}
        resetValue={() => setValue('')}
        placeholder="Custom Placeholder!"
      />
    </Wrapper>

    {/* Verify value is being passed correctly */}
    <h5>Value: {value}</h5>
  </Container>;
});
