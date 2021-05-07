import React, { useState, useEffect } from 'react';

import Alert from 'components/base/Alert';
import Button from 'components/base/Button';
import Checkbox from 'components/base/Checkbox';
import { Box, Close, InfoFilled, Subtract } from 'components/base/SVG';
import TextField from 'components/base/TextField';
import Touchable from 'components/base/Touchable';
import Typography from 'components/base/Typography';
import Add from 'components/module/Add';
import AddBoxModal from 'components/module/AddBoxModal';
import { BoxValues } from 'components/module/AddBoxModal/AddBoxModal.props';
import { BREAKPOINTS } from 'consts/breakpoints';
import remove from 'ramda/es/remove';
import { Row, Col } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { GetCategoryData } from 'store/selectors/seller/categories';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';
import { useTheme } from 'utils/Theme';

import { Step5Props, BoxType } from './Step5.props';
import {
  Container,
  BoxDetailsContainer,
  BoxSummaryContainer,
  FooterPadding,
} from './Step5.style';

export const BoxDetails = ({
  weight,
  quantity,
  count,
  onRemove,
  unit,
  fixed,
}: BoxType & {
  unit: string;
  onRemove?: () => void;
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

  return (
    <BoxDetailsContainer>
      <div className="text-container">
        <div className="inner-text">
          <Typography
            variant={isMobile ? 'caption' : 'overline'}
            color="shade6"
            className="overline"
            weight={isMobile ? '400' : '900'}
          >
            {unit} per Box
          </Typography>
          <Typography color="noshade">
            {weight} {unit}
          </Typography>
        </div>
        <div className="inner-text">
          <Typography
            variant={isMobile ? 'caption' : 'overline'}
            color="shade6"
            className="overline"
            weight={isMobile ? '400' : '900'}
          >
            Number of Boxes
          </Typography>
          <Typography color="noshade">{quantity}</Typography>
        </div>
        <div className="inner-text">
          <Typography
            variant={isMobile ? 'caption' : 'overline'}
            color="shade6"
            className="overline"
            weight={isMobile ? '400' : '900'}
          >
            Count per Box
          </Typography>
          <Typography color="noshade">{count}</Typography>
        </div>
      </div>

      {onRemove && !fixed ? (
        <div className="minus-mobile">
          <Touchable
            onPress={() => {
              onRemove();
            }}
            circle
            dark
          >
            <Subtract fill={theme.brand.error} innerFill={theme.grey.noshade} />
          </Touchable>
        </div>
      ) : (
        ''
      )}
    </BoxDetailsContainer>
  );
};

const BoxSummary = ({
  summary,
  unit,
  onClick,
}: {
  summary: { total: number; quantities: number; average: number };
  unit: string;
  onClick: () => void;
}) => (
  <BoxSummaryContainer>
    <div className="text-container">
      <div className="inner-text">
        <Typography
          variant="overline"
          color="shade6"
          className="overline"
          weight="900"
        >
          Total
        </Typography>
        <Typography color="noshade" variant="title5" className="value">
          {summary.total.toFixed(2)} {unit}
        </Typography>
      </div>
      <div className="inner-text">
        <Typography
          variant="overline"
          color="shade6"
          className="overline"
          weight="900"
        >
          Quantities
        </Typography>
        <Typography color="noshade" variant="title5" className="value">
          {summary.quantities}
        </Typography>
      </div>
      <div className="inner-text">
        <Typography
          variant="overline"
          color="shade6"
          className="overline"
          weight="900"
        >
          Average
        </Typography>
        <Typography color="noshade" variant="title5" className="value">
          {summary.average.toFixed(2)}
        </Typography>
      </div>
    </div>
    <Button text="Next" onClick={onClick} />
  </BoxSummaryContainer>
);

function Step6({
  editableListing,
  listingFormData,
  isCustomType,
  onAddBoxes,
  isExisting,
  navBack,
}: Step5Props) {
  const [showModal, setShowModal] = useState(false);
  const theme = useTheme();
  const categoryData = GetCategoryData(
    editableListing?.customTypeData?.categoryId || ''
  );

  const measurementUnit = formatMeasurementUnit(
    isCustomType
      ? categoryData?.measurementUnit
      : listingFormData?.measurementUnit
  );

  const [isAquafuture, setIsAquafuture] = useState<boolean>(
    editableListing?.isAquafuture || false
  );

  const initialBoxes: BoxType[] = (isExisting
    ? (editableListing?.boxes || []).map((b) => ({
        ...b,
        fixed: true,
      }))
    : editableListing?.boxes || []
  ).filter(
    (b) =>
      b.weight !== undefined &&
      b.quantity !== undefined &&
      b.weight !== null &&
      b.quantity !== null
  );

  const [boxes, setBoxes] = useState<BoxType[]>(initialBoxes);

  const [minimumOrder, setMinimumOrder] = useState(
    editableListing?.minOrder ? editableListing.minOrder.toString() : ''
  );
  const [sellInMultiples, setSellInMultiples] = useState<boolean>(
    editableListing?.sellInMultiplesOfMinOrder || false
  );

  const summary = boxes.reduce(
    (computed, current) => {
      const currentTotal = current.weight * current.quantity + computed.total;
      const currentQuantities = computed.quantities + current.quantity;
      const currentAverage = currentTotal / currentQuantities;
      return {
        total: currentTotal,
        quantities: currentQuantities,
        average: currentAverage,
      };
    },
    {
      total: 0,
      quantities: 0,
      average: 0,
    }
  );

  const [showError, setShowError] = useState<boolean>(false);

  useEffect(() => {
    if (boxes.length > 0 && minimumOrder) {
      setShowError(false);
    }
  }, [boxes, minimumOrder]);

  return (
    <Container>
      <Row className="checkbox-row">
        <Col className="checkbox-col">
          <div className="checkbox-view">
            <Checkbox
              checked={isAquafuture}
              onClick={() => setIsAquafuture((a) => !a)}
            />
          </div>

          <div className="text-container">
            <Typography
              className="checkbox-alt-label"
              component="span"
              color="noshade"
              variant="label"
              onClick={() => setIsAquafuture((a) => !a)}
            >
              This is an Aquafuture Listing.
            </Typography>
            <Typography color="shade5" variant="caption">
              It has not been boxed or weighted yet. Enter estimate weights
              below. You’ll need to finalise box weights before shipping.
            </Typography>
          </div>
        </Col>
      </Row>

      <Row className="add-box-row">
        {boxes.map((box, index) => (
          <Col md={12} key={box.id}>
            <BoxDetails
              {...box}
              unit={measurementUnit}
              onRemove={() => {
                setBoxes(remove(index, 1, boxes));
              }}
            />
          </Col>
        ))}

        <Col md={12}>
          <Add title="Add a box" Svg={Box} onClick={() => setShowModal(true)} />
        </Col>
      </Row>

      <Row
        className="minimum-row"
        align="center"
        style={{
          marginBottom: 40,
        }}
      >
        <Col md={6}>
          <TextField
            className="text-field"
            label="Minimum Order"
            value={minimumOrder}
            onChangeText={(v) => {
              if (!Number.isNaN(Number(v))) {
                setMinimumOrder(v);
              }
            }}
            placeholder="0"
            LeftComponent={
              <Typography variant="label" color="shade6">
                {measurementUnit}
              </Typography>
            }
          />
        </Col>

        <Col md={6} className="checkbox-col">
          <Checkbox
            checked={sellInMultiples}
            onClick={() => setSellInMultiples((s) => !s)}
            label="Sell in multiples of the minimum"
          />

          {/*<div className="tooltip">*/}
          {/*  <InfoFilled width={20} height={20} fill={theme.grey.shade5} />*/}
          {/*  <span className="tooltip-text">*/}
          {/*    Suspendisse sed dictum nisi Ut at dui enim cras dignissim buyer.*/}
          {/*  </span>*/}
          {/*</div>*/}
        </Col>
        <Row
          justify="start"
          style={{
            padding: '0 15px 0 15px',
            marginTop: 40,
            marginLeft: 0,
          }}
        >
          <Button
            variant={'outline'}
            text="Back"
            onClick={() => {
              navBack();
            }}
            className="back-btn"
          />
          <Button
            className="next-btn"
            text={'Next'}
            onClick={() => {
              if (boxes.length > 0 && minimumOrder) {
                onAddBoxes({
                  isAquafuture,
                  sellInMultiples,
                  boxes,
                  minimumOrder,
                });
              } else {
                setShowError(true);
              }
            }}
          />
        </Row>
      </Row>

      <div className="box-error-container">
        <Alert
          fullWidth
          alignText="center"
          variant="error"
          content="Please include at least 1 box and set minimum order"
        />
      </div>

      <FooterPadding />

      <div className="absolute-container">
        {/* <BoxSummary
          unit={measurementUnit}
          summary={summary}
          onClick={() => {
            if (boxes.length > 0 && minimumOrder) {
              onAddBoxes({
                isAquafuture,
                sellInMultiples,
                boxes,
                minimumOrder,
              });
            } else {
              setShowError(true);
            }
          }}
        /> */}
      </div>

      {showModal && (
        <AddBoxModal
          unit={measurementUnit}
          onAdd={(values) => {
            if (values.weight && values.quantity) {
              const box: BoxType = {
                weight: Number(values.weight),
                quantity: Number(values.quantity),
                count: values.count !== '' ? Number(values.count) : undefined,
                id: new Date().getTime().toString(),
              };
              setBoxes([...boxes, box]);
            }
          }}
          onClickClose={() => setShowModal(false)}
          isOpen={showModal}
        />
      )}
    </Container>
  );
}

export default Step6;
