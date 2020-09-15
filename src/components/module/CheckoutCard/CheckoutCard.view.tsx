import React from 'react';

import { Subtract } from 'components/base/SVG';
import Typography from 'components/base/Typography/Typography.view';
import { Col, Row } from 'react-grid-system';
import { useTheme } from 'utils/Theme';

import { CheckoutCardProps } from './CheckoutCard.props';
import { Container, Image, TextValue } from './CheckoutCard.style';

const CheckoutCard = (props: CheckoutCardProps): JSX.Element => {
  const theme = useTheme();
  const { name, image, vendor, size, unit, type, price, onDelete } = props;

  return (
    <Container>
      <Row align="center">
        <Col>
          <div className="checkout-row">
            <Image alt="checkout-image" src={image} />
            <div className="checkout-card-texts">
              <Typography color="shade9" weight="700">
                {name}
              </Typography>

              <div className="checkout-row">
                <Typography variant="caption" color="shade6">
                  Vendor
                </Typography>
                <TextValue variant="caption" color="shade8" weight="400">
                  {vendor}
                </TextValue>
              </div>

              <div className="checkout-row">
                <Typography variant="caption" color="shade6">
                  Size
                </Typography>
                <TextValue variant="caption" color="shade8" weight="400">
                  {size} {unit}
                </TextValue>

                <Typography variant="caption" color="shade6">
                  Type
                </Typography>
                <TextValue variant="caption" color="shade8" weight="400">
                  {type}
                </TextValue>
              </div>
            </div>
          </div>
        </Col>

        <Col>
          <div className="checkout-card-end">
            <Typography className="checkout-card-price" color="shade8">
              ${price}
            </Typography>
            <div className="checkout-card-delete" onClick={onDelete}>
              <Subtract />
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default React.memo(CheckoutCard);
