import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';

import Alert from 'components/base/Alert';
import Button from 'components/base/Button';
import Checkbox from 'components/base/Checkbox';
import {
  Subtract,
  // InfoFilled
} from 'components/base/SVG';
import TextField from 'components/base/TextField';
import Touchable from 'components/base/Touchable';
import Typography from 'components/base/Typography';
import MobileFooter from 'components/layout/MobileFooter';
import { BoxValues } from 'components/module/AddBoxModal/AddBoxModal.props';
import { BREAKPOINTS } from 'consts/breakpoints';
import remove from 'ramda/es/remove';
import { Row, Col } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { Aquafuture } from 'routes/Seller/AddProduct/AddPackaging/AddPackaging.style';
import { GetCategoryData } from 'store/selectors/seller/categories';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';
import { useTheme } from 'utils/Theme';

import { AddBoxesProps, BoxType } from './AddBoxes.props';
import {
  Container,
  BoxDetailsContainer,
  AddBoxRow,
  BoxSummaryContainer,
} from './AddBoxes.style';

const INITIAL_BOX_VALUES = {
  weight: '',
  quantity: '',
  count: '',
};

export const BoxDetails = ({
  weight,
  quantity,
  count,
  onRemove,
  stocks,
  unit,
  sold,
}: BoxType & {
  unit: string;
  onRemove?: () => void;
}) => {
  const theme = useTheme();

  return (
    <BoxDetailsContainer>
      <div className="texts">
        <div className="text-container">
          <Typography variant="overline" color="shade6" className="overline">
            {unit === 'kg' ? 'Weight' : unit === 'doz' ? 'Dozen' : 'Portions'}
          </Typography>
          <Typography color="noshade" variant="copy">
            {weight.toFixed(2)} {unit}
          </Typography>
        </div>
        <div className="text-container">
          <Typography variant="overline" color="shade6" className="overline">
            QTY
          </Typography>
          <Typography color="noshade" variant="copy">
            {quantity}
          </Typography>
        </div>
        <div className="text-container">
          <Typography variant="overline" color="shade6" className="overline">
            Count
          </Typography>
          <Typography color="noshade" variant="copy">
            {count || '\u00A0'}
          </Typography>
        </div>
      </div>

      {onRemove && (
        <div className="minus">
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
      )}
    </BoxDetailsContainer>
  );
};

const BoxSummary = ({
  summary,
  unit,
}: {
  summary: {
    weights: number;
    quantities: number;
    counts: number;
    average: number;
  };
  unit: string;
}) => (
  <BoxSummaryContainer>
    <div className="text-container">
      <Typography variant="overline" color="shade6" className="overline">
        Total Weight
      </Typography>
      <Typography color="noshade" variant="copy">
        {summary.weights.toFixed(2)} {unit}
      </Typography>
    </div>
    <div className="text-container">
      <Typography variant="overline" color="shade6" className="overline">
        Total QTY
      </Typography>
      <Typography color="noshade" variant="copy">
        {summary.quantities}
      </Typography>
    </div>
    <div className="text-container">
      <Typography variant="overline" color="shade6" className="overline">
        AVG Box Size
      </Typography>
      <Typography color="noshade" variant="copy">
        {summary.average.toFixed(2)}
      </Typography>
    </div>
  </BoxSummaryContainer>
);

