import React from 'react';

import Button from 'components/base/Button';
import {
  NegotiateBoardSeller,
  NegotiateCardsSeller,
  ProductOptionsSeller,
  ShoretradeLogo,
  ShoretradeProSellerLogo,
  SummaryBoardSeller,
} from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Col, Hidden, Row, Visible } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { SwiperSlide } from 'swiper/react';

import {
  EXPLANATIONS,
  DEFAULT_MONTHLY_SUBSCRIPTION_PRICE,
} from './Landing.constants';
import {
  Container1,
  Description,
  DescriptionWrapper,
  FirstDescription,
  ImageContainer,
  LandingDefaultContainer,
  LogoContainer,
  Pro,
  SubscriptionPayment,
  SwiperWrapper,
  Title1,
} from './Landing.style';

const LandingDefaultView = (props: { handleSeePlansClick: () => void }) => {
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

  return (
    <LandingDefaultContainer>
      <Container1>
        <LogoContainer>
          <Visible sm md lg xl xxl>
            <div style={{ marginTop: 7 }}>
              <ShoretradeProSellerLogo />
            </div>
          </Visible>
          <Visible xs>
            <div style={{ marginTop: 7 }}>
              <ShoretradeLogo />
            </div>
          </Visible>
          <Pro variant="small">PRO</Pro>
        </LogoContainer>
        <FirstDescription weight="400" color="shade6">
          Speed up your selling time by making offers on Buyer Requests!
        </FirstDescription>
        <Button
          padding={isMobile ? '10px 16px' : '14px 24px'}
          textVariant="label"
          textWeight="400"
          text="See plans"
          onClick={() => props.handleSeePlansClick()}
        />
      </Container1>

      <Visible xs>
        <SwiperWrapper pagination={{ clickable: true }}>
          <SwiperSlide>
            <DescriptionWrapper>
              <div>
                <Title1
                  variant={isMobile ? 'title6' : 'title5'}
                  weight="700"
                  color="noshade"
                >
                  {EXPLANATIONS[0].heading}
                </Title1>
                <Description
                  variant={isMobile ? 'label' : 'body'}
                  color="shade6"
                  weight="400"
                >
                  {EXPLANATIONS[0].description}
                </Description>
              </div>
            </DescriptionWrapper>
            <ImageContainer>
              <SummaryBoardSeller />
            </ImageContainer>
          </SwiperSlide>
          <SwiperSlide>
            <DescriptionWrapper>
              <div>
                <Title1
                  variant={isMobile ? 'title6' : 'title5'}
                  weight="700"
                  color="noshade"
                >
                  {EXPLANATIONS[1].heading}
                </Title1>
                <Description
                  variant={isMobile ? 'label' : 'body'}
                  color="shade6"
                  weight="400"
                >
                  {EXPLANATIONS[1].description}
                </Description>
              </div>
            </DescriptionWrapper>
            <ImageContainer>
              <NegotiateBoardSeller />
            </ImageContainer>
          </SwiperSlide>
          <SwiperSlide>
            <DescriptionWrapper>
              <div>
                <Title1
                  variant={isMobile ? 'title6' : 'title5'}
                  weight="700"
                  color="noshade"
                >
                  {EXPLANATIONS[2].heading}
                </Title1>
                <Description
                  variant={isMobile ? 'label' : 'body'}
                  color="shade6"
                  weight="400"
                >
                  {EXPLANATIONS[2].description}
                </Description>
              </div>
            </DescriptionWrapper>
            <ImageContainer>
              <NegotiateCardsSeller />
            </ImageContainer>
          </SwiperSlide>
          <SwiperSlide>
            <DescriptionWrapper>
              <div>
                <Title1
                  variant={isMobile ? 'title6' : 'title5'}
                  weight="700"
                  color="noshade"
                >
                  {EXPLANATIONS[3].heading}
                </Title1>
                <Description
                  variant={isMobile ? 'label' : 'body'}
                  color="shade6"
                  weight="400"
                >
                  {EXPLANATIONS[3].description}
                </Description>
              </div>
            </DescriptionWrapper>
            <ImageContainer>
              <ProductOptionsSeller />
            </ImageContainer>
          </SwiperSlide>
        </SwiperWrapper>
      </Visible>

      <Hidden xs>
        <Row style={{ padding: '75px 0 0' }}>
          <Col xs={12} sm={6}>
            <Description>
              <div>
                <Pro variant="small" style={{ display: 'inline' }}>
                  PRO
                </Pro>
                <Title1 variant="title5" weight="700" color="noshade">
                  {EXPLANATIONS[0].heading}
                </Title1>
                <Typography color="shade6" weight="400">
                  {EXPLANATIONS[0].description}
                </Typography>
              </div>
            </Description>
          </Col>
          <Col xs={12} sm={6}>
            <div style={{ margin: 'auto' }}>
              <SummaryBoardSeller />
            </div>
          </Col>
        </Row>

        <Row style={{ padding: '25px 0' }}>
          <Col xs={12} sm={6}>
            <div style={{ margin: 'auto' }}>
              <NegotiateBoardSeller />
            </div>
          </Col>
          <Col xs={12} sm={6}>
            <Description>
              <div>
                <Pro variant="small" style={{ display: 'inline' }}>
                  PRO
                </Pro>
                <Title1 variant="title5" weight="700" color="noshade">
                  {EXPLANATIONS[1].heading}
                </Title1>
                <Typography color="shade6" weight="400">
                  {EXPLANATIONS[1].description}
                </Typography>
              </div>
            </Description>
          </Col>
        </Row>

        <Row style={{ padding: '25px 0' }}>
          <Col xs={12} sm={6}>
            <Description>
              <div>
                <Pro variant="small" style={{ display: 'inline' }}>
                  PRO
                </Pro>
                <Title1 variant="title5" weight="700" color="noshade">
                  {EXPLANATIONS[2].heading}
                </Title1>
                <Typography color="shade6" weight="400">
                  {EXPLANATIONS[2].description}
                </Typography>
              </div>
            </Description>
          </Col>
          <Col xs={12} sm={6}>
            <div style={{ margin: 'auto' }}>
              <NegotiateCardsSeller />
            </div>
          </Col>
        </Row>

        <Row style={{ padding: '25px 0 0' }}>
          <Col xs={12} sm={6}>
            <div style={{ margin: 'auto' }}>
              <ProductOptionsSeller />
            </div>
          </Col>
          <Col xs={12} sm={6}>
            <Description>
              <div>
                <Pro variant="small" style={{ display: 'inline' }}>
                  PRO
                </Pro>
                <Title1 variant="title5" weight="700" color="noshade">
                  {EXPLANATIONS[3].heading}
                </Title1>
                <Typography color="shade6" weight="400">
                  {EXPLANATIONS[3].description}
                </Typography>
              </div>
            </Description>
          </Col>
        </Row>
      </Hidden>
    </LandingDefaultContainer>
  );
};

export default LandingDefaultView;
