import React, { useState } from 'react';

import Button from 'components/base/Button';
import Interactions from 'components/base/Interactions';
import {
  Box as BoxSVG,
  Subtract,
  ChevronRight,
  Scale,
} from 'components/base/SVG';
import Touchable from 'components/base/Touchable';
import Typography from 'components/base/Typography';
import Add from 'components/module/Add';
import AddBoxModal from 'components/module/AddBoxModal';
import InnerRouteHeader from 'components/module/InnerRouteHeader';
import { SELLER_ACCOUNT_ROUTES } from 'consts';
import remove from 'ramda/es/remove';
import { Row, Col } from 'react-grid-system';
import { useHistory, useLocation } from 'react-router-dom';
import { Theme } from 'types/Theme';
import { toPrice } from 'utils/String/toPrice';
import { useTheme } from 'utils/Theme';

import { ConfirmProps, Box } from './Confirm.props';
import {
  Wrapper,
  DetailsContainer,
  OrderDetails,
  ItemRow,
  ItemColumn,
  ItemImage,
  Tag,
  BoxDetailsContainer,
  BoxSummaryContainer,
} from './Confirm.style';

const BoxDetails = ({
  weight,
  quantity,
  count,
  measurementUnit,
  onRemove,
}: Box & { measurementUnit: string; onRemove: () => void }) => {
  const theme = useTheme();

  return (
    <BoxDetailsContainer>
      <div className="text-container">
        <div className="inner-text">
          <Typography
            variant="overline"
            color="shade6"
            className="overline"
            weight="900"
          >
            Box Weight
          </Typography>
          <Typography color="noshade">{`${weight.toFixed(
            2
          )} ${measurementUnit}`}</Typography>
        </div>
        <div className="inner-text">
          <Typography
            variant="overline"
            color="shade6"
            className="overline"
            weight="900"
          >
            Quantity
          </Typography>
          <Typography color="noshade">{quantity}</Typography>
        </div>
        <div className="inner-text">
          <Typography
            variant="overline"
            color="shade6"
            className="overline"
            weight="900"
          >
            Count per Box
          </Typography>
          <Typography color="noshade">
            {count ? count?.toFixed(2) : ''}
          </Typography>
        </div>
      </div>

      <Touchable onPress={() => onRemove()} circle dark>
        <Subtract fill={theme.brand.error} innerFill={theme.grey.noshade} />
      </Touchable>
    </BoxDetailsContainer>
  );
};

const BoxSummary = ({
  weight,
  quantities,
  amount,
}: {
  weight: string;
  quantities: string;
  amount: string;
}) => (
  <BoxSummaryContainer>
    <div className="text-container">
      <div className="inner-text">
        <Typography variant="label" color="shade6" className="overline">
          Box Weight
        </Typography>
        <Typography color="noshade" weight="bold">
          {weight}
        </Typography>
      </div>
      <div className="inner-text">
        <Typography variant="label" color="shade6" className="overline">
          Quantity
        </Typography>
        <Typography color="noshade" weight="bold">
          {quantities}
        </Typography>
      </div>
      <div className="inner-text">
        <Typography variant="label" color="shade6" className="overline">
          New Total
        </Typography>
        <Typography color="noshade" weight="bold">
          {amount}
        </Typography>
      </div>
    </div>
  </BoxSummaryContainer>
);

const ConfirmView = (props: ConfirmProps) => {
  const theme = useTheme();
  const {
    details,
    boxes,
    measurementUnit,
    setBoxes,
    pricePerKilo,
    onCancel,
    onConfirm,
  } = props;

  const { orderNumber, buyer, uri, price, name, tags, size } = details;

  const [showModal, setShowModal] = useState(false);

  const totalWeight = boxes.reduce((t, box) => {
    return t + box.weight * box.quantity;
  }, 0);

  const totalBoxes = boxes.reduce((t, box) => {
    return t + box.quantity;
  }, 0);

  const totalAmount = totalWeight * pricePerKilo;

  const summary = {
    weight: `${totalWeight.toFixed(2)} ${measurementUnit}`,
    quantities: `${totalBoxes} ${totalBoxes > 1 ? 'Boxes' : 'Box'}`,
    amount: toPrice(totalAmount),
  };

  return (
    <Wrapper>
      <InnerRouteHeader title={'Confirm Weights'} />
      <Typography color="shade5">
        Confirming this order will move it into:
      </Typography>
      <Typography variant="title5" color="noshade">
        “To Ship”
      </Typography>
      <DetailsContainer>
        <OrderDetails>
          <div className="order-details-item">
            <Typography variant="overline" color="shade5">
              ORDER
            </Typography>
            <Typography
              className="order-details-item-value"
              color="primary"
              weight="bold"
            >
              {orderNumber}
            </Typography>
          </div>
          <div className="order-details-item">
            <Typography variant="overline" color="shade5">
              PRICE
            </Typography>
            <Typography
              className="order-details-item-value"
              color="noshade"
              weight="bold"
            >
              {price}
            </Typography>
          </div>
          <div className="order-details-item">
            <Typography variant="overline" color="shade5">
              BUYER
            </Typography>
            <Typography
              className="order-details-item-value"
              color="noshade"
              weight="bold"
            >
              {buyer}
            </Typography>
          </div>
        </OrderDetails>
        <ItemRow>
          <ItemImage src={uri} alt="" />
          <ItemColumn>
            <Typography variant="title5" color="noshade">
              {name}
            </Typography>
            <div className="tags-container">
              {tags.map((tag) => (
                <Tag key={tag.label}>
                  <Typography variant="caption" color="noshade">
                    {tag.label}
                  </Typography>
                </Tag>
              ))}
            </div>
            <div className="size-container">
              <Typography className="size-label" color="shade6">
                Size:
              </Typography>
              <Typography color="noshade">{size}</Typography>
            </div>
          </ItemColumn>
        </ItemRow>
      </DetailsContainer>
      {boxes.map((box, index) => (
        <BoxDetails
          {...box}
          key={box.id}
          measurementUnit={measurementUnit}
          onRemove={() => {
            setBoxes(remove(index, 1, boxes));
          }}
        />
      ))}
      <div className="add-box-container">
        <Add
          title="Add a box"
          Svg={BoxSVG}
          onClick={() => setShowModal(true)}
        />
      </div>
      <BoxSummary {...summary} />
      <div className="actions-container">
        <Button
          style={{ marginRight: 16, width: 200 }}
          text="CANCEL"
          variant="outline"
          onClick={() => onCancel()}
        />

        <Button
          style={{ width: 200 }}
          text="CONFIRM"
          onClick={() => onConfirm()}
        />
      </div>

      {showModal && (
        <AddBoxModal
          unit={measurementUnit}
          onAdd={(values) => {
            if (values.weight && values.quantity) {
              const box: Box = {
                weight: Number(values.weight),
                quantity: Number(values.quantity),
                count: values.count !== '' ? Number(values.count) : undefined,
                id: `new-${new Date().getTime().toString()}`,
              };
              setBoxes([...boxes, box]);
            }
          }}
          onClickClose={() => setShowModal(false)}
          isOpen={showModal}
        />
      )}
    </Wrapper>
  );
};

export default ConfirmView;
