import React from 'react';

// import { useTheme } from 'utils/Theme';
import Typography from 'components/base/Typography';

import { SliderProps } from './Slider.props';
import {
  Container,
  StyledThumb,
  StyledSlider,
  StyledTrack,
  Dot,
  ValueContainer,
} from './Slider.style';

const Slider = (props: SliderProps): JSX.Element => {
  // const theme = useTheme();
  const {
    value,
    onChange,
    min,
    max,
    maskValue = (v: number) => v,
    onAfterChange,
  } = props;

  const Track = (
    props: any,
    state: {
      index: number;
      value: number | number[];
    }
  ) => (
    <StyledTrack
      {...props}
      index={state.index}
      single={typeof value !== 'object'}
    />
  );
  const Thumb = (
    props: any,
    state: {
      index: number;
      value: number | number[];
      valueNow: number;
    }
  ) => (
    <StyledThumb {...props}>
      <Dot />
    </StyledThumb>
  );
  return (
    <Container>
      <ValueContainer>
        <Typography variant="caption" color="shade9">
          {maskValue(typeof value === 'object' ? value[0] : value)}
        </Typography>
        {typeof value === 'object' && value[1] !== undefined && (
          <Typography variant="caption" color="shade9">
            {maskValue(value[1])}
          </Typography>
        )}
      </ValueContainer>
      <StyledSlider
        value={value}
        onChange={onChange}
        renderTrack={Track}
        renderThumb={Thumb}
        min={min}
        max={max}
        onAfterChange={onAfterChange}
      />
    </Container>
  );
};

export default React.memo(Slider);
