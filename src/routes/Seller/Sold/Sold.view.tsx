import React from 'react';

// import { useTheme } from 'utils/Theme';
import Interaction from 'components/base/Interactions';
import SegmentedControls from 'components/base/SegmentedControls';
import { Octopus } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import EmptyState from 'components/module/EmptyState';
import { Row, Col } from 'react-grid-system';

import { SoldGeneratedProps, TabOptions } from './Sold.props';
import { Container, PriorityNumber } from './Sold.style';

const SoldView = (props: SoldGeneratedProps) => {
  // const theme = useTheme();

  const { toggleSoldData, soldData, currentTab, onChangeCurrentTab } = props;

  return (
    <Container>
      {soldData.length === 0 ? (
        <Row className="emptystate-row" align="center" justify="center">
          <Col>
            <EmptyState
              title="You have no orders awaiting shipment"
              buttonText="Toggle Empty State"
              onButtonClicked={toggleSoldData}
              Svg={Octopus}
            />
          </Col>
        </Row>
      ) : (
        <>
          <Row className="controls-row">
            <Col>
              <SegmentedControls
                options={['To Ship', 'In Transit', 'Delivered']}
                selectedOption={currentTab}
                onClickControl={(value) =>
                  onChangeCurrentTab(value as TabOptions)
                }
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <Typography color="noshade" className="title">
                Today
              </Typography>

              <Interaction
                type="accordion"
                value="Test"
                onClick={() => {}}
                leftComponent={
                  <PriorityNumber>
                    <Typography color="noshade" variant="label">
                      1
                    </Typography>
                  </PriorityNumber>
                }
              />
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default SoldView;