const AddBoxInputs = ({
  unit,
  values,
  setValues,
  boxes,
  setBoxes,
}: {
  unit: string;
  values: BoxValues;
  setValues: Dispatch<SetStateAction<BoxValues>>;
  boxes: BoxType[];
  setBoxes: Dispatch<SetStateAction<BoxType[]>>;
}) => {
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

  useEffect(() => {
    const isWhole = (v: string) => Number.isInteger(Number(v));

    if (!isWhole(values.quantity)) setValues({ ...values, quantity: '' });
    if (!isWhole(values.count)) setValues({ ...values, count: '' });
    // eslint-disable-next-line
  }, [values.quantity, values.count]);

  const inputFilters = ['e', 'E', '+', '-'];

  return (
    <AddBoxRow>
      <div className="add-box-col">
        <TextField
          borderRadius="12px"
          type="number"
          inputType="decimal"
          label={
            unit === 'kg' ? 'Weight' : unit === 'doz' ? 'Dozen' : 'Portions'
          }
          value={values.weight}
          onChangeText={(v) => {
            setValues({ ...values, weight: v });
          }}
          onKeyDown={(v) => inputFilters.includes(v.key) && v.preventDefault()}
          min={0}
          placeholder={`25 ${unit}`}
        />
      </div>
      <div className="add-box-col qty-col">
        <TextField
          borderRadius="12px"
          type="number"
          inputType="numeric"
          label="Quantity"
          value={values.quantity}
          onChangeText={(v) => {
            setValues({ ...values, quantity: v });
          }}
          min={0}
          onKeyDown={(v) => inputFilters.includes(v.key) && v.preventDefault()}
          placeholder="7"
        />
      </div>
      <div className="add-box-col">
        <TextField
          borderRadius="12px"
          type="number"
          inputType="numeric"
          readOnly={unit === 'portions'}
          label="Count (Optional)"
          value={values.count}
          onChangeText={(v) => {
            setValues({ ...values, count: v });
          }}
          min={0}
          onKeyDown={(v) => inputFilters.includes(v.key) && v.preventDefault()}
          placeholder="56"
        />
      </div>

      {!isMobile && (
        <Button
          className="add-box-button"
          variant="outline"
          text="ADD BOX"
          onClick={() => {
            if (values.weight && values.quantity) {
              const box: BoxType = {
                weight: Number(values.weight),
                quantity: Number(values.quantity),
                count: values.count !== '' ? Number(values.count) : undefined,
                id: new Date().getTime().toString(),
              };
              setBoxes([...boxes, box]);
              setValues(INITIAL_BOX_VALUES);
            }
          }}
        />
      )}
    </AddBoxRow>
  );
};

