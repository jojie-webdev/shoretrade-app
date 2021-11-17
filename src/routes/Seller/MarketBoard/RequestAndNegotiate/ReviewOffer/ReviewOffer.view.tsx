import React, { useState } from 'react';

import Alert from 'components/base/Alert';
import Badge from 'components/base/Badge/Badge.view';
import Button from 'components/base/Button';
import Checkbox from 'components/base/Checkbox/Checkbox.view';
import Interactions from 'components/base/Interactions/Interactions.view';
import {
  Weight,
  DollarSign,
  SubtractHollow,
  Pen,
  ArrowRight,
} from 'components/base/SVG';
import Typography from 'components/base/Typography/Typography.view';
import MobileFooter from 'components/layout/MobileFooter';
import { BREAKPOINTS } from 'consts/breakpoints';
import moment from 'moment';
import { isEmpty } from 'ramda';
import { Row, Col } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { formatEstDelivery } from 'utils/formatEstDelivery';
import { sizeToString } from 'utils/Listing';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';
import { toPrice } from 'utils/String';
import { useTheme } from 'utils/Theme';

import {
  BadgesContainer,
  MetricContainer,
  StyledBadge,
  SummaryContentContainer,
} from '../RequestAndNegotiate.style';
import { ReviewOfferGeneratedProps } from './ReviewOffer.props';
import {
  Container,
  BadgeText,
  ItemDetail,
  ThirdSpecsContainer,
  ThirdItemContainer,
} from './ReviewOffer.style';

