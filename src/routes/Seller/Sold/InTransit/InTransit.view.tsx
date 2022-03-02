import React, { useReducer } from 'react';

import Typography from 'components/base/Typography';
import DialogModal from 'components/module/DialogModal';
import Pagination from 'components/module/Pagination';
import ScanHistoryModal from 'components/module/ScanHistoryModal';
import { DEFAULT_PAGE_LIMIT } from 'consts';
import moment from 'moment';
import { Row, Col } from 'react-grid-system';
import { ScanHistoryItem } from 'types/store/GetSellerOrdersState';
import { createUpdateReducer } from 'utils/Hooks';
import { useTheme } from 'utils/Theme';

import { SoldGeneratedProps } from '../Sold.props';
import SoldItem from '../SoldItem.view';
import { TitleRow } from '../ToShip/ToShip.styles';
import { ItemRow } from './InTransit.styles';

const InTransit = (props: SoldGeneratedProps) => {
  const { inTransit, token, inTransitCount, filters, updateFilters } = props;
  const theme = useTheme();
  const inTransitPagesTotal = Math.ceil(
    Number(inTransitCount) / DEFAULT_PAGE_LIMIT
  );

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
      {inTransit.map((group, idx) => {
        const getDisplayDate = () => {
          const targetDate = moment(group.title);
          const currentDate = moment();

          const dateDiff = Math.floor(
            currentDate.diff(targetDate, 'days', true)
          );
          // 1 -> 1.99
          if (dateDiff === 1) {
            return 'Yesterday';
            // 0 -> 0.99
          } else if (dateDiff === 0) {
            return 'Today';
            // -1 -> -0
          } else if (dateDiff === -1) {
            return 'Tomorrow';
          }

          return targetDate.format('MMMM DD');
        };

        const calendarDateString = getDisplayDate();

        return (
          <ItemRow key={calendarDateString}>
            <Col>
              <TitleRow
                style={{
                  marginTop: idx === 0 ? 0 : 24,
                }}
              >
                <Col md={12} className="title-col">
                  <Typography
                    color="noshade"
                    style={{ fontSize: '20px' }}
                    altFont
                  >
                    {calendarDateString}
                  </Typography>
                  <span className="notification notif-reg">
                    {group.orderTotal}
                  </span>
                </Col>
              </TitleRow>
              <SoldItem
                updateScanHistoryModal={updateScanHistoryModal}
                data={group.data}
                token={token}
                status="TRANSIT"
              />
            </Col>
          </ItemRow>
        );
      })}
      {inTransitPagesTotal > 1 && (
        <Row justify="center">
          <Pagination
            numPages={inTransitPagesTotal}
            currentValue={Number(filters.inTransitFilters.page)}
            onClickButton={(value) =>
              updateFilters.updateInTransitFilters({
                page: value.toFixed(0),
              })
            }
            variant="number"
          />
        </Row>
      )}
    </>
  );
};

export default InTransit;
