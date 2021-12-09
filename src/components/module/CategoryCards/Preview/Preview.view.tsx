import React from 'react';

import Badge from 'components/base/Badge';
import { Location } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { Row } from 'react-grid-system';
import {
  formatMeasurementUnit,
  formatUnitToPricePerUnit,
} from 'utils/Listing/formatMeasurementUnit';
import { parseImageUrl } from 'utils/parseImageURL';
import { ellipsisOnOverflow } from 'utils/String/ellipsisOnOverflow';
import { useTheme } from 'utils/Theme';

import { PreviewProps } from './Preview.props';
import {
  CardContainer,
  DetailsContainer,
  HeaderContainer,
  PriceContainer,
  Price,
  Title,
  BadgeContainer,
  LocationContainer,
  BodyContainer,
  StatusContainer,
  BadgeText,
  ResultText,
  ResultTextValue,
  ResultTextAlt,
  ResultTextValueAlt,
  PriceContainerAlt,
  Image,
  TitleContainer,
  BodyColumnContainer,
  BodyContainerAlt,
} from './Preview.style';

export const PreviewDetailAlt = (props: PreviewProps) => {
  const { hiddenPrice, hiddenVendor, alternate } = props;
  const theme = useTheme();

  const remaining = ellipsisOnOverflow(
    `${props.remaining} ${formatMeasurementUnit(props.unit)}`,
    10
  );

  const minOrder = ellipsisOnOverflow(
    `${props.minimumOrder} ${props.unit}`,
    10
  );

  return (
    <DetailsContainer>
      <HeaderContainer>
        <Row nogutter>
          <div style={{ flex: 1, height: alternate ? 'auto' : 40 }}>
            <TitleContainer>
              <Image imgSrc={props.images[0]} />
              <Title style={{ width: '100%' }} variant="body" weight="bold">
                {props.type}
              </Title>
            </TitleContainer>
            {!hiddenPrice && (
              <PriceContainerAlt>
                <Price className="price" variant="body" weight="bold">
                  {props.price}
                </Price>
                <Typography
                  style={{ textAlign: 'end' }}
                  variant="small"
                  color="shade6"
                >
                  per{' '}
                  {formatUnitToPricePerUnit(formatMeasurementUnit(props.unit))}
                </Typography>
              </PriceContainerAlt>
            )}
          </div>
        </Row>
      </HeaderContainer>
      <div style={{ display: 'flex' }}>
        <StatusContainer>
          {props.state?.map((item) => {
            return (
              <Badge
                key={item}
                fontColor={theme.grey.shade9}
                badgeColor={theme.grey.shade2}
              >
                <BadgeText
                  variant="caption"
                  weight="bold"
                  style={{
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                  }}
                >
                  {item}
                </BadgeText>
              </Badge>
            );
          })}
        </StatusContainer>
      </div>
      <BodyContainerAlt>
        <BodyColumnContainer>
          <Row nogutter>
            <ResultTextAlt
              style={{ paddingRight: 8 }}
              variant="small"
              color="shade6"
            >
              Remaining:
            </ResultTextAlt>
            <ResultTextValueAlt variant="small" weight="bold">
              {remaining}
            </ResultTextValueAlt>
          </Row>
          <Row nogutter>
            <ResultTextAlt
              variant="small"
              color="shade6"
              style={{ paddingRight: 8 }}
            >
              Size:
            </ResultTextAlt>
            <ResultTextValueAlt variant="small" weight="bold">
              {ellipsisOnOverflow(props.weight, 16)}
            </ResultTextValueAlt>
          </Row>
        </BodyColumnContainer>
        <BodyColumnContainer>
          {!hiddenVendor && (
            <Row nogutter>
              <ResultTextAlt
                variant="small"
                color="shade6"
                style={{ paddingRight: 8 }}
              >
                Vendor:
              </ResultTextAlt>
              <ResultTextValueAlt variant="small" weight="700">
                {ellipsisOnOverflow(props.coop ? props.coop.name : '', 15)}
              </ResultTextValueAlt>
            </Row>
          )}
          <Row nogutter>
            <ResultTextAlt
              variant="small"
              color="shade6"
              style={{ paddingRight: 8 }}
            >
              Min Order:
            </ResultTextAlt>
            <ResultTextValueAlt variant="small" weight="bold">
              {minOrder}
            </ResultTextValueAlt>
          </Row>
        </BodyColumnContainer>
      </BodyContainerAlt>
    </DetailsContainer>
  );
};

