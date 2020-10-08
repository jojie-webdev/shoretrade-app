import React from 'react';

// import { useTheme } from 'utils/Theme';
import Radio from 'components/base/Radio';
import Typography from 'components/base/Typography';
// import { Col } from 'react-grid-system';

import { BoxRadioProps } from './BoxRadio.props';
import { Container, Row, Col } from './BoxRadio.style';

const BoxRadio = (props: BoxRadioProps): JSX.Element => {
  const {
    checked,
    onClick,
    quantity,
    totalWeight,
    weight,
    cost,
    unit = 'kg',
  } = props;
  // const theme = useTheme();
  return (
    <Container>
      <Row>
        <Col>
          <Radio checked={checked} onClick={onClick} />
        </Col>
        <Col style={{ paddingLeft: 20 }}>
          <Typography variant="label" color="shade6">{`${weight.toFixed(
            2
          )} ${unit}`}</Typography>
        </Col>

        <Col style={{ paddingLeft: 16 }}>
          <Typography variant="label" color="shade6">
            {quantity}x
          </Typography>
        </Col>

        <Col style={{ paddingLeft: 16 }}>
          {totalWeight !== undefined && (
            <Typography variant="label" color="shade6">
              {totalWeight.toFixed(2)} {unit}
            </Typography>
          )}
        </Col>
        {cost !== undefined && (
          <Typography
            style={{ marginLeft: 'auto' }}
            variant="label"
            color="shade9"
          >
            ${cost.toFixed(2)}
          </Typography>
        )}
      </Row>
    </Container>
  );
};

export default React.memo(BoxRadio);
