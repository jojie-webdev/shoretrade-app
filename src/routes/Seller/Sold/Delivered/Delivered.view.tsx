import React, { useReducer, useEffect } from 'react';

import Typography from 'components/base/Typography';
import Pagination from 'components/module/Pagination';
import { SELLER_SOLD_ROUTES } from 'consts';
import moment from 'moment';
import { Col, Row } from 'react-grid-system';
import { useHistory } from 'react-router-dom';
import getCalendarDate from 'utils/Date/getCalendarDate';

import { SoldGeneratedProps, RequestFilters } from '../Sold.props';
import { DeliveryItem } from '../Sold.style';
import { DeliveredRow } from './Delivered.styles';

const Delivered = (props: SoldGeneratedProps) => {
  const { delivered, deliveredCount, filters, updateFilters } = props;
  const deliveredPagesTotal = Math.ceil(Number(deliveredCount) / 10);
  const history = useHistory();
  return (
    <>
      <DeliveredRow>
        {delivered.map((group) => {
          const calendarDateString = getCalendarDate(group.title);
          return (
            <Col key={calendarDateString} className="delivered-col" md={12}>
              <div className="section-header">
                <Typography color="noshade" className="title">
                  {calendarDateString}
                </Typography>
              </div>
              {group.data.map((item) => {
                const deliveryDate = moment(item.date).format('ddd DD MMM');
                return (
                  <DeliveryItem
                    key={item.id}
                    onClick={() =>
                      history.push(
                        SELLER_SOLD_ROUTES.DETAILS.replace(
                          ':orderId',
                          item.id
                        ).replace(':status', 'DELIVERED')
                      )
                    }
                    iconAlignment="flex-start"
                  >
                    <div className="content">
                      <div className="top">
                        <Typography
                          color="shade6"
                          weight="500"
                          variant="label"
                          className="delivery-date"
                        >
                          Delivery Date
                        </Typography>
                        <Typography
                          color="noshade"
                          weight="bold"
                          variant="label"
                        >
                          {deliveryDate}
                        </Typography>
                      </div>
                      <Typography variant="title5" weight="900" color="noshade">
                        ${item.amount}
                      </Typography>
                    </div>
                  </DeliveryItem>
                );
              })}
            </Col>
          );
        })}
      </DeliveredRow>

      {deliveredPagesTotal > 1 && (
        <Row justify="center">
          <Pagination
            numPages={deliveredPagesTotal}
            currentValue={Number(filters.deliveredFilters.page)}
            onClickButton={(value) =>
              updateFilters.updateDeliveredFilters({
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

export default Delivered;
