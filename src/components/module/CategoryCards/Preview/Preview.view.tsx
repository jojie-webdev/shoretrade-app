import React from 'react';

import Badge from 'components/base/Badge';
import { Crate, Location, MarketBoardOutlined } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { ADDITIONAL_INFOS } from 'consts/listingAdditionalInfos';
import moment from 'moment';
import { Row, Col } from 'react-grid-system';
import { useSelector } from 'react-redux';
import { getActivePlan } from 'routes/Buyer/Account/SubscriptionPlan/SubscriptionPlan.transform';
import { CompanyPlanName } from 'types/store/GetCompanyPlanState';
import { Store } from 'types/store/Store';
import { Theme } from 'types/Theme';
import { isPreAuctionExpired } from 'utils/Listing';
import {
  formatMeasurementUnit,
  formatUnitToPricePerUnit,
} from 'utils/Listing/formatMeasurementUnit';
import { formatTemplateDeliveryDateLabel } from 'utils/Listing/formatTemplateDeliveryDateLabel';
import { parseImageUrl } from 'utils/parseImageURL';
import { SpecialColors } from 'utils/SFMTheme';
import { ellipsisOnOverflow } from 'utils/String/ellipsisOnOverflow';
import { useTheme } from 'utils/Theme';

import { PreviewProps } from './Preview.props';
import {
  CardContainer,
  DetailsContainer,
  HeaderContainer,
  PriceContainer,
  Price,
  Title,
  BadgeContainer,
  LocationContainer,
  BodyContainer,
  StatusContainer,
  BadgeText,
  ResultText,
  ResultTextValue,
  ResultTextAlt,
  ResultTextValueAlt,
  PriceContainerAlt,
  Image,
  TitleContainer,
  BodyColumnContainer,
  BodyContainerAlt,
  NegotiatePriceBtnWrapper,
  NegotiatePriceText,
  NegotiatePriceBtnContainer,
} from './Preview.style';

