import React, { useState } from 'react';

import Typography from 'components/base/Typography';
import OrderAccordionContent from 'components/module/OrderAccordionContent';
import Pagination from 'components/module/Pagination';
import moment from 'moment';
import { Row, Col } from 'react-grid-system';
import { useTheme } from 'utils/Theme';

import Accordion from '../../../../components/base/Accordion';
import Interactions from '../../../../components/base/Interactions';
import { OrderItem, OrdersGeneratedProps } from '../Orders.props';
import {
  AccordionContainer,
  StyledInteraction,
  LeftContainer,
  Confirmed,
  CollapsibleContent,
} from '../Pending/Pending.style';

const CompletedItems = (props: OrderItem) => {
  const { confirmed, data, deliveredDate, id, price } = props;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <StyledInteraction
        pressed={isOpen}
        onClick={() => setIsOpen((v) => !v)}
        type="accordion"
        padding="16px 25px 16px 16px"
        leftComponent={
          <LeftContainer>
            <Row>
              <Typography
                style={{ marginRight: '4px', marginLeft: '16px' }}
                variant="label"
                color="shade6"
                weight="500"
              >
                Delivered On:
              </Typography>
              <Typography variant="label" color="shade8" weight="bold">
                {moment(deliveredDate).format('ddd DD MMM')}
              </Typography>
            </Row>
            <Typography variant="title5" weight="900">
              ${price}
            </Typography>
          </LeftContainer>
        }
      ></StyledInteraction>
      <CollapsibleContent isOpen={isOpen}>
        <OrderAccordionContent {...data} />
      </CollapsibleContent>
    </>
  );
};

const Complete = (props: OrdersGeneratedProps) => {
  const {
    completedOrders,
    completedOrdersCount,
    filters,
    updateFilters,
  } = props;
  const theme = useTheme();
  const completedPagesTotal = Math.ceil(Number(completedOrdersCount) / 5);
  return (
    <>
      {completedOrders.map((item, index) => {
        return (
          <AccordionContainer key={item.id}>
            <CompletedItems {...item} />
          </AccordionContainer>
        );
      })}
      <Row justify="center">
        {completedPagesTotal > 1 && (
          <Pagination
            numPages={completedPagesTotal}
            currentValue={Number(filters.completedOrdersFilter.page)}
            onClickButton={(value) =>
              updateFilters.updateCompletedOrdersFilter({
                page: value.toFixed(0),
              })
            }
            variant="number"
          />
        )}
      </Row>
    </>
  );
};

export default Complete;
