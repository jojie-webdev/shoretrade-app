import React from 'react';

import { ChevronRight } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import Pagination from 'components/module/Pagination';
import { SELLER_SOLD_ROUTES } from 'consts';
import moment from 'moment';
import { Col, Row } from 'react-grid-system';
import { useHistory } from 'react-router-dom';
import getCalendarDate from 'utils/Date/getCalendarDate';
import { formatOrderReferenceNumber } from 'utils/String/formatOrderReferenceNumber';

import { SoldGeneratedProps } from '../Sold.props';
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
                    rightComponent={
                      <span className="order-price">
                        <Typography
                          variant="title5"
                          weight="900"
                          color="noshade"
                        >
                          ${item.amount}
                        </Typography>
                        <ChevronRight width={16} height={24} />
                      </span>
                    }
                  >
                    <div className="content">
                      <div className="order-details-top">
                        <div>
                          <Typography color="shade6" variant="overline">
                            Order:
                          </Typography>
                          <Typography
                            color="primary"
                            weight="900"
                            variant="label"
                          >
                            {formatOrderReferenceNumber(item.orderRefNumber)}
                          </Typography>
                        </div>
                        <div>
                          <Typography color="shade6" variant="overline">
                            Buyer:
                          </Typography>
                          <Typography
                            color="noshade"
                            weight="900"
                            variant="label"
                          >
                            {item.buyer}
                          </Typography>
                        </div>
                      </div>
                      <div className="order-details-bottom">
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
