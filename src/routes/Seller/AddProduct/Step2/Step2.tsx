import React from 'react';

import Interactions from 'components/base/Interactions';
import Typography from 'components/base/Typography';
import Search from 'components/module/Search';
import { Row, Col } from 'react-grid-system';

import { Step2Props } from './Step2.props';
import { Container } from './Step2.style';

function Step2({ onClickNext }: Step2Props) {
  return (
    <Container>
      <Row className="search-row">
        <Col xs={12}>
          <Search value={''} onChange={() => {}} resetValue={() => {}} />
        </Col>
      </Row>

      <Row className="results-row">
        <Col xs={12}>
          <Typography variant="overline" color="shade6" className="title">
            Results
          </Typography>

          {Array.from('x'.repeat(10)).map((num, ndx) => (
            <div className="item-container" key={'step2-' + ndx}>
              <Interactions value="Abait Tuna" onClick={onClickNext} />
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  );
}

export default Step2;
