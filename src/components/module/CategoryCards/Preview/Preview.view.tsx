import React from 'react';

import Badge from 'components/base/Badge';
import { Location } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { Row, Col } from 'react-grid-system';
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
} from './Preview.style';

const Preview = (props: PreviewProps): JSX.Element => {
  const theme = useTheme();
  return (
    <CardContainer>
      <div className="card">
        <div className="imgContainer">
          <img src={props.images[0]} alt="Product" style={{ maxHeight: 200 }} />
          <LocationContainer>
            <Badge>
              <Location height={10.06} width={8.5}></Location>{' '}
              {props.origin?.countryCode}
            </Badge>
          </LocationContainer>

          <BadgeContainer>
            {props.isAquafuture ? <Badge>Aquafuture</Badge> : null}
            {parseInt(props.remaining || '0') <= 50 ? (
              <Badge badgeColor="#F23742">Almost Gone!</Badge>
            ) : null}
          </BadgeContainer>
        </div>

        <DetailsContainer>
          <HeaderContainer>
            <Row>
              <Title variant="body" weight="bold">
                {props.type}
              </Title>
              <PriceContainer>
                <Price variant="body" weight="bold">
                  {props.price}
                </Price>
                <Typography
                  style={{ textAlign: 'end' }}
                  variant="small"
                  color="shade6"
                >
                  per {props.unit}
                </Typography>
              </PriceContainer>
            </Row>
          </HeaderContainer>
          <Row>
            <StatusContainer>
              {props.state?.map((item) => {
                return (
                  <Badge
                    fontColor={theme.grey.shade9}
                    badgeColor={theme.grey.shade2}
                  >
                    <Typography variant="caption" weight="bold">
                      {item}
                    </Typography>
                  </Badge>
                );
              })}
            </StatusContainer>
          </Row>
          <BodyContainer>
            <Row>
              <Typography
                style={{ paddingRight: 4 }}
                variant="small"
                color="shade6"
              >
                Remaining:
              </Typography>
              <Typography variant="small" weight="bold">
                {props.remaining} {props.unit}
              </Typography>
            </Row>
            <Row style={{ marginTop: 5 }}>
              <Typography
                variant="small"
                color="shade6"
                style={{ paddingRight: 4 }}
              >
                Weight:
              </Typography>
              {/* Need Weight Transformer */}
              <Typography variant="small" weight="bold">
                {props.weight}
              </Typography>
            </Row>
            <Row style={{ marginTop: 5 }}>
              <Typography
                variant="small"
                color="shade6"
                style={{ paddingRight: 4 }}
              >
                Vendor:
              </Typography>
              <Typography variant="small" weight="bold">
                {props.coop?.name}
              </Typography>
            </Row>
            <Row style={{ marginTop: 5 }}>
              <Typography
                variant="small"
                color="shade6"
                style={{ paddingRight: 4 }}
              >
                Min Order:
              </Typography>
              <Typography variant="small" weight="bold">
                {props.minimumOrder} {props.unit}
              </Typography>
            </Row>
          </BodyContainer>
        </DetailsContainer>
      </div>
    </CardContainer>
  );
};

export default React.memo(Preview);
