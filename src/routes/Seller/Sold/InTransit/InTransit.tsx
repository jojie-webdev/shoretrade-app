import React from 'react';

import { Plane, Truck } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { Row, Col } from 'react-grid-system';

import { DeliveryItem } from '../Sold.style';
import { TransitRow } from './InTransit.styles';

function InTransit() {
  return (
    <TransitRow>
      <Col className="transit-col" md={12}>
        <div className="section-header">
          <Plane />
          <Typography color="noshade" className="title">
            Air Freight
          </Typography>
        </div>
        <DeliveryItem onClick={() => {}} iconAlignment="flex-start">
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
                Tue 28 Apr
              </Typography>
            </div>
            <Typography variant="title5" weight="900" color="noshade">
              $1,462.00
            </Typography>
          </div>
        </DeliveryItem>
        <DeliveryItem onClick={() => {}} iconAlignment="flex-start">
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
                Tue 28 Apr
              </Typography>
            </div>
            <Typography variant="title5" weight="900" color="noshade">
              $1,462.00
            </Typography>
          </div>
        </DeliveryItem>
      </Col>

      <Col className="transit-col">
        <div className="section-header">
          <Truck />
          <Typography color="noshade" className="title">
            Road Freight
          </Typography>
        </div>
        <DeliveryItem onClick={() => {}} iconAlignment="flex-start">
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
                Tue 28 Apr
              </Typography>
            </div>
            <Typography variant="title5" weight="900" color="noshade">
              $1,462.00
            </Typography>
          </div>
        </DeliveryItem>
      </Col>
    </TransitRow>
  );
}

export default InTransit;
