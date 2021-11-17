/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';

// import { useTheme } from 'utils/Theme';
import Alert from 'components/base/Alert/Alert.view';
import Button from 'components/base/Button';
import Checkbox from 'components/base/Checkbox/Checkbox.view';
import Interactions from 'components/base/Interactions';
import Select from 'components/base/Select/Select.view';
import { Cross7, Close } from 'components/base/SVG';
import TextField from 'components/base/TextField';
import Typography from 'components/base/Typography';
import MobileFooter from 'components/layout/MobileFooter';
import DatePickerDropdown from 'components/module/DatePickerDropdown/DatePickerDropdown.view';
import { BREAKPOINTS } from 'consts/breakpoints';
import moment from 'moment';
import { isEmpty, pathOr } from 'ramda';
import { Col, Row, Hidden, Visible } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import {
  GetAllMarketRequestResponseItem,
  ShippingTo,
} from 'types/store/GetAllMarketRequestState';
import { sizeToString } from 'utils/Listing';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';
import { capitalize, toPrice } from 'utils/String';
import theme from 'utils/Theme';

import { MakeOfferGeneratedProps } from './MakeOffer.props';
import {
  Container,
  Error,
  MetricContainer,
  MobileFromToTextFieldsContainer,
  SummaryCard,
} from './MakeOffer.style';

export const getShippingTo = (shippingTo: ShippingTo) => {
  const selectedShippingAddressData = `${shippingTo?.suburb} ${shippingTo?.state} ${shippingTo?.postcode}`;

  return selectedShippingAddressData;
};

