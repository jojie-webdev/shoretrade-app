import React from 'react';

// import { useTheme } from 'utils/Theme';

import SegmentedControls from 'components/base/SegmentedControls';
import { Octopus } from 'components/base/SVG';
import PaperPlane from 'components/base/SVG/PaperPlane';
import Typography from 'components/base/Typography';
import EmptyState from 'components/module/EmptyState';
import { Row, Col } from 'react-grid-system';

import { SoldGeneratedProps, TabOptions } from './Sold.props';
import { Container, PriorityNumber, StyledInteraction } from './Sold.style';

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

              <StyledInteraction
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
              >
                <div className="content">
                  <PaperPlane height={12} width={12} />
                  <Typography
                    variant="label"
                    color="shade6"
                    className="center-text"
                  >
                    Air Freight Cut Off
                  </Typography>
                  <Typography variant="label" color="noshade">
                    12:00 am
                  </Typography>
                </div>
              </StyledInteraction>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default SoldView;
