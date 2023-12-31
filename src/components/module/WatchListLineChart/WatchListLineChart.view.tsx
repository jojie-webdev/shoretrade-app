import React, { useRef, useState } from 'react';

import Divider from 'components/base/Divider';
import Typography from 'components/base/Typography';
import * as array from 'd3-array';
import * as d3Scale from 'd3-scale';
import * as shape from 'd3-shape';
import moment from 'moment';
import numeral from 'numeral';
import { useTheme } from 'utils/Theme';
import useResize from 'utils/useResize';

import { WatchListLineChartProps } from './WatchListLineChart.props';
import {
  Container,
  RangeList,
  RangeListContainer,
  StyledDivider,
  Title,
  TitleContainer,
  TopContainer,
  XAxisContainer,
  YAxisContainer,
} from './WatchListLineChart.style';

const WatchListLineChartView = (props: any) => {
  const componentRef = useRef(null);
  const { width, height } = useResize(componentRef);

  const {
    data,
    xAccessor,
    yAccessor,
    yScale = d3Scale.scaleLinear,
    xScale = d3Scale.scaleLinear,
    style,
    numberOfTicks,
    contentInset: { top = 0, bottom = 0, left = 0, right = 0 },
    gridMax,
    gridMin,
    clampX,
    clampY,
    svg,
    children,
  } = props;

  const createPaths = ({ data, x, y }: any) => {
    const { curve } = props;

    const line = shape
      .line()
      .x((d: any) => x(d.x))
      .y((d: any) => y(d.y))
      .defined((item: any) => typeof item.y === 'number')
      .curve(curve)(data);

    return {
      path: line,
      line,
    };
  };

  if (data.length === 0) {
    return <div style={style} />;
  }

  const mappedData = data.map((item: any, index: any) => ({
    y: yAccessor({ item, index }),
    x: xAccessor({ item, index }),
  }));

  const yValues = mappedData.map((item: any) => item.y);
  const xValues = mappedData.map((item: any) => item.x);

  const yExtent = array.extent([...yValues, gridMin, gridMax]);
  const xExtent = array.extent([...xValues]);

  const {
    yMin = yExtent[0],
    yMax = yExtent[1],
    xMin = xExtent[0],
    xMax = xExtent[1],
  } = props;

  //invert range to support svg coordinate system
  const y = yScale()
    .domain([yMin, yMax])
    .range([height - bottom, top])
    .clamp(clampY);

  const x = xScale()
    .domain([xMin, xMax])
    .range([left, width - right])
    .clamp(clampX);

  const paths = createPaths({
    data: mappedData,
    x,
    y,
  });

  const ticks = y.ticks(numberOfTicks);

  const extraProps = {
    x,
    y,
    data,
    ticks,
    width,
    height,
    ...paths,
  };

  return (
    <div style={style} ref={componentRef}>
      <div style={{ flex: 1 }}>
        {height > 0 && width > 0 && (
          <svg
            style={{
              width: '100%',
              height: height,
              maxWidth: width,
              overflow: 'visible',
            }}
          >
            {React.Children.map(children, (child) => {
              if (child && child.props.belowChart) {
                return React.cloneElement(child, extraProps);
              }
              return null;
            })}
            <path fill={'none'} {...svg} d={paths.path} />
            {React.Children.map(children, (child) => {
              if (child && !child.props.belowChart) {
                return React.cloneElement(child, extraProps);
              }
              return null;
            })}
          </svg>
        )}
      </div>
    </div>
  );
};

const Tooltip = (props: any) => {
  const theme = useTheme();
  const { data = [], x, y, svg } = props;
  const [shown, setShown] = useState(-1);

  return data.map((value: any, index: any) => (
    <g style={{ zIndex: 999999 }} key={index}>
      {shown === index && (
        <svg
          style={{ zIndex: 999999 }}
          x={x(value.date) - 50}
          y={y(value.value) - 56}
        >
          <rect
            width="96px"
            height="40px"
            rx="4"
            ry="4"
            style={{
              fill: theme.grey.noshade,
              stroke: theme.grey.noshade,
              strokeWidth: 1,
            }}
          />
          <text
            y={16}
            x={46}
            textAnchor="middle"
            fill={theme.grey.shade9}
            style={{ fontSize: 12 }}
          >
            {numeral(value.value).format('$0.0a')}
          </text>
          <text
            y={32}
            x={48}
            textAnchor="middle"
            fill={theme.grey.shade6}
            style={{ fontSize: 10 }}
          >
            {moment(value.date).format('MMMM D h:MM A')}
          </text>
        </svg>
      )}
      <rect
        width="10px"
        height="40px"
        x={x(value.date) - 5}
        y={y(value.value) - 30}
        fill="transparent"
        onMouseEnter={() => setShown(index)}
        onMouseLeave={() => setShown(-1)}
      />
      <circle
        cx={x(value.date)}
        cy={y(value.value)}
        style={{
          stroke: theme.grey.shade9,
        }}
        {...svg}
        r={shown === index ? 5 : props.r}
        onMouseEnter={() => setShown(index)}
        onMouseLeave={() => setShown(-1)}
      />
    </g>
  ));
};

