import React, { ReactNode } from 'react';

import Alert from 'components/base/Alert';
import { AlertProps } from 'components/base/Alert/Alert.props';
import Typography from 'components/base/Typography';
// import { useTheme } from 'utils/Theme';
import { BUYER_ROUTES } from 'consts';
import { Col, Row } from 'react-grid-system';
import { useHistory } from 'react-router';

import { OfferAlertProps } from './OfferAlert.props';
import { Container } from './OfferAlert.style';

const OfferAlert = (props: OfferAlertProps): JSX.Element => {
  // const theme = useTheme();
  const history = useHistory();
  const { status, thereIsNewOffer, counterOffer, orderRefNumber } = props;
  const buildAlertProperties = () => {
    const contentTypo = (content: string): ReactNode => (
      <Typography component={'span'} variant="body" color="shade6" weight="400">
        {content}
      </Typography>
    );

    let alertProps = {} as AlertProps;

    if (
      status === 'NEGOTIATION' &&
      !thereIsNewOffer &&
      parseFloat(counterOffer || '0') > 0
    ) {
      alertProps = {
        variant: 'infoAlert',
        header: 'In Negotiation',
        content: contentTypo(
          'Your selected offer is being reviewed by the Seller.'
        ),
      };
    }
    if (status === 'PAYMENT REQUIRED') {
      alertProps = {
        variant: 'warning',
        header: 'Payment Required',
        content: contentTypo(
          'Please process the payment within the remaining time. This selected offer will automatically close if payment is not received.'
        ),
      };
    }
    if (status === 'PAYMENT MISSED') {
      alertProps = {
        variant: 'error',
        header: 'Payment Missed',
        content: contentTypo(
          'The selected offer has automatically closed due to missed payment.'
        ),
      };
    }
    if (status === 'ACCEPTED') {
      alertProps = {
        variant: 'success',
        header: 'Finalised',
        content: (
          <span
            onClick={() => history.replace(BUYER_ROUTES.ORDERS)}
            style={{ cursor: 'pointer' }}
          >
            {contentTypo(`This offer is now Order #0000-${orderRefNumber}.`)}
          </span>
        ),
      };
    }
    if (status === 'NEW OFFER') {
      alertProps = {
        variant: 'success',
        header: 'New Offer',
        content: contentTypo(
          'Review the offer details and Negotiate or Accept the offer to proceed.'
        ),
      };
    }

    return alertProps;
  };

  const alertProps = buildAlertProperties();

  return (
    <Container>
      <Row>
        <Col>{alertProps.header && <Alert {...alertProps} fullWidth />}</Col>
      </Row>
    </Container>
  );
};

export default React.memo(OfferAlert);
