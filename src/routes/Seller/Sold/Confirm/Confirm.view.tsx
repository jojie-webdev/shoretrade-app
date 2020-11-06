import React, { useState } from 'react';

import Button from 'components/base/Button';
import { Box as BoxSVG, Subtract } from 'components/base/SVG';
import Touchable from 'components/base/Touchable';
import Typography from 'components/base/Typography';
import Add from 'components/module/Add';
import AddBoxModal from 'components/module/AddBoxModal';
import InnerRouteHeader from 'components/module/InnerRouteHeader';
import { SELLER_ROUTES } from 'consts';
import qs from 'qs';
import remove from 'ramda/es/remove';
import { useHistory } from 'react-router-dom';
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
  ScrollWrapper,
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
  originalWeight,
  differenceWeight,
  weight,
  originalQuantity,
  differenceQuantity,
  quantities,
  originalAmount,
  differenceAmount,
  amount,
  differencePercentage,
}: {
  originalWeight: string;
  differenceWeight: string;
  weight: string;
  originalQuantity: string;
  differenceQuantity: string;
  quantities: string;
  originalAmount: string;
  differenceAmount: string;
  amount: string;
  differencePercentage: string;
}) => (
  <BoxSummaryContainer>
    <div className="text-container">
      <div className="left-text">
        <Typography variant="label" color="shade6" className="overline">
          Original Order
        </Typography>
        <Typography color="noshade" weight="bold">
          {`Difference ${differencePercentage}`}
        </Typography>
      </div>
      <div className="inner-text">
        <Typography variant="label" color="shade6" className="overline">
          {originalQuantity}
        </Typography>
        <Typography color="noshade" weight="bold">
          {differenceQuantity}
        </Typography>
      </div>
      <div className="inner-text">
        <Typography variant="label" color="shade6" className="overline">
          {originalWeight}
        </Typography>
        <Typography color="noshade" weight="bold">
          {differenceWeight}
        </Typography>
      </div>
      <div className="right-text">
        <Typography variant="label" color="shade6" className="overline">
          {originalAmount}
        </Typography>
        <Typography color="noshade" weight="bold">
          {differenceAmount}
        </Typography>
      </div>
    </div>
    <div className="text-container">
      <div className="left-text">
        <Typography color="noshade" weight="bold">
          New Total
        </Typography>
      </div>
      <div className="inner-text">
        <Typography color="noshade" weight="bold">
          {quantities}
        </Typography>
      </div>
      <div className="inner-text">
        <Typography color="noshade" weight="bold">
          {weight}
        </Typography>
      </div>
      <div className="right-text">
        <Typography variant="title5" color="noshade" weight="bold">
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
    initialBoxes,
  } = props;

  const history = useHistory();

  const { orderNumber, buyer, uri, price, name, tags, size } = details;

  const [showModal, setShowModal] = useState(false);

  const getTotalWeight = (b: Box[]) =>
    b.reduce((t, box) => {
      return t + box.weight * box.quantity;
    }, 0);

  const getTotalBoxes = (b: Box[]) =>
    b.reduce((t, box) => {
      return t + box.quantity;
    }, 0);

  const initialWeight = getTotalWeight(initialBoxes);
  const initialBoxesQuantity = getTotalBoxes(initialBoxes);
  const initialPrice = initialWeight * pricePerKilo;

  const totalWeight = getTotalWeight(boxes);

  const totalBoxes = getTotalBoxes(boxes);
  const totalPrice = totalWeight * pricePerKilo;

  const differenceWeight = totalWeight - initialWeight;
  const differenceQuantity = totalBoxes - initialBoxesQuantity;
  const differenceAmount = totalPrice - initialPrice;
  // const differencePercentage = (differenceQuantity / totalBoxes) * 100;
  // const differencePercentage = (differenceWeight / totalWeight) * 100;
  const differencePercentage = (totalWeight / initialWeight) * 100;
  const increasedPercentage =
    ((totalWeight - initialWeight) / initialWeight) * 100;
  const decreasePercentage =
    ((initialWeight - totalWeight) / initialWeight) * 100;

  const summary = {
    originalWeight: `${initialWeight.toFixed(2)} ${measurementUnit}`,
    differenceWeight: `${
      differenceWeight > 0 ? '+' : ''
    }${differenceWeight.toFixed(2)} ${measurementUnit}`,
    weight: `${totalWeight.toFixed(2)} ${measurementUnit}`,
    originalQuantity: `${initialBoxesQuantity} ${
      initialBoxesQuantity > 1 ? 'Boxes' : 'Box'
    }`,
    differenceQuantity: `${
      differenceQuantity > 0 ? '+' : ''
    }${differenceQuantity} ${differenceQuantity > 1 ? 'Boxes' : 'Box'}`,
    quantities: `${totalBoxes} ${totalBoxes > 1 ? 'Boxes' : 'Box'}`,
    originalAmount: toPrice(initialPrice),
    differenceAmount: `${differenceAmount > 0 ? '+' : ''}${toPrice(
      differenceAmount
    )}`,
    amount: toPrice(totalPrice),
    //this calculates the percentage of weight that has been "Added" , "Decreased", "Deleted" or "Kept as is"
    differencePercentage: `${
      totalWeight > initialWeight
        ? `+${increasedPercentage.toFixed(0)}%`
        : totalWeight < initialWeight
        ? `-${decreasePercentage.toFixed(0)}%`
        : totalWeight === 0
        ? '-100%'
        : '0%'
    }`,
    // differencePercentage: `${
    //   differenceQuantity > 0 ? '+' : ''
    // }${differencePercentage}%`,
  };

  return (
    <ScrollWrapper>
      <Wrapper>
        <InnerRouteHeader title={'Confirm Weights'} showIcon={false} />
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
    </ScrollWrapper>
  );
};

export default ConfirmView;
