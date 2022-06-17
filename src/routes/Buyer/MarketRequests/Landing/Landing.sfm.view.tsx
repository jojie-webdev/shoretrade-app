import React from 'react';

import Button from 'components/base/Button';
import {
  NegotiateBoardSFMBuyer,
  NegotiateCardsSFMBuyer,
  ProductOptionsSFMBuyer,
  SfmLogo2,
  SummaryBoardSFMBuyer,
} from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Col, Hidden, Row, Visible } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { SwiperSlide } from 'swiper/react';

import { EXPLANATIONS, MONTHLY_SUBSCRIPTION_PRICE } from './Landing.constants';
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

const LandingSFMView = () => {
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
          Can’t find a product? Create a Market Request!
        </FirstDescription>

        <SubscriptionPayment
          variant="caption"
          color="shade7"
          style={{ display: 'inline-flex' }}
        >
          $
          <Typography variant="title5">{MONTHLY_SUBSCRIPTION_PRICE}</Typography>
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
              <SummaryBoardSFMBuyer />
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
              <NegotiateBoardSFMBuyer />
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
              <NegotiateCardsSFMBuyer />
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
                  {EXPLANATIONS[3].heading}
                </Title1>
                <Description
                  variant={isMobile ? 'label' : 'body'}
                  color="shade7"
                  weight="400"
                >
                  {EXPLANATIONS[3].description}
                </Description>
              </div>
            </DescriptionWrapper>
            <ImageContainer>
              <ProductOptionsSFMBuyer />
            </ImageContainer>
          </SwiperSlide>
        </SwiperWrapper>
      </Visible>

      <Hidden xs>
        <Row style={{ padding: '75px 0' }}>
          <Col xs={12} sm={6}>
            <DescriptionWrapper>
              <div>
                <Pro variant="small" style={{ display: 'inline' }}>
                  PRO
                </Pro>
                <Title1
                  variant="title5"
                  weight="700"
                  style={{ fontFamily: 'Canela' }}
                >
                  {EXPLANATIONS[0].heading}
                </Title1>
                <Typography color="shade7" weight="400">
                  {EXPLANATIONS[0].description}
                </Typography>
              </div>
            </DescriptionWrapper>
          </Col>
          <Col xs={12} sm={6}>
            <div style={{ margin: 'auto' }}>
              <SummaryBoardSFMBuyer />
            </div>
          </Col>
        </Row>

        <Row style={{ padding: '25px 0' }}>
          <Col xs={12} sm={6}>
            <div style={{ margin: 'auto' }}>
              <NegotiateBoardSFMBuyer />
            </div>
          </Col>
          <Col xs={12} sm={6}>
            <DescriptionWrapper>
              <div>
                <Pro variant="small" style={{ display: 'inline' }}>
                  PRO
                </Pro>
                <Title1
                  variant="title5"
                  weight="700"
                  style={{ fontFamily: 'Canela' }}
                >
                  {EXPLANATIONS[1].description}
                </Title1>
                <Typography color="shade7" weight="400">
                  {EXPLANATIONS[1].description}
                </Typography>
              </div>
            </DescriptionWrapper>
          </Col>
        </Row>

        <Row style={{ padding: '25px 0' }}>
          <Col xs={12} sm={6}>
            <DescriptionWrapper>
              <div>
                <Pro variant="small" style={{ display: 'inline' }}>
                  PRO
                </Pro>
                <Title1
                  variant="title5"
                  weight="700"
                  style={{ fontFamily: 'Canela' }}
                >
                  {EXPLANATIONS[2].heading}
                </Title1>
                <Typography color="shade7" weight="400">
                  {EXPLANATIONS[2].description}
                </Typography>
              </div>
            </DescriptionWrapper>
          </Col>
          <Col xs={12} sm={6}>
            <div style={{ margin: 'auto' }}>
              <NegotiateCardsSFMBuyer />
            </div>
          </Col>
        </Row>

        <Row style={{ padding: '25px 0 0' }}>
          <Col xs={12} sm={6}>
            <div style={{ margin: 'auto' }}>
              <ProductOptionsSFMBuyer />
            </div>
          </Col>
          <Col xs={12} sm={6}>
            <DescriptionWrapper>
              <div>
                <Pro variant="small" style={{ display: 'inline' }}>
                  PRO
                </Pro>
                <Title1
                  variant="title5"
                  weight="700"
                  style={{ fontFamily: 'Canela' }}
                >
                  {EXPLANATIONS[3].heading}
                </Title1>
                <Typography color="shade7" weight="400">
                  {EXPLANATIONS[3].description}
                </Typography>
              </div>
            </DescriptionWrapper>
          </Col>
        </Row>
      </Hidden>
    </LandingDefaultContainer>
  );
};

export default LandingSFMView;
