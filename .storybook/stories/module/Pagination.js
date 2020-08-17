import React, { useState } from 'react';

import styled from '@emotion/styled';
import { storiesOf } from '@storybook/react';

import Pagination from '../../../src/components/module/Pagination';
import Container from '../../components/Container';

const EditPropsContainer = styled.div`
  display: flex;
  align-items: center;

  h5 {
    margin-right: 8px;
  }
`;

const Content = () => {
  const [numPages, setNumPages] = useState(5);
  const [currentValue, setCurrentValue] = useState(1);

  return (
    <>
      <h5>Current Page Value {currentValue}</h5>

      <EditPropsContainer>
        <h5>Set max pages</h5>
        <input
          type="text"
          value={numPages}
          onChange={(e) => setNumPages(+e.target.value)}
        />
      </EditPropsContainer>

      <h5>Numbers</h5>
      <Pagination
        numPages={numPages}
        currentValue={currentValue}
        onClickButton={(nextValue) => setCurrentValue(nextValue)}
      />

      <h5>Dots</h5>
      <Pagination
        variant="dots"
        numPages={numPages}
        currentValue={currentValue}
        onClickButton={(nextValue) => setCurrentValue(nextValue)}
      />

      <h5>Infinite Dots</h5>
      <Pagination
        variant="infinite-dots"
        numPages={numPages}
        currentValue={currentValue}
        onClickButton={(nextValue) => setCurrentValue(nextValue)}
      />
    </>
  );
};

storiesOf('module/Pagination', module).add('Buyer', () => {
  const [numPages, setNumPages] = useState(5);
  const [currentValue, setCurrentValue] = useState(1);

  return (
    <Container background="white" appType="buyer">
      <Content />
    </Container>
  );
});

storiesOf('module/Pagination', module).add('Seller', () => {
  const [numPages, setNumPages] = useState(5);
  const [currentValue, setCurrentValue] = useState(1);

  return (
    <Container background="#111E2B" appType="seller">
      <Content />
    </Container>
  );
});
