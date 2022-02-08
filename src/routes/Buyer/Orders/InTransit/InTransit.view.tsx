import React, { useReducer } from 'react';

import { Oysters } from 'components/base/SVG';
import EmptyState from 'components/module/EmptyState';
import ScanHistoryModal from 'components/module/ScanHistoryModal';
import { BUYER_ROUTES } from 'consts';
import { Col, Row } from 'react-grid-system';
import { useHistory } from 'react-router';
import { ScanHistoryItem } from 'types/store/GetSellerOrdersState';
import { createUpdateReducer } from 'utils/Hooks';

import GroupedOrderItems from '../GroupedOrderItems/GroupedOrderItems.view';
import { OrdersGeneratedProps } from '../Orders.props';

const InTransit = (props: OrdersGeneratedProps) => {
  const history = useHistory();
  const { inTransitOrders, filters, updateFilters, selectionCount } = props;

  const [scanHistoryModal, updateScanHistoryModal] = useReducer(
    createUpdateReducer<{
      scanHistoryItems: ScanHistoryItem[];
      isOpen: boolean;
    }>(),
    {
      scanHistoryItems: [],
      isOpen: false,
    }
  );
  return (
    <>
      <ScanHistoryModal
        onClickClose={() => {
          updateScanHistoryModal({
            isOpen: false,
          });
        }}
        title="Scan History"
        {...scanHistoryModal}
      />
      {Object.keys(inTransitOrders).length === 0 ? (
        <Row className="emptystate-row" align="center" justify="center">
          <Col>
            <EmptyState
              title={`You have no orders In Transit`}
              buttonText="START AN ORDER"
              onButtonClicked={() => history.push(BUYER_ROUTES.SEARCH)}
              Svg={Oysters}
            />
          </Col>
        </Row>
      ) : (
        <GroupedOrderItems
          groupedData={inTransitOrders}
          groupedCount={selectionCount}
          token={props.token}
          filter={filters.inTransitOrdersFilter}
          updateFilter={updateFilters.updateInTransitOrdersFilter}
          updateScanHistoryModal={updateScanHistoryModal}
        />
      )}
    </>
  );
};

export default InTransit;
