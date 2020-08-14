import React from 'react';

import Button from 'components/base/Button';
import Interaction from 'components/base/Interactions';

import { Step3Props } from './Step3.props';
import { Container } from './Step3.style';

function Step3({ onClickNext }: Step3Props) {
  return (
    <Container>
      <div className="interactions">
        <div className="interaction-container">
          <Interaction type="radio" value="Frozen" onClick={() => {}} />
        </div>
        <div className="interaction-container">
          <Interaction type="radio" value="Fresh" onClick={() => {}} />
        </div>
      </div>

      <div className="btn-container">
        <Button text="Next" variant="disabled" onClick={onClickNext} />
      </div>
    </Container>
  );
}

export default Step3;
