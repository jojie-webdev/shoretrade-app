import React, { useState } from 'react';

import Typography from 'components/base/Typography';
import OrderAccordionContent from 'components/module/OrderAccordionContent';
import Pagination from 'components/module/Pagination';
import moment from 'moment';
import { Row, Col } from 'react-grid-system';
import { useTheme } from 'utils/Theme';

import { OrderItem, OrdersGeneratedProps } from '../Orders.props';
import {
  AccordionContainer,
  StyledInteraction,
  LeftContainer,
  CollapsibleContent,
  Confirmed,
} from '../Pending/Pending.style';
// import Items from '../Complete/Complete.view';

const InTransitItems = (props: OrderItem) => {
  const { data, date, price } = props;
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
                Dispatched On:
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

const InTransit = (props: OrdersGeneratedProps) => {
  const theme = useTheme();
  const { inTransitOrders } = props;

  return (
    <>
      {inTransitOrders.map((item) => {
        return (
          <AccordionContainer>
            <InTransitItems key={item.id} {...item} />
          </AccordionContainer>
        );
      })}
    </>
  );
};

export default InTransit;
