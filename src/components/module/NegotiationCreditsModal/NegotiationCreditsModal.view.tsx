import React from 'react';

// import { useTheme } from 'utils/Theme';
import Typography from 'components/base/Typography';
import ConfirmationModal from 'components/module/ConfirmationModal';
import { BUYER_ACCOUNT_ROUTES } from 'consts/routes';
import { useHistory } from 'react-router-dom';

import { NegotiationCreditsModalProps } from './NegotiationCreditsModal.props';
import { Container } from './NegotiationCreditsModal.style';

const NegotiationCreditsModal = (
  props: NegotiationCreditsModalProps
): JSX.Element => {
  const {
    showNegoCreditsModal,
    handleShowNegoCreditsModal,
    negotiationCredit,
  } = props;

  const history = useHistory();

  // const theme = useTheme();
  return (
    <Container>
      <ConfirmationModal
        isOpen={showNegoCreditsModal}
        onClickClose={handleShowNegoCreditsModal}
        title={
          <Typography
            variant="title4"
            color="shade8"
            weight="900"
            style={{ fontFamily: 'Canela' }}
          >
            {negotiationCredit} Negotiation Credits
          </Typography>
        }
        action={() => history.push(BUYER_ACCOUNT_ROUTES.SUBSCRIPTION_PLAN)}
        cancel={handleShowNegoCreditsModal}
        actionText="See Plans"
        cancelText="Close"
        description={
          <div style={{ marginTop: 20 }}>
            <Typography variant="label" color="shade6">
              Upgrade your subscription plan to Pro to get more negotiation
              credits.
            </Typography>
          </div>
        }
      />
    </Container>
  );
};

export default React.memo(NegotiationCreditsModal);
