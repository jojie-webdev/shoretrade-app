import React from 'react';

import moment from 'moment';
import Countdown, { CountdownRenderProps } from 'react-countdown';

// import { useTheme } from 'utils/Theme';
import { useTheme } from 'utils/Theme';

import { PaymentTimeLeftProps } from './PaymentTimeLeft.props';
import { Container } from './PaymentTimeLeft.style';

const PaymentTimeLeft = (props: PaymentTimeLeftProps): JSX.Element => {
  // const theme = useTheme();
  // check if under an hour
  const { timeLeft } = props;
  const theme = useTheme();
  // parse time left -> HH:mm:ss
  const timeParts = timeLeft.split(':');
  const now = moment();
  const expiryDate = now
    .add(timeParts[0], 'hours')
    .add(timeParts[1], 'minutes')
    .add(timeParts[2], 'seconds');
  const Completionist = () => <span>Expired</span>;

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
        <span style={{ color: theme.brand.error }}>
          ({hours >= 1 && `${hours} hour(s)`} {hours < 1 && minutes && `${minutes} minute(s)`}{' '}
          {hours < 1 && seconds && `${seconds} second(s)`} remaining)
        </span>
      );
    }
  };
  return (
    <Container>
      <Countdown date={expiryDate.toDate()} renderer={renderer} />
    </Container>
  );
};

export default React.memo(PaymentTimeLeft);
