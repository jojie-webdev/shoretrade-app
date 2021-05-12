import React from 'react';

import TypographyView from 'components/base/Typography';
import { Col, Row, setConfiguration } from 'react-grid-system';

// import { useTheme } from 'utils/Theme';
import { NumberedHeroProps } from './NumberedHero.props';
import {
  Container,
  TitleContainer,
  NumberContainer,
  HeroContainer,
} from './NumberedHero.style';

setConfiguration({ breakpoints: [567, 834, 992, 1200, 1600] });

const NumberedHero = (props: NumberedHeroProps): JSX.Element => {
  // const theme = useTheme();
  const { number, title, heroImage } = props;
  return (
    <Container>
      <Row style={{ alignItems: 'center' }} gutterWidth={16}>
        <Col xs={2} sm={2} md={2} lg={2} xl={2} xxl={2}>
          <NumberContainer>
            <div className="wrapper">{number}</div>
          </NumberContainer>
        </Col>
        <Col sm={6} md={6} lg={6} xl={10} xxl={10}>
          <TitleContainer>
            <TypographyView variant="body" weight="400" color="shade9">
              {title}
            </TypographyView>
          </TitleContainer>
        </Col>
        <Col sm={4} md={4} lg={4} xl={12} xxl={12}>
          <HeroContainer>{heroImage}</HeroContainer>
        </Col>
      </Row>
    </Container>
  );
};

export default React.memo(NumberedHero);
