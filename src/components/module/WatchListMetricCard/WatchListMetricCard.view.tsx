import React from 'react';

import Checkbox from 'components/base/Checkbox';
import Radio from 'components/base/Radio';
import { ArrowDownRight, ArrowUpRight } from 'components/base/SVG';
import Typography from 'components/base/Typography';

// import { useTheme } from 'utils/Theme';
import { WatchListMetricCardProps } from './WatchListMetricCard.props';
import {
  Container,
  ItemContainer,
  ItemsContainer,
  TopContainer,
} from './WatchListMetricCard.style';

const WatchListMetricCard = (props: WatchListMetricCardProps): JSX.Element => {
  // const theme = useTheme();
  return (
    <Container>
      <TopContainer>
        <Typography color="noshade" variant="caption" weight="700">
          {props.title}
        </Typography>
        <Radio checked={props.selected} />
      </TopContainer>
      <ItemsContainer>
        {props.items.map((i, index) => (
          <ItemContainer key={index}>
            <div>
              <Typography color="noshade" variant="caption" weight="500">
                {i.label} <span className="sub-label">{i.subLabel}</span>
              </Typography>
            </div>
            <div className="value-container">
              <Typography color="noshade" variant="caption" weight="500">
                {i.value}
              </Typography>
              {i.trend === 'high' && <ArrowUpRight />}
              {i.trend === 'low' && <ArrowDownRight />}
            </div>
          </ItemContainer>
        ))}
      </ItemsContainer>
    </Container>
  );
};

export default React.memo(WatchListMetricCard);