const Grid = (props: any) => {
  const { ticks = [], y, svg } = props;

  return (
    <g>
      {ticks.map((tick: any) => (
        <line
          key={tick}
          x1={'0%'}
          x2={'100%'}
          y1={y(tick)}
          y2={y(tick)}
          strokeWidth={1}
          stroke={'rgba(0,0,0,0.2)'}
          {...svg}
        />
      ))}
    </g>
  );
};

const YAxis = (props: any) => {
  const componentRef = useRef(null);
  const { width, height } = useResize(componentRef);

  const {
    style,
    data,
    scale = d3Scale.scaleLinear,
    yAccessor,
    numberOfTicks,
    formatLabel,
    svg,
    children,
    contentInset = { top: 0, bottom: 0 },
  } = props;

  const getY = (domain: any) => {
    const {
      scale = d3Scale.scaleLinear,
      spacingInner,
      spacingOuter,
      contentInset: { top = 0, bottom = 0 },
    } = props;

    const y = scale()
      .domain(domain)
      .range([height - bottom, top]);

    if (scale === d3Scale.scaleBand) {
      // use index as domain identifier instead of value since
      // same value can occur at several places in dataPoints
      y
        // set range top to bottom - we are not sorting on values in scaleBand
        .range([top, height - bottom])
        .paddingInner([spacingInner])
        .paddingOuter([spacingOuter]);

      //add half a bar to center label
      return (value: any) => y(value) + y.bandwidth() / 2;
    }

    return y;
  };

  if (data.length === 0) {
    return <div style={style} />;
  }

  const values = data.map((item: any, index: any) =>
    yAccessor({ item, index })
  );

  const extent = array.extent(values);

  const { min = extent[0], max = extent[1] } = props;

  const domain = scale === d3Scale.scaleBand ? values : [min, max];

  //invert range to support svg coordinate system
  const y = getY(domain);

  const ticks = scale === d3Scale.scaleBand ? values : y.ticks(numberOfTicks);

  const longestValue = ticks
    .map((value: any, index: any) => formatLabel(value, index))
    .reduce(
      (prev: any, curr: any) =>
        prev.toString().length > curr.toString().length ? prev : curr,
      0
    );

  const extraProps = {
    y,
    ticks,
    width,
    height,
    formatLabel,
  };

  return (
    <div style={style} ref={componentRef}>
      <div style={{ flexGrow: 1 }}>
        {/*invisible text to allow for parent resizing*/}
        <Typography
          style={{
            opacity: 0,
            fontSize: svg.fontSize,
            fontFamily: svg.fontFamily,
            fontWeight: svg.fontWeight,
          }}
        >
          {longestValue}
        </Typography>
        {height > 0 && width > 0 && (
          <svg
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height,
              width,
            }}
          >
            <g>
              {React.Children.map(children, (child) => {
                return React.cloneElement(child, extraProps);
              })}
              {
                // don't render labels if width isn't measured yet,
                // causes rendering issues
                height > 0 &&
                  ticks.map((value: any, index: any) => {
                    return (
                      <text
                        transform={`translate(0, ${contentInset.top})`}
                        textAnchor={'middle'}
                        x={'50%'}
                        alignmentBaseline={'middle'}
                        {...svg}
                        key={y(value)}
                        y={y(value)}
                      >
                        {formatLabel(value, index, ticks.length)}
                      </text>
                    );
                  })
              }
            </g>
          </svg>
        )}
      </div>
    </div>
  );
};

const XAxis = (props: any) => {
  const componentRef = useRef(null);
  const { width, height } = useResize(componentRef);

  const {
    style,
    scale = d3Scale.scaleLinear,
    data,
    xAccessor,
    formatLabel,
    numberOfTicks,
    svg,
    children,
    min,
    max,
    contentInset = { left: 0, right: 0 },
  } = props;

  const getX = (domain: any) => {
    const {
      scale = d3Scale.scaleLinear,
      spacingInner,
      spacingOuter,
      contentInset: { left = 0, right = 0 },
    } = props;

    const x = scale()
      .domain(domain)
      .range([left, width - right]);

    if (scale === d3Scale.scaleBand) {
      x.paddingInner([spacingInner]).paddingOuter([spacingOuter]);

      //add half a bar to center label
      return (value: any) => x(value) + x.bandwidth() / 2;
    }

    return x;
  };

  if (data.length === 0) {
    return <div style={style} />;
  }

  const values = data.map((item: any, index: any) =>
    xAccessor({ item, index })
  );
  const extent = array.extent(values);
  const domain =
    scale === d3Scale.scaleBand ? values : [min || extent[0], max || extent[1]];

  const x = getX(domain);
  const ticks = numberOfTicks ? x.ticks(numberOfTicks) : values;

  const extraProps = {
    x,
    ticks,
    width,
    height,
    formatLabel,
  };

  return (
    <div style={style} ref={componentRef}>
      <div style={{ flexGrow: 1 }}>
        {/*invisible text to allow for parent resizing*/}
        <Typography
          style={{
            opacity: 0,
            fontSize: svg.fontSize,
            fontFamily: svg.fontFamily,
            fontWeight: svg.fontWeight,
          }}
        >
          {formatLabel(ticks[0], 0)}
        </Typography>
        {height > 0 && width > 0 && (
          <svg
            style={{
              position: 'absolute',
              bottom: 8,
              left: 0,
              height,
              width,
            }}
          >
            <g>
              {React.Children.map(children, (child) => {
                return React.cloneElement(child, extraProps);
              })}
              {
                // don't render labels if width isn't measured yet,
                // causes rendering issues
                width > 0 &&
                  ticks.map(
                    (value: any, index: string | number | undefined) => {
                      // @ts-ignore
                      const { svg: valueSvg = {} } = data[index] || {};

                      return (
                        <text
                          textAnchor={'middle'}
                          transform={`translate(${contentInset.left})`}
                          alignmentBaseline={'hanging'}
                          {...svg}
                          {...valueSvg}
                          key={index}
                          x={x(value)}
                        >
                          {formatLabel(value, index)}
                        </text>
                      );
                    }
                  )
              }
            </g>
          </svg>
        )}
      </div>
    </div>
  );
};

