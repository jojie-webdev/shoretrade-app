import React from 'react';

import Button from 'components/base/Button';
import {
  RateYourSellersSFMBuyer,
  ScanInOrdersSFMBuyer,
  SfmLogo2,
  TrackYourOrdersSFMBuyer,
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
  Pro,
  SubscriptionPayment,
  SwiperWrapper,
  Title1,
} from './BarcodeScanner.style';

const BarcodeScannerSFMView = () => {
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

  return (
    <LandingDefaultContainer>
      <Container1>
        <LogoContainer>
          <div style={{ marginTop: 7 }}>
            <SfmLogo2 />
          </div>
          <Pro variant="small">PRO</Pro>
        </LogoContainer>
        <FirstDescription weight="400" color="shade7">
          Download the “SFMBlue or ShoreTrade” Buyer App to scan &amp; mark your
          orders as completed
        </FirstDescription>

        <SubscriptionPayment
          variant="caption"
          color="shade7"
          style={{ display: 'inline-flex' }}
        >
          $
          <Typography variant="title5" color="shade9">
            {MONTHLY_SUBSCRIPTION_PRICE}
          </Typography>
          <Typography variant="caption" color="shade7">
            /month
          </Typography>
        </SubscriptionPayment>
        <Button
          padding={isMobile ? '10px 16px' : '14px 24px'}
          textVariant="label"
          textWeight="400"
          text="See plans"
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
                  style={{ fontFamily: 'Canela' }}
                >
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
              <ScanInOrdersSFMBuyer />
            </ImageContainer>
          </SwiperSlide>
          <SwiperSlide>
            <DescriptionWrapper>
              <div>
                <Title1
                  variant={isMobile ? 'title6' : 'title5'}
                  weight="700"
                  style={{ fontFamily: 'Canela' }}
                >
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
              <TrackYourOrdersSFMBuyer />
            </ImageContainer>
          </SwiperSlide>
          <SwiperSlide>
            <DescriptionWrapper>
              <div>
                <Title1
                  variant={isMobile ? 'title6' : 'title5'}
                  weight="700"
                  style={{ fontFamily: 'Canela' }}
                >
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
              <RateYourSellersSFMBuyer />
            </ImageContainer>
          </SwiperSlide>
        </SwiperWrapper>
      </Visible>

      <Hidden xs>
        <Row style={{ padding: '75px 0' }}>
          <Col xs={12} sm={6}>
            <Description>
              <div>
                <Pro variant="small" style={{ display: 'inline' }}>
                  PRO
                </Pro>
                <Title1
                  variant="title5"
                  weight="700"
                  color="shade9"
                  style={{ fontFamily: 'Canela' }}
                >
                  {EXPLANATIONS[0].heading}
                </Title1>
                <Typography color="shade7" weight="400">
                  {EXPLANATIONS[0].description}
                </Typography>
              </div>
            </Description>
          </Col>
          <Col xs={12} sm={6}>
            <div style={{ margin: 'auto' }}>
              <ScanInOrdersSFMBuyer />
            </div>
          </Col>
        </Row>

        <Row style={{ padding: '25px 0' }}>
          <Col xs={12} sm={6}>
            <div style={{ margin: 'auto' }}>
              <TrackYourOrdersSFMBuyer />
            </div>
          </Col>
          <Col xs={12} sm={6}>
            <Description>
              <div>
                <Pro variant="small" style={{ display: 'inline' }}>
                  PRO
                </Pro>
                <Title1
                  variant="title5"
                  weight="700"
                  color="shade9"
                  style={{ fontFamily: 'Canela' }}
                >
                  {EXPLANATIONS[1].heading}
                </Title1>
                <Typography color="shade7" weight="400">
                  {EXPLANATIONS[1].description}
                </Typography>
              </div>
            </Description>
          </Col>
        </Row>

        <Row style={{ padding: '25px 0 0' }}>
          <Col xs={12} sm={6}>
            <Description>
              <div>
                <Pro variant="small" style={{ display: 'inline' }}>
                  PRO
                </Pro>
                <Title1
                  variant="title5"
                  weight="700"
                  color="shade9"
                  style={{ fontFamily: 'Canela' }}
                >
                  {EXPLANATIONS[2].heading}
                </Title1>
                <Typography color="shade7" weight="400">
                  {EXPLANATIONS[2].description}
                </Typography>
              </div>
            </Description>
          </Col>
          <Col xs={12} sm={6}>
            <div style={{ margin: 'auto' }}>
              <RateYourSellersSFMBuyer />
            </div>
          </Col>
        </Row>
      </Hidden>
    </LandingDefaultContainer>
  );
};

export default BarcodeScannerSFMView;
