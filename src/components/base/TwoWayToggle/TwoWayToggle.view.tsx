import React from 'react';

import { TwoWayToggleProps } from './TwoWayToggle.props';
import {
  Container,
  HiddenCheckbox,
  InnerCheck,
  InnerCircle,
  InnerContainer,
} from './TwoWayToggle.style';

const TwoWayToggle = (props: TwoWayToggleProps): JSX.Element => {
  const { checked } = props;
  return (
    <Container onClick={props.onClick}>
      <InnerContainer>
        <HiddenCheckbox
          onChange={(event) => event.stopPropagation()}
          type="checkbox"
          {...props}
        />
        <InnerCheck checked={checked} scale={1} />
        <InnerCircle checked={checked} scale={1} />
      </InnerContainer>
    </Container>
  );
};

export default React.memo(TwoWayToggle);
