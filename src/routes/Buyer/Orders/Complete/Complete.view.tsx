import React, { useReducer, useState, useEffect } from 'react';

import Alert from 'components/base/Alert';
import { Oysters } from 'components/base/SVG';
import EmptyState from 'components/module/EmptyState';
import MessageModal from 'components/module/MessageModal';
import RateSellerModal from 'components/module/RateSellerModal';
import { BUYER_ROUTES } from 'consts';
import { Row, Col } from 'react-grid-system';
import { useHistory } from 'react-router';
import { createUpdateReducer } from 'utils/Hooks';
import { useTheme } from 'utils/Theme';

import GroupedOrderItems from '../GroupedOrderItems/GroupedOrderItems.view';
import { OrdersGeneratedProps } from '../Orders.props';
import { AlertContainer } from '../Orders.style';

const Complete = (props: OrdersGeneratedProps) => {
  const {
    completedOrders,
    updateFilters,
    filters,
    isSendingDispute,
    sendDispute,
    getCompletedOrders,
    sendOrderRating,
    isSendingOrderRating,
    isSendOrderRatingSuccess,
    selectionCount,
  } = props;
  const theme = useTheme();
  const history = useHistory();

  const [disputeModal, updateDisputeModal] = useReducer(
    createUpdateReducer<{
      orderId: string;
      isOpen: boolean;
    }>(),
    {
      orderId: '',
      isOpen: false,
    }
  );

  const [rateSellerModal, updateRateSellerModal] = useReducer(
    createUpdateReducer<{
      orderId: string;
      isOpen: boolean;
    }>(),
    {
      orderId: '',
      isOpen: false,
    }
  );

  const [showSuccessFeedbackAlert, setShowSuccessFeedbackAlert] = useState(
    false
  );

  useEffect(() => {
    if (isSendingOrderRating === false && rateSellerModal.isOpen) {
      updateRateSellerModal({ isOpen: false, orderId: '' });
      getCompletedOrders();
    }
    // eslint-disable-next-line
  }, [isSendingOrderRating]);

  useEffect(() => {
    if (isSendOrderRatingSuccess && isSendingOrderRating === false) {
      setShowSuccessFeedbackAlert(true);
      setTimeout(() => setShowSuccessFeedbackAlert(false), 5000);
    }
    // eslint-disable-next-line
  }, [isSendOrderRatingSuccess]);

  return (
    <>
      <RateSellerModal
        loading={isSendingOrderRating || false}
        isOpen={rateSellerModal.isOpen}
        onClickClose={() => updateRateSellerModal({ isOpen: false })}
        backgroundColor={theme.grey.noshade}
        sendReview={(rating, feedback) => {
          sendOrderRating(rateSellerModal.orderId, rating, feedback);
        }}
      />
      <MessageModal
        isOpen={isSendingDispute || disputeModal.isOpen}
        recipient="Raise Dispute"
        onSend={(message) => {
          sendDispute(disputeModal.orderId, message);
          updateDisputeModal({ isOpen: false });
        }}
        onClickClose={() => {
          updateDisputeModal({ isOpen: false });
        }}
        loading={isSendingDispute}
      />
      <AlertContainer className={`${showSuccessFeedbackAlert ? '' : 'hidden'}`}>
        <Alert
          header="Feedback Successfully Sent"
          content="Thank you for rating your Seller. Your feedback is appreciated."
          variant="success"
          alignText="center"
          fullWidth
        />
      </AlertContainer>
      {Object.keys(completedOrders).length === 0 ? (
        <Row className="emptystate-row" align="center" justify="center">
          <Col>
            <EmptyState
              title={`You have no orders Completed`}
              buttonText="START AN ORDER"
              onButtonClicked={() => history.push(BUYER_ROUTES.SEARCH)}
              Svg={Oysters}
            />
          </Col>
        </Row>
      ) : (
        <GroupedOrderItems
          groupedData={completedOrders}
          groupedCount={selectionCount}
          token={props.token}
          filter={filters.completedOrdersFilter}
          updateFilter={updateFilters.updateCompletedOrdersFilter}
          onOrderClick={(orderId: string) => {
            updateDisputeModal({ isOpen: true, orderId });
          }}
          onRateClick={(orderId: string) =>
            updateRateSellerModal({ isOpen: true, orderId })
          }
        />
      )}
    </>
  );
};

export default Complete;
