import React from 'react';

import Badge from 'components/base/Badge';
import { Location } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { Row, Col } from 'react-grid-system';
import {
  formatMeasurementUnit,
  formatUnitToPricePerUnit,
} from 'utils/Listing/formatMeasurementUnit';
import { parseImageUrl } from 'utils/parseImageURL';
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
} from './Preview.style';

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
            {props.isAquafuture ? (
              <Badge badgeColor="#111E2B">
                <Typography color="shade4" variant="overline">
                  Aquafuture
                </Typography>
              </Badge>
            ) : null}
            {parseInt(props.remaining || '0') <= 50 ? (
              <Badge badgeColor="#FFA26B">
                <Typography style={{ color: '#FFF1E9' }} variant="overline">
                  Almost Gone!
                </Typography>
              </Badge>
            ) : null}
          </BadgeContainer>
        </div>

        <DetailsContainer>
          <HeaderContainer>
            <Row nogutter>
              <div style={{ flex: 1, height: 48 }}>
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
