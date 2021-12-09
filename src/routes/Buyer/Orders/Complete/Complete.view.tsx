import React, { useReducer, useState, useEffect } from 'react';

import Alert from 'components/base/Alert';
import { Oysters } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import EmptyState from 'components/module/EmptyState';
import MessageModal from 'components/module/MessageModal';
import OrderItemView from 'components/module/OrderItem';
import Pagination from 'components/module/Pagination';
import RateSellerModal from 'components/module/RateSellerModal';
import { BUYER_ROUTES, DEFAULT_PAGE_LIMIT } from 'consts';
import sort from 'ramda/src/sort';
import { Row, Col } from 'react-grid-system';
import { useHistory } from 'react-router';
import { createUpdateReducer } from 'utils/Hooks';
import { useTheme } from 'utils/Theme';

import { OrdersGeneratedProps } from '../Orders.props';
import {
  AccordionTitleContainer,
  StyledAccordion,
  OrderBadge,
  AlertContainer,
} from '../Orders.style';
import { sortByDate } from '../Orders.transform';

const Complete = (props: OrdersGeneratedProps) => {
  const {
    completedOrders,
    completedOrdersCount,
    updateFilters,
    filters,
    isSendingDispute,
    sendDispute,
    getCompletedOrders,
    sendOrderRating,
    isSendingOrderRating,
    isSendOrderRatingSuccess,
  } = props;
  const theme = useTheme();
  const history = useHistory();

  const completePagesTotal = Math.ceil(
    Number(completedOrdersCount) / DEFAULT_PAGE_LIMIT
  );
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
        sort(sortByDate, Object.keys(completedOrders)).map((key) => (
          <StyledAccordion
            key={key}
            title={''}
            headerBorder={`1px solid ${theme.grey.shade3}`}
            contentBorder={`1px solid ${theme.grey.shade3}`}
            padding="20px 24px"
            innerContentPadding="8px 24px"
            marginBottom="16px"
            keepIcon
            iconColor={theme.brand.primary}
            leftComponent={
              <AccordionTitleContainer>
                <Typography color="shade6" className="label" weight="400">
                  Date Delivered:
                </Typography>
                <Typography color="shade9" className="labelBold">
                  {key}
                </Typography>
              </AccordionTitleContainer>
            }
            rightComponent={
              <OrderBadge>
                <Typography color="shade9" variant="overline">
                  {completedOrders[key].length}{' '}
                  {completedOrders[key].length > 1 ? 'Orders' : 'Order'}
                </Typography>
              </OrderBadge>
            }
          >
            {completedOrders[key].map((d) => (
              <OrderItemView
                {...d}
                token={props.token}
                key={d.id}
                onClick={(e) => {
                  updateDisputeModal({ isOpen: true, orderId: d.id });
                  e.stopPropagation();
                }}
                deliveredDate={d.deliveredDate}
                completedOrder
                onRateClick={() =>
                  !d.data.rating &&
                  updateRateSellerModal({ isOpen: true, orderId: d.id })
                }
              />
            ))}
          </StyledAccordion>
        ))
      )}
      {completePagesTotal > 1 && (
        <Row justify="center">
          <Pagination
            numPages={completePagesTotal}
            currentValue={Number(filters.completedOrdersFilter.page)}
            onClickButton={(value) =>
              updateFilters.updateCompletedOrdersFilter({
                page: value.toFixed(0),
              })
            }
            variant="number"
          />
        </Row>
      )}
    </>
  );
};

export default Complete;
