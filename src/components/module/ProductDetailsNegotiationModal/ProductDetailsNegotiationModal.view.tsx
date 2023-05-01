import React from 'react';

// import { useTheme } from 'utils/Theme';
import Radio from 'components/base/Radio';
import { MarketBoardOutlined } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import ConfirmationModal from 'components/module/ConfirmationModal';
import { isEmpty } from 'ramda';
import { toPrice } from 'utils/String';

import Loading from '../Loading';
import {
  Box,
  ProductDetailsNegotiationModalProps,
} from './ProductDetailsNegotiationModal.props';
import {
  BoxContainer,
  Container,
  GroupedBoxContainer,
  RadioBtnContainer,
  StyledTextField,
} from './ProductDetailsNegotiationModal.style';

const ProductDetailsNegotiationModal = (
  props: ProductDetailsNegotiationModalProps
): JSX.Element => {
  // const theme = useTheme();
  const {
    isOpen,
    onClickClose,
    action,
    disableActionText,
    negotiationPrice,
    handleNegotiationPriceSetting,
    unit,
    negotiationWeight,
    handleDesiredQuantityChange,
    groupedBox,
    handleSelectedBoxesWeight,
    isLoadingListingBoxes,
    priceDiffPercentage,
    selectedBoxesWeight,
    productDetailsCard6Props,
    selectedBoxesIndex,
    actionText,
  } = props;

  const getTotalPrice = () => {
    return toPrice(
      selectedBoxesWeight.reduce(
        (acc, cur) =>
          acc +
          (cur.quantity || 0) *
            cur.weight *
            (negotiationPrice || Number(productDetailsCard6Props.price)),
        0
      )
    );
  };

  const getGroupedBoxesPrice = (boxes: Box[]) => {
    return toPrice(
      boxes.reduce(
        (acc, cur) =>
          acc +
          (cur.quantity || 0) *
            cur.weight *
            (negotiationPrice || Number(productDetailsCard6Props.price)),
        0
      )
    );
  };

  return (
    <Container>
      <ConfirmationModal
        isOpen={isOpen}
        onClickClose={onClickClose}
        title={
          <Typography
            variant="title4"
            color="shade8"
            weight="900"
            style={{ fontFamily: 'Canela' }}
          >
            Negotiate
          </Typography>
        }
        action={action}
        actionIconPosition="before"
        actionIcon={<MarketBoardOutlined width={20} height={20} />}
        actionText={actionText || 'NEGOTIATE'}
        disableActionText={disableActionText}
        hideCancel={true}
        description={
          <div style={{ marginTop: 20 }}>
            <StyledTextField
              type="text"
              label={'Counter Offer'}
              defaultValue={productDetailsCard6Props.price || negotiationPrice}
              value={negotiationPrice}
              onChangeText={(v) => {
                const regex = new RegExp(/^\d*\.?(\d{1,2})?$/);
                if (!regex.test(v)) {
                  return;
                }
                handleNegotiationPriceSetting(v);
              }}
              min={1}
              LeftComponent={
                <Typography variant="label" color="shade6">
                  {'$'}
                </Typography>
              }
              placeholder={`per ${unit}`}
              style={{ marginTop: 10 }}
            />
            <StyledTextField
              value={negotiationWeight}
              onChangeText={handleDesiredQuantityChange}
              type="number"
              inputType="decimal"
              step=".01"
              label={'Desired Quantity'}
              min={1}
              LeftComponent={
                <Typography variant="label" color="shade6">
                  {'kg'}
                </Typography>
              }
              placeholder={`Minimum Order: ${
                productDetailsCard6Props.minOrder
              } ${productDetailsCard6Props.unit ?? 'kg'}`}
              style={{ marginTop: 16 }}
            />
            <div style={{ marginTop: 15 }} />
            {!isEmpty(groupedBox) && (
              <Typography
                variant="overline"
                color="shade6"
                style={{ marginBottom: 10 }}
              >
                BEST BOX WEIGHT MATCH
              </Typography>
            )}
            {!isEmpty(groupedBox)
              ? groupedBox.map((p, index) => (
                  <div key={p.id}>
                    <GroupedBoxContainer>
                      <div style={{ height: 20 }}>
                        <Radio
                          checked={index === selectedBoxesIndex}
                          onClick={() =>
                            handleSelectedBoxesWeight(
                              groupedBox[index].boxes,
                              index
                            )
                          }
                        />
                      </div>
                      <BoxContainer>
                        <div>
                          {p.boxes.map((box, index) => (
                            <div key={box.id}>
                              <RadioBtnContainer>
                                <div style={{ display: 'flex' }}>
                                  <div style={{ marginRight: 20 }} />
                                  <div
                                    style={{
                                      display: 'flex',
                                      marginBottom: -5,
                                    }}
                                  >
                                    <Typography
                                      variant="caption"
                                      color="shade6"
                                    >
                                      {box.weight} {p.unit}
                                    </Typography>
                                    <div style={{ marginRight: 15 }} />
                                    <Typography
                                      variant="caption"
                                      color="shade6"
                                    >
                                      x{box.quantity}
                                    </Typography>
                                  </div>
                                  <div style={{ marginRight: 15 }} />
                                  <Typography
                                    color="shade6"
                                    style={{ marginTop: -3 }}
                                  >
                                    {Number.isInteger(box.weight)
                                      ? (
                                          box.weight * (box.quantity || 0)
                                        ).toFixed(0)
                                      : (
                                          box.weight * (box.quantity || 0)
                                        ).toFixed(2)}{' '}
                                    {unit}
                                  </Typography>
                                </div>
                              </RadioBtnContainer>
                              {p.boxes.length > index + 1 && (
                                <div style={{ marginTop: 5 }} />
                              )}
                            </div>
                          ))}
                        </div>
                        <Typography
                          variant="caption"
                          color="shade8"
                          style={{ fontWeight: 600, fontSize: 14 }}
                        >
                          {getGroupedBoxesPrice(p.boxes)}
                        </Typography>
                      </BoxContainer>
                    </GroupedBoxContainer>
                    {groupedBox.length > index + 1 && (
                      <div style={{ marginTop: 5 }} />
                    )}
                  </div>
                ))
              : isLoadingListingBoxes && (
                  <span className="box-loading">
                    <Loading />
                  </span>
                )}
            <div style={{ marginTop: 24 }} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" color="shade6">
                Seller&apos;s Listed Price
              </Typography>
              <Typography variant="label" color="secondary">
                {toPrice(productDetailsCard6Props.price)}/{unit}
              </Typography>
            </div>
            <div style={{ marginTop: 5 }} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex' }}>
                <Typography variant="caption" color="shade6">
                  Change in Price{' '}
                  {priceDiffPercentage ? (
                    <span className="indicator">
                      {negotiationPrice > Number(productDetailsCard6Props.price)
                        ? '+'
                        : '-'}
                      {/* {new Intl.NumberFormat('en-US', {
                        signDisplay: 'exceptZero',
                      }).format(
                        Number(Math.abs(priceDiffPercentage).toFixed(2))
                      )} */}
                      {Number(Math.abs(priceDiffPercentage).toFixed(2))}%
                    </span>
                  ) : (
                    <span className="indicator">0.00%</span>
                  )}
                </Typography>
              </div>
              <Typography
                variant="label"
                color={priceDiffPercentage > 0 ? 'error' : 'success'}
              >
                {toPrice(
                  Math.abs(
                    Number(productDetailsCard6Props.price) - negotiationPrice
                  )
                )}
                /{unit}
              </Typography>
            </div>
            <div style={{ marginTop: 5 }} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" color="shade6">
                Total Product Value
              </Typography>
              <Typography
                weight="700"
                color="secondary"
                style={{ fontFamily: 'Basis Grotesque Pro' }}
              >
                {getTotalPrice()}
              </Typography>
            </div>
          </div>
        }
      />
    </Container>
  );
};

export default React.memo(ProductDetailsNegotiationModal);
