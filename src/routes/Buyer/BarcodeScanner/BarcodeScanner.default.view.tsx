import React from 'react';

import Button from 'components/base/Button';
import {
  RateYourSellersBuyer,
  ScanInOrdersBuyer,
  ShoretradeLogo,
  ShoretradeProBuyerLogo,
  TrackYourOrdersBuyer,
} from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Col, Hidden, Row, Visible } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { SwiperSlide } from 'swiper/react';

import {
  EXPLANATIONS,
  MONTHLY_SUBSCRIPTION_PRICE,
} from './BarcodeScanner.constants';
import {
  Container1,
  Description,
  DescriptionWrapper,
  FirstDescription,
  ImageContainer,
  LandingDefaultContainer,
  LogoContainer,
  SubscriptionPayment,
  SwiperWrapper,
  Title1,
} from './BarcodeScanner.style';

const BarcodeScannerDefaultView = () => {
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

  return (
    <LandingDefaultContainer>
      <Container1>
        <LogoContainer>
          <Visible sm md lg xl xxl>
            <div style={{ marginTop: 7 }}>
              <ShoretradeProBuyerLogo />
            </div>
          </Visible>
          <Visible xs>
            <div style={{ marginTop: 7 }}>
              <ShoretradeLogo />
            </div>
          </Visible>
        </LogoContainer>
        <FirstDescription weight="400" color="shade7">
          Download the ShoreTrade app to scan &amp; mark your orders as
          completed
        </FirstDescription>
      </Container1>

      <Visible xs>
        <SwiperWrapper pagination={{ clickable: true }}>
          <SwiperSlide>
            <DescriptionWrapper>
              <div>
                <Title1 variant={isMobile ? 'title6' : 'title5'} weight="700">
                  {EXPLANATIONS[0].heading}
                </Title1>
                <Description
                  variant={isMobile ? 'label' : 'body'}
                  color="shade7"
                  weight="400"
                >
                  {EXPLANATIONS[0].description}
                </Description>
              </div>
            </DescriptionWrapper>
            <ImageContainer>
              <ScanInOrdersBuyer />
            </ImageContainer>
          </SwiperSlide>
          <SwiperSlide>
            <DescriptionWrapper>
              <div>
                <Title1 variant={isMobile ? 'title6' : 'title5'} weight="700">
                  {EXPLANATIONS[1].heading}
                </Title1>
                <Description
                  variant={isMobile ? 'label' : 'body'}
                  color="shade7"
                  weight="400"
                >
                  {EXPLANATIONS[1].description}
                </Description>
              </div>
            </DescriptionWrapper>
            <ImageContainer>
              <TrackYourOrdersBuyer />
            </ImageContainer>
          </SwiperSlide>
          <SwiperSlide>
            <DescriptionWrapper>
              <div>
                <Title1 variant={isMobile ? 'title6' : 'title5'} weight="700">
                  {EXPLANATIONS[2].heading}
                </Title1>
                <Description
                  variant={isMobile ? 'label' : 'body'}
                  color="shade7"
                  weight="400"
                >
                  {EXPLANATIONS[2].description}
                </Description>
              </div>
            </DescriptionWrapper>
            <ImageContainer>
              <RateYourSellersBuyer />
            </ImageContainer>
          </SwiperSlide>
        </SwiperWrapper>
      </Visible>

      <Hidden xs>
        <Row style={{ padding: '75px 0' }}>
          <Col xs={12} sm={6}>
            <DescriptionWrapper>
              <div>
                <Title1 variant="title5" weight="700">
                  {EXPLANATIONS[0].heading}
                </Title1>
                <Typography color="shade7" weight="400">
                  {EXPLANATIONS[0].description}
                </Typography>
              </div>
            </DescriptionWrapper>
          </Col>
          <Col xs={12} sm={6}>
            <div style={{ margin: 'auto', height: '100%' }}>
              <ScanInOrdersBuyer />
            </div>
          </Col>
        </Row>

        <Row style={{ padding: '25px 0' }}>
          <Col xs={12} sm={6}>
            <div style={{ margin: 'auto', height: '100%' }}>
              <TrackYourOrdersBuyer />
            </div>
          </Col>
          <Col xs={12} sm={6}>
            <DescriptionWrapper>
              <div>
                <Title1 variant="title5" weight="700">
                  {EXPLANATIONS[1].heading}
                </Title1>
                <Typography color="shade7" weight="400">
                  {EXPLANATIONS[1].description}
                </Typography>
              </div>
            </DescriptionWrapper>
          </Col>
        </Row>

        <Row style={{ padding: '25px 0 0' }}>
          <Col xs={12} sm={6}>
            <DescriptionWrapper>
              <div>
                <Title1 variant="title5" weight="700">
                  {EXPLANATIONS[2].heading}
                </Title1>
                <Typography color="shade7" weight="400">
                  {EXPLANATIONS[2].description}
                </Typography>
              </div>
            </DescriptionWrapper>
          </Col>
          <Col xs={12} sm={6}>
            <div style={{ margin: 'auto', height: '100%' }}>
              <RateYourSellersBuyer />
            </div>
          </Col>
        </Row>
      </Hidden>
    </LandingDefaultContainer>
  );
};

export default BarcodeScannerDefaultView;
