import React, { useState } from 'react';

import { storiesOf } from '@storybook/react';

import SegmentedControls from '../../../src/components/base/SegmentedControls';
import Container from '../../components/Container';

const MOCK_OPTIONS = ['Label 1', 'Label 2', 'Label 3', 'Label 4'];

storiesOf('base/SegmentedControls', module).add('Summary', () => {
  function AddState({ children, ...props }: any) {
    const [state, setState] = useState('Label 1');
    return <div>{children(state, setState)}</div>;
  }

  return (
    <Container>
      <AddState>
        {(state, setState) => (
          <SegmentedControls
            options={MOCK_OPTIONS}
            selectedOption={state}
            onClickControl={(value) => {
              console.log(value);
              setState(value);
            }}
          />
        )}
      </AddState>
    </Container>
  );
});
