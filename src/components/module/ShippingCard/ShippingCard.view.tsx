import React from 'react';

import { CheckBorder, CheckFilled } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Col, Row } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { useTheme } from 'utils/Theme';

import { ShippingCardProps } from './ShippingCard.props';
import { Container, Rectangle, Spacer } from './ShippingCard.style';

const ShippingCard = (props: ShippingCardProps): JSX.Element => {
  const theme = useTheme();
  const { options, onPress, selectedPriceId } = props;
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

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
          <Row align="center" nogutter>
            <Col>
              <div className="shipping-option-left">
                <div>
                  <Typography
                    variant={isMobile ? 'caption' : 'body'}
                    weight="700"
                  >
                    {o.name}
                  </Typography>
                  {o.secondName && (
                    <Typography
                      variant={isMobile ? 'caption' : 'body'}
                      weight="700"
                    >
                      {o.secondName}
                    </Typography>
                  )}
                  <Spacer />
                  <Typography
                    variant={isMobile ? 'small' : 'caption'}
                    color="shade6"
                  >
                    {o.est}
                  </Typography>
                </div>
              </div>
            </Col>

            <Col>
              <div className="shipping-option-right">
                <Typography
                  variant={isMobile ? 'caption' : 'body'}
                  align="right"
                >
                  ${o.price}
                </Typography>
                {selectedPriceId === o.priceId ? (
                  <CheckFilled
                    width={isMobile ? 14 : 24}
                    height={isMobile ? 14 : 24}
                  />
                ) : (
                  <CheckBorder
                    width={isMobile ? 14 : 24}
                    height={isMobile ? 14 : 24}
                    fill={theme.grey.shade5}
                  />
                )}
              </div>
            </Col>
          </Row>
        </Rectangle>
      ))}
    </Container>
  );
};

export default React.memo(ShippingCard);
