import React from 'react';

import {
  Octopus,
  ChevronRight,
  Scale,
  InfoFilled,
  Plane,
  Truck,
} from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { SELLER_SOLD_ROUTES } from 'consts';
import moment from 'moment';
import { Row, Col } from 'react-grid-system';
import { useHistory } from 'react-router-dom';
import { formatOrderReferenceNumber } from 'utils/String/formatOrderReferenceNumber';

import { SoldGeneratedProps } from '../Sold.props';
import { DeliveryItem } from '../Sold.style';
import { TransitRow } from './InTransit.styles';

const InTransit = (props: SoldGeneratedProps) => {
  const { inTransit } = props;
  const history = useHistory();
  return (
    <TransitRow>
      {inTransit.map((group) => {
        const { title, data } = group;
        const Icon = () =>
          title.toLowerCase().includes('air') ? (
            <Plane height={13} width={13} />
          ) : (
            <Truck height={13} width={13} />
          );
        return (
          <Col key={title} className="transit-col" md={12}>
            <div className="section-header">
              <Icon />
              <Typography color="noshade" className="title">
                {title}
              </Typography>
            </div>
            {data.map((item) => {
              const { date, amount, id, buyer, orderRefNumber } = item;
              const deliveryDate = moment(date).format('ddd DD MMM');
              return (
                <DeliveryItem
                  key={id}
                  onClick={() =>
                    history.push(
                      SELLER_SOLD_ROUTES.DETAILS.replace(
                        ':orderId',
                        id
                      ).replace(':status', 'TRANSIT')
                    )
                  }
                  iconAlignment="flex-start"
                  rightComponent={
                    <span className="order-price" >
                      <Typography variant="title5" weight="900" color="noshade">
                        ${amount}
                      </Typography>
                      <ChevronRight width={16} height={24}/>
                    </span>
                  }
                >
                  <div className="content">
                    <div className="order-details-top">
                      <div>
                        <Typography color="shade6" variant="overline">
                          Order:
                        </Typography>
                        <Typography color="primary" weight="900" variant="label">
                          {formatOrderReferenceNumber(orderRefNumber)}
                        </Typography>
                      </div>
                      <div>
                        <Typography color="shade6" variant="overline">
                          Buyer:
                        </Typography>
                        <Typography color="noshade" weight="900" variant="label">
                          {buyer}
                        </Typography>
                      </div>
                    </div>
                    <div className="order-details-bottom">
                      <Typography
                        color="shade6"
                        weight="900"
                        variant="label"
                        className="delivery-date"
                      >
                        Delivery Date
                      </Typography>
                      <Typography color="noshade" weight="bold" variant="label">
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
    </TransitRow>
  );
};

export default InTransit;
