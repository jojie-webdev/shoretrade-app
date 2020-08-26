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
import moment from 'moment';
import { Row, Col } from 'react-grid-system';

import { SoldGeneratedProps } from '../Sold.props';
import { DeliveryItem } from '../Sold.style';
import { TransitRow } from './InTransit.styles';

const InTransit = (props: SoldGeneratedProps) => {
  const { inTransit } = props;
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
              const { date, amount, id } = item;
              const deliveryDate = moment(date).format('ddd DD MMM');
              return (
                <DeliveryItem
                  key={id}
                  onClick={() => null}
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
                      <Typography color="noshade" weight="bold" variant="label">
                        {deliveryDate}
                      </Typography>
                    </div>
                    <Typography variant="title5" weight="900" color="noshade">
                      ${amount}
                    </Typography>
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
