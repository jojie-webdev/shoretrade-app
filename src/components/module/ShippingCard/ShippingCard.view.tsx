import React from 'react';

import { CheckBorder, CheckFilled } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Col, Row } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { parseImageUrl } from 'utils/parseImageURL';
import { useTheme } from 'utils/Theme';

import { ShippingCardProps } from './ShippingCard.props';
import { Container, Rectangle, Spacer } from './ShippingCard.style';

const ShippingCard = (props: ShippingCardProps): JSX.Element => {
  const theme = useTheme();
  const { options, onPress, selectedPriceId, isFreeShipping = false } = props;
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

  return (
    <Container>
      {options.length === 0 && (
        <Typography variant="caption" color="shade9" style={{ marginTop: 12 }}>
          Shipping rates are currently unavailable for this location. Please
          call ShoreTrade on 1300 095 746 or email info@shoretrade.com to
          organise this shipment.
        </Typography>
      )}
      {options.map((o) => (
        <Rectangle
          key={o.id}
          onClick={() => {
            if (selectedPriceId !== o.id) {
              onPress(o.id);
            }
          }}
        >
          <Row align="center" nogutter>
            <Col>
              <div className="shipping-option-left">
                {o.imageUrl && (
                  <div className="thumbnail-container">
                    <img src={parseImageUrl(o.imageUrl)} alt="" />
                  </div>
                )}
                <div>
                  <Typography
                    variant={isMobile ? 'caption' : 'body'}
                    weight="700"
                  >
                    {o.name}
                  </Typography>
                  {o.subAddress && (
                    <Typography
                      variant={isMobile ? 'small' : 'caption'}
                      color="shade6"
                      fontStyle="italic"
                    >
                      {o.subAddress}
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
                  {isFreeShipping ? 'FREE SHIPPING' : `${o.price}`}
                </Typography>
                {selectedPriceId === o.id ? (
                  <CheckFilled
                    width={isMobile ? 14 : 20}
                    height={isMobile ? 14 : 20}
                  />
                ) : (
                  <CheckBorder
                    width={isMobile ? 14 : 20}
                    height={isMobile ? 14 : 20}
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
