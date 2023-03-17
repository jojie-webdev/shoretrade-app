import React from 'react';

import { MarketBoardOutlined } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import moment from 'moment';
import { Row as TableRow, Col as TableCol } from 'react-grid-system';
import { useSelector } from 'react-redux';
import { Store } from 'types/store/Store';
import { Theme } from 'types/Theme';
import { isPreAuctionExpired } from 'utils/Listing';
import { formatUnitToPricePerUnit } from 'utils/Listing/formatMeasurementUnit';
import { formatTemplateDeliveryDateLabel } from 'utils/Listing/formatTemplateDeliveryDateLabel';
import { toPrice, capitalize } from 'utils/String';
import theme from 'utils/Theme';

import IconTooltip from '../IconTooltip';
import ListingTimeLeftView from '../ListingTimeLeft';
import { ProductDetailsCard6Props } from './ProductDetailsCard6.props';
import {
  Container,
  Row,
  Price,
  Label,
  NegotiatePriceBtnContainer,
  NegotiatePriceBtnWrapper,
  NegotiatePriceText,
} from './ProductDetailsCard6.style';

const ProductDetailsCard6View = (props: ProductDetailsCard6Props) => {
  const {
    price,
    dateEnds,
    avgBoxSize,
    catchDate,
    catchRecurrence,
    templateDeliveryDate,
    unit = 'kg',
    hiddenPrice,
    SellerCard,
    size,
    sizingOptions,
    activeSizeUnit,
    isPreAuction,
    canNegotiate,
    auctionDate,
    handleNegoModalShow,
    allowNegotiations,
    handleShowNegoCreditsModal,
    negotiationCredit,
    negotiationId,
  } = props;

  const companyPlan = useSelector(
    (store: Store) => store.getCompanyPlan.data?.data
  );

  const subscriptionPlan = companyPlan?.activePlans
    ? companyPlan.activePlans[0].plan.alias
    : 'Unsubscribed';

  const formattedCatchDate = () => moment(catchDate).format('DD MMMM YYYY');
  const cutOffDate = moment(dateEnds)
    .subtract(1, 'day')
    .endOf('day')
    .subtract(2, 'hours');

  const NegotiatePriceElem = (props: {
    backgroundColor: string;
    iconFill: string;
    fontColor: keyof Theme['grey'] | keyof Theme['brand'];
    clickable?: boolean;
    text?: string;
  }) => {
    return (
      <NegotiatePriceBtnContainer>
        <NegotiatePriceBtnWrapper
          backgroundColor={props.backgroundColor}
          clickable={props.clickable}
        >
          <MarketBoardOutlined fill={props.iconFill} />
          <div style={{ marginRight: 5 }} />
          <NegotiatePriceText
            variant="small"
            color={props.fontColor || 'noshade'}
            style={{ paddingRight: 8, marginTop: 2 }}
          >
            {props?.text || 'NEGOTIATE PRICE'}
          </NegotiatePriceText>
        </NegotiatePriceBtnWrapper>
      </NegotiatePriceBtnContainer>
    );
  };

  const negotiatePriceBtn = () => {
    if (
      !negotiationCredit?.is_unlimited &&
      (negotiationCredit?.credit || 0) <= 0
    ) {
      return (
        <div onClick={handleShowNegoCreditsModal}>
          <NegotiatePriceElem
            backgroundColor={theme.grey.shade3}
            iconFill={theme.grey.shade6}
            fontColor="shade6"
            clickable
          />
        </div>
      );
    }

    return allowNegotiations ? (
      canNegotiate ? (
        auctionDate ? (
          isPreAuctionExpired(auctionDate) ? null : negotiationId ? (
            <NegotiatePriceElem
              backgroundColor={theme.grey.shade3}
              iconFill={theme.grey.shade6}
              fontColor="shade6"
              text="IN NEGOTIATION"
            />
          ) : (
            <div onClick={handleNegoModalShow}>
              <NegotiatePriceElem
                backgroundColor={theme.brand.primary}
                iconFill={theme.grey.noshade}
                fontColor="noshade"
                clickable
              />
            </div>
          )
        ) : negotiationId ? (
          <NegotiatePriceElem
            backgroundColor={theme.grey.shade3}
            iconFill={theme.grey.shade6}
            fontColor="shade6"
            text="IN NEGOTIATION"
          />
        ) : (
          <div onClick={handleNegoModalShow}>
            <NegotiatePriceElem
              backgroundColor={theme.brand.primary}
              iconFill={theme.grey.noshade}
              fontColor="noshade"
              clickable
            />
          </div>
        )
      ) : auctionDate ? (
        isPreAuctionExpired(auctionDate) ? null : (
          <div onClick={handleShowNegoCreditsModal}>
            <NegotiatePriceElem
              backgroundColor={theme.grey.shade3}
              iconFill={theme.grey.shade6}
              fontColor="shade6"
              clickable
            />
          </div>
        )
      ) : (
        <div onClick={handleShowNegoCreditsModal}>
          <NegotiatePriceElem
            backgroundColor={theme.grey.shade3}
            iconFill={theme.grey.shade6}
            fontColor="shade6"
            clickable
          />
        </div>
      )
    ) : null;
  };

  return (
    <Container {...props}>
      {SellerCard ? SellerCard : <></>}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {!hiddenPrice && (
          <div style={{ display: 'flex' }}>
            <Price variant="title5" weight="900">
              {toPrice(price)}
            </Price>
            <Label
              variant="caption"
              color="shade6"
              style={{ marginLeft: 6.5, marginTop: 8 }}
            >
              per {formatUnitToPricePerUnit(unit)}
            </Label>
          </div>
        )}
        {negotiatePriceBtn()}
      </div>
      {!props.catchRecurrence && (
        <Row>
          <Label variant="label" color="shade6" style={{ marginRight: 4 }}>
            Order Cut Off Time:
          </Label>
          <Label variant="label" weight="bold">
            {isPreAuction ? (
              dateEnds ? (
                moment() > cutOffDate ? (
                  moment().to(cutOffDate)
                ) : (
                  moment(cutOffDate).from(moment())
                )
              ) : undefined
            ) : (
              <ListingTimeLeftView timeLeft={moment(dateEnds)} />
            )}
          </Label>
        </Row>
      )}
      <Row>
        <Label variant="label" color="shade6" style={{ marginRight: 4 }}>
          Average Box Size:
        </Label>
        <Label variant="label" weight="bold">
          {avgBoxSize} {unit}
        </Label>
      </Row>

      <Row>
        <Label variant="label" color="shade6" style={{ marginRight: 4 }}>
          {catchRecurrence ? 'Catch Frequency:' : 'Catch Date:'}
        </Label>
        <Label variant="label" weight="bold">
          {catchRecurrence ? capitalize(catchRecurrence) : formattedCatchDate()}
        </Label>
      </Row>

      <Row>
        <div className="label-container">
          <Label variant="label" color="shade6" style={{ marginRight: 4 }}>
            Size:
          </Label>
          {sizingOptions.length > 0 && (
            <IconTooltip
              placement="top"
              label={
                <u>
                  <i>size chart</i>
                </u>
              }
              labelColor="primary"
              content={
                <>
                  <TableRow nogutter className="table-header-row">
                    <TableCol className="table-header-col" xs={6}></TableCol>
                    <TableCol className="table-header-col" xs={3}>
                      <Typography variant="label" color="shade4">
                        From
                      </Typography>
                    </TableCol>
                    <TableCol className="table-header-col" xs={3}>
                      <Typography variant="label" color="shade4">
                        To
                      </Typography>
                    </TableCol>
                  </TableRow>
                  {sizingOptions.map((sizeOption) => (
                    <TableRow
                      nogutter
                      className="table-row"
                      key={sizeOption.short_code}
                    >
                      <TableCol className="table-col" xs={6}>
                        <Typography variant="label" color="shade4">
                          {sizeOption.label}
                        </Typography>
                      </TableCol>
                      <TableCol className="table-col" xs={3}>
                        <Typography variant="label" color="shade4">
                          {sizeOption.from}
                        </Typography>
                        <Typography variant="label" color="shade6">
                          &nbsp;{activeSizeUnit}
                        </Typography>
                      </TableCol>
                      <TableCol className="table-col" xs={3}>
                        <Typography variant="label" color="shade4">
                          {sizeOption.to}
                        </Typography>
                        <Typography variant="label" color="shade6">
                          &nbsp;{activeSizeUnit}
                        </Typography>
                      </TableCol>
                    </TableRow>
                  ))}
                </>
              }
            />
          )}
        </div>
        <Label variant="label" weight="bold">
          {' '}
          {size}
        </Label>
      </Row>

      {templateDeliveryDate && (
        <Row>
          <Label variant="label" color="shade6" style={{ marginRight: 4 }}>
            Est. Collection:
          </Label>
          <Label variant="label" weight="bold">
            {' '}
            {formatTemplateDeliveryDateLabel(templateDeliveryDate)}
          </Label>
        </Row>
      )}
    </Container>
  );
};

export default ProductDetailsCard6View;
