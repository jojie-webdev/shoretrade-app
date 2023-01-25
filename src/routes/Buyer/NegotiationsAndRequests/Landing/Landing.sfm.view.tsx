import React from 'react';

import Button from 'components/base/Button';
import {
  SfmBuyerNegotiatePrice,
  SfmBuyerReceiveOffersCards,
  SfmLogo2,
} from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Col, Hidden, Row, Visible } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import SFMBuyerNegotiateCards from 'res/images/sfm-buyer-negotiate-cards.png';
import SFMBuyerProductOptions from 'res/images/sfm-buyer-product-options.png';
import SFMBuyerReceiveOffersCards from 'res/images/sfm-buyer-receive-offers-cards.png';
import SFMBuyerSummaryBoard from 'res/images/sfm-buyer-summary-board.png';
import SfmBuyerListing from 'res/images/SfmBuyerListing.png';
import { SwiperSlide } from 'swiper/react';

import { EXPLANATIONS } from './Landing.sfm.constants';
import {
  Container1,
  Description,
  DescriptionWrapper,
  FirstDescription,
  ImageContainer,
  ImageContainer2,
  LandingDefaultContainer,
  LogoContainer,
  MonthlySubsContainer,
  Pro,
  SwiperWrapper,
  Title1,
} from './Landing.style';

const LandingSFMView = (props: {
  handleSeePlansClick: () => void;
  planPrice?: number | string;
}) => {
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
          Upgrade your plan to unlock Negotiations & the Reverse Marketplace
        </FirstDescription>
        <MonthlySubsContainer>
          <Typography
            color="shade7"
            variant="caption"
            style={{ marginRight: 5 }}
          >
            $
          </Typography>
          <Typography variant="title6" weight="900" style={{ marginRight: 5 }}>
            {props?.planPrice || '0.00'}
          </Typography>
          <Typography className="per" color="shade7" variant="caption">
            /month
          </Typography>
        </MonthlySubsContainer>
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
                  variant={isMobile ? 'title6' : 'title4'}
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
                  {EXPLANATIONS[0].descriptions[0]}
                </Description>
                <Description
                  variant={isMobile ? 'label' : 'body'}
                  color="shade7"
                  weight="400"
                >
                  {EXPLANATIONS[0].descriptions[1]}
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
                  variant={isMobile ? 'title6' : 'title4'}
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
                  {EXPLANATIONS[1].descriptions[0]}
                </Description>
              </div>
            </DescriptionWrapper>
            <ImageContainer>
              <SfmBuyerReceiveOffersCards width="100%" height="100%" />
            </ImageContainer>
          </SwiperSlide>

          <SwiperSlide>
            <DescriptionWrapper>
              <div>
                <Title1
                  variant={isMobile ? 'title6' : 'title4'}
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
                  {EXPLANATIONS[2].descriptions[0]}
                </Description>
              </div>
            </DescriptionWrapper>
            <ImageContainer>
              <div style={{ margin: 'auto' }}>
                <ImageContainer2>
                  <img
                    src={SfmBuyerListing}
                    alt="sfm-buyer-listing-image"
                    width="100%"
                    height="100%"
                  />
                </ImageContainer2>
              </div>
            </ImageContainer>
          </SwiperSlide>

          <SwiperSlide>
            <DescriptionWrapper>
              <div>
                <Title1
                  variant={isMobile ? 'title6' : 'title4'}
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
                  {EXPLANATIONS[3].descriptions[0]}
                </Description>
              </div>
            </DescriptionWrapper>
            <ImageContainer>
              <SfmBuyerNegotiatePrice width="100%" height="100%" />
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
                  variant="title4"
                  weight="700"
                  style={{ fontFamily: 'Canela' }}
                >
                  {EXPLANATIONS[0].heading}
                </Title1>
                <Typography color="shade7" weight="400">
                  {EXPLANATIONS[0].descriptions[0]}
                </Typography>
                <div style={{ marginTop: 10 }} />
                <Typography color="shade7" weight="400">
                  {EXPLANATIONS[0].descriptions[1]}
                </Typography>
              </div>
            </DescriptionWrapper>
          </Col>
          <Col xs={12} sm={6}>
            <ImageContainer2>
              <img
                src={SFMBuyerSummaryBoard}
                alt="sfm-buyer-summary-board"
                style={{ width: 382, height: 312 }}
              />
            </ImageContainer2>
          </Col>
        </Row>

        <Row style={{ padding: '25px 0' }}>
          <Col xs={12} sm={6}>
            <div style={{ maxWidth: 476, maxHeight: 379 }}>
              <SfmBuyerReceiveOffersCards width="100%" height="100%" />
            </div>
          </Col>
          <Col xs={12} sm={6}>
            <DescriptionWrapper>
              <div>
                <Title1
                  variant="title4"
                  weight="700"
                  style={{ fontFamily: 'Canela' }}
                >
                  {EXPLANATIONS[1].heading}
                </Title1>
                <Typography color="shade7" weight="400">
                  {EXPLANATIONS[1].descriptions[0]}
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
                  variant="title4"
                  weight="700"
                  style={{ fontFamily: 'Canela' }}
                >
                  {EXPLANATIONS[2].heading}
                </Title1>
                <Typography color="shade7" weight="400">
                  {EXPLANATIONS[2].descriptions[0]}
                </Typography>
              </div>
            </DescriptionWrapper>
          </Col>
          <Col xs={12} sm={6}>
            <div style={{ margin: 'auto' }}>
              <ImageContainer2>
                <div style={{ maxWidth: 308, maxHeight: 497 }}>
                  <img
                    src={SfmBuyerListing}
                    alt="sfm-buyer-listing-image"
                    width="100%"
                    height="100%"
                  />
                </div>
              </ImageContainer2>
            </div>
          </Col>
        </Row>

        <Row style={{ padding: '25px 0 0' }}>
          <Col xs={12} sm={6}>
            <div style={{ maxWidth: 476, maxHeight: 379 }}>
              <SfmBuyerNegotiatePrice width="100%" height="100%" />
            </div>
          </Col>
          <Col xs={12} sm={6}>
            <DescriptionWrapper>
              <div>
                <Pro>PRO</Pro>
                <Title1
                  variant="title4"
                  weight="700"
                  style={{ fontFamily: 'Canela' }}
                >
                  {EXPLANATIONS[3].heading}
                </Title1>
                <Typography color="shade7" weight="400">
                  {EXPLANATIONS[3].descriptions[0]}
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
