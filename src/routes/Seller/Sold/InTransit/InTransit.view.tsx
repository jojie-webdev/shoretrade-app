import React, { useState } from 'react';

import Typography from 'components/base/Typography';
import Pagination from 'components/module/Pagination';
import { DEFAULT_PAGE_LIMIT } from 'consts';
import moment from 'moment';
import sort from 'ramda/src/sort';
import { Row, Col } from 'react-grid-system';
import { useTheme } from 'utils/Theme';

import { SoldGeneratedProps } from '../Sold.props';
import { sortByDate } from '../Sold.tranform';
import SoldItem from '../SoldItem.view';
import { TitleRow } from '../ToShip/ToShip.styles';
import {
  StyledInteraction,
  CollapsibleContent,
  ItemRow,
} from './InTransit.styles';

const InTransit = (props: SoldGeneratedProps) => {
  const { inTransit, token, inTransitCount, filters, updateFilters } = props;

  const theme = useTheme();
  const [isOpen, setIsOpen] = useState<string[]>([]);

  const toggleAccordion = (title: string) => {
    const isExisting = isOpen.some((v) => v === title);

    if (!isExisting) {
      setIsOpen((prevState) => [...prevState, title]);
    } else {
      setIsOpen((prevState) => {
        return prevState.filter((v) => v !== title);
      });
    }
  };

  const inTransitPagesTotal = Math.ceil(
    Number(inTransitCount) / DEFAULT_PAGE_LIMIT
  );

  return (
    <>
      {sort(sortByDate, inTransit).map((group, idx) => {
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
              <SoldItem data={group.data} token={token} status="TRANSIT" />
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
