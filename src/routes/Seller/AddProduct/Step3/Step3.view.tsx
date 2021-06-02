import React, { useState, useEffect } from 'react';

import Button from 'components/base/Button';
import Checkbox from 'components/base/Checkbox';
import Select from 'components/base/Select';
import TextField from 'components/base/TextField';
import Typography from 'components/base/Typography';
import pathOr from 'ramda/es/pathOr';
import { Row, Col } from 'react-grid-system';

import { SIZE_METRICS } from './Step3.constants';
import { Step3Props, SizeInputProps } from './Step3.props';
import { Container } from './Step3.style';

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

function Step4({
  isCustomType,
  editableListing,
  listingFormData,
  onSelectSizes,
  navBack,
}: Step3Props) {
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
  }, [toSize, fromSize, isUngraded]);

  const isComplete = !showError && (isUngraded || fromSize);

  return (
    <Container>
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

      <Row justify="start" style={{ padding: '0 15px' }}>
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
              });
            }
          }}
        />
      </Row>
    </Container>
  );
}

export default Step4;
