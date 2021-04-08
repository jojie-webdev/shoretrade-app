import React, { Fragment, useState } from 'react';

import Button from 'components/base/Button';
import { Plane, Truck, DownloadFile } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import Pagination from 'components/module/Pagination';
import { API, SELLER_SOLD_ROUTES } from 'consts';
import moment from 'moment';
import { Row, Col } from 'react-grid-system';
import { useHistory } from 'react-router-dom';
import { useTheme } from 'utils/Theme';

import { SoldGeneratedProps } from '../Sold.props';
import SoldItem from '../SoldItem.view';
import {
  StyledInteraction,
  CollapsibleContent,
  Spacer,
  ItemRow,
} from './Delivered.styles';

const Delivered = (props: SoldGeneratedProps) => {
  const { delivered, token, deliveredCount, updateFilters, filters } = props;

  const theme = useTheme();
  const history = useHistory();
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

  const deliveredPagesTotal = Math.ceil(Number(deliveredCount) / 10);

  return (
    <>
      {delivered.map((group) => {
        const getDisplayDate = () => {
          const targetDate = moment(group.title);
          const currentDate = moment();
          const dateDiff = targetDate.diff(currentDate, 'days');

          if (dateDiff === -1) {
            return 'Yesterday';
          } else if (dateDiff === 0) {
            return 'Today';
          } else if (dateDiff === 1) {
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
                <SoldItem data={group.data} token={token} status="DELIVERED" />
              </CollapsibleContent>
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
