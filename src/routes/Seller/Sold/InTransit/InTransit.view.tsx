import React from 'react';

import { Plane, Truck } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { Row, Col } from 'react-grid-system';
import { useHistory } from 'react-router-dom';

import { SoldGeneratedProps, InTransitItemData } from '../Sold.props';
import { TransitGrp, TransitRow } from './InTransit.styles';
import InTransitItem from './InTransitItem.view';

const InTransit = (props: SoldGeneratedProps) => {
  const { inTransit } = props;
  return (
    <>
      {inTransit.map((order, idx) => {
        const hasAir = order.deliveryMethod['Air Freight']?.length > 0 || false;
        const hasRoad = order.deliveryMethod['Road Freight']?.length > 0 || false;
        return (
          <TransitGrp key={idx}>
            <Typography className="section-title" color="noshade" weight="900">
              {order.state}
            </Typography>
            <TransitRow>
              <Col>
                {hasAir && (
                  <div className="section-header">
                    <Plane height={13} width={13} />
                    <Typography color="noshade" className="title">
                      Air Freight
                    </Typography>
                  </div>
                )}
                {order.deliveryMethod['Air Freight'].map(
                  (item: InTransitItemData, idx: number) => (
                    <InTransitItem {...item} key={idx} />
                  )
                )}

                {hasRoad && (
                  <div className="section-header">
                    <Truck height={13} width={13} />
                    <Typography color="noshade" className="title">
                      Road Freight
                    </Typography>
                  </div>
                )}
                {order.deliveryMethod['Road Freight'].map(
                  (item: InTransitItemData, idx: number) => (
                    <InTransitItem {...item} key={idx} />
                  )
                )}
              </Col>
            </TransitRow>
          </TransitGrp>
        );
      })}
    </>
  );
};

export default InTransit;
