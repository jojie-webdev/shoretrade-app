import React from 'react';

import Typography from 'components/base/Typography';
import Pagination from 'components/module/Pagination';
import { Col, Row } from 'react-grid-system';

import { DeliveryItem } from '../Sold.style';
import { DeliveredRow } from './Delivered.styles';

function Delivered() {
  return (
    <>
      <DeliveredRow>
        <Col className="delivered-col" md={12}>
          <div className="section-header">
            <Typography color="noshade" className="title">
              Today
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

        <Col className="delivered-col" md={12}>
          <div className="section-header">
            <Typography color="noshade" className="title">
              Yesterday
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
      </DeliveredRow>

      <Row justify="center">
        <Pagination
          numPages={3}
          currentValue={1}
          onClickButton={() => {}}
          variant="number"
        ></Pagination>
      </Row>
    </>
  );
}

export default Delivered;
