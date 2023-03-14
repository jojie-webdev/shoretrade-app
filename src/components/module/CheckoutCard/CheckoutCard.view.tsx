import React from 'react';

import Badge from 'components/base/Badge/Badge.view';
import { Subtract } from 'components/base/SVG';
import Typography from 'components/base/Typography/Typography.view';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Row } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';
import { useTheme } from 'utils/Theme';

import { CheckoutCardProps } from './CheckoutCard.props';
import {
  Container,
  MobileContainer,
  Image,
  TextValue,
  BadgeText,
} from './CheckoutCard.style';

const CheckoutCard = (props: CheckoutCardProps): JSX.Element => {
  const theme = useTheme();
  const { name, uri, vendor, size, unit, weight, price, tags, onRemove } =
    props;
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });
  const Layout = isMobile ? MobileContainer : Container;

  return (
    <Layout>
      {isMobile && (
        <div className="header">
          <Typography variant="overline" color="shade6">
            Order Summary
          </Typography>
          <div className="checkout-card-delete" onClick={onRemove}>
            <Subtract width={14} height={14} />
          </div>
        </div>
      )}

      <Row align="center" justify="between" nogutter>
        <div>
          <div
            className="checkout-row"
            style={{ marginBottom: isMobile ? 8 : 0 }}
          >
            <Image alt="checkout-image" src={uri} />
            <div className="checkout-card-texts">
              {isMobile ? (
                <div className="name-row">
                  <Typography variant="label" weight="700">
                    {name}
                  </Typography>
                  <Typography
                    variant="caption"
                    className="checkout-card-price"
                    weight="700"
                  >
                    ${price}
                  </Typography>
                </div>
              ) : (
                <Typography weight="700">{name}</Typography>
              )}

              {tags && (
                <div className="checkout-tags">
                  {tags.map((tag) => (
                    <Badge
                      key={tag.label}
                      fontColor={
                        tag.type === 'blue'
                          ? theme.grey.noshade
                          : theme.grey.shade9
                      }
                      badgeColor={
                        tag.type === 'blue'
                          ? theme.brand.info
                          : theme.grey.shade3
                      }
                    >
                      <BadgeText
                        variant="caption"
                        weight="bold"
                        color={tag.type === 'blue' ? 'noshade' : 'shade9'}
                      >
                        {tag.label}
                      </BadgeText>
                    </Badge>
                  ))}
                </div>
              )}

              {!isMobile && (
                <>
                  <div className="checkout-row" style={{ flexWrap: 'wrap' }}>
                    <Typography variant="caption" color="shade6">
                      Vendor
                    </Typography>
                    <TextValue variant="caption" color="shade8">
                      {vendor}
                    </TextValue>
                  </div>

                  <div className="checkout-row">
                    <Typography variant="caption" color="shade6">
                      Weight
                    </Typography>
                    <TextValue variant="caption" color="shade8">
                      {weight} {formatMeasurementUnit(unit)}
                    </TextValue>

                    <Typography variant="caption" color="shade6">
                      Size
                    </Typography>
                    <TextValue variant="caption" color="shade8">
                      {size}
                    </TextValue>
                  </div>
                </>
              )}
            </div>
          </div>

          {isMobile && (
            <>
              <div className="checkout-row">
                <Typography variant="caption" color="shade6">
                  Vendor
                </Typography>
                <TextValue variant="caption" color="shade8">
                  {vendor}
                </TextValue>
              </div>

              <div className="checkout-row">
                <Typography variant="caption" color="shade6">
                  Weight
                </Typography>
                <TextValue variant="caption" color="shade8">
                  {weight} {formatMeasurementUnit(unit)}
                </TextValue>

                <Typography variant="caption" color="shade6">
                  Size
                </Typography>
                <TextValue variant="caption" color="shade8">
                  {size}
                </TextValue>
              </div>
            </>
          )}
        </div>

        {!isMobile && (
          <div className="checkout-card-end">
            <Typography color="shade8">${price}</Typography>
            <div className="checkout-card-delete" onClick={onRemove}>
              <Subtract />
            </div>
          </div>
        )}
      </Row>
    </Layout>
  );
};

export default React.memo(CheckoutCard);