export const PreviewDetailAlt = (props: PreviewProps) => {
  const { hiddenPrice, hiddenVendor, alternate } = props;
  const theme = useTheme();

  const remaining = ellipsisOnOverflow(
    `${props.remaining} ${formatMeasurementUnit(props.unit)}`,
    10
  );

  const minOrder = ellipsisOnOverflow(
    `${props.minimumOrder} ${props.unit}`,
    10
  );

  return (
    <DetailsContainer>
      <HeaderContainer>
        <Row nogutter>
          <div style={{ flex: 1, height: alternate ? 'auto' : 40 }}>
            <TitleContainer>
              <Image imgSrc={props.images[0]} />
              <Title style={{ width: '100%' }} variant="body" weight="bold">
                {props.type}
              </Title>
            </TitleContainer>
            {!hiddenPrice && (
              <PriceContainerAlt>
                <Price className="price" variant="body" weight="bold">
                  {props.price}
                </Price>
                <Typography
                  style={{ textAlign: 'end' }}
                  variant="small"
                  color="shade6"
                >
                  per{' '}
                  {formatUnitToPricePerUnit(formatMeasurementUnit(props.unit))}
                </Typography>
              </PriceContainerAlt>
            )}
          </div>
        </Row>
      </HeaderContainer>
      <div style={{ display: 'flex' }}>
        <StatusContainer>
          <Row nogutter>
            {ADDITIONAL_INFOS.map((additionalInfo) => {
              return (
                props[additionalInfo.key as keyof PreviewProps] && (
                  <Col xs="content" style={{ marginTop: '5px' }}>
                    <Badge
                      fontColor={theme.grey.noshade}
                      badgeColor={theme.brand.info}
                    >
                      <BadgeText
                        variant="caption"
                        weight="bold"
                        color="noshade"
                        style={{
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                        }}
                      >
                        {additionalInfo.display}
                      </BadgeText>
                    </Badge>
                  </Col>
                )
              );
            })}
            {props.quality && (
              <Col xs="content" style={{ marginTop: '5px' }}>
                <Badge
                  fontColor={theme.grey.noshade}
                  badgeColor={theme.brand.info}
                >
                  <BadgeText
                    variant="caption"
                    weight="bold"
                    color="noshade"
                    style={{
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                    }}
                  >
                    {props.quality}
                  </BadgeText>
                </Badge>
              </Col>
            )}
            {props.state?.map((item) => {
              return (
                <Col xs="content" style={{ marginTop: '5px' }}>
                  <Badge
                    key={item}
                    fontColor={theme.grey.shade9}
                    badgeColor={theme.grey.shade2}
                  >
                    <BadgeText
                      variant="caption"
                      weight="bold"
                      style={{
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                      }}
                    >
                      {item}
                    </BadgeText>
                  </Badge>
                </Col>
              );
            })}
          </Row>
        </StatusContainer>
      </div>
      <BodyContainerAlt>
        <BodyColumnContainer>
          <Row nogutter>
            <ResultTextAlt
              style={{ paddingRight: 8 }}
              variant="small"
              color="shade6"
            >
              Remaining:
            </ResultTextAlt>
            <ResultTextValueAlt variant="small" weight="bold">
              {remaining}
            </ResultTextValueAlt>
          </Row>
          <Row nogutter>
            <ResultTextAlt
              variant="small"
              color="shade6"
              style={{ paddingRight: 8 }}
            >
              Size:
            </ResultTextAlt>
            <ResultTextValueAlt variant="small" weight="bold">
              {ellipsisOnOverflow(props.weight, 16)}
            </ResultTextValueAlt>
          </Row>
        </BodyColumnContainer>
        <BodyColumnContainer>
          {!hiddenVendor && (
            <Row nogutter>
              <ResultTextAlt
                variant="small"
                color="shade6"
                style={{ paddingRight: 8 }}
              >
                Vendor:
              </ResultTextAlt>
              <ResultTextValueAlt variant="small" weight="700">
                {ellipsisOnOverflow(props.coop ? props.coop.name : '', 15)}
              </ResultTextValueAlt>
            </Row>
          )}
          <Row nogutter>
            <ResultTextAlt
              variant="small"
              color="shade6"
              style={{ paddingRight: 8 }}
            >
              Min Order:
            </ResultTextAlt>
            <ResultTextValueAlt variant="small" weight="bold">
              {minOrder}
            </ResultTextValueAlt>
          </Row>
          <Row nogutter>
            <ResultTextAlt
              variant="small"
              color="shade6"
              style={{
                paddingRight: 8,
                visibility: props.templateDeliveryDate ? 'visible' : 'hidden',
              }}
            >
              Est. Collection:
            </ResultTextAlt>
            <ResultTextValueAlt variant="small" weight="bold">
              {props.templateDeliveryDate &&
                formatTemplateDeliveryDateLabel(props.templateDeliveryDate)}
            </ResultTextValueAlt>
          </Row>
        </BodyColumnContainer>
      </BodyContainerAlt>
    </DetailsContainer>
  );
};

