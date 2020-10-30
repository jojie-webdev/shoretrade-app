import React, { useState } from 'react';

import Typography from 'components/base/Typography';
import OrderAccordionContent from 'components/module/OrderAccordionContent';
import moment from 'moment';
import { Row } from 'react-grid-system';
// import { useTheme } from 'utils/Theme';

import { OrderItem, OrdersGeneratedProps } from '../Orders.props';
import {
  Confirmed,
  StyledInteraction,
  CollapsibleContent,
  LeftContainer,
  AccordionContainer,
  StyledAccordion,
} from './Pending.style';
import { groupByDate, sortByDateAsc } from './Pending.transform';

const PendingItems = (props: OrderItem) => {
  const {
    confirmed,
    data,
    estCatchmentDate,
    id,
    price,
    isAquafuture,
    estDeliveryDate,
  } = props;
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
              {confirmed ? 'Weights Confirmed' : 'Pending Confirmation'}
            </Confirmed>
            <Row>
              <Typography
                style={{ marginRight: '4px', marginLeft: '16px' }}
                variant="label"
                color="shade6"
                weight="500"
              >
                Estimated {isAquafuture ? 'Catchment:' : 'Delivery:'}{' '}
              </Typography>
              <Typography variant="label" color="shade8" weight="bold">
                {moment(
                  isAquafuture ? estCatchmentDate : estDeliveryDate
                ).format('ddd DD MMM')}
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
  // const theme = useTheme();

  const { pendingOrders } = props;

  const data = groupByDate(sortByDateAsc(pendingOrders));

  return (
    <>
      {Object.keys(data).map((key) => (
        <StyledAccordion
          key={key}
          noBg
          title={key}
          padding="16px 8px"
          marginBottom="16px"
        >
          {data[key].map((d) => (
            <AccordionContainer key={d.id}>
              <PendingItems {...d} />
            </AccordionContainer>
          ))}
        </StyledAccordion>
      ))}
    </>
  );
};

export default Pending;
