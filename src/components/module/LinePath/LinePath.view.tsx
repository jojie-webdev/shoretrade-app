import React from 'react';

import { LinePathProps } from 'components/module/LinePath/LinePath.props';
import { scaleTime, scaleLinear } from 'd3-scale';
import * as shape from 'd3-shape';
import moment from 'moment';
import { useTheme } from 'utils/Theme';

import { Container } from './LinePath.style';

interface Points {
  date: number;
  value: number;
}

const LinePath = (props: LinePathProps): JSX.Element => {
  const theme = useTheme();

  const {
    data,
    cHeight,
    cWidth,
    height,
    width,
    stroke = 'success',
    strokeWidth = 2,
    cStyle,
  } = props;

  const graphData = data.dates.map((d, i) => ({
    date: moment(d).toDate().getTime(),
    value: data.values[i],
  }));

  const xDomain = (domain: number[]) => [
    Math.min(...domain),
    Math.max(...domain),
  ];

  const yDomain = (domain: number[]) => [0, Math.max(...domain)];

  const scaleX = scaleTime()
    .domain(xDomain(graphData.map((d) => d.date)))
    .range([0, width]);
  const scaleY = scaleLinear()
    .domain(yDomain(graphData.map((d) => d.value)))
    .range([height, 0]);

  const d = shape
    .line<Points>()
    .x((p) => scaleX(p.date))
    .y((p) => scaleY(p.value))
    .curve(shape.curveBasis)(graphData) as string;

  return (
    <Container cHeight={cHeight} cWidth={cWidth} style={cStyle}>
      <svg
        style={{
          width: '100%',
          maxWidth: width,
          height: height,
        }}
      >
        <path
          fill="transparent"
          stroke={theme.brand[stroke]}
          {...{ d, strokeWidth }}
        />
      </svg>
    </Container>
  );
};

export default React.memo(LinePath);
