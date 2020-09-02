import React from 'react';

// import { useTheme } from 'utils/Theme';
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
} from './Preview.style';

const Preview = (props: PreviewProps): JSX.Element => {
  // const theme = useTheme();
  return (
    <CardContainer className="centered">
      <div className="card">
        <picture className="thumbnail">
          <img src={props.images[0]} alt="Product" style={{ maxHeight: 150 }} />
        </picture>

        <DetailsContainer>
          <HeaderContainer>
            <Row>
              <Title>{props.type}</Title>
              <PriceContainer>
                <Price>${props.price}.00</Price>
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
          <HeaderContainer>
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
          </HeaderContainer>
        </DetailsContainer>
      </div>
    </CardContainer>
  );
};

export default React.memo(Preview);