const Preview = (props: PreviewProps): JSX.Element => {
  const {
    cardContainerStyle,
    cardContainerClass,
    hiddenPrice,
    hiddenVendor,
  } = props;
  const theme = useTheme();

  return (
    <CardContainer
      className="category-preview-card"
      img={parseImageUrl(props.images[0])}
    >
      <div
        className={`card zoom ${cardContainerClass ? cardContainerClass : ''}`}
        style={cardContainerStyle}
      >
        <div className="imgContainer">
          <div className="img" style={{ maxHeight: 200 }} />

          <LocationContainer>
            <Badge>
              <div style={{ flexDirection: 'row', display: 'flex' }}>
                <Location height={10.06} width={8.5} />
                <Typography
                  className="location-font"
                  variant="small"
                  color="noshade"
                >
                  {props.origin?.state}, {props.origin?.countryCode}
                </Typography>
              </div>
            </Badge>
          </LocationContainer>

          <BadgeContainer>
            {props.isAquafuture && (
              <Badge className="badge" badgeColor={theme.grey.shade8}>
                <Typography color="shade4" variant="overline">
                  Aquafuture
                </Typography>
              </Badge>
            )}
            {parseInt(props.remaining || '0') <= 50 && !props.catchRecurrence && (
              <Badge className="badge" badgeColor={theme.brand.warning}>
                <Typography color="noshade" variant="overline">
                  Almost Gone!
                </Typography>
              </Badge>
            )}
            {props.catchRecurrence && (
              <Badge className="badge" badgeColor={theme.brand.success}>
                <Typography color="noshade" variant="overline">
                  Next Day Shipment
                </Typography>
              </Badge>
            )}
          </BadgeContainer>
        </div>
        <DetailsContainer>
          <HeaderContainer>
            <Row nogutter>
              <div style={{ flex: 1, height: 40 }}>
                <Title style={{ width: '100%' }} variant="body" weight="bold">
                  {props.type}
                </Title>
              </div>
              {!hiddenPrice && (
                <PriceContainer>
                  <Price variant="body" weight="bold">
                    {props.price}
                  </Price>
                  <Typography
                    style={{ textAlign: 'end' }}
                    variant="small"
                    color="shade6"
                  >
                    per{' '}
                    {formatUnitToPricePerUnit(
                      formatMeasurementUnit(props.unit)
                    )}
                  </Typography>
                </PriceContainer>
              )}
            </Row>
          </HeaderContainer>
          <div style={{ display: 'flex' }}>
            <StatusContainer>
              {props.state?.map((item) => {
                return (
                  <Badge
                    key={item}
                    fontColor={theme.grey.shade9}
                    badgeColor={theme.grey.shade2}
                  >
                    <BadgeText
                      variant="caption"
                      weight="bold"
                      style={{
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                      }}
                    >
                      {item}
                    </BadgeText>
                  </Badge>
                );
              })}
            </StatusContainer>
          </div>
          <BodyContainer>
            <Row nogutter justify="between">
              <ResultText
                style={{ paddingRight: 8 }}
                variant="small"
                color="shade6"
              >
                Remaining:
              </ResultText>
              <ResultTextValue variant="small" weight="bold">
                {props.remaining} {formatMeasurementUnit(props.unit)}
              </ResultTextValue>
            </Row>
            <Row justify="between" nogutter>
              <ResultText
                variant="small"
                color="shade6"
                style={{ paddingRight: 8 }}
              >
                Size:
              </ResultText>
              <ResultTextValue variant="small" weight="bold">
                {props.weight}
              </ResultTextValue>
            </Row>
            {!hiddenVendor && (
              <Row justify="between" nogutter>
                <ResultText
                  variant="small"
                  color="shade6"
                  style={{ paddingRight: 8 }}
                >
                  Vendor:
                </ResultText>
                <ResultTextValue variant="small" weight="700">
                  {props.coop?.name}
                </ResultTextValue>
              </Row>
            )}
            <Row justify="between" nogutter>
              <ResultText
                variant="small"
                color="shade6"
                style={{ paddingRight: 8 }}
              >
                Min Order:
              </ResultText>
              <ResultTextValue variant="small" weight="bold">
                {props.minimumOrder} {props.unit}
              </ResultTextValue>
            </Row>
          </BodyContainer>
        </DetailsContainer>
      </div>
    </CardContainer>
  );
};

export default React.memo(Preview);
