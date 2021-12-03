import React, { useState } from 'react';

import Button from 'components/base/Button';
import Divider from 'components/base/Divider';
import { Box as BoxSVG, Subtract } from 'components/base/SVG';
import Touchable from 'components/base/Touchable';
import Typography from 'components/base/Typography';
import Add from 'components/module/Add';
import AddBoxModal from 'components/module/AddBoxModal';
import InnerRouteHeader from 'components/module/InnerRouteHeader';
import { SELLER_ROUTES } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import { capitalize } from 'lodash';
import qs from 'qs';
import { isEmpty } from 'ramda';
import remove from 'ramda/es/remove';
import { useMediaQuery } from 'react-responsive';
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
  Description,
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
            variant="label"
            color="shade6"
            className="overline"
            weight="900"
          >
            {capitalize(measurementUnit)} per Box
          </Typography>
          <Typography color="noshade">{`${weight.toFixed(
            2
          )} ${measurementUnit}`}</Typography>
        </div>
        <div className="inner-text">
          <Typography
            variant="label"
            color="shade6"
            className="overline"
            weight="900"
          >
            Number of Boxes
          </Typography>
          <Typography color="noshade">{quantity}</Typography>
        </div>
        <div className="inner-text">
          <Typography
            variant="label"
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
}) => {
  const isSmallScreen = useMediaQuery({ query: BREAKPOINTS['sm'] });
  const theme = useTheme();

  return isSmallScreen ? (
    <BoxSummaryContainer>
      <Typography color="noshade" variant="title5">
        {`Difference ${differencePercentage}`}
      </Typography>
      <div className="text-container">
        <div>
          <Typography variant="caption" color="shade6">
            Quantity
          </Typography>
          <Typography color="noshade">{quantities}</Typography>
        </div>

        <div>
          <Typography variant="caption" color="shade6">
            Weight
          </Typography>
          <Typography color="noshade">{weight}</Typography>
        </div>

        <div>
          <Typography variant="caption" color="shade6">
            Total
          </Typography>
          <Typography color="noshade">{amount}</Typography>
        </div>
      </div>
    </BoxSummaryContainer>
  ) : (
    <BoxSummaryContainer>
      <div className="text-container">
        <div className="left-text">
          <Typography variant="label" color="shade6" className="label">
            Original Order
          </Typography>
          <Typography color="noshade" variant="body">
            {`Difference ${differencePercentage}`}
          </Typography>
        </div>
        <div className="inner-text">
          <Typography variant="label" color="shade6" className="label">
            {originalQuantity}
          </Typography>
          <Typography color="noshade">{differenceQuantity}</Typography>
        </div>
        <div className="inner-text">
          <Typography variant="label" color="shade6" className="label">
            {originalWeight}
          </Typography>
          <Typography color="noshade">{differenceWeight}</Typography>
        </div>
        <div className="right-text">
          <Typography variant="label" color="shade6" className="label">
            {originalAmount}
          </Typography>
          <Typography color="noshade">{differenceAmount}</Typography>
        </div>
      </div>
      <Divider thickness={1} backgroundColor={theme.grey.shade8} />
      <div className="text-container">
        <div className="left-text">
          <Typography color="noshade">New Total</Typography>
        </div>
        <div className="inner-text">
          <Typography color="noshade">{quantities}</Typography>
        </div>
        <div className="inner-text">
          <Typography color="noshade">{weight}</Typography>
        </div>
        <div className="right-text">
          <Typography variant="title5" color="noshade">
            {amount}
          </Typography>
        </div>
      </div>
    </BoxSummaryContainer>
  );
};

const ConfirmView = (props: ConfirmProps) => {
  const theme = useTheme();
  const {
    pending,
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
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

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
        <Typography
          color="noshade"
          variant="title5"
          style={{ fontFamily: 'Media Sans' }}
        >
          Confirm Weights
        </Typography>
        <Description>
          <Typography color="shade6" variant="body">
            Weight must be confirmed before products can be moved to{' '}
          </Typography>
          <Typography color="noshade" variant="body">
            “To Ship”
          </Typography>
        </Description>
        <DetailsContainer>
          <OrderDetails>
            <div className="order-details-item">
              <Typography variant="label" color="shade5">
                Order
              </Typography>
              <Typography className="order-details-item-value" color="primary">
                {orderNumber}
              </Typography>
            </div>
            <div className="order-details-item">
              <Typography variant="label" color="shade5">
                Price
              </Typography>
              <Typography className="order-details-item-value" color="noshade">
                {price}
              </Typography>
            </div>
            <div className="order-details-item">
              <Typography variant="label" color="shade5">
                Buyer
              </Typography>
              <Typography className="order-details-item-value" color="noshade">
                {buyer}
              </Typography>
            </div>
          </OrderDetails>
          <Divider thickness={1} backgroundColor={theme.grey.shade8} />
          <ItemRow>
            <ItemImage src={uri} alt="" />
            <ItemColumn>
              <Typography
                variant={isMobile ? 'caption' : 'body'}
                color="noshade"
              >
                {name}
              </Typography>
              <div className="tags-container">
                {tags.map((tag) => (
                  <Tag key={tag.label}>
                    <Typography variant="overlineSmall" color="noshade">
                      {tag.label}
                    </Typography>
                  </Tag>
                ))}
              </div>
              <div className="size-container">
                <Typography
                  className="size-label"
                  color="shade6"
                  variant={isMobile ? 'small' : 'label'}
                  weight={isMobile ? '400' : '500'}
                >
                  Size:
                </Typography>
                <Typography
                  color="noshade"
                  variant={isMobile ? 'small' : 'label'}
                  weight={isMobile ? '900' : '500'}
                >
                  {size}
                </Typography>
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
            title="Add a Box"
            Svg={BoxSVG}
            onClick={() => setShowModal(true)}
          />
        </div>
        <BoxSummary {...summary} />
        <div className="actions-container">
          <Button
            style={{ marginRight: 16 }}
            text="CANCEL"
            variant="outline"
            onClick={() => onCancel()}
          />

          <Button
            disabled={isEmpty(boxes)}
            loading={pending}
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
