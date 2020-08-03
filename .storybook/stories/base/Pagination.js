import React, { useState } from 'react';

import styled from '@emotion/styled';
import { storiesOf } from '@storybook/react';

import Pagination from '../../../src/components/base/Pagination';
import Container from '../../components/Container';

const InputContainer = styled.div`
  display: flex;
  align-items: center;

  h5 {
    margin-right: 8px;
  }
`;

storiesOf('base/Pagination', module).add('Summary', () => {
  const [currentValue, setCurrentValue] = useState(1);

  return (
    <Container>
      <h5>Current Page Value {currentValue}</h5>

      <h5>Numbers</h5>
      <Pagination
        numPages={5}
        currentValue={currentValue}
        onClickButton={(nextValue) => setCurrentValue(nextValue)}
      />
    </Container>
  );
});
