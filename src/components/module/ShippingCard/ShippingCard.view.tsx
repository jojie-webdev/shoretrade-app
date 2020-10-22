import React from 'react';

import { CheckBorder, CheckFilled } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { Col, Row } from 'react-grid-system';
import { useTheme } from 'utils/Theme';

import { ShippingCardProps } from './ShippingCard.props';
import { Container, Rectangle, Spacer } from './ShippingCard.style';

const ShippingCard = (props: ShippingCardProps): JSX.Element => {
  const theme = useTheme();
  const { options, onPress, selectedPriceId } = props;

  return (
    <Container>
      {options.length === 0 && (
        <Typography variant="caption" color="shade9">
          Shipping rates are currently unavailable for this location. Please
          call ShoreTrade on 1300 095 746 or email info@shoretrade.com to
          organise this shipment.
        </Typography>
      )}
      {options.map((o) => (
        <Rectangle
          key={o.priceId.toString()}
          onClick={() => {
            if (selectedPriceId !== o.priceId) {
              onPress(o.priceId);
            }
          }}
        >
          <Row align="center">
            <Col>
              <div className="shipping-option-left">
                {selectedPriceId === o.priceId ? (
                  <CheckFilled width={24} height={24} />
                ) : (
                  <CheckBorder
                    width={24}
                    height={24}
                    fill={theme.grey.shade5}
                  />
                )}
                <div className="shipping-texts">
                  <Typography color="shade9" weight="700">
                    {o.name}
                  </Typography>
                  {o.secondName && (
                    <Typography color="shade9" weight="700">
                      {o.secondName}
                    </Typography>
                  )}
                  <Spacer />
                  <Typography variant="caption" color="shade6">
                    {o.est}
                  </Typography>
                </div>
              </div>
            </Col>

            <Col>
              <Typography color="shade8" align="right">
                ${o.price}
              </Typography>
            </Col>
          </Row>
        </Rectangle>
      ))}
    </Container>
  );
};

export default React.memo(ShippingCard);
