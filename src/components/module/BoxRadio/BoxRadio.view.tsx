import React from 'react';

// import { useTheme } from 'utils/Theme';
import Radio from 'components/base/Radio';
import Typography from 'components/base/Typography';
// import { Col } from 'react-grid-system';

import { BoxRadioProps } from './BoxRadio.props';
import {
  Container,
  Row,
  Col,
  BreakdownRow,
  BreakDownCol,
} from './BoxRadio.style';

const BoxRadio = (props: BoxRadioProps): JSX.Element => {
  const { checked, onClick, totalWeight, boxes, cost, unit = 'kg' } = props;
  // const theme = useTheme();
  return (
    <Container>
      <Row>
        <Col>
          <Radio checked={checked} onClick={onClick} />
        </Col>

        <Col style={{ flex: 1 }}>
          {boxes.map((b) => (
            <BreakdownRow key={b.id}>
              <BreakDownCol
                style={{
                  paddingLeft: 24,
                  paddingTop: 4,
                  alignItems: 'left',
                  minWidth: 100,
                  maxWidth: 100,
                }}
              >
                <Typography variant="caption" color="shade6">{`${
                  Number.isInteger(b.weight)
                    ? b.weight.toFixed(0)
                    : b.weight.toFixed(2)
                } ${unit}`}</Typography>
              </BreakDownCol>

              <Col style={{ paddingLeft: 16, paddingTop: 4 }}>
                <Typography variant="caption" color="shade6">
                  {b.quantity || 0}x
                </Typography>
              </Col>

              <BreakDownCol
                style={{ paddingLeft: 16, minWidth: 120, maxWidth: 120 }}
              >
                <Typography variant="body" color="shade6">
                  {Number.isInteger(b.weight)
                    ? (b.weight * (b.quantity || 0)).toFixed(0)
                    : (b.weight * (b.quantity || 0)).toFixed(2)}{' '}
                  {unit}
                </Typography>
              </BreakDownCol>
            </BreakdownRow>
          ))}
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
