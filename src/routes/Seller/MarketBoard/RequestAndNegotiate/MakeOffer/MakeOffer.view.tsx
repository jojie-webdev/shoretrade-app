import React, { useEffect } from 'react';

// import { useTheme } from 'utils/Theme';
import Alert from 'components/base/Alert/Alert.view';
import Button from 'components/base/Button';
import Checkbox from 'components/base/Checkbox/Checkbox.view';
import Interactions from 'components/base/Interactions';
import Select from 'components/base/Select/Select.view';
import TextField from 'components/base/TextField';
import Typography from 'components/base/Typography';
import DatePickerDropdown from 'components/module/DatePickerDropdown/DatePickerDropdown.view';
import moment from 'moment';
import { pathOr } from 'ramda';
import { Col, Row } from 'react-grid-system';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';

import { MakeOfferGeneratedProps } from './MakeOffer.props';
import { Container, Error } from './MakeOffer.style';

const MakeOfferView = ({ errors, ...props }: MakeOfferGeneratedProps) => {
  // const theme = useTheme();

  return (
    <Container>
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

      <Typography variant="overline" color="shade6" className="row-label">
        Specs
      </Typography>

      {props.stateOptions.map((options, i) => {
        return (
          <Row
            key={i}
            style={{
              marginBottom:
                props.stateOptions.length >= 2 &&
                i < props.stateOptions.length - 1
                  ? 16
                  : 0,
            }}
          >
            {options.map((o) => (
              <Col key={o.value} md={12} lg={6} xl={4}>
                <Interactions
                  value={o.label}
                  type="radio"
                  padding="14px 18px"
                  pressed={props.specifications
                    .map((s) => s.value)
                    .includes(o.value)}
                  onClick={() => props.onClickSpecification(o)}
                />
              </Col>
            ))}
          </Row>
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
      <Row>
        {props.marketSizes.map((v) => (
          <Col key={v} md={12} lg={6} xl={4}>
            <Interactions
              value={v}
              type="radio"
              padding="14px 18px"
              pressed={props.size.from === v || props.size.to === v}
              onClick={() => props.setSize({ from: v, to: v })}
            />
          </Col>
        ))}

        {props.buyerRequest.sizeFrom && (
          <Col md={12} lg={6} xl={4} style={{ marginBottom: 16 }}>
            <TextField
              label="From"
              LeftComponent={
                <Typography variant="label" weight="bold" color="shade6">
                  {formatMeasurementUnit(props.buyerRequest.measurementUnit)}
                </Typography>
              }
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
              min={1}
              type="number"
              error={pathOr('', ['sizeFrom', '0'], errors)}
            />
          </Col>
        )}

        {props.buyerRequest.sizeTo && (
          <Col md={12} lg={6} xl={4} style={{ marginBottom: 16 }}>
            <TextField
              label={`To\n(Optional)`}
              LeftComponent={
                <Typography variant="label" weight="bold" color="shade6">
                  {formatMeasurementUnit(props.buyerRequest.measurementUnit)}
                </Typography>
              }
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
              type="number"
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
              to: 'ungraded',
            })
          }
          className="checkbox"
          checked={
            props.size.from === 'ungraded' || props.size.to === 'ungraded'
          }
        />
        <Typography className="label" variant="label" color="noshade">
          Ungraded
        </Typography>
      </div>

      {!props.buyerRequest.sizeFrom && pathOr('', ['sizeFrom', '0'], errors) ? (
        <Error variant="caption" color="error">
          {pathOr('', ['sizeFrom', '0'], errors)}
        </Error>
      ) : null}

      <Row className="textfield-row">
        <Col md={12} lg={6} xl={4} className="textfield-col">
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
            error={pathOr('', ['weight', '0'], errors)}
          />
        </Col>

        <Col md={12} lg={6} xl={4} className="textfield-col">
          <TextField
            label="Price per kg including delivery"
            LeftComponent={
              <Typography variant="label" weight="bold" color="shade6">
                $
              </Typography>
            }
            value={props.price}
            onChangeText={props.setPrice}
            min={1}
            type="number"
            error={pathOr('', ['price', '0'], errors)}
          />

          <div className="shipping-to">
            <Typography variant="label" color="shade6">
              Shipping to
            </Typography>
            <Typography variant="label" color="noshade" weight="bold">
              {props.shippingTo}
            </Typography>
          </div>
        </Col>

        <Col md={12} lg={6} xl={4} className="textfield-col">
          <DatePickerDropdown
            label="Delivery date"
            date={props.deliveryDate ? moment(props.deliveryDate) : null}
            onDateChange={(d) => props.setDeliveryDate(d?.toDate() || null)}
            error={pathOr('', ['deliveryDate', '0'], errors)}
          />
        </Col>

        <Col md={12} lg={6} xl={4} className="textfield-col">
          <Select
            value={props.selectedAddress}
            onChange={(o) => props.setSelectedAddress(o.value)}
            options={props.addresses}
            label="Shipping From"
            error={pathOr('', ['selectedAddress', '0'], errors)}
          />
        </Col>
      </Row>

      <div className="total-container">
        <Typography variant="label" color="shade5">
          Total Value
        </Typography>
        <Typography variant="label" color="noshade" weight="bold">
          {props.weight && props.price && (
            <>${parseFloat(props.weight) * parseFloat(props.price)}.00</>
          )}
        </Typography>
      </div>

      <Button
        onClick={props.addToMarketOffers}
        className="submit-btn"
        text="Review offer"
        variant="primary"
      />
    </Container>
  );
};

export default MakeOfferView;
