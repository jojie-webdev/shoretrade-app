import React from 'react';

import TypographyView from 'components/base/Typography';
import { Col, setConfiguration } from 'react-grid-system';

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
      <Col style={{ alignItems: 'center' }}>
        <Col xs={2} sm={2} md={2} lg={2} xl={2} xxl={2}>
          <NumberContainer>
            <TypographyView
              color="shade6"
              style={{ fontFamily: 'Media Sans', marginTop: 4 }}
            >
              /
            </TypographyView>
            <TypographyView variant="title3" weight="400" color="shade9">
              0{number}
            </TypographyView>
          </NumberContainer>
        </Col>
        <Col sm={6} md={6} lg={6} xl={10} xxl={10} style={{ marginBlock: 24 }}>
          <TitleContainer>
            <TypographyView variant="label" color="shade7">
              {title}
            </TypographyView>
          </TitleContainer>
        </Col>
        <Col sm={4} md={4} lg={4} xl={12} xxl={12}>
          <HeroContainer>{heroImage}</HeroContainer>
        </Col>
      </Col>
    </Container>
  );
};

export default React.memo(NumberedHero);
