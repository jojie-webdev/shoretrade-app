import React, { useReducer } from 'react';

import Typography from 'components/base/Typography';
import Pagination from 'components/module/Pagination';
import { DEFAULT_PAGE_LIMIT } from 'consts';
import moment from 'moment';
import { Row, Col } from 'react-grid-system';

import { SoldGeneratedProps } from '../Sold.props';
import SoldItem from '../SoldItem.view';
import { TitleRow } from '../ToShip/ToShip.styles';
import { ItemRow } from './Delivered.styles';

const Delivered = (props: SoldGeneratedProps) => {
  const { delivered, token, deliveredCount, updateFilters, filters } = props;

  const deliveredPagesTotal = Math.ceil(
    Number(deliveredCount) / DEFAULT_PAGE_LIMIT
  );

  return (
    <>
      {delivered.map((group, idx) => {
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
                    style={{ fontFamily: 'Media Sans', fontSize: '20px' }}
                  >
                    {calendarDateString}
                  </Typography>
                  <span className="notification notif-reg">
                    {group.orderTotal}
                  </span>
                </Col>
              </TitleRow>
              <SoldItem data={group.data} token={token} status="DELIVERED" />
            </Col>
          </ItemRow>
        );
      })}

      {deliveredPagesTotal > 1 && (
        <Row justify="center">
          <Pagination
            numPages={deliveredPagesTotal}
            currentValue={Number(filters.deliveredFilters.page)}
            onClickButton={(value) =>
              updateFilters.updateDeliveredFilters({
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

export default Delivered;
