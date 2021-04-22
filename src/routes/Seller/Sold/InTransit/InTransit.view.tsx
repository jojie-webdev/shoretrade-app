import React, { Fragment, useState } from 'react';

import Button from 'components/base/Button';
import { Plane, Truck, DownloadFile } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import Pagination from 'components/module/Pagination';
import { API, DEFAULT_PAGE_LIMIT, SELLER_SOLD_ROUTES } from 'consts';
import moment from 'moment';
import sort from 'ramda/src/sort';
import { Row, Col } from 'react-grid-system';
import { useHistory } from 'react-router-dom';
import { useTheme } from 'utils/Theme';

import { SoldGeneratedProps } from '../Sold.props';
import { sortByDate } from '../Sold.tranform';
import SoldItem from '../SoldItem.view';
import {
  StyledInteraction,
  CollapsibleContent,
  Spacer,
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
      {sort(sortByDate, inTransit).map((group) => {
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

          return targetDate.format('Do MMMM');
        };

        const calendarDateString = getDisplayDate();

        return (
          <ItemRow key={calendarDateString}>
            <Col>
              <StyledInteraction
                pressed={isOpen.includes(calendarDateString)}
                onClick={() => toggleAccordion(calendarDateString)}
                type="accordion"
                iconColor={theme.brand.primary}
              >
                <div className="content">
                  <div className="left-content left-content-extended">
                    <Typography
                      variant="label"
                      color="noshade"
                      className="center-text title-text"
                    >
                      {calendarDateString}
                    </Typography>

                    <div className="order-count">
                      <Typography variant="label" color="noshade">
                        {group.orderTotal}&nbsp;
                        {group.orderTotal > 1 ? 'ORDERS' : 'ORDER'}
                      </Typography>
                    </div>
                  </div>
                  <Spacer />
                  <div className="right-content" />
                  <div className="buttons" />
                </div>
              </StyledInteraction>

              <CollapsibleContent
                isOpen={isOpen.includes(calendarDateString)}
                style={{ marginLeft: 24, marginRight: 24, overflow: 'visible' }}
              >
                <SoldItem data={group.data} token={token} status="TRANSIT" />
              </CollapsibleContent>
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
