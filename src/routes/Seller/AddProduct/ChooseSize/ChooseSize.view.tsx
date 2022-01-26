import React, { useState, useEffect } from 'react';

import Button from 'components/base/Button';
import Checkbox from 'components/base/Checkbox';
import Interaction from 'components/base/Interactions';
import Select from 'components/base/Select';
import TextField from 'components/base/TextField';
import Typography from 'components/base/Typography';
import MobileFooter from 'components/layout/MobileFooter';
import { BREAKPOINTS } from 'consts/breakpoints';
import { SIZE_METRICS } from 'consts/sizeMetrics';
import pathOr from 'ramda/es/pathOr';
import { Row, Col } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';

import { ChooseSizeProps, SizeInputProps } from './ChooseSize.props';
import { Container, ProductQualityDropdown } from './ChooseSize.style';

const SizeInput = (props: SizeInputProps) => {
  const { metric, fromSize, toSize, setFromSize, setToSize, disabled } = props;

  const metricString = metric.toUpperCase().replace(/\s/g, '_');
  const sizeMetrics = pathOr<{ value: string; label: string }[]>(
    [],
    [metricString],
    SIZE_METRICS
  );

  useEffect(() => {
    if (fromSize !== '' && toSize !== '') {
      if (metricString !== 'GRAMS' && metricString !== 'UNITS_PER_POUND') {
        const fromIndex = sizeMetrics.findIndex(
          (options) => fromSize === options.value
        );
        const toIndex = sizeMetrics.findIndex(
          (options) => toSize === options.value
        );
        if (fromIndex > toIndex) {
          setToSize(fromSize);
        }
      }
    }
    // eslint-disable-next-line
  }, [fromSize, toSize]);

  if (
    metricString === 'PORTIONS' ||
    metricString === 'GRAMS' ||
    metricString === 'UNITS_PER_POUND'
  ) {
    return (
      <Row className="select-row">
        <Col md={6} xs={6}>
          <TextField
            inputType="decimal"
            className="text-input"
            label="Size From"
            value={fromSize}
            onChangeText={(v) => {
              if (!Number.isNaN(Number(v))) {
                setFromSize(v);
              }
            }}
            placeholder=""
            onBlur={() => {
              if (
                fromSize !== '' &&
                toSize !== '' &&
                Number(fromSize) > Number(toSize)
              ) {
                setToSize(fromSize);
              }
            }}
            readOnly={disabled}
          />
        </Col>

        <Col md={6} xs={6}>
          <TextField
            className="text-input"
            inputType="decimal"
            label={`To\n(Optional)`}
            value={toSize}
            onChangeText={(v) => {
              if (!Number.isNaN(Number(v))) {
                setToSize(v);
              }
            }}
            placeholder=""
            onBlur={() => {
              if (
                fromSize !== '' &&
                toSize !== '' &&
                Number(fromSize) > Number(toSize)
              ) {
                setFromSize(toSize);
              }
            }}
            readOnly={disabled}
          />
        </Col>
      </Row>
    );
  }

  return (
    <Row className="select-row">
      <Col md={6} xs={6}>
        <Select
          options={sizeMetrics}
          value={fromSize}
          onChange={(o) => setFromSize(o.value)}
          label="Size From"
          disabled={disabled}
        />
      </Col>
      <Col md={6} xs={6}>
        <Select
          options={sizeMetrics}
          value={toSize}
          onChange={(o) => setToSize(o.value)}
          label="Size To"
          disabled={disabled}
        />
      </Col>
    </Row>
  );
};

