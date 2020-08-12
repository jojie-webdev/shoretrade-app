import React from 'react';

import DollarSign from 'components/base/SVG/DollarSign';
import TextField from 'components/base/TextField';
import DatePickerDropdown from 'components/module/DatePickerDropdown';
import moment from 'moment';
import { Row, Col } from 'react-grid-system';

import { Step7Wrapper } from './AddProduct.style';

function Step7() {
  return (
    <Step7Wrapper>
      <Row>
        <Col md={6} className="textfield-col">
          <TextField
            label="Price (exluding freight)"
            LeftComponent={<DollarSign height={15} width={15} />}
          />
        </Col>
        <Col md={6} className="textfield-col">
          <DatePickerDropdown
            label="Catch Date"
            date={moment()}
            onDateChange={(args) => {}}
          />
        </Col>
        <Col md={6} className="textfield-col">
          <TextField label="Catchment Origin (TODO: Google Search Modal)" />
        </Col>
        <Col md={6} className="textfield-col">
          <DatePickerDropdown
            label="Listing valid until"
            date={moment()}
            onDateChange={(args) => {}}
          />
        </Col>
        <Col md={12} className="textfield-col">
          <TextField label="Additional notes (Optional)" />
        </Col>
      </Row>

      <Row></Row>
    </Step7Wrapper>
  );
}

export default Step7;
