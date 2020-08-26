import React from 'react';

import Button from 'components/base/Button';
import Interactions from 'components/base/Interactions';
import { ChevronRight, Scale } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import InnerRouteHeader from 'components/module/InnerRouteHeader';
import { SELLER_ACCOUNT_ROUTES } from 'consts';
import { Row, Col } from 'react-grid-system';
import { useHistory, useLocation } from 'react-router-dom';
import { Theme } from 'types/Theme';
import { useTheme } from 'utils/Theme';

import { ConfirmListProps, PendingItem } from './ConfirmList.props';
import {
  Wrapper,
  InteractionCol,
  PendingItemContainer,
} from './ConfirmList.style';

export const Item = (props: PendingItem) => (
  <PendingItemContainer>
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
        <Scale height={16} width={16} />
        <Typography color="error" className="text" variant="caption">
          Weight to be Confirmed
        </Typography>
      </div>
      <Typography color="noshade" variant="label" weight="800">
        {props.price}
      </Typography>
    </div>
  </PendingItemContainer>
);

const ConfirmListView = (props: ConfirmListProps) => {
  const theme = useTheme();
  const { title, items } = props;

  return (
    <Wrapper>
      <InnerRouteHeader title={title} />

      <Row className="items-row">
        {items.map((item) => (
          <InteractionCol key={item.id} md={12}>
            <Item {...item} />
          </InteractionCol>
        ))}
      </Row>

      <Row>
        <Col>
          <Button variant="disabled" text="Place Order"></Button>
        </Col>
      </Row>
    </Wrapper>
  );
};

export default ConfirmListView;
