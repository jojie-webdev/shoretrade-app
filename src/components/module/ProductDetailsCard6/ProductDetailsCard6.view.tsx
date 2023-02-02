import React from 'react';

import { MarketBoardOutlined } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import moment from 'moment';
import { Row as TableRow, Col as TableCol } from 'react-grid-system';
import { useSelector } from 'react-redux';
import { Store } from 'types/store/Store';
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
        {canNegotiate ? (
          <NegotiatePriceBtnContainer>
            <NegotiatePriceBtnWrapper>
              <MarketBoardOutlined />
              <div style={{ marginRight: 5 }} />
              <NegotiatePriceText
                variant="small"
                color="noshade"
                style={{ paddingRight: 8 }}
              >
                NEGOTIATE PRICE
              </NegotiatePriceText>
            </NegotiatePriceBtnWrapper>
          </NegotiatePriceBtnContainer>
        ) : (
          <NegotiatePriceBtnContainer>
            <NegotiatePriceBtnWrapper backgroundColor="shade3">
              <MarketBoardOutlined fill={theme.grey.shade6} />
              <div style={{ marginRight: 5 }} />
              <NegotiatePriceText
                variant="small"
                color="shade6"
                style={{ paddingRight: 8 }}
              >
                NEGOTIATE PRICE
              </NegotiatePriceText>
            </NegotiatePriceBtnWrapper>
          </NegotiatePriceBtnContainer>
        )}
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