const MakeOfferView = ({ errors, ...props }: MakeOfferGeneratedProps) => {
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });
  const isXxl = useMediaQuery({ query: BREAKPOINTS['xxl'] });

  const renferFromTextField = () => (
    <TextField
      label="From"
      placeholder={`${props.buyerRequest.sizeFrom || ''}`}
      value={props.size.from}
      onChangeText={(v) =>
        props.setSize((prevState) => ({
          from: v,
          to: prevState.to && prevState.to !== 'ungraded' ? prevState.to : '',
        }))
      }
      min={props.buyerRequest.sizeFrom}
      type="number"
      inputType="decimal"
      error={pathOr('', ['sizeFrom', '0'], errors)}
      borderRadius="12px"
      height="40px"
    />
  );

  const renderToTextField = () => (
    <TextField
      label={`To\n(Optional)`}
      placeholder={`${props.buyerRequest.sizeTo || ''}`}
      value={props.size.to}
      onChangeText={(v) => {
        props.setSize((prevState) => ({
          from:
            prevState.from && prevState.from !== 'ungraded'
              ? prevState.from
              : '',
          to: v,
        }));
      }}
      min={1}
      max={props.buyerRequest.sizeTo}
      type="number"
      inputType="decimal"
      error={pathOr('', ['sizeTo', '0'], errors)}
      borderRadius="12px"
      height="40px"
    />
  );

  const renderFromToTextFieldsDesktop = () => (
    <Hidden xs sm>
      {props.buyerRequest.sizeFrom && (
        <Col md={6} style={{ marginBottom: 16 }}>
          {renferFromTextField()}
        </Col>
      )}

      {props.buyerRequest.sizeTo && (
        <Col md={6} style={{ marginBottom: 16 }}>
          {renderToTextField()}
        </Col>
      )}
    </Hidden>
  );

  const renderFromToTextFieldsMobile = () => (
    <Visible xs sm>
      <MobileFromToTextFieldsContainer>
        {props.buyerRequest.sizeFrom && (
          <Col style={{ marginBottom: 16 }}>{renferFromTextField()}</Col>
        )}
        {props.buyerRequest.sizeTo && (
          <Col style={{ marginBottom: 16 }}>{renderToTextField()}</Col>
        )}
      </MobileFromToTextFieldsContainer>
    </Visible>
  );

  return (
    <Container>
      <Row>
        <Col md={12} xl={8}>
          <Alert
            variant="infoAlert"
            fullWidth
            header={
              'When you are making an offer you are committing to sell and deliver this product to the buyer.'
            }
            content={
              'You need to make sure that the product is available if the buyer accepts.'
            }
            style={{
              marginBottom: 32,
            }}
          />

          {props.stateOptions.map((options, i) => {
            return (
              <div
                key={i}
                style={{
                  marginBottom:
                    props.stateOptions.length >= 2 &&
                    i < props.stateOptions.length - 1
                      ? 16
                      : 0,
                }}
              >
                {options.map((o, i) => (
                  <div key={o.value}>
                    {i === 0 && (
                      <Typography
                        variant="overline"
                        color="shade6"
                        style={{ marginBottom: 8 }}
                      >
                        {o.groupName}
                      </Typography>
                    )}
                    <Interactions
                      backgroundColor={theme.grey.shade9}
                      fontColor={theme.grey.noshade}
                      value={o.label}
                      type="radio"
                      padding="14px 18px"
                      pressed={props.specifications
                        .map((s) => s.value)
                        .includes(o.value)}
                      onClick={() => props.onClickSpecification(o)}
                    />
                  </div>
                ))}
              </div>
            );
          })}
          {pathOr('', ['specifications', '0'], errors) ? (
            <Error variant="caption" color="error">
              {pathOr('', ['specifications', '0'], errors)}
            </Error>
          ) : null}

          <Typography variant="overline" color="shade6" className="row-label">
            Size
          </Typography>
          {props.buyerRequest.sizeFrom && (
            <MetricContainer>
              <Typography color="shade6" variant="overline">
                Metric:
              </Typography>
              <Typography
                style={{ marginLeft: '8px' }}
                color="shade2"
                variant="overline"
              >
                {props.buyerRequest.metric}
              </Typography>
            </MetricContainer>
          )}

          <Row>
            {props.marketSizes.map((v) => (
              <Col key={v}>
                <Interactions
                  backgroundColor={theme.grey.noshade}
                  fontColor={theme.grey.shade9}
                  value={v}
                  type="radio"
                  padding="14px 18px"
                  pressed={props.size.from === v}
                  onClick={() => props.setSize({ from: v, to: '' })}
                />
              </Col>
            ))}

            {renderFromToTextFieldsMobile()}
            {renderFromToTextFieldsDesktop()}
          </Row>

          <div className="checkbox-container ungraded">
            <Checkbox
              onClick={() =>
                props.setSize({
                  from: 'ungraded',
                  to: '',
                })
              }
              className="checkbox"
              checked={props.size.from === 'ungraded'}
            />
            <Typography className="label" variant="label" color="noshade">
              Ungraded
            </Typography>
          </div>

          {!props.buyerRequest.sizeFrom &&
          pathOr('', ['sizeFrom', '0'], errors) ? (
            <Error variant="caption" color="error">
              {pathOr('', ['sizeFrom', '0'], errors)}
            </Error>
          ) : null}

          <Row className="textfield-row">
            <Hidden sm xs>
              <Col md={4} className="textfield-col">
                <TextField
                  label="Quantity"
                  className="textfield"
                  LeftComponent={
                    <Typography variant="label" weight="bold" color="shade6">
                      {formatMeasurementUnit(
                        props.buyerRequest.measurementUnit
                      )}
                    </Typography>
                  }
                  value={props.weight}
                  onChangeText={props.setWeight}
                  min={1}
                  type="number"
                  inputType="decimal"
                  error={pathOr('', ['weight', '0'], errors)}
                  borderRadius="12px"
                  height="40px"
                />
              </Col>

              <Col md={4} className="textfield-col">
                <TextField
                  className="textfield"
                  label={`Price per ${formatMeasurementUnit(
                    props.buyerRequest.measurementUnit
                  )} (Inc. Delivery)`}
                  LeftComponent={
                    <Typography variant="label" weight="bold" color="shade6">
                      $
                    </Typography>
                  }
                  value={props.price}
                  onChangeText={props.setPrice}
                  min={1}
                  type="number"
                  inputType="decimal"
                  error={pathOr('', ['price', '0'], errors)}
                  borderRadius="12px"
                  height="40px"
                />

                {/*<div className="shipping-to">*/}
                {/*  <Typography variant="label" color="shade6">*/}
                {/*    Shipping to*/}
                {/*  </Typography>*/}
                {/*  <Typography variant="label" color="noshade" weight="bold">*/}
                {/*    {props.shippingTo}*/}
                {/*  </Typography>*/}
                {/*</div>*/}
              </Col>

              <Col md={4} className="textfield-col">
                <DatePickerDropdown
                  label="Delivery date"
                  className="textfield"
                  isOutsideRange={(date) =>
                    date < new Date().setHours(0, 0, 0, 0)
                  }
                  date={props.deliveryDate ? moment(props.deliveryDate) : null}
                  onDateChange={(d) =>
                    props.setDeliveryDate(d?.toDate() || null)
                  }
                  error={pathOr('', ['deliveryDate', '0'], errors)}
                  showCalendarIcon={true}
                  showArrowDownIcon={false}
                  borderRadius="12px"
                  height="40px"
                />
              </Col>
            </Hidden>

            <Visible xs sm>
              <Col xs={12}>
                <Row>
                  <Col xs={12} className="textfield-col">
                    <TextField
                      label="Quantity"
                      LeftComponent={
                        <Typography
                          variant="label"
                          weight="bold"
                          color="shade6"
                        >
                          {formatMeasurementUnit(
                            props.buyerRequest.measurementUnit
                          )}
                        </Typography>
                      }
                      className="textfield"
                      value={props.weight}
                      onChangeText={props.setWeight}
                      min={1}
                      type="number"
                      inputType="decimal"
                      error={pathOr('', ['weight', '0'], errors)}
                      borderRadius="12px"
                      height="40px"
                    />
                  </Col>
                  <Col xs={12} className="textfield-col">
                    <TextField
                      className="textfield"
                      label={`Price per ${formatMeasurementUnit(
                        props.buyerRequest.measurementUnit
                      )} (Inc. Delivery)`}
                      value={props.price}
                      LeftComponent={
                        <Typography
                          variant="label"
                          weight="bold"
                          color="shade6"
                        >
                          $
                        </Typography>
                      }
                      onChangeText={props.setPrice}
                      min={1}
                      type="number"
                      inputType="decimal"
                      error={pathOr('', ['price', '0'], errors)}
                      borderRadius="12px"
                      height="40px"
                    />
                  </Col>
                  <Col xs={12} className="textfield-col">
                    <DatePickerDropdown
                      isOutsideRange={(date) =>
                        date < new Date().setHours(0, 0, 0, 0)
                      }
                      label="Delivery date"
                      date={
                        props.deliveryDate ? moment(props.deliveryDate) : null
                      }
                      onDateChange={(d) =>
                        props.setDeliveryDate(d?.toDate() || null)
                      }
                      error={pathOr('', ['deliveryDate', '0'], errors)}
                      showCalendarIcon={true}
                      showArrowDownIcon={false}
                      borderRadius="12px"
                      height="40px"
                    />
                  </Col>
                </Row>
              </Col>
            </Visible>
          </Row>

          <div className="textfield-col">
            <Select
              value={props.selectedAddress}
              onChange={(o) => props.setSelectedAddress(o.value)}
              options={props.addresses}
              label="Shipping From"
              error={pathOr('', ['selectedAddress', '0'], errors)}
            />
          </div>

          <div className="total-container">
            <Typography
              variant="overline"
              color="shade7"
              style={{ marginBottom: 4 }}
            >
              Total Value
            </Typography>
            <Typography weight="900" variant="title3" color="noshade">
              <sup className="sup-text-2">$</sup>
              {toPrice(
                parseFloat(props?.weight || '0') *
                  parseFloat(props?.price || '0')
              ).replace('$', '')}
            </Typography>
          </div>
        </Col>
        {isXxl && (
          <Col xl={4}>
            <SummaryCard>
              <Typography className="summary" color="noshade" weight="400">
                Buyer Request
              </Typography>
              <div className="summary-border" />
              {!isEmpty(props.buyerRequest.specifications) && (
                <>
                  <Typography
                    className="header"
                    color="shade6"
                    variant="title5"
                  >
                    Specs:
                  </Typography>
                  <div className="value">
                    <Cross7 />
                    <Typography
                      className="values"
                      color="noshade"
                      variant="title5"
                    >
                      {props.buyerRequest.specifications &&
                        props.buyerRequest.specifications
                          .map((v) => v.stateName)
                          .join(', ')}
                    </Typography>
                  </div>
                </>
              )}
              {props.buyerRequest?.sizeFrom &&
                props.buyerRequest?.sizeFrom?.toString().length > 0 && (
                  <>
                    <Typography
                      className="header"
                      color="shade6"
                      variant="title5"
                    >
                      Size:
                    </Typography>
                    <div className="value">
                      <Cross7 />
                      <Typography
                        className="values"
                        color="noshade"
                        variant="title5"
                      >
                        {sizeToString(
                          props.buyerRequest.metric,
                          props.buyerRequest.sizeFrom || '',
                          props.buyerRequest.sizeTo || ''
                        )}
                      </Typography>
                    </div>
                  </>
                )}
              {!isEmpty(props.buyerRequest.sizeOptions) && (
                <>
                  <Typography
                    className="header"
                    color="shade6"
                    variant="title5"
                  >
                    Size:
                  </Typography>
                  <div className="value">
                    <Cross7 />
                    <Typography
                      className="values"
                      color="noshade"
                      variant="title5"
                    >
                      {props.buyerRequest.sizeOptions &&
                        props.buyerRequest.sizeOptions.map((v) => v).join(', ')}
                    </Typography>
                  </div>
                </>
              )}
              {props.buyerRequest.weight?.from && (
                <>
                  <Typography
                    className="header"
                    color="shade6"
                    variant="title5"
                  >
                    Quantity:
                  </Typography>
                  <div className="value">
                    <Cross7 />
                    <Typography
                      className="values"
                      color="noshade"
                      variant="title5"
                    >
                      {props.buyerRequest.weight.from}
                      {formatMeasurementUnit(
                        props.buyerRequest.measurementUnit
                      )}
                      -{props.buyerRequest.weight.to}
                      {formatMeasurementUnit(
                        props.buyerRequest.measurementUnit
                      )}
                    </Typography>
                  </div>
                </>
              )}
              {props.buyerRequest.shippingTo && (
                <>
                  <Typography
                    className="header"
                    color="shade6"
                    variant="title5"
                  >
                    Shipping To:
                  </Typography>
                  <div className="value">
                    <Cross7 />
                    <Typography
                      className="values"
                      color="noshade"
                      variant="title5"
                    >
                      {getShippingTo(props.buyerRequest.shippingTo)}
                    </Typography>
                  </div>
                </>
              )}
            </SummaryCard>
          </Col>
        )}
      </Row>

      {!isMobile && (
        <div className="submit-btns-step2">
          <Button
            onClick={props.addToMarketOffers}
            className="submit-btn-step2"
            text="Make an offer"
            variant="primary"
          />
        </div>
      )}

      <MobileFooter>
        <Button
          onClick={props.addToMarketOffers}
          text="Make an offer"
          variant="primary"
          takeFullWidth
          style={{ borderRadius: '12px' }}
        />
      </MobileFooter>
    </Container>
  );
};

export default MakeOfferView;
