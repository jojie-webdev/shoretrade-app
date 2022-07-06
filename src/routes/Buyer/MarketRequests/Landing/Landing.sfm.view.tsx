import React from 'react';

import Button from 'components/base/Button';
import { SfmLogo2 } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Col, Hidden, Row, Visible } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import SFMBuyerNegotiateCards from 'res/images/sfm-buyer-negotiate-cards.png';
import SFMBuyerProductOptions from 'res/images/sfm-buyer-product-options.png';
import SFMBuyerReceiveOffersCards from 'res/images/sfm-buyer-receive-offers-cards.png';
import SFMBuyerSummaryBoard from 'res/images/sfm-buyer-summary-board.png';
import { SwiperSlide } from 'swiper/react';

import { EXPLANATIONS } from './Landing.constants';
import {
  Container1,
  Description,
  DescriptionWrapper,
  FirstDescription,
  ImageContainer,
  ImageContainer2,
  LandingDefaultContainer,
  LogoContainer,
  SwiperWrapper,
  Title1,
} from './Landing.style';

const LandingSFMView = (props: { handleSeePlansClick: () => void }) => {
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

  return (
    <LandingDefaultContainer>
      <Container1>
        <LogoContainer>
          <div style={{ marginTop: 7 }}>
            <SfmLogo2 />
          </div>
        </LogoContainer>
        <FirstDescription weight="400" color="shade7">
          Can’t find a product? Create a Market Request!
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
              <img
                src={SFMBuyerSummaryBoard}
                alt="sfm-buyer-summary-board"
                style={{ width: '100%' }}
              />
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
              <img
                src={SFMBuyerReceiveOffersCards}
                alt="sfm-buyer-receive-offers-cards.png"
                style={{ width: '100%', height: '100%' }}
              />
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
              <img
                src={SFMBuyerNegotiateCards}
                alt="sfm-buyer-negotiate-cards"
                style={{ width: '100%' }}
              />
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
              <img
                src={SFMBuyerProductOptions}
                alt="sfm-buyer-product-options"
                style={{ width: '100%' }}
              />
            </ImageContainer>
          </SwiperSlide>
        </SwiperWrapper>
      </Visible>

      <Hidden xs>
        <Row style={{ padding: '75px 0' }}>
          <Col xs={12} sm={6}>
            <DescriptionWrapper>
              <div>
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
            <ImageContainer2>
              <div style={{ maxWidth: 476, maxHeight: 379 }}>
                <img
                  src={SFMBuyerSummaryBoard}
                  alt="sfm-buyer-summary-board"
                  style={{ width: '100%' }}
                />
              </div>
            </ImageContainer2>
          </Col>
        </Row>

        <Row style={{ padding: '25px 0' }}>
          <Col xs={12} sm={6}>
            <ImageContainer2>
              <div style={{ maxWidth: 311, maxHeight: 312 }}>
                <img
                  src={SFMBuyerReceiveOffersCards}
                  alt="sfm-buyer-receive-offers-cards.png"
                  style={{ width: '100%' }}
                />
              </div>
            </ImageContainer2>
          </Col>
          <Col xs={12} sm={6}>
            <DescriptionWrapper>
              <div>
                <Title1
                  variant="title5"
                  weight="700"
                  style={{ fontFamily: 'Canela' }}
                >
                  {EXPLANATIONS[1].heading}
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
              <ImageContainer2>
                <div style={{ maxWidth: 476, maxHeight: 379 }}>
                  <img
                    src={SFMBuyerNegotiateCards}
                    alt="sfm-buyer-negotiate-cards"
                    style={{ width: '100%' }}
                  />
                </div>
              </ImageContainer2>
            </div>
          </Col>
        </Row>

        <Row style={{ padding: '25px 0 0' }}>
          <Col xs={12} sm={6}>
            <div style={{ margin: 'auto' }}>
              <ImageContainer2>
                <div style={{ maxWidth: 476, maxHeight: 379 }}>
                  <img
                    src={SFMBuyerProductOptions}
                    alt="sfm-buyer-product-options"
                    style={{ width: '100%' }}
                  />
                </div>
              </ImageContainer2>
            </div>
          </Col>
          <Col xs={12} sm={6}>
            <DescriptionWrapper>
              <div>
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
