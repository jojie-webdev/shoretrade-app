import React, { useState } from 'react';

import Button from 'components/base/Button';
import Checkbox from 'components/base/Checkbox';
import { Box, Subtract } from 'components/base/SVG';
import TextField from 'components/base/TextField';
import Typography from 'components/base/Typography';
import Add from 'components/module/Add';
import AddBoxModal from 'components/module/AddBoxModal';
import { BoxValues } from 'components/module/AddBoxModal/AddBoxModal.props';
import { Row, Col } from 'react-grid-system';
import { useTheme } from 'utils/Theme';

import { Step6Props } from './Step6.props';
import {
  Container,
  BoxDetailsContainer,
  BoxSummaryContainer,
} from './Step6.style';

const MOCK_BOXES: Array<BoxValues & { id: string }> = [
  { weight: '10.00 Kg', quantity: '7', count: '56', id: 'mock-box-1' },
  { weight: '25.00 Kg', quantity: '10', count: '25', id: 'mock-box-2' },
  //   { weight: '5.00 Kg', quantity: '3', count: '27', id: 'mock-box-3' },
];

const BoxDetails = ({ weight, quantity, count }: BoxValues) => {
  const theme = useTheme();

  return (
    <BoxDetailsContainer>
      <div className="text-container">
        <div className="inner-text">
          <Typography
            variant="overline"
            color="shade6"
            className="overline"
            weight="900"
          >
            Box Weight
          </Typography>
          <Typography color="noshade">{weight}</Typography>
        </div>
        <div className="inner-text">
          <Typography
            variant="overline"
            color="shade6"
            className="overline"
            weight="900"
          >
            Quantity
          </Typography>
          <Typography color="noshade">{quantity}</Typography>
        </div>
        <div className="inner-text">
          <Typography
            variant="overline"
            color="shade6"
            className="overline"
            weight="900"
          >
            Count per Box
          </Typography>
          <Typography color="noshade">{count}</Typography>
        </div>
      </div>

      <button className="cancel-btn">
        <Subtract fill={theme.brand.error} innerFill={theme.grey.noshade} />
      </button>
    </BoxDetailsContainer>
  );
};

const BoxSummary = ({ onClick }: { onClick: () => void }) => (
  <BoxSummaryContainer>
    <div className="text-container">
      <div className="inner-text">
        <Typography
          variant="overline"
          color="shade6"
          className="overline"
          weight="900"
        >
          Box Weight
        </Typography>
        <Typography color="noshade" variant="title5">
          57.00 Kg
        </Typography>
      </div>
      <div className="inner-text">
        <Typography
          variant="overline"
          color="shade6"
          className="overline"
          weight="900"
        >
          Quantity
        </Typography>
        <Typography color="noshade" variant="title5">
          8
        </Typography>
      </div>
      <div className="inner-text">
        <Typography
          variant="overline"
          color="shade6"
          className="overline"
          weight="900"
        >
          Count per box
        </Typography>
        <Typography color="noshade" variant="title5">
          100
        </Typography>
      </div>
    </div>
    <Button text="Next" onClick={onClick} />
  </BoxSummaryContainer>
);

function Step6({ onClickNext }: Step6Props) {
  const [showModal, setShowModal] = useState(false);

  return (
    <Container>
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
        {MOCK_BOXES.map((box) => (
          <Col md={12} key={box.id}>
            <BoxDetails {...box} />
          </Col>
        ))}

        <Col md={12}>
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

      <BoxSummary onClick={onClickNext} />

      {showModal && (
        <AddBoxModal
          onAdd={() => {}}
          onClickClose={() => setShowModal(false)}
          isOpen={showModal}
        />
      )}
    </Container>
  );
}

export default Step6;
