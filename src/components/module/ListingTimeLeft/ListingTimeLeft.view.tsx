import React from 'react';

import moment from 'moment';
import Countdown, { CountdownRenderProps } from 'react-countdown';

// import { useTheme } from 'utils/Theme';
import { ListingTimeLeftProps } from './ListingTimeLeft.props';
import { Container } from './ListingTimeLeft.style';

const ListingTimeLeft = (props: ListingTimeLeftProps): JSX.Element => {
  // const theme = useTheme();
  // check if under an hour
  const { timeLeft } = props;
  const now = moment();

  const Completionist = () => <span> {moment().to(timeLeft)}</span>;

  const renderer = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
  }: CountdownRenderProps) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <span>
          {minutes} minutes {seconds} seconds
        </span>
      );
    }
  };
  if (timeLeft.diff(now, 'minutes') <= 60) {
    return (
      <Container>
        <Countdown date={timeLeft.format()} renderer={renderer} />
      </Container>
    );
  }
  return <Container>{moment(timeLeft).toNow(true)}</Container>;
};

export default React.memo(ListingTimeLeft);