const AddBoxes = ({
  isBulkUpload,
  editableListing,
  listingFormData,
  isCustomType,
  onAddBoxes,
  isExisting,
  navBack,
  disableBackBtn,
}: AddBoxesProps) => {
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

  const categoryData = GetCategoryData(
    editableListing?.customTypeData?.categoryId || ''
  );

  const measurementUnit = formatMeasurementUnit(
    isCustomType
      ? categoryData?.measurementUnit
      : listingFormData?.measurementUnit
  );

  const initialBoxes: BoxType[] = (isExisting
    ? (editableListing?.boxes || []).map((b) => ({
        ...b,
        fixed: true,
        stocks: b.quantity - (b.sold || 0),
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
  const [values, setValues] = useState<BoxValues>(INITIAL_BOX_VALUES);

  const [isAquafuture, setIsAquafuture] = useState<boolean>(
    editableListing?.isAquafuture || false
  );

  const [minimumOrder, setMinimumOrder] = useState(
    editableListing?.minOrder ? editableListing.minOrder.toString() : ''
  );
  const [sellInMultiples, setSellInMultiples] = useState<boolean>(
    editableListing?.sellInMultiplesOfMinOrder || false
  );

  const [showAlert, setShowAlert] = useState(false);

  const summary = boxes.reduce(
    (computed, current, index) => {
      const currentQuantity = current.quantity - (current.sold || 0);
      const currentWeight = current.weight * currentQuantity + computed.weights;
      const currentQuantities = computed.quantities + currentQuantity;
      const currentCounts = computed.counts + (current.count || 0);
      return {
        weights: currentWeight,
        quantities: currentQuantities,
        counts: currentCounts,
        average: currentWeight / currentQuantities,
      };
    },
    {
      weights: 0,
      quantities: 0,
      counts: 0,
      average: 0,
    }
  );

  useEffect(() => {
    if (showAlert && boxes.length > 0 && minimumOrder) {
      setShowAlert(false);
    }
  }, [boxes, minimumOrder, showAlert]);

  return (
    <Container>
      {!isMobile && (
        <AddBoxInputs
          values={values}
          setValues={setValues}
          boxes={boxes}
          setBoxes={setBoxes}
          unit={measurementUnit}
        />
      )}

      <Row className="minimum-row" align="center">
        <Col xs={12} sm={6} xl={4}>
          <TextField
            borderRadius="12px"
            inputType="decimal"
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
        <Col className="checkbox-col" xs={12}>
          <Checkbox
            checked={sellInMultiples}
            onClick={() => setSellInMultiples((s) => !s)}
            label="Sell in multiples of the minimum"
            typographyProps={{
              weight: 'normal',
            }}
          />
          {/*<div className="tooltip">*/}
          {/*  <InfoFilled width={20} height={20} fill={theme.grey.shade5} />*/}
          {/*  <span className="tooltip-text">*/}
          {/*    This is the minimum quantity that you will ship out to a buyer.*/}
          {/*  </span>*/}
          {/*</div>*/}
        </Col>
      </Row>
      <Row>
        {boxes
          .filter((box) => box.quantity > (box.sold || 0))
          .map((box, index) => (
            <Col xs={12} key={box.id}>
              <BoxDetails
                {...box}
                unit={measurementUnit}
                onRemove={() => {
                  setBoxes(remove(index, 1, boxes));
                }}
              />
            </Col>
          ))}
      </Row>

      <BoxSummary summary={summary} unit={measurementUnit} />

      {showAlert && (
        <div className="box-error-container">
          <Alert
            fullWidth
            alignText="center"
            variant="error"
            content="Please include at least 1 box and set minimum order"
          />
        </div>
      )}

      {isBulkUpload && (
        <Aquafuture>
          <div className="checkbox-view">
            <Checkbox
              checked={isAquafuture}
              onClick={() => setIsAquafuture((a) => !a)}
            />
          </div>

          <div className="text-container">
            <Typography
              className="checkbox-alt-label"
              color="noshade"
              variant="label"
              onClick={() => setIsAquafuture((a) => !a)}
            >
              This is an Aquafuture Listing.
            </Typography>
            <Typography color="shade5" variant="caption">
              It has not been boxed or weighted yet.
            </Typography>
          </div>
        </Aquafuture>
      )}

      {!isMobile && (
        <Row justify="start" style={{ padding: '16px 15px 0px 15px' }}>
          <Button
            variant={'outline'}
            text="Back"
            disabled={disableBackBtn}
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
                  sellInMultiples,
                  boxes,
                  minimumOrder,
                  isAquafuture,
                });
              } else {
                setShowAlert(true);
              }
            }}
          />
        </Row>
      )}

      <MobileFooter>
        <AddBoxInputs
          values={values}
          setValues={setValues}
          boxes={boxes}
          setBoxes={setBoxes}
          unit={measurementUnit}
        />
        <div className="mobile-footer-buttons">
          <Button
            takeFullWidth
            variant={'outline'}
            text="Back"
            disabled={disableBackBtn}
            onClick={() => {
              navBack();
            }}
          />
          <Button
            takeFullWidth
            variant="outline"
            text="ADD BOX"
            onClick={() => {
              if (values.weight && values.quantity) {
                const box: BoxType = {
                  weight: Number(values.weight),
                  quantity: Number(values.quantity),
                  count: values.count !== '' ? Number(values.count) : undefined,
                  id: new Date().getTime().toString(),
                };
                setBoxes([...boxes, box]);
                setValues(INITIAL_BOX_VALUES);
              }
            }}
            style={{ margin: '0 8px' }}
          />
          <Button
            takeFullWidth
            text={'Next'}
            onClick={() => {
              if (boxes.length > 0 && minimumOrder) {
                onAddBoxes({
                  sellInMultiples,
                  boxes,
                  minimumOrder,
                  isAquafuture,
                });
              } else {
                setShowAlert(true);
              }
            }}
          />
        </div>
      </MobileFooter>
    </Container>
  );
};

export default AddBoxes;
