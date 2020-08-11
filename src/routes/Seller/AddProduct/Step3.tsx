import React from 'react';

import Button from 'components/base/Button';
import Interaction from 'components/base/Interactions';
import { Row } from 'react-grid-system';

import { Step3Wrapper } from './AddProduct.style';

function Step3() {
  return (
    <Step3Wrapper>
      <div className="interactions">
        <div className="interaction-container">
          <Interaction type="radio" value="Frozen" onClick={() => {}} />
        </div>
        <div className="interaction-container">
          <Interaction type="radio" value="Fresh" onClick={() => {}} />
        </div>
      </div>

      <div className="btn-container">
        <Button text="Next" variant="disabled" />
      </div>
    </Step3Wrapper>
  );
}

export default Step3;
