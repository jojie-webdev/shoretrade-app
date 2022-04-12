import React from 'react';

import Radio from 'components/base/Radio';

// import { useTheme } from 'utils/Theme';
import { RadioButtonProps } from './RadioButton.props';
import { Container } from './RadioButton.style';

const RadioButton = (props: RadioButtonProps): JSX.Element => {
  // const theme = useTheme();
  return (
    <Container {...props}>
      <Radio checked={props.selected} />
      <span className="label">{props.label}</span>
    </Container>
  );
};

export default React.memo(RadioButton);
