import React from 'react';

// import { useTheme } from 'utils/Theme';
import { SegmentedControlsProps } from './SegmentedControls.props';
import { Container, ControlButton } from './SegmentedControls.style';

const SegmentedControls = (props: SegmentedControlsProps): JSX.Element => {
  // const theme = useTheme();

  const { options, selectedOption, onClickControl } = props;

  return (
    <Container>
      {options.map((option) => (
        <ControlButton
          key={option}
          active={option === selectedOption}
          onClick={() => onClickControl(option)}
        >
          {option}
        </ControlButton>
      ))}
    </Container>
  );
};

export default React.memo(SegmentedControls);
