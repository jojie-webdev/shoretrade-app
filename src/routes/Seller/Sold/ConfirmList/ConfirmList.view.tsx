import React from 'react';

import Button from 'components/base/Button';
import Interactions from 'components/base/Interactions';
import { ChevronRight, Scale } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import InnerRouteHeader from 'components/module/InnerRouteHeader';
import { SELLER_ACCOUNT_ROUTES, SELLER_SOLD_ROUTES } from 'consts';
import { Row, Col } from 'react-grid-system';
import { useHistory, useLocation } from 'react-router-dom';
import { Theme } from 'types/Theme';
import theme, { useTheme } from 'utils/Theme';

import { ConfirmListProps, PendingItem } from './ConfirmList.props';
import {
  Wrapper,
  InteractionCol,
  PendingItemContainer,
} from './ConfirmList.style';

export const Item = (props: PendingItem) => (
  <PendingItemContainer
    onClick={
      props.weightConfirmed
        ? undefined
        : () => {
            if (!props.weightConfirmed) {
              props.onPress();
            }
          }
    }
  >
    <div className="top-content">
      <div className="left">
        <img src={props.uri} alt="Pending Item" />
        <div className="text-container">
          <Typography color="noshade" weight="500">
            {props.name}
          </Typography>
          <div className="shipping">
            <Typography
              color="shade6"
              variant="label"
              className="shipping-text"
            >
              Shipping:
            </Typography>
            <Typography color="noshade" variant="label">
              {props.shipping}
            </Typography>
          </div>
        </div>
      </div>
      <div className="right">
        <ChevronRight height={16} width={16} />
      </div>
    </div>

    <hr className="divider" />

    <div className="bottom">
      <div className="text-container">
        {props.weightConfirmed ? (
          <>
            <Scale height={16} width={16} fill={theme.brand.secondary} />
            <Typography color="secondary" className="text" variant="caption">
              Weight Confirmed
            </Typography>
          </>
        ) : (
          <>
            <Scale height={16} width={16} />
            <Typography color="error" className="text" variant="caption">
              Weight to be Confirmed
            </Typography>
          </>
        )}
      </div>
      <Typography color="noshade" variant="label" weight="800">
        {props.price}
      </Typography>
    </div>
  </PendingItemContainer>
);

const ConfirmListView = (props: ConfirmListProps) => {
  const theme = useTheme();
  const { title, items, orderId, placeOrder, isPending } = props;
  const history = useHistory();

  const allowPartialShipment = items.some((i) => i.weightConfirmed);
  const allowFullShipment = items.every((i) => i.weightConfirmed);

  return (
    <Wrapper>
      <InnerRouteHeader title={title} />

      <Row className="items-row">
        {items.map((item) => (
          <InteractionCol key={item.id} md={12}>
            <Item
              {...item}
              onPress={() => {
                history.push(
                  SELLER_SOLD_ROUTES.CONFIRM.replace(
                    ':orderId',
                    orderId
                  ).replace(':lineItemId', item.id)
                );
              }}
            />
          </InteractionCol>
        ))}
      </Row>

      <Row>
        <Col>
          {allowPartialShipment && !allowFullShipment && (
            <Button
              onClick={() => placeOrder({ isPartial: true })}
              text="Ship Partial"
              loading={isPending}
            />
          )}

          {allowPartialShipment && allowFullShipment && (
            <Button
              onClick={() => placeOrder({ isPartial: false })}
              text="Ship Order"
              loading={isPending}
            />
          )}

          {!allowPartialShipment && (
            <Button variant="disabled" text="Ship Order" />
          )}
        </Col>
      </Row>
    </Wrapper>
  );
};

export default ConfirmListView;
