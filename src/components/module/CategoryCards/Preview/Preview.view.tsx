import React from 'react';

// import { useTheme } from 'utils/Theme';
import Badge from 'components/base/Badge';
import { Location } from 'components/base/SVG';
import TypographyView from 'components/base/Typography';
import { Row, Col } from 'react-grid-system';

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
  return (
    <CardContainer className="centered">
      <div className="card">
        <div className="imgContainer">
          <img
            src={props.images[0]}
            alt="Product"
            style={{ maxHeight: 150, borderRadius: 4 }}
          />
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
              <Title>{props.type}</Title>
              <PriceContainer>
                <Price>{props.price}</Price>
                <TypographyView
                  style={{ textAlign: 'end' }}
                  variant="small"
                  color="shade6"
                >
                  per {props.unit}
                </TypographyView>
              </PriceContainer>
            </Row>
          </HeaderContainer>
          <StatusContainer>
            {props.state?.map((item) => {
              return (
                <Badge fontColor="#09131D" badgeColor="#EDEFFA">
                  <TypographyView variant="small" weight="bold">
                    {item}
                  </TypographyView>
                </Badge>
              );
            })}
          </StatusContainer>
          <BodyContainer>
            <Row>
              <TypographyView variant="small" color="shade6">
                Remaining:
              </TypographyView>
              <TypographyView variant="small">
                {props.remaining} {props.unit}
              </TypographyView>
            </Row>
            <Row style={{ marginTop: 5 }}>
              <TypographyView variant="small" color="shade6">
                Weight:
              </TypographyView>
              {/* Need Weight Transformer */}
              <TypographyView variant="small">{props.weight}</TypographyView>
            </Row>
            <Row style={{ marginTop: 5 }}>
              <TypographyView variant="small" color="shade6">
                Vendor:
              </TypographyView>
              <TypographyView variant="small">
                {props.coop?.name}
              </TypographyView>
            </Row>
            <Row style={{ marginTop: 5 }}>
              <TypographyView variant="small" color="shade6">
                Min Order:
              </TypographyView>
              <TypographyView variant="small">
                {props.minimumOrder} {props.unit}
              </TypographyView>
            </Row>
          </BodyContainer>
        </DetailsContainer>
      </div>
    </CardContainer>
  );
};

export default React.memo(Preview);