const ChooseSize = ({
  isCustomType,
  editableListing,
  listingFormData,
  onSelectSizes,
  navBack,
}: ChooseSizeProps) => {
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

  const metric =
    (isCustomType
      ? editableListing?.customTypeData?.metric.name
      : listingFormData?.metric.name) || '';
  const [isUngraded, setIsUngraded] = useState(
    editableListing?.isUngraded || false
  );
  const [fromSize, setFromSize] = useState<string>(
    editableListing?.sizeFrom || ''
  );
  const [toSize, setToSize] = useState<string>(editableListing?.sizeTo || '');
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (isUngraded && (fromSize || toSize)) {
      setFromSize('');
      setToSize('');
    }

    if (showError) {
      if (fromSize || isUngraded) {
        setShowError(false);
      }
    }
    // eslint-disable-next-line
  }, [toSize, fromSize, isUngraded]);

  const qualityOptions = listingFormData?.qualityOptions || [];
  const actualQualityOptions = [
    ...qualityOptions.map((a) => ({
      label: a,
      value: a,
    })),
    {
      label: 'Ungraded',
      value: 'Ungraded', // should override to null later
    },
  ];

  const [quality, setQuality] = useState(editableListing?.quality || null);

  const hasQualityOption = qualityOptions.length > 0;
  const isComplete =
    !showError &&
    (isUngraded || fromSize) &&
    (!hasQualityOption || (hasQualityOption && quality));

  const sizeOptions = !listingFormData?.type.activeSizeUnit
    ? []
    : listingFormData?.type.activeSizeUnit === 'GM'
    ? listingFormData?.type.gmSizingOptions
    : listingFormData?.type.cmSizingOptions;

  return (
    <Container>
      {sizeOptions.length > 0 ? (
        sizeOptions.map((size) => (
          <div key={size.short_code} className="interaction-container">
            <Interaction
              type="radio"
              value={size.label}
              pressed={fromSize === size.label}
              onClick={() => {
                setFromSize(size.label);
                setToSize(size.label);
              }}
            />
          </div>
        ))
      ) : (
        <div className="size-container">
          <div className="metric-row">
            <Typography color="shade6" weight="regular">
              {`Metric:`}&nbsp;
            </Typography>
            <Typography color="shade1" weight="regular">
              {metric}
            </Typography>
          </div>
          {metric.toUpperCase() !== 'N/A' && (
            <SizeInput
              metric={metric}
              fromSize={fromSize}
              setFromSize={setFromSize}
              toSize={toSize}
              setToSize={setToSize}
              disabled={isUngraded}
            />
          )}
        </div>
      )}

      {metric.toUpperCase() !== 'N/A' && (
        <Row className="or-row">
          <Col className="or-col">
            <div className="line left" />
            <Typography variant="overline" color="shade6">
              {' '}
              OR
            </Typography>
            <div className="line right" />
          </Col>
        </Row>
      )}

      <Row className="checkbox-row">
        <Col>
          <Checkbox
            checked={isUngraded}
            onClick={() => setIsUngraded((v) => !v)}
            label="Ungraded"
          />
        </Col>
      </Row>

      {hasQualityOption && (
        <Row className="quality-row">
          <Col>
            <Typography variant="title6" color="noshade">
              Product Quality
            </Typography>
            <ProductQualityDropdown
              placeholder="Select Grade"
              options={actualQualityOptions}
              value={quality || undefined}
              onChange={(o) => {
                setQuality(o.value);
              }}
              label=""
            />
          </Col>
        </Row>
      )}

      {!isMobile && (
        <Row justify="start" nogutter>
          <Button
            variant={'outline'}
            text="Back"
            onClick={() => {
              navBack();
            }}
            className="back-btn"
          />
          <Button
            variant={isComplete ? 'primary' : 'disabled'}
            text="Next"
            className="next-btn"
            onClick={() => {
              if (isComplete) {
                onSelectSizes({
                  sizeFrom: isUngraded ? undefined : fromSize,
                  sizeTo: isUngraded ? undefined : toSize,
                  isUngraded,
                  quality: quality === 'Ungraded' ? null : quality,
                });
              }
            }}
          />
        </Row>
      )}

      <MobileFooter>
        <Button
          takeFullWidth
          variant={'outline'}
          text="Back"
          onClick={() => {
            navBack();
          }}
          style={{ marginRight: 8 }}
        />
        <Button
          takeFullWidth
          variant={isComplete ? 'primary' : 'disabled'}
          text="Next"
          onClick={() => {
            if (isComplete) {
              onSelectSizes({
                sizeFrom: isUngraded ? undefined : fromSize,
                sizeTo: isUngraded ? undefined : toSize,
                isUngraded,
                quality: quality === 'Ungraded' ? null : quality,
              });
            }
          }}
        />
      </MobileFooter>
    </Container>
  );
};

export default ChooseSize;
