import React from 'react';

import Button from 'components/base/Button';
import {
  NegotiateBoardSFMSeller,
  NegotiateCardsSFMSeller,
  ProductOptionsSFMSeller,
  SfmAcceptNegotiation,
  SfmSellerLogo,
  SummaryBoardSFMSeller,
} from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Col, Hidden, Row, Visible } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import SfmSellerReceiveNego from 'res/images/sfm-seller-receive-nego.png';
import { SwiperSlide } from 'swiper/react';

import {
  EXPLANATIONS,
  SFM_MONTHLY_SUBSCRIPTION_PRICE,
} from './Landing.constants';
import {
  Container1,
  Description,
  DescriptionWrapper,
  FirstDescription,
  ImageContainer,
  LandingDefaultContainer,
  LogoContainer,
  MonthlySubsContainer,
  Pro,
  SubscriptionPayment,
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
          <SfmSellerLogo />
          {/* <Pro variant="small" style={{ color: '#090909' }}>
            PRO
          </Pro> */}
        </LogoContainer>
        <FirstDescription weight="400" color="shade6">
          Subscribe to unlock Negotiations & the Reverse Marketplace
        </FirstDescription>
        <MonthlySubsContainer>
          <Typography
            color="shade5"
            variant="caption"
            style={{ marginRight: 5 }}
          >
            $
          </Typography>
          <Typography
            variant="title6"
            weight="900"
            color="shade5"
            style={{ marginRight: 5 }}
          >
            {props?.planPrice || '0.00'}
          </Typography>
          <Typography className="per" color="shade5" variant="caption">
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
                  variant={isMobile ? 'title6' : 'title5'}
                  weight="700"
                  color="noshade"
                  style={{ fontFamily: 'Canela' }}
                >
                  {EXPLANATIONS[0].heading}
                </Title1>
                <Description
                  variant={isMobile ? 'label' : 'body'}
                  color="shade6"
                  weight="400"
                >
                  {EXPLANATIONS[0].descriptions[0]}
                </Description>
              </div>
            </DescriptionWrapper>
            <ImageContainer>
              <SummaryBoardSFMSeller />
            </ImageContainer>
          </SwiperSlide>
          <SwiperSlide>
            <DescriptionWrapper>
              <div>
                <Title1
                  variant={isMobile ? 'title6' : 'title5'}
                  weight="700"
                  color="noshade"
                  style={{ fontFamily: 'Canela' }}
                >
                  {EXPLANATIONS[1].heading}
                </Title1>
                <Description
                  variant={isMobile ? 'label' : 'body'}
                  color="shade6"
                  weight="400"
                >
                  {EXPLANATIONS[1].descriptions[0]}
                </Description>
              </div>
            </DescriptionWrapper>
            <ImageContainer>
              <NegotiateBoardSFMSeller />
            </ImageContainer>
          </SwiperSlide>
          <SwiperSlide>
            <DescriptionWrapper>
              <div>
                <Title1
                  variant={isMobile ? 'title6' : 'title5'}
                  weight="700"
                  color="noshade"
                  style={{ fontFamily: 'Canela' }}
                >
                  {EXPLANATIONS[2].heading}
                </Title1>
                <Description
                  variant={isMobile ? 'label' : 'body'}
                  color="shade6"
                  weight="400"
                >
                  {EXPLANATIONS[2].descriptions[0]}
                </Description>
              </div>
            </DescriptionWrapper>
            <ImageContainer>
              <img
                src={SfmSellerReceiveNego}
                alt="sfm-seller-receive-nego"
                width="100%"
                height="100%"
              />
            </ImageContainer>
          </SwiperSlide>
          <SwiperSlide>
            <DescriptionWrapper>
              <div>
                <Title1
                  variant={isMobile ? 'title6' : 'title5'}
                  weight="700"
                  color="noshade"
                  style={{ fontFamily: 'Canela' }}
                >
                  {EXPLANATIONS[3].heading}
                </Title1>
                <Description
                  variant={isMobile ? 'label' : 'body'}
                  color="shade6"
                  weight="400"
                >
                  {EXPLANATIONS[3].descriptions[0]}
                </Description>
              </div>
            </DescriptionWrapper>
            <ImageContainer>
              <ProductOptionsSFMSeller />
            </ImageContainer>
          </SwiperSlide>
        </SwiperWrapper>
      </Visible>

      <Hidden xs>
        <Row style={{ padding: '75px 0 0' }}>
          <Col xs={12} sm={6}>
            <Description>
              <div>
                {/* <Pro
                  variant="small"
                  style={{ display: 'inline', color: '#090909' }}
                >
                  PRO
                </Pro> */}
                <Title1
                  variant="title5"
                  weight="700"
                  color="noshade"
                  style={{ fontFamily: 'Canela' }}
                >
                  {EXPLANATIONS[0].heading}
                </Title1>
                <Typography color="shade6" weight="400">
                  {EXPLANATIONS[0].descriptions[0]}
                </Typography>
              </div>
            </Description>
          </Col>
          <Col xs={12} sm={6} style={{ display: 'flex' }}>
            <div style={{ margin: 'auto' }}>
              <SummaryBoardSFMSeller />
            </div>
          </Col>
        </Row>

        <Row style={{ padding: '25px 0' }}>
          <Col xs={12} sm={6}>
            <div style={{ margin: 'auto' }}>
              <NegotiateBoardSFMSeller />
            </div>
          </Col>
          <Col xs={12} sm={6}>
            <Description>
              <div>
                {/* <Pro
                  variant="small"
                  style={{ display: 'inline', color: '#090909' }}
                >
                  PRO
                </Pro> */}
                <Title1
                  variant="title5"
                  weight="700"
                  color="noshade"
                  style={{ fontFamily: 'Canela' }}
                >
                  {EXPLANATIONS[1].heading}
                </Title1>
                <Typography color="shade6" weight="400">
                  {EXPLANATIONS[1].descriptions[0]}
                </Typography>
              </div>
            </Description>
          </Col>
        </Row>

        <Row style={{ padding: '25px 0' }}>
          <Col xs={12} sm={6}>
            <Description>
              <div>
                {/* <Pro
                  variant="small"
                  style={{ display: 'inline', color: '#090909' }}
                >
                  PRO
                </Pro> */}
                <Title1
                  variant="title5"
                  weight="700"
                  color="noshade"
                  style={{ fontFamily: 'Canela' }}
                >
                  {EXPLANATIONS[2].heading}
                </Title1>
                <Typography color="shade6" weight="400">
                  {EXPLANATIONS[2].descriptions[0]}
                </Typography>
                <div style={{ marginTop: 5 }} />
                <Typography color="shade6" weight="400">
                  {EXPLANATIONS[2].descriptions[1]}
                </Typography>
              </div>
            </Description>
          </Col>
          <Col xs={12} sm={6} style={{ display: 'flex' }}>
            <div style={{ margin: 'auto' }}>
              <img
                src={SfmSellerReceiveNego}
                alt="sfm-seller-receive-nego"
                width="100%"
                height="100%"
              />
            </div>
          </Col>
        </Row>

        <Row style={{ padding: '25px 0 0' }}>
          <Col xs={12} sm={6}>
            <ImageContainer>
              <SfmAcceptNegotiation width="100%" height="100%" />
            </ImageContainer>
          </Col>
          <Col xs={12} sm={6}>
            <Description>
              <div>
                {/* <Pro
                  variant="small"
                  style={{ display: 'inline', color: '#090909' }}
                >
                  PRO
                </Pro> */}
                <Title1
                  variant="title5"
                  weight="700"
                  color="noshade"
                  style={{ fontFamily: 'Canela' }}
                >
                  {EXPLANATIONS[3].heading}
                </Title1>
                <Typography color="shade6" weight="400">
                  {EXPLANATIONS[3].descriptions[0]}
                </Typography>
              </div>
            </Description>
          </Col>
        </Row>
      </Hidden>
    </LandingDefaultContainer>
  );
};

export default LandingSFMView;