const ReviewOfferView = ({ setStep, ...props }: ReviewOfferGeneratedProps) => {
  const theme = useTheme();
  const [isChecked, setIsChecked] = useState(false);
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

  const SummaryBadges = (badgeProps: { items: string[]; label: string }) => {
    const { items, label } = badgeProps;

    if (isEmpty(items)) return <></>;

    const tagsMarkup = items.map((item) => (
      <Badge key={item} className="badge" badgeColor={theme.grey.shade3}>
        <BadgeText color="shade9" variant="overline">
          {item}
        </BadgeText>
      </Badge>
    ));

    return (
      <div>
        <Typography
          style={{ marginBottom: 12 }}
          color="shade6"
          variant="overline"
        >
          {label}
        </Typography>
        <BadgesContainer>{tagsMarkup}</BadgesContainer>
      </div>
    );
  };

  const flatMap = (array: [], fn: any) => {
    let result: any[] = [];
    array.forEach((element) => {
      const mapping = fn(element);
      result = result.concat(mapping);
    });
    return result;
  };

  const renderSize = (size: any) => {
    size = flatMap(size.split('-'), function (part: any, key: number) {
      return [part, <ArrowRight key={key} fill={theme.grey.shade7} />];
    });
    size.pop();
    return size;
  };

  const properOffer = props.offer[0];

  const getSizeBadge = () => {
    if (properOffer.size && properOffer.size.from) {
      sizeToString(
        props.buyerRequest.metric,
        properOffer.size.from,
        properOffer.size.to || ''
      );
    }
    if (
      props.buyerRequest &&
      !isEmpty(props.buyerRequest.sizeOptions) &&
      properOffer.size.from
    ) {
      sizeToString(props.buyerRequest.metric, properOffer.size.from);
    }

    return [];
  };
  return (
    <Container>
      <div style={{ maxWidth: 641 }}>
        <Alert
          variant="infoAlert"
          fullWidth
          header={'Review the details of your offer below.'}
          content={
            'Keep in mind that an accepted Buyer Request is not finalised until the Buyer has processed the payment. Ensure your notifications are turned on to receive updates.'
          }
          style={{
            marginBottom: 32,
          }}
          iconRight={null}
        />
      </div>

      <SummaryContentContainer>
        <SummaryBadges
          label="Specifications"
          items={properOffer.listStateOptions || []}
        />
        {!isEmpty(getSizeBadge()) ? (
          <SummaryBadges label="Sizes" items={getSizeBadge()} />
        ) : (
          <Row>
            <Col>
              <Typography
                style={{ marginBottom: 12 }}
                color="shade6"
                variant="overline"
              >
                Size
              </Typography>

              <div className="quantity-container">
                <StyledBadge badgeColor={theme.grey.shade3}>
                  <BadgeText color="shade9" variant="overline">
                    {sizeToString(
                      props.buyerRequest.metric,
                      properOffer?.size.from?.toString()
                    )}
                  </BadgeText>
                </StyledBadge>
                {properOffer?.size.to && (
                  <>
                    <Typography
                      variant="label"
                      color="noshade"
                      weight="bold"
                      className="dash"
                    >
                      -
                    </Typography>
                    <StyledBadge badgeColor={theme.grey.shade3}>
                      <BadgeText color="shade9" variant="overline">
                        {sizeToString(
                          props.buyerRequest.metric,
                          properOffer?.size.to?.toString()
                        )}
                      </BadgeText>
                    </StyledBadge>
                  </>
                )}
              </div>
            </Col>
          </Row>
        )}

        <Row>
          <Col>
            {' '}
            <ThirdItemContainer>
              <Typography
                style={{ margin: '24px 0 12px 0' }}
                color="shade6"
                variant="overline"
              >
                Quantity
              </Typography>
              <div className="quantity-container">
                <StyledBadge badgeColor={theme.grey.shade3}>
                  <BadgeText color="shade9" variant="overline">
                    {properOffer?.weight || 0}
                    {formatMeasurementUnit(props.buyerRequest.measurementUnit)}
                  </BadgeText>
                </StyledBadge>
              </div>
            </ThirdItemContainer>
          </Col>
          <Col>
            <ThirdItemContainer>
              <Typography
                style={{ margin: '24px 0 12px 0' }}
                color="shade6"
                variant="overline"
              >
                Price per {formatMeasurementUnit(properOffer.measurementUnit)}
              </Typography>
              <div className="quantity-container">
                <StyledBadge badgeColor={theme.grey.shade3}>
                  <BadgeText color="shade9" variant="overline">
                    {`${toPrice(properOffer?.price)} /
                    ${formatMeasurementUnit(
                      props.buyerRequest.measurementUnit
                    )}`}
                  </BadgeText>
                </StyledBadge>
              </div>
            </ThirdItemContainer>
          </Col>
        </Row>
        <Row>
          <Col>
            {' '}
            <ThirdItemContainer>
              <Typography
                style={{ margin: '24px 0 12px 0' }}
                color="shade6"
                variant="overline"
              >
                Shipping to
              </Typography>
              <div className="quantity-container">
                <StyledBadge badgeColor={theme.grey.shade3}>
                  <BadgeText color="shade9" variant="overline">
                    {`${props.buyerRequest?.shippingTo.suburb}, ${props.buyerRequest?.shippingTo.state} ${props.buyerRequest?.shippingTo.postcode}`}
                  </BadgeText>
                </StyledBadge>
              </div>
            </ThirdItemContainer>
          </Col>
          <Col>
            <ThirdItemContainer>
              <Typography
                style={{ margin: '24px 0 12px 0' }}
                color="shade6"
                variant="overline"
              >
                Delivery Date
              </Typography>
              <div className="quantity-container">
                <StyledBadge badgeColor={theme.grey.shade3}>
                  <BadgeText color="shade9" variant="overline">
                    {properOffer.deliveryDate
                      ? moment(properOffer.deliveryDate).format('MMM. DD, YYYY')
                      : ''}
                  </BadgeText>
                </StyledBadge>
              </div>
            </ThirdItemContainer>
          </Col>
        </Row>

        <ThirdItemContainer>
          <Typography
            style={{ margin: '16px 0 0 0' }}
            color="shade6"
            variant="overlineSmall"
          >
            Total Value
          </Typography>

          <Typography color="noshade" variant="title3">
            <sup className="sup-text-2">$</sup>
            {toPrice(properOffer?.weight * properOffer?.price).replace('$', '')}
          </Typography>
        </ThirdItemContainer>
      </SummaryContentContainer>
      <div className="checkbox-container">
        <Checkbox
          onClick={() => setIsChecked((prevState) => !prevState)}
          className="checkbox"
          checked={isChecked}
        />
        <Typography className="label" variant="label" color="noshade">
          I confirm the availability of the product
        </Typography>
      </div>

      {!isMobile && (
        <div className={'submit-btns'}>
          <Button
            onClick={() => {
              props.onDelete(properOffer.editId);
              setStep && setStep(1);
            }}
            className={'submit-btn'}
            text="Cancel"
            variant="outline"
          />
          <Button
            onClick={props.onSubmit}
            className={'submit-btn'}
            text="submit"
            variant={!isChecked ? 'disabled' : 'primary'}
            disabled={!isChecked}
            loading={props.isSubmitting}
          />
        </div>
      )}

      <MobileFooter>
        <Button
          onClick={() => {
            props.onDelete(properOffer.editId);
            setStep && setStep(1);
          }}
          takeFullWidth
          text="Cancel"
          variant="outline"
        />
        <Button
          onClick={props.onSubmit}
          takeFullWidth
          text="submit"
          variant={!isChecked ? 'disabled' : 'primary'}
          disabled={!isChecked}
          loading={props.isSubmitting}
          style={{ marginLeft: 8 }}
        />
      </MobileFooter>
    </Container>
  );
};

export default ReviewOfferView;
