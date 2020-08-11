import React from 'react';

import Button from 'components/base/Button';
import TextField from 'components/base/TextField';

import { Step1Wrapper } from './AddProduct.style';

const Step1 = () => {
  return (
    <Step1Wrapper>
      <TextField label="Choose Account" style={{ width: '100%' }} />
      <div className="btn-container">
        <Button text="Add a new product" />
      </div>
    </Step1Wrapper>
  );
};

export default Step1;
