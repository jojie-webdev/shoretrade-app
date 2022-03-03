import React, { useState } from 'react';

import AnimationPlayer from 'components/base/AnimationPlayer';
import Button from 'components/base/Button';
import Checkbox from 'components/base/Checkbox';
import { ChevronRight } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { Col, Hidden, Row, Visible } from 'react-grid-system';
import { AnimatedCrab } from 'res/images/animated/crab';
import { AnimatedOctopus } from 'res/images/animated/octopus';
import { AnimatedSwordfish } from 'res/images/animated/swordfish';
import { SwiperSlide } from 'swiper/react';
import { getTermsAndConditions } from 'utils/Links';

import { TermsAndConditionProps } from './TermsAndCondition.props';
import {
  Container,
  AnimatedComponentContainer,
  AnimatedImageContainer,
  AnimatedImageSubContainer,
  Card,
  CircleBackground,
  StyledAcceptTermsAndConditionText,
  StyledSwiper,
} from './TermsAndCondition.style';

const TermsAndCondition = (props: TermsAndConditionProps): JSX.Element => {
  const {
    appType,
    textWeb1,
    textWeb2,
    textMobile1,
    textMobile2,
    textMobile3,
    cardText1,
    cardText2,
    cardText3,
    setIsAcceptClicked,
  } = props;

  const [isAcceptChecked, setIsAcceptChecked] = useState(false);

  const renderCard = (carNumber: string, description: string, image: any) => (
    <Card appType={appType}>
      <Row>
        <Col>
          <div style={{ display: 'flex' }}>
            <Typography variant="title6" weight="700" color="shade5" altFont>
              /
            </Typography>
            <Typography
              color={appType === 'buyer' ? 'shade9' : 'noshade'}
              weight="400"
              variant="title3"
            >
              {carNumber}
            </Typography>
          </div>
        </Col>
      </Row>

      <Row style={{ marginTop: '16px' }}>
        <Col>
          <div style={{ width: '95%' }}>
            <Typography
              variant="label"
              color={appType === 'buyer' ? 'shade7' : 'shade4'}
              weight="400"
            >
              {description}
            </Typography>
          </div>
        </Col>
      </Row>

      <AnimatedImageContainer>
        <AnimatedImageSubContainer>{image}</AnimatedImageSubContainer>
      </AnimatedImageContainer>
    </Card>
  );

  const renderAnimation = (animatedComponent: JSX.Element) => (
    <AnimatedComponentContainer>
      <CircleBackground appType={appType} />
      <div style={{ position: 'absolute' }}>{animatedComponent}</div>
    </AnimatedComponentContainer>
  );

  const renderTermsConditions = () => (
    <div style={{ display: 'flex' }}>
      <Checkbox
        onClick={() => setIsAcceptChecked(true)}
        className="checkbox"
        checked={isAcceptChecked}
      />
      <StyledAcceptTermsAndConditionText
        weight="700"
        variant="label"
        color={appType === 'seller' ? 'noshade' : 'shade9'}
      >
        Accept{' '}
        <span
          style={{ cursor: 'pointer', textDecoration: 'underline' }}
          onClick={() => getTermsAndConditions(appType === 'seller')}
        >
          Terms &#38; Conditions
        </span>
      </StyledAcceptTermsAndConditionText>
    </div>
  );

  const renderButton = () => (
    <Button
      style={{
        borderRadius: '12px',
        marginTop: '16px',
      }}
      disabled={!isAcceptChecked}
      variant="primary"
      text="Get Started"
      textVariant="overline"
      textWeight="900"
      icon={
        <ChevronRight
          width={14}
          height={12}
          fill="white"
          style={{ paddingBottom: '2px' }}
        />
      }
      onClick={() => setIsAcceptClicked(true)}
    />
  );

  return (
    <Container>
      <Hidden xs sm>
        <Typography
          variant="label"
          weight="400"
          color={appType === 'seller' ? 'noshade' : 'shade7'}
          style={{ fontFamily: 'Basis Grotesque Pro' }}
        >
          {textWeb1}
        </Typography>
        <Typography
          variant="title5"
          weight="700"
          color={appType === 'seller' ? 'noshade' : 'shade9'}
          altFont
        >
          {textWeb2}
        </Typography>
      </Hidden>
      <Visible xs sm>
        <Typography
          variant="title5"
          weight="700"
          color={appType === 'seller' ? 'noshade' : 'shade9'}
          altFont
        >
          {textMobile1}
        </Typography>

        <div style={{ marginTop: '16px' }} />

        <Typography
          variant="label"
          weight="400"
          color={appType === 'seller' ? 'noshade' : 'shade7'}
        >
          {textMobile2}
        </Typography>
        <Typography
          variant="body"
          weight="700"
          color={appType === 'seller' ? 'noshade' : 'shade9'}
        >
          {textMobile3}
        </Typography>
      </Visible>

      <div style={{ marginTop: '24px' }} />

      <Row>
        <Hidden xs sm>
          <Col md={6} lg={6} xl={4} style={{ marginBottom: '24px' }}>
            {renderCard(
              '01',
              cardText1,
              renderAnimation(
                <AnimationPlayer
                  src={AnimatedOctopus}
                  style={{ width: '230px', height: '220px' }}
                />
              )
            )}
          </Col>

          <Col md={6} lg={6} xl={4} style={{ marginBottom: '24px' }}>
            {renderCard(
              '02',
              cardText2,
              renderAnimation(
                <AnimationPlayer
                  src={AnimatedSwordfish}
                  style={{ width: '230px', height: '220px' }}
                />
              )
            )}
          </Col>

          <Col xl={4} style={{ marginBottom: '24px' }}>
            {renderCard(
              '03',
              cardText3,
              renderAnimation(
                <AnimationPlayer
                  src={AnimatedCrab}
                  style={{ width: '230px', height: '220px' }}
                />
              )
            )}
          </Col>
        </Hidden>

        <Visible xs sm>
          <Col md={6} lg={6} xl={4} style={{ marginBottom: '16px' }}>
            <StyledSwiper
              appType={appType}
              spaceBetween={30}
              pagination={{ clickable: true }}
            >
              <SwiperSlide>
                {renderCard(
                  '01',
                  cardText1,
                  renderAnimation(
                    <AnimationPlayer
                      src={AnimatedOctopus}
                      style={{ width: '230px', height: '220px' }}
                    />
                  )
                )}
              </SwiperSlide>
              <SwiperSlide>
                {renderCard(
                  '02',
                  cardText2,
                  renderAnimation(
                    <AnimationPlayer
                      src={AnimatedSwordfish}
                      style={{ width: '230px', height: '220px' }}
                    />
                  )
                )}
              </SwiperSlide>
              <SwiperSlide>
                {renderCard(
                  '03',
                  cardText3,
                  renderAnimation(
                    <AnimationPlayer
                      src={AnimatedCrab}
                      style={{ width: '230px', height: '220px' }}
                    />
                  )
                )}
              </SwiperSlide>
            </StyledSwiper>
          </Col>
        </Visible>
      </Row>

      <Hidden xs sm>
        {renderTermsConditions()}
        {renderButton()}
      </Hidden>

      <Visible xs sm>
        <div style={{ marginTop: '82px' }}>
          {renderTermsConditions()}
          <Button
            style={{
              borderRadius: '12px',
              marginTop: '16px',
            }}
            disabled={!isAcceptChecked}
            variant="primary"
            text="Get Started"
            textVariant="overline"
            textWeight="900"
            takeFullWidth={true}
            onClick={() => setIsAcceptClicked(true)}
          />
        </div>
      </Visible>
    </Container>
  );
};

export default React.memo(TermsAndCondition);
