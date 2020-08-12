import React from 'react';

import Button from 'components/base/Button';
import TextField from 'components/base/TextField';

import { Step1Props } from './Step1.props';
import { Container } from './Step1.style';

const Step1 = ({ onClickNext }: Step1Props) => {
  return (
    <Container>
      <TextField label="Choose Account" style={{ width: '100%' }} />
      <div className="btn-container">
        <Button text="Add a new product" onClick={onClickNext} />
      </div>
    </Container>
  );
};

export default Step1;
