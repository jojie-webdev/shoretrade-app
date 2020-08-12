import React, { useState } from 'react';

import Button from 'components/base/Button';
import Checkbox from 'components/base/Checkbox';
import { Box } from 'components/base/SVG';
import TextField from 'components/base/TextField';
import Typography from 'components/base/Typography';
import Add from 'components/module/Add';
import AddBoxModal from 'components/module/AddBoxModal';
import { Row, Col } from 'react-grid-system';

import { Step6Wrapper } from './AddProduct.style';

const BoxDetails = () => (
    
)

function Step6() {
  const [showModal, setShowModal] = useState(false);

  return (
    <Step6Wrapper>
      <Row className="checkbox-row">
        <Col className="checkbox-col">
          <Checkbox checked />
          <div className="text-container">
            <Typography color="noshade" variant="label">
              This is an Aquafuture Listing.
            </Typography>
            <Typography color="shade5" variant="caption">
              It has not been boxed or weighted yet. Enter estimate weights
              below. You’ll need to finalise box weights before shipping.
            </Typography>
          </div>
        </Col>
      </Row>

      <Row className="add-box-row">
        <Col>
          <Add title="Add a box" Svg={Box} onClick={() => setShowModal(true)} />
        </Col>
      </Row>

      <Row className="minimum-row" align="center">
        <Col md={6} lg={5}>
          <TextField
            label="Minimum Order"
            // value={minimumOrder}
            // onChangeText={setMinimumOrder}
            placeholder="0"
            LeftComponent={
              <Typography variant="label" color="shade6">
                Kg
              </Typography>
            }
          />
        </Col>

        <Col md={6} lg={4} offset={{ lg: 1, md: 0 }} className="checkbox-col">
          <Checkbox checked className="checkbox" />
          <Typography color="noshade" className="text">
            Sell in multiples of the minimum
          </Typography>
        </Col>
      </Row>

      <Row justify="end" style={{ padding: '0 15px' }}>
        <Button text="Next" />
      </Row>

      {showModal && (
        <AddBoxModal
          onAdd={() => {}}
          onClickClose={() => setShowModal(false)}
          isOpen={showModal}
        />
      )}
    </Step6Wrapper>
  );
}

export default Step6;