// this component is a port of
// https://github.com/JesperLekland/react-native-svg-charts
const WatchListLineChart = (
  props: WatchListLineChartProps
): JSX.Element | null => {
  const theme = useTheme();
  const {
    chartTitle,
    data,
    yAxisLabelFormat = (value: number) => `${value}`,
    cHeight,
    strokeWidth = 3,
    dotSize = 1.5,
    isEarning,
  } = props;
  let stroke = props.stroke || 'primary';
  if (data.dates.length === 0) return null;
  if (typeof props.isEarning !== 'undefined') {
    stroke = !isEarning ? 'error' : 'success';
  }
  const graphData = data.dates.map((d, i) => ({
    date: moment(d).toDate().getTime(),
    value: data.values[i],
  }));

  const axisSvg = {
    fill: theme.grey.shade6,
    fontSize: 10,
    fontFamily: 'Basis Grotesque Pro',
  };

  const xTick = graphData.length >= 5 ? 5 : 3;

  // check if horizontal
  const isValuesTheSame = data.values.every((v, i, a) => {
    return i === 0 || v === a[i - 1];
  });

  // either put in middle or add 25% buffer at top
  const yMax = isValuesTheSame
    ? data.values[0] * 2
    : Math.max(...data.values) * 1.25;

  const handleRangeClick = (value: string) => {
    props.onRangeChange(value);
  };

  return (
    <Container>
      <TopContainer>
        <TitleContainer>
          <Typography variant="body" color="shade7">
            {chartTitle.prefix}
          </Typography>
          <Typography variant="title4" color="noshade">
            {chartTitle.value}
          </Typography>
          <Typography variant="label" color={chartTitle.postfixColor}>
            {chartTitle.postfix}
          </Typography>
        </TitleContainer>
        <div>
          <RangeListContainer>
            <RangeList>
              {['1W', '1M', '6M', '1Y', '5Y', 'MAX'].map((i) => (
                <li
                  onClick={() => handleRangeClick(i)}
                  className={i === '1Y' ? 'selected' : ''}
                  key={i}
                >
                  {i}
                </li>
              ))}
            </RangeList>
          </RangeListContainer>
        </div>
      </TopContainer>
      <YAxisContainer cHeight={cHeight}>
        <YAxis
          min={0}
          max={yMax}
          style={{ paddingLeft: 10 }}
          data={graphData}
          yAccessor={({ item }: any) => item.value}
          numberOfTicks={5}
          svg={axisSvg}
          contentInset={{ top: 0 }}
          formatLabel={yAxisLabelFormat}
        />
        <WatchListLineChartView
          yMin={0}
          gridMax={yMax}
          style={{ flex: 1, zIndex: 9 }}
          data={graphData}
          xScale={d3Scale.scaleLinear}
          numberOfTicks={xTick}
          yAccessor={({ item }: any) => item.value}
          xAccessor={({ item }: any) => item.date}
          svg={{ stroke: theme.brand[stroke], strokeWidth }}
          contentInset={{ left: 30, top: 0 }}
          curve={shape.curveLinear}
        >
          <Tooltip svg={{ r: dotSize, fill: theme.brand[stroke] }} />
          <Grid svg={{ x: 5, stroke: theme.grey.shade8 }} belowChart />
        </WatchListLineChartView>
      </YAxisContainer>
      <XAxisContainer>
        <StyledDivider
          thickness={1}
          backgroundColor={theme.grey.shade7}
          spacing={4}
        />
        <XAxis
          data={graphData}
          xAccessor={({ item }: any) => item.date}
          scale={d3Scale.scaleTime}
          svg={axisSvg}
          contentInset={{ left: 30 }}
          numberOfTicks={xTick}
          formatLabel={(d: any) => moment(d).format('MMM D')}
        />
        <StyledDivider
          thickness={1}
          backgroundColor={theme.grey.shade7}
          spacing={4}
        />
      </XAxisContainer>
    </Container>
  );
};

export default React.memo(WatchListLineChart);
