import React, { useState } from 'react';

import { Label } from 'components/base/Select/Select.style';
import { Container } from 'components/base/Spinner/Spinner.style';
import Typography from 'components/base/Typography';
import OrderAccordionContent from 'components/module/OrderAccordionContent';
import Pagination from 'components/module/Pagination';
import moment from 'moment';
import { Row, Col } from 'react-grid-system';
import { useTheme } from 'utils/Theme';

import { OrderItem, OrdersGeneratedProps } from '../Orders.props';
import {
  Confirmed,
  StyledInteraction,
  CollapsibleContent,
  LeftContainer,
  AccordionContainer,
} from './Pending.style';

const PendingItems = (props: OrderItem) => {
  const { confirmed, data, date, id, price } = props;
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
            <Confirmed
              variant="overline"
              color={confirmed ? 'success' : 'warning'}
            >
              {confirmed ? 'Confirmed' : 'Pending Confirmation'}
            </Confirmed>
            <Row>
              <Typography
                style={{ marginRight: '4px', marginLeft: '16px' }}
                variant="label"
                color="shade6"
                weight="500"
              >
                Est. Catchment:
              </Typography>
              <Typography variant="label" color="shade8" weight="bold">
                {moment(date).format('ddd DD MMM')}
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

const Pending = (props: OrdersGeneratedProps) => {
  const theme = useTheme();

  const { pendingOrders, pendingOrdersCount, filters, updateFilters } = props;

  const pendingPagesTotal = Math.ceil(Number(pendingOrdersCount) / 10);

  return (
    <>
      {pendingOrders.map((item) => {
        return (
          <AccordionContainer>
            <PendingItems key={item.id} {...item} />
          </AccordionContainer>
        );
      })}

      <Row justify="center">
        <Pagination
          numPages={pendingPagesTotal}
          currentValue={Number(filters.pendingOrdersFilter.page)}
          onClickButton={(value) =>
            updateFilters.updatePendingOrdersFilter({
              page: value.toFixed(0),
            })
          }
          variant="number"
        />
      </Row>
    </>
  );
};

export default Pending;
