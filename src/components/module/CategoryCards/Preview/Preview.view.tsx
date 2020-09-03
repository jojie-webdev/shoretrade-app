import React from 'react';

// import { useTheme } from 'utils/Theme';
import Badge from 'components/base/Badge';
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
} from './Preview.style';

const Preview = (props: PreviewProps): JSX.Element => {
  return (
    <CardContainer className="centered">
      <div className="card">
        <div className="imgContainer">
          <img src={props.images[0]} alt="Product" style={{ maxHeight: 150 }} />
          <LocationContainer>
            <Badge>{props.origin?.countryCode}</Badge>
          </LocationContainer>

          <BadgeContainer>
            <Badge>Aquafuture</Badge>
            <Badge badgeColor="#F23742">Almost Gone</Badge>
          </BadgeContainer>
        </div>

        <DetailsContainer>
          <HeaderContainer>
            <Row>
              <Title>{props.type}</Title>
              <PriceContainer>
                <Price>${props.price}</Price>
                <TypographyView
                  style={{ textAlign: 'end' }}
                  variant="small"
                  color="shade6"
                >
                  per kg
                </TypographyView>
              </PriceContainer>
            </Row>
          </HeaderContainer>
          <BodyContainer>
            <Row>
              <TypographyView variant="small" color="shade6">
                Remaining:
              </TypographyView>
              <TypographyView variant="small">{props.remaining}</TypographyView>
            </Row>
            <Row style={{ marginTop: 5 }}>
              <TypographyView variant="small" color="shade6">
                Weight:
              </TypographyView>
              {/* Need Weight Transformer */}
              <TypographyView variant="small">{props.remaining}</TypographyView>
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
                {props.minimumOrder}
              </TypographyView>
            </Row>
          </BodyContainer>
        </DetailsContainer>
      </div>
    </CardContainer>
  );
};

export default React.memo(Preview);
