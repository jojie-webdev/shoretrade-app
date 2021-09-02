import React, { useEffect } from 'react';

// import { useTheme } from 'utils/Theme';
import Alert from 'components/base/Alert/Alert.view';
import Button from 'components/base/Button';
import Checkbox from 'components/base/Checkbox/Checkbox.view';
import Interactions from 'components/base/Interactions';
import Select from 'components/base/Select/Select.view';
import { Cross7 } from 'components/base/SVG';
import TextField from 'components/base/TextField';
import Typography from 'components/base/Typography';
import MobileFooter from 'components/layout/MobileFooter';
import DatePickerDropdown from 'components/module/DatePickerDropdown/DatePickerDropdown.view';
import { BREAKPOINTS } from 'consts/breakpoints';
import moment from 'moment';
import { isEmpty, pathOr } from 'ramda';
import { Col, Row } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';
import { capitalize } from 'utils/String';
import theme from 'utils/Theme';

import { MakeOfferGeneratedProps } from './MakeOffer.props';
import {
  Container,
  Error,
  MetricContainer,
  SummaryCard,
} from './MakeOffer.style';

const MakeOfferView = ({ errors, ...props }: MakeOfferGeneratedProps) => {
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });
  const isXxl = useMediaQuery({ query: BREAKPOINTS['xxl'] });

  return (
    <Container>
      <Row>
        <Col md={12} xl={8}>
          <Alert
            variant="infoAlert"
            fullWidth
            content={
              'When you are making an offer you are committing to sell this product to this buyer. ' +
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

            {props.buyerRequest.sizeFrom && (
              <Col md={6} style={{ marginBottom: 16 }}>
                <TextField
                  label="From"
                  placeholder={props.buyerRequest.sizeFrom.toString()}
                  value={props.size.from}
                  onChangeText={(v) =>
                    props.setSize((prevState) => ({
                      from: v,
                      to:
                        prevState.to && prevState.to !== 'ungraded'
                          ? prevState.to
                          : '',
                    }))
                  }
                  min={props.buyerRequest.sizeFrom}
                  type="number"
                  inputType="decimal"
                  error={pathOr('', ['sizeFrom', '0'], errors)}
                />
              </Col>
            )}

            {props.buyerRequest.sizeTo && (
              <Col md={6} style={{ marginBottom: 16 }}>
                <TextField
                  label={`To\n(Optional)`}
                  placeholder={props.buyerRequest.sizeTo.toString()}
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
                />
              </Col>
            )}
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
            <Col md={4} className="textfield-col">
              <TextField
                label="Quantity"
                LeftComponent={
                  <Typography variant="label" weight="bold" color="shade6">
                    {formatMeasurementUnit(props.buyerRequest.measurementUnit)}
                  </Typography>
                }
                value={props.weight}
                onChangeText={props.setWeight}
                min={1}
                type="number"
                inputType="decimal"
                error={pathOr('', ['weight', '0'], errors)}
              />
            </Col>

            <Col md={4} className="textfield-col">
              <TextField
                label={`Price per ${formatMeasurementUnit(
                  props.buyerRequest.measurementUnit
                )}`}
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
                date={props.deliveryDate ? moment(props.deliveryDate) : null}
                onDateChange={(d) => props.setDeliveryDate(d?.toDate() || null)}
                error={pathOr('', ['deliveryDate', '0'], errors)}
              />
            </Col>
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
            <Typography variant="title3" color="noshade">
              {props.weight && props.price ? (
                <>${parseFloat(props.weight) * parseFloat(props.price)}.00</>
              ) : (
                `$0.00`
              )}
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
                        {capitalize(
                          (props.buyerRequest?.sizeFrom &&
                            props.buyerRequest?.sizeFrom?.toString()) +
                            ' ' +
                            props.buyerRequest.measurementUnit.toLowerCase() ||
                            ''
                        )}
                        {props.buyerRequest.sizeTo
                          ? ` - ${
                              props.buyerRequest.sizeTo.toString() +
                              ' ' +
                              props.buyerRequest.measurementUnit.toLowerCase()
                            }`
                          : ''}
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
            </SummaryCard>
          </Col>
        )}
      </Row>

      {!isMobile && (
        <div className="submit-btns-step2">
          <Button
            onClick={props.addToMarketOffers}
            className="submit-btn-step2"
            text="Review offer"
            variant="primary"
          />
        </div>
      )}

      <MobileFooter>
        <Button
          onClick={props.addToMarketOffers}
          text="Review offer"
          variant="primary"
          takeFullWidth
        />
      </MobileFooter>
    </Container>
  );
};

export default MakeOfferView;
