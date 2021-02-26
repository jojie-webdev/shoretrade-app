import React from 'react';

// import { useTheme } from 'utils/Theme';
import Alert from 'components/base/Alert/Alert.view';
import Button from 'components/base/Button';
import Checkbox from 'components/base/Checkbox/Checkbox.view';
import Interactions from 'components/base/Interactions';
import TextField from 'components/base/TextField';
import Typography from 'components/base/Typography';
import DatePickerDropdown from 'components/module/DatePickerDropdown/DatePickerDropdown.view';
import moment from 'moment';
import { Col, Row } from 'react-grid-system';

import { MakeOfferGeneratedProps } from './MakeOffer.props';
import { Container } from './MakeOffer.style';

const MakeOfferView = (props: MakeOfferGeneratedProps) => {
  // const theme = useTheme();
  return (
    <Container>
      <Alert
        variant="infoAlert"
        fullWidth
        content={
          'When you are making an offer you are committing to sell this product to this buyer. ' +
          'You need to make sure that the product is available if the buyer accept.'
        }
        style={{
          marginBottom: 32,
        }}
      />

      <Typography variant="overline" color="shade6" className="row-label">
        Specs
      </Typography>
      <Row>
        {[
          'Fresh',
          'Frozen',
          'Cleaned',
          'Whole',
          'Not Tenderised',
          'Tenderised',
        ].map((v) => (
          <Col key={v} md={12} lg={6} xl={4}>
            <Interactions
              value={v}
              type="radio"
              padding="14px 18px"
              onClick={() => {}}
            />
          </Col>
        ))}
      </Row>

      <Typography variant="overline" color="shade6" className="row-label">
        Size
      </Typography>
      <Row>
        {['Medium', 'Large', 'Giant'].map((v) => (
          <Col key={v} md={12} lg={6} xl={4}>
            <Interactions
              value={v}
              type="radio"
              padding="14px 18px"
              onClick={() => {}}
            />
          </Col>
        ))}
      </Row>

      <div className="checkbox-container ungraded">
        <Checkbox onClick={(v) => {}} className="checkbox" checked={false} />
        <Typography className="label" variant="label" color="noshade">
          Ungraded
        </Typography>
      </div>

      <Row>
        <Col md={12} lg={6} xl={4} className="textfield-col">
          <TextField
            label="Quantity"
            LeftComponent={
              <Typography variant="label" weight="bold" color="shade6">
                Kg
              </Typography>
            }
            value={''}
            onChangeText={() => {}}
            type="number"
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
            value={''}
            onChangeText={() => {}}
            type="number"
          />
        </Col>

        <Col md={12} lg={6} xl={4} className="textfield-col">
          <DatePickerDropdown
            label="Delivery date"
            date={moment()}
            onDateChange={(d) => {}}
          />
        </Col>
      </Row>

      <div className="total-container">
        <Typography variant="label" color="shade5">
          Total Value
        </Typography>
        <Typography variant="label" color="noshade" weight="bold">
          $1895.00
        </Typography>
      </div>

      <Button
        onClick={() => props.setStep && props.setStep(3)}
        className="submit-btn"
        text="Review offer"
        variant="primary"
      />
    </Container>
  );
};

export default MakeOfferView;
