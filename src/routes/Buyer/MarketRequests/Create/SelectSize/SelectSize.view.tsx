import React, { useEffect, useState } from 'react';

import Button from 'components/base/Button';
import Checkbox from 'components/base/Checkbox';
import { ArrowLeft } from 'components/base/SVG';
import TextField from 'components/base/TextField';
import Touchable from 'components/base/Touchable';
import TypographyView from 'components/base/Typography';
import CategoryImagePreviewView from 'components/module/CategoryImagePreview';
import { pathOr } from 'ramda';
import { Row, Col } from 'react-grid-system';
import { useHistory } from 'react-router-dom';
import { SIZE_METRICS } from 'routes/Seller/AddProduct/Step4/Step4.constants';
import theme from 'utils/Theme';

import {
  ContainerWithCategoryImagePreview,
  CreateRequestHeaderContainer,
} from '../Create.style';
import { SelectSizeProps, SizeInputProps } from './SelectSize.props';
import { SizeFormContainer } from './SelectSize.style';

const SizeInput = (props: SizeInputProps) => {
  const {
    metric,
    fromSize,
    toSize,
    setFromSize,
    setToSize,
    disabled,
    setSizeItemChecked,
    sizeItemChecked,
  } = props;
  const metricString = metric.toUpperCase().replace(/\s/g, '_');
  const sizeMetrics = pathOr<{ value: string; label: string }[]>(
    [],
    [metricString],
    SIZE_METRICS
  );

  const handleStateCheck = (v: any) => {
    if (sizeItemChecked.items.filter((item) => item === v).length > 0) {
      setSizeItemChecked({
        items: sizeItemChecked.items.filter((item) => item !== v),
      });
    } else {
      setSizeItemChecked({
        items: sizeItemChecked.items.concat(v),
      });
    }
  };

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

  if (metricString === 'GRAMS' || metricString === 'UNITS_PER_POUND') {
    return (
      <Row className="select-row">
        <Col xs={12} sm={12} md={12}>
          <TextField
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

        <Col xs={12} sm={12} md={12}>
          <TextField
            label={`Size To\n(Optional)`}
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
                setFromSize(`${Number(toSize) - 1}`);
              }
            }}
            readOnly={disabled}
          />
        </Col>
      </Row>
    );
  }

  const sizeOptions = sizeMetrics.map((metric) => (
    <Checkbox
      checked={sizeItemChecked.items.includes(metric.value)}
      onClick={() => handleStateCheck(metric.value)}
      key={metric.value}
      value={metric.value}
      label={metric.label}
    ></Checkbox>
  ));

  return <>{sizeOptions}</>;
};

const SelectSizeView = (props: SelectSizeProps) => {
  const {
    step,
    stepCountComponent,
    onBack,
    selectedCategory,
    setSelectedSize,
    selectedSize,
    listingFormData,
  } = props;
  const history = useHistory();

  const [sizeToFrom, setSizeToFrom] = useState<{ from: string; to: string }>({
    from: '',
    to: '',
  });

  const [sizeItemChecked, setSizeItemChecked] = useState<{ items: string[] }>({
    items: [],
  });

  const handleSubmit = () => {
    // MOCK
    setSelectedSize({
      from: sizeToFrom.from,
      to: sizeToFrom.to,
      items: sizeItemChecked.items,
      ungraded: sizeToFrom.from === '' && sizeItemChecked.items.length < 1,
    });
  };

  const handleSetFromSize = (value: string) => {
    setSizeToFrom({ ...sizeToFrom, from: value });
  };

  const handleSetToSize = (value: string) => {
    setSizeToFrom({ ...sizeToFrom, to: value });
  };

  const disabledNext = () => {
    if (
      listingFormData?.metric.name.toUpperCase().replace(/\s/g, '_') ===
        'GRAMS' ||
      listingFormData?.metric.name.toUpperCase().replace(/\s/g, '_') ===
        'UNITS_PER_POUND'
    ) {
      return sizeToFrom.from === '';
    }
    return false;
  };

  return (
    <>
      <CreateRequestHeaderContainer>
        <div>
          {stepCountComponent}
          <div className="title-container">
            <Touchable
              className="back-button-container"
              onPress={() => onBack()}
            >
              <ArrowLeft fill={theme.grey.shade7} height={24} width={24} />
            </Touchable>
            <TypographyView variant="title4">Select Size</TypographyView>
          </div>
        </div>
      </CreateRequestHeaderContainer>
      <ContainerWithCategoryImagePreview>
        <CategoryImagePreviewView
          categoryName={selectedCategory.name}
          imgSrc={listingFormData?.defaultPhoto}
          caption="Aliquip ullamco dolore amet sunt ullamco. 
  Voluptate aliquip velit et commodo reprehenderit tempor laboris amet. 
  Sint ea nulla velit mollit amet sint ea."
        />
        <SizeFormContainer>
          {listingFormData ? (
            <>
              <SizeInput
                metric={listingFormData.metric.name}
                fromSize={sizeToFrom.from}
                toSize={sizeToFrom.to}
                disabled={false}
                setToSize={(v: any) => handleSetToSize(v)}
                setFromSize={(v: any) => handleSetFromSize(v)}
                sizeItemChecked={sizeItemChecked}
                setSizeItemChecked={setSizeItemChecked}
              />
              <Button
                onClick={() => handleSubmit()}
                className="submit-btn"
                text="Select Size"
                disabled={disabledNext()}
                variant="primary"
              />
            </>
          ) : (
            ''
          )}
        </SizeFormContainer>
      </ContainerWithCategoryImagePreview>
    </>
  );
};

export default SelectSizeView;
