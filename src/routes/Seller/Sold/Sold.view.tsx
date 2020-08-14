import React from 'react';

import SegmentedControls from 'components/base/SegmentedControls';
import { Octopus, ChevronRight, Scale, InfoFilled } from 'components/base/SVG';
import PaperPlane from 'components/base/SVG/PaperPlane';
import Typography from 'components/base/Typography';
import EmptyState from 'components/module/EmptyState';
import { Row, Col } from 'react-grid-system';
import { useTheme } from 'utils/Theme';

import { SoldGeneratedProps, TabOptions, MOCK_SOLD } from './Sold.props';
import {
  Container,
  PriorityNumber,
  StyledInteraction,
  DeliveryRow,
  PendingItemContainer,
  PendingRow,
} from './Sold.style';

export const SoldItem = ({ cutoffTime, type }: MOCK_SOLD) => (
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
      <Typography variant="label" color="shade6" className="center-text">
        {type} Freight Cut Off
      </Typography>
      <Typography variant="label" color="noshade">
        {cutoffTime}
      </Typography>
    </div>
  </StyledInteraction>
);

export const PendingItem = () => (
  <PendingItemContainer>
    <div className="top-content">
      <div className="left">
        <img src="" alt="Pending Item" />
        <div className="text-container">
          <Typography color="noshade" weight="500">
            King Salmon Manuka Cold Smoked Sliced
          </Typography>
          <div className="shipping">
            <Typography
              color="shade6"
              variant="label"
              className="shipping-text"
            >
              Shipping:
            </Typography>
            <Typography color="noshade" variant="label">
              Wed 26 Apr
            </Typography>
          </div>
        </div>
      </div>
      <div className="right">
        <ChevronRight height={16} width={16} />
      </div>
    </div>

    <hr className="divider" />

    <div className="bottom">
      <div className="text-container">
        <Scale height={16} width={16} />
        <Typography color="error" className="text" variant="caption">
          Weight to be Confirmed
        </Typography>
      </div>
      <Typography color="noshade" variant="label" weight="800">
        $986.50
      </Typography>
    </div>
  </PendingItemContainer>
);

const SoldView = (props: SoldGeneratedProps) => {
  const theme = useTheme();

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

          <PendingRow>
            <Col md={12} className="title-col">
              <div className="svg-container">
                <InfoFilled fill={theme.brand.alert} height={18} width={18} />
              </div>
              <Typography color="alert">Pending Confirmation</Typography>
            </Col>

            <div className="items-container">
              <PendingItem />
              <PendingItem />
              <PendingItem />
              <PendingItem />
            </div>
          </PendingRow>

          <DeliveryRow className="delivery-row">
            <Col>
              <Typography color="noshade" className="title">
                Today
              </Typography>

              {soldData
                .filter((data) => data.type === 'Air')
                .map((item, ndx) => (
                  <SoldItem key={`Air-${ndx}`} {...item} />
                ))}
            </Col>
          </DeliveryRow>

          <DeliveryRow className="delivery-row">
            <Col>
              <Typography color="noshade" className="title">
                Tomorrow
              </Typography>

              {soldData
                .filter((data) => data.type === 'Road')
                .map((item, ndx) => (
                  <SoldItem key={`Air-${ndx}`} {...item} />
                ))}
            </Col>
          </DeliveryRow>
        </>
      )}
    </Container>
  );
};

export default SoldView;
