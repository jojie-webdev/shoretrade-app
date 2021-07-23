import React, { useEffect, useState } from 'react';

import Breadcrumbs from 'components/base/Breadcrumbs';
import Button from 'components/base/Button';
import Checkbox from 'components/base/Checkbox';
import { ArrowLeft } from 'components/base/SVG';
import TextField from 'components/base/TextField';
import Touchable from 'components/base/Touchable';
import Typography from 'components/base/Typography';
import MobileFooter from 'components/layout/MobileFooter';
import CategoryImagePreviewView from 'components/module/CategoryImagePreview';
import { SIZE_METRICS } from 'consts/sizeMetrics';
import { pathOr } from 'ramda';
import { Row, Col, Hidden } from 'react-grid-system';
import theme from 'utils/Theme';

import {
  ContainerWithCategoryImagePreview,
  CreateRequestHeaderContainer,
  TitleContainer,
  RequestRow,
  RequestDetailsContainer,
  DetailsContainer,
  DetailsHeaderContainer,
  MainContainer,
  DetailsContentContainer,
} from '../Create.style';
import { SelectSizeProps, SizeInputProps } from './SelectSize.props';
import {
  SizeFormContainer,
  MetricLabelContainer,
  SelectRowContainer,
} from './SelectSize.style';

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
      <>
        <MetricLabelContainer>
          <Typography color="shade6" variant="label">
            Metric:
          </Typography>
          <Typography className="metric-value" color="shade7" variant="body">
            {metric}
          </Typography>
        </MetricLabelContainer>
        <SelectRowContainer>
          <TextField
            type="text"
            inputType="decimal"
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

          <TextField
            type="text"
            inputType="decimal"
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
        </SelectRowContainer>
      </>
    );
  }

  if (sizeMetrics && sizeMetrics.length > 0) {
    const sizeOptions = sizeMetrics.map((metric) => (
      <div key={metric.value} style={{ marginBottom: '1rem' }}>
        <Checkbox
          checked={sizeItemChecked.items.includes(metric.value)}
          onClick={() => handleStateCheck(metric.value)}
          key={metric.value}
          value={metric.value}
          label={metric.label}
        />
      </div>
    ));
    return <>{sizeOptions}</>;
  }

  return <Checkbox checked={true} disabled label="Ungraded" />;
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
    setStep,
    detailsListComponent,
  } = props;

  const [ungraded, setUngraded] = useState(false);

  const [sizeToFrom, setSizeToFrom] = useState<{ from: string; to: string }>({
    from: selectedSize.from,
    to: selectedSize.to,
  });

  const [sizeItemChecked, setSizeItemChecked] = useState<{ items: string[] }>({
    items: [...selectedSize.items],
  });

  const handleSubmit = () => {
    setSelectedSize({
      from: sizeToFrom.from,
      to: sizeToFrom.to,
      items: sizeItemChecked.items,
      ungraded: sizeToFrom.from === '' && sizeItemChecked.items.length < 1,
    });
    setStep(4);
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

    if (sizeItemChecked.items.length < 1) {
      return true;
    }

    return false;
  };

  return (
    <>
      <CreateRequestHeaderContainer>
        <MainContainer>
          <Breadcrumbs
            color="shade5"
            sections={[
              {
                label: 'Category',
                isDone: true,
                onClick: () => {
                  onBack(1);
                },
              },
              {
                label: 'Specifications',
                isDone: true,
                onClick: () => {
                  onBack(2);
                },
              },
              {
                label: 'Size',
              },
              {
                label: 'Quantity',
                onClick: () => {},
              },
              {
                label: 'Summary',
                onClick: () => {},
              },
            ]}
          />
          <TitleContainer>
            <Typography
              variant="title5"
              weight="500"
              style={{ fontFamily: 'Media Sans', marginBottom: 12 }}
            >
              {listingFormData?.type.name}
            </Typography>
            <Typography variant="label" weight="400" color="shade7">
              Here you can detail the size you want for this product. Simply
              enter your desired size in the boxes and press Proceed to
              continue.
            </Typography>
          </TitleContainer>
        </MainContainer>
      </CreateRequestHeaderContainer>
      <RequestRow>
        <ContainerWithCategoryImagePreview>
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
                <Hidden xs>
                  <Button
                    onClick={() => handleSubmit()}
                    className="submit-btn"
                    text="Select Size"
                    disabled={disabledNext()}
                    variant="primary"
                  />
                </Hidden>
                <MobileFooter>
                  <Button
                    onClick={() => handleSubmit()}
                    className="submit-btn"
                    text="Select Size"
                    disabled={disabledNext()}
                    variant="primary"
                    takeFullWidth
                  />
                </MobileFooter>
              </>
            ) : (
              ''
            )}
          </SizeFormContainer>
        </ContainerWithCategoryImagePreview>
        <RequestDetailsContainer>
          <DetailsContainer>{detailsListComponent}</DetailsContainer>
        </RequestDetailsContainer>
      </RequestRow>
    </>
  );
};

export default SelectSizeView;
