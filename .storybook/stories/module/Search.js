import React, { useState } from 'react';

import styled from '@emotion/styled';
import { storiesOf } from '@storybook/react';

import Search from '../../../src/components/module/Search';
import Container from '../../components/Container';

const Wrapper = styled.div`
  width: 400px;
`;

storiesOf('module/Search', module).add('Summary', () => {
  const [value, setValue] = useState('');

  return (
    <>
      <Container background="white" appType="buyer">
        <Wrapper>
          <Search
            value={value}
            onChange={(e) => setValue(e.target.value)}
            resetValue={() => setValue('')}
            placeholder="Custom Placeholder!"
            isSellerProduct
          />
        </Wrapper>

        {/* Verify value is being passed correctly */}
        <h5>Value: {value}</h5>
      </Container>
      <Container background="white" appType="buyer">
        <Wrapper>
          <Search
            value={value}
            onChange={(e) => setValue(e.target.value)}
            resetValue={() => setValue('')}
            placeholder="Custom Placeholder!"
          />
        </Wrapper>

        {/* Verify value is being passed correctly */}
        <h5>Value: {value}</h5>
      </Container>
      <Container background="white">
        <Wrapper>
          <Search
            value={value}
            onChange={(e) => setValue(e.target.value)}
            resetValue={() => setValue('')}
            placeholder="Custom Placeholder!"
          />
        </Wrapper>

        {/* Verify value is being passed correctly */}
        <h5>Value: {value}</h5>
      </Container>
    </>
  );
});
