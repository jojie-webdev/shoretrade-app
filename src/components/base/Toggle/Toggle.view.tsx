import React from 'react';

// import { useTheme } from 'utils/Theme';
import { ToggleProps } from './Toggle.props';
import {
  Container,
  HiddenCheckbox,
  InnerCheck,
  InnerCircle,
  InnerContainer,
} from './Toggle.style';

const Toggle = (props: ToggleProps): JSX.Element => {
  // const theme = useTheme();
  const { checked } = props;
  return (
    <Container onClick={props.onClick}>
      <InnerContainer checked={checked}>
        <HiddenCheckbox
          onChange={(event) => event.stopPropagation()}
          type="checkbox"
          {...props}
        />
        <InnerCheck scale={1} />
        <InnerCircle checked={checked} scale={1} />
      </InnerContainer>
    </Container>
  );
};

export default React.memo(Toggle);
