import React, { useState } from 'react';

import Button from 'components/base/Button';
import { ChevronRight, Scale, Lock } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import InnerRouteHeader from 'components/module/InnerRouteHeader';
import MessageModal from 'components/module/MessageModal';
import { SELLER_ROUTES, SELLER_SOLD_ROUTES } from 'consts';
import qs from 'qs';
import { Row, Col } from 'react-grid-system';
import { useHistory } from 'react-router-dom';
import theme, { useTheme } from 'utils/Theme';

import { ConfirmListProps, PendingItem } from './ConfirmList.props';
import {
  Wrapper,
  InteractionCol,
  PendingItemContainer,
  ValuesRow,
  Value,
  OrderNumber,
  Preview,
  TagsContainer,
  Tag,
  TagText,
  Size,
  Details,
  StyledTouchable,
  CustomBadge,
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
        {/* <ValuesRow>
          <Value>
            <Typography variant="overline" color="shade6">
              Shipping:
            </Typography>
            <OrderNumber>{props.shipping}</OrderNumber>
          </Value>
        </ValuesRow> */}
        <ValuesRow>
          <Value>
            <Typography variant="overline" color="shade6">
              Weight
            </Typography>
            <Typography color="noshade">{props.weight}</Typography>
          </Value>
        </ValuesRow>
        <div className="row">
          <Preview src={props.uri} alt="Pending Item" />
          <Details>
            <Typography variant="label" color="noshade">
              {props.name}
            </Typography>
            <TagsContainer>
              {props.tags.map((t) => (
                <Tag key={t.label}>
                  <TagText variant="small" color="noshade">
                    {t.label}
                  </TagText>
                </Tag>
              ))}
            </TagsContainer>
            {props.size ? (
              <div className="row">
                <Typography variant="small" color="shade6">
                  Size:
                </Typography>
                <Size variant="small">{props.size}</Size>
              </div>
            ) : (
              <Typography variant="small" color="shade6">
                Ungraded
              </Typography>
            )}
          </Details>
        </div>
      </div>
      {!props.weightConfirmed && (
        <div className="right">
          <ChevronRight height={16} width={16} />
        </div>
      )}
    </div>

    <hr className="divider" />

    <div className="bottom">
      <div className="text-container">
        {props.weightConfirmed ? (
          <CustomBadge>
            <Typography
              color="shade9"
              className="text"
              variant="caption"
              weight="bold"
              style={{ lineHeight: '0px' }}
            >
              Weight Confirmed
            </Typography>

            <Lock height={16} width={16} fill={theme.grey.shade9} />
          </CustomBadge>
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
  const {
    title,
    items,
    orderId,
    placeOrder,
    isPending,
    buyer,
    sendMessage,
    isSendingMessage,
  } = props;
  const history = useHistory();

  const [showMessageModal, setShowMessageModal] = useState(false);
  const allowPartialShipment = items.some((i) => i.weightConfirmed);
  const allowFullShipment = items.every((i) => i.weightConfirmed);

  return (
    <Wrapper>
      <MessageModal
        isOpen={isSendingMessage || showMessageModal}
        recipient={buyer}
        onSend={(message) => {
          sendMessage(message);
          setShowMessageModal(false);
        }}
        onClickClose={() => {
          setShowMessageModal(false);
        }}
        loading={isSendingMessage}
      />
      <InnerRouteHeader
        title={title}
        rightContent={
          <StyledTouchable onPress={() => setShowMessageModal(true)}>
            <Typography variant="body" color="noshade">
              {buyer}
            </Typography>
            <Typography variant="caption" color="success">
              Message Buyer
            </Typography>
          </StyledTouchable>
        }
        onClickBack={() =>
          history.push(
            `${SELLER_ROUTES.SOLD}${qs.stringify(
              { tab: 'To Ship' },
              { addQueryPrefix: true }
            )}`
          )
        }
      />

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
              onClick={() => placeOrder({ isPartial: !allowFullShipment })}
              text="Ship Partial"
              loading={isPending}
            />
          )}

          {allowPartialShipment && allowFullShipment && (
            <Button
              onClick={() => placeOrder({ isPartial: !allowFullShipment })}
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