const Preview = (props: PreviewProps): JSX.Element => {
  const {
    cardContainerStyle,
    cardContainerClass,
    hiddenPrice,
    hiddenVendor,
    canNegotiate,
    allowNegotiations,
    handleShowNegoCreditsModal,
    handleShowNegoModal,
    negotiationCredit,
  } = props;
  const theme = useTheme();

  const allowedNegotiationByBuyer = allowNegotiations;
  const hasCredits =
    negotiationCredit?.is_unlimited || (negotiationCredit?.credit || 0) > 0;

  const NegotiatePriceElem = (props: {
    backgroundColor: string;
    iconFill: string;
    fontColor: keyof Theme['brand'] | keyof Theme['grey'];
    text?: string;
  }) => {
    return (
      <NegotiatePriceBtnContainer>
        <NegotiatePriceBtnWrapper backgroundColor={props.backgroundColor}>
          <MarketBoardOutlined fill={props.iconFill} />
          <div style={{ marginRight: 5 }} />
          <NegotiatePriceText
            variant="small"
            color={props.fontColor || 'noshade'}
            style={{ paddingRight: 8, marginTop: 2 }}
          >
            {props.text || 'NEGOTIATE PRICE'}
          </NegotiatePriceText>
        </NegotiatePriceBtnWrapper>
      </NegotiatePriceBtnContainer>
    );
  };

  return (
    <CardContainer
      className="category-preview-card"
      img={parseImageUrl(props.images[0])}
    >
      <div
        className={`card zoom ${cardContainerClass ? cardContainerClass : ''}`}
        style={cardContainerStyle}
      >
        <div className="imgContainer">
          <div className="img" style={{ maxHeight: 200 }} />

          <LocationContainer>
            <Badge badgeColor={theme.isSFM ? SpecialColors.blue : undefined}>
              <div style={{ flexDirection: 'row', display: 'flex' }}>
                <Location
                  fill={theme.isSFM ? theme.grey.noshade : undefined}
                  height={10.06}
                  width={8.5}
                />
                <Typography
                  className="location-font"
                  variant="small"
                  color="noshade"
                >
                  {props.shippingFrom?.state}, {props.shippingFrom?.countryCode}
                </Typography>
              </div>
            </Badge>

            {props.isSFMCrate && (
              <Badge
                badgeColor={theme.isSFM ? SpecialColors.blue : undefined}
                style={{ marginTop: '4px' }}
                padding="0 6px"
              >
                <Crate
                  width={14}
                  fill={theme.isSFM ? theme.grey.noshade : undefined}
                />
              </Badge>
            )}
          </LocationContainer>

          <BadgeContainer>
            {props.isAquafuture && (
              <Badge
                className="badge"
                badgeColor={
                  theme.isSFM
                    ? SpecialColors.secondaryOpacity
                    : theme.grey.shade8
                }
              >
                <Typography
                  noSfmFont
                  color={theme.isSFM ? 'info' : 'shade4'}
                  variant="overline"
                  weight={theme.isSFM ? '900' : '500'}
                >
                  Aquafuture
                </Typography>
              </Badge>
            )}
            {parseInt(props.remaining || '0') <= 50 &&
              !props.catchRecurrence && (
                <Badge
                  className="badge"
                  badgeColor={
                    theme.isSFM
                      ? SpecialColors.secondaryOpacity
                      : theme.brand.warning
                  }
                >
                  <Typography
                    noSfmFont
                    color={theme.isSFM ? 'warning' : 'noshade'}
                    variant="overline"
                    weight={theme.isSFM ? '900' : '500'}
                  >
                    Almost Gone!
                  </Typography>
                </Badge>
              )}
            {props.catchRecurrence && (
              <Badge
                className="badge"
                badgeColor={
                  theme.isSFM
                    ? SpecialColors.secondaryOpacity
                    : theme.brand.success
                }
              >
                <Typography
                  noSfmFont
                  color={theme.isSFM ? 'success' : 'noshade'}
                  variant="overline"
                  weight={theme.isSFM ? '900' : '500'}
                >
                  Next Day Shipment
                </Typography>
              </Badge>
            )}
            {props.isForSaleRepPhoto && (
              <Badge
                className="badge"
                badgeColor={
                  theme.isSFM
                    ? SpecialColors.secondaryOpacity
                    : theme.brand.error
                }
              >
                <Typography
                  noSfmFont
                  color={theme.isSFM ? 'error' : 'noshade'}
                  variant="overline"
                  weight={theme.isSFM ? '900' : '500'}
                >
                  Not Actual Product
                </Typography>
              </Badge>
            )}
          </BadgeContainer>
        </div>
        <DetailsContainer>
          <HeaderContainer>
            <Row nogutter>
              <div style={{ flex: 1, height: 40 }}>
                <Title
                  altFont={theme.isSFM}
                  style={{ width: '100%' }}
                  variant="body"
                  weight="bold"
                  color={theme.isSFM ? 'secondary' : undefined}
                >
                  {props.type}
                </Title>
              </div>
              {!hiddenPrice && (
                <PriceContainer>
                  <Price
                    color={theme.isSFM ? 'secondary' : undefined}
                    variant="body"
                    weight="bold"
                  >
                    {props.price}
                  </Price>
                  <Typography
                    noSfmFont
                    style={{
                      textAlign: 'end',
                      opacity: theme.isSFM ? '0.5' : '1',
                    }}
                    variant="small"
                    color={theme.isSFM ? 'secondary' : 'shade6'}
                  >
                    per{' '}
                    {formatUnitToPricePerUnit(
                      formatMeasurementUnit(props.unit)
                    )}
                  </Typography>
                </PriceContainer>
              )}
            </Row>
          </HeaderContainer>
          <div style={{ display: 'flex' }}>
            <StatusContainer>
              <Row nogutter>
                {ADDITIONAL_INFOS.map((additionalInfo) => {
                  return (
                    props[additionalInfo.key as keyof PreviewProps] && (
                      <Col xs="content" style={{ marginTop: '5px' }}>
                        <Badge
                          fontColor={theme.grey.noshade}
                          badgeColor={theme.brand.info}
                        >
                          <BadgeText
                            variant="caption"
                            weight="bold"
                            color="noshade"
                            noSfmFont
                            style={{
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                            }}
                          >
                            {additionalInfo.display}
                          </BadgeText>
                        </Badge>
                      </Col>
                    )
                  );
                })}
                {props.quality && (
                  <Col xs="content" style={{ marginTop: '5px' }}>
                    <Badge
                      fontColor={theme.grey.noshade}
                      badgeColor={theme.brand.info}
                    >
                      <BadgeText
                        variant="caption"
                        weight="bold"
                        color="noshade"
                        noSfmFont
                        style={{
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                        }}
                      >
                        {props.quality}
                      </BadgeText>
                    </Badge>
                  </Col>
                )}
                {props.state?.map((item) => {
                  return (
                    <Col xs="content" style={{ marginTop: '5px' }}>
                      <Badge
                        key={item}
                        fontColor={
                          theme.isSFM
                            ? theme.brand.secondary
                            : theme.grey.noshade
                        }
                        badgeColor={
                          theme.isSFM ? theme.grey.shade5 : theme.grey.shade2
                        }
                      >
                        <BadgeText
                          variant="caption"
                          weight="bold"
                          noSfmFont
                          style={{
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                          }}
                          color={theme.isSFM ? 'secondary' : 'shade8'}
                        >
                          {item}
                        </BadgeText>
                      </Badge>
                    </Col>
                  );
                })}
              </Row>
            </StatusContainer>
          </div>
          <BodyContainer>
            <Row nogutter justify="between">
              <ResultText
                style={{ paddingRight: 8 }}
                variant="small"
                color="shade6"
              >
                Remaining:
              </ResultText>
              <ResultTextValue
                color={theme.isSFM ? 'secondary' : undefined}
                variant="small"
                weight="bold"
              >
                {props.remaining} {formatMeasurementUnit(props.unit)}
              </ResultTextValue>
            </Row>
            <Row justify="between" nogutter>
              <ResultText
                variant="small"
                color="shade6"
                style={{ paddingRight: 8 }}
              >
                Size:
              </ResultText>
              <ResultTextValue
                color={theme.isSFM ? 'secondary' : undefined}
                variant="small"
                weight="bold"
              >
                {props.weight}
              </ResultTextValue>
            </Row>
            {!hiddenVendor && (
              <Row justify="between" nogutter>
                <ResultText
                  variant="small"
                  color="shade6"
                  style={{ paddingRight: 8 }}
                >
                  Vendor:
                </ResultText>
                <ResultTextValue
                  color={theme.isSFM ? 'secondary' : undefined}
                  variant="small"
                  weight="700"
                >
                  {props.coop?.name}
                </ResultTextValue>
              </Row>
            )}
            <Row justify="between" nogutter>
              <ResultText
                variant="small"
                color="shade6"
                style={{ paddingRight: 8 }}
              >
                Min Order:
              </ResultText>
              <ResultTextValue
                color={theme.isSFM ? 'secondary' : undefined}
                variant="small"
                weight="bold"
              >
                {props.minimumOrder} {props.unit}
              </ResultTextValue>
            </Row>

            <Row justify="between" nogutter>
              <ResultText
                variant="small"
                color="shade6"
                style={{
                  paddingRight: 8,
                  visibility: props.templateDeliveryDate ? 'visible' : 'hidden',
                }}
              >
                Est. Collection:
              </ResultText>
              <ResultTextValue
                color={theme.isSFM ? 'secondary' : undefined}
                variant="small"
                weight="bold"
              >
                {props.templateDeliveryDate &&
                  formatTemplateDeliveryDateLabel(props.templateDeliveryDate)}
              </ResultTextValue>
            </Row>

            <Row justify="between" nogutter>
              {allowedNegotiationByBuyer ? (
                canNegotiate ? (
                  props.auctionDate ? (
                    isPreAuctionExpired(
                      props.auctionDate
                    ) ? null : hasCredits ? (
                      props.negotiationId ? (
                        <NegotiatePriceElem
                          backgroundColor={theme.grey.shade3}
                          iconFill={theme.grey.shade6}
                          fontColor="shade6"
                          text="IN NEGOTIATION"
                        />
                      ) : (
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            width: '-webkit-fill-available',
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleShowNegoModal &&
                              handleShowNegoModal(props?.id);
                          }}
                        >
                          <NegotiatePriceElem
                            backgroundColor={theme.brand.primary}
                            iconFill={theme.grey.noshade}
                            fontColor="noshade"
                          />
                        </div>
                      )
                    ) : (
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          width: '-webkit-fill-available',
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShowNegoCreditsModal &&
                            handleShowNegoCreditsModal();
                        }}
                      >
                        <NegotiatePriceElem
                          backgroundColor={theme.brand.primary}
                          iconFill={theme.grey.noshade}
                          fontColor="noshade"
                        />
                      </div>
                    )
                  ) : hasCredits ? (
                    props.negotiationId ? (
                      <NegotiatePriceElem
                        backgroundColor={theme.grey.shade3}
                        iconFill={theme.grey.shade6}
                        fontColor="shade6"
                        text="IN NEGOTIATION"
                      />
                    ) : (
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          width: '-webkit-fill-available',
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShowNegoModal && handleShowNegoModal(props?.id);
                        }}
                      >
                        <NegotiatePriceElem
                          backgroundColor={theme.brand.primary}
                          iconFill={theme.grey.noshade}
                          fontColor="noshade"
                        />
                      </div>
                    )
                  ) : (
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        width: '-webkit-fill-available',
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShowNegoCreditsModal &&
                          handleShowNegoCreditsModal();
                      }}
                    >
                      <NegotiatePriceElem
                        backgroundColor={theme.brand.primary}
                        iconFill={theme.grey.noshade}
                        fontColor="noshade"
                      />
                    </div>
                  )
                ) : props.auctionDate ? (
                  isPreAuctionExpired(props.auctionDate) ? null : (
                    <NegotiatePriceElem
                      backgroundColor={theme.grey.shade3}
                      iconFill={theme.grey.shade6}
                      fontColor="shade6"
                    />
                  )
                ) : (
                  <NegotiatePriceElem
                    backgroundColor={theme.grey.shade3}
                    iconFill={theme.grey.shade6}
                    fontColor="shade6"
                  />
                )
              ) : null}
            </Row>
          </BodyContainer>
        </DetailsContainer>
      </div>
    </CardContainer>
  );
};

export default React.memo(Preview);
