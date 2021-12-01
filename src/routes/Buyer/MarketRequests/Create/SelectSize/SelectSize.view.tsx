import React, { useEffect, useState } from 'react';

import Breadcrumbs from 'components/base/Breadcrumbs';
import Button from 'components/base/Button';
import Checkbox from 'components/base/Checkbox';
import { ArrowLeft, ChevronRight } from 'components/base/SVG';
import TextField from 'components/base/TextField';
import Touchable from 'components/base/Touchable';
import Typography from 'components/base/Typography';
import MobileFooter from 'components/layout/MobileFooter';
import CategoryImagePreviewView from 'components/module/CategoryImagePreview';
import { SIZE_METRICS } from 'consts/sizeMetrics';
import { pathOr } from 'ramda';
import { Row, Col, Hidden, Visible } from 'react-grid-system';
import { isUngraded } from 'routes/Buyer/Categories/Preview/Preview.transform';
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
  ButtonContainer,
  ProceedButton,
  PreviousButton,
  FriendlyTextContainer,
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
    handleOnClickUngraded,
    ungraded,
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
        <SelectRowContainer>
          <TextField
            type="text"
            disabled={ungraded}
            color="shade10"
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
            color="shade10"
            inputType="decimal"
            label={`Size To\n(Optional)`}
            disabled={ungraded}
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
        <SelectRowContainer>
          <Checkbox
            onClick={handleOnClickUngraded}
            checked={ungraded}
            label="Ungraded"
          />
        </SelectRowContainer>
      </>
    );
  }

  if (sizeMetrics && sizeMetrics.length > 0) {
    const sizeOptions = sizeMetrics.map((metric) => (
      <>
        <div key={metric.value} style={{ marginBottom: '1rem' }}>
          <Checkbox
            checked={sizeItemChecked.items.includes(metric.value)}
            onClick={() => handleStateCheck(metric.value)}
            key={metric.value}
            disabled={ungraded}
            value={metric.value}
            label={metric.label}
          />
        </div>
        <Checkbox
          onClick={handleOnClickUngraded}
          checked={true}
          label="Ungraded"
        />
      </>
    ));
    return <>{sizeOptions}</>;
  }

  return (
    <Checkbox onClick={handleOnClickUngraded} checked={true} label="Ungraded" />
  );
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
    didFinishStep,
    setDidFinishStep,
  } = props;

  const [ungraded, setUngraded] = useState(false);

  const [sizeToFrom, setSizeToFrom] = useState<{ from: string; to: string }>({
    from: selectedSize.from,
    to: selectedSize.to,
  });

  const [sizeItemChecked, setSizeItemChecked] = useState<{ items: string[] }>({
    items: [...selectedSize.items],
  });

  const handleOnClickUngraded = () => {
    if (!ungraded) {
      setSizeToFrom({
        from: '',
        to: '',
      });
      setSizeItemChecked({
        items: [],
      });
      setUngraded(true);
    } else {
      setUngraded(false);
    }
  };

  const handleSubmit = () => {
    setSelectedSize({
      from: sizeToFrom.from,
      to: sizeToFrom.to,
      items: sizeItemChecked.items.filter((i) => i !== ''),
      ungraded: sizeToFrom.from === '' && sizeItemChecked.items.length < 1,
    });
    setStep(4);
    setDidFinishStep(3);
  };

  const handleSetFromSize = (value: string) => {
    setSizeToFrom({ ...sizeToFrom, from: value });
  };

  const handleSetToSize = (value: string) => {
    setSizeToFrom({ ...sizeToFrom, to: value });
  };

  const disabledNext = () => {
    if (ungraded) {
      return false;
    }

    if (
      listingFormData?.metric.name.toUpperCase().replace(/\s/g, '_') ===
        'GRAMS' ||
      listingFormData?.metric.name.toUpperCase().replace(/\s/g, '_') ===
        'UNITS_PER_POUND'
    ) {
      return sizeToFrom.from === '';
    }

    if (
      sizeItemChecked.items.length < 1 &&
      listingFormData?.metric.name !== 'N/A'
    ) {
      return true;
    }

    return false;
  };

  return (
    <>
      <CreateRequestHeaderContainer>
        <MainContainer>
          <Hidden xs sm>
            <Breadcrumbs
              className="breadcrumbs"
              color="shade5"
              sections={[
                {
                  label: 'Category',
                  onClick: () => {
                    if (didFinishStep >= 1) {
                      onBack(1);
                    }
                  },
                  isDone: didFinishStep >= 1,
                },
                {
                  label: 'Specifications',
                  onClick: () => {
                    if (didFinishStep >= 2) {
                      onBack(2);
                    }
                  },
                  isDone: didFinishStep >= 2,
                },
                {
                  label: 'Size',
                },
                {
                  label: 'Quantity',
                  onClick: () => {
                    if (didFinishStep >= 4) {
                      onBack(4);
                    }
                  },
                  isDone: didFinishStep >= 4,
                },
                {
                  label: 'Summary',
                  onClick: () => {
                    if (didFinishStep >= 5) {
                      onBack(5);
                    }
                  },
                  isDone: didFinishStep >= 5,
                },
              ]}
            />
          </Hidden>
          <TitleContainer>
            <Visible xs sm>
              {stepCountComponent}
            </Visible>
            <Typography
              variant="title5"
              weight="500"
              style={{ fontFamily: 'Media Sans', marginBottom: 12 }}
            >
              {listingFormData?.type.name}
            </Typography>
            <Typography variant="label" weight="400" color="shade7">
              Do you have a specific size in mind? In this step, you can define
              the size you want to purchase and press proceed to continue.
            </Typography>
          </TitleContainer>
        </MainContainer>
      </CreateRequestHeaderContainer>
      <RequestRow>
        <ContainerWithCategoryImagePreview>
          <SizeFormContainer>
            {listingFormData ? (
              <>
                <FriendlyTextContainer>
                  <Typography
                    color="shade10"
                    className="row-label-friendly-text"
                    style={{ fontFamily: 'Media Sans' }}
                  >
                    Select the size you would like
                  </Typography>
                </FriendlyTextContainer>
                <SizeInput
                  ungraded={ungraded}
                  handleOnClickUngraded={handleOnClickUngraded}
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
                  <ButtonContainer>
                    <PreviousButton
                      text="Back"
                      variant="outline"
                      onClick={() => onBack(2)}
                    />
                    <ProceedButton
                      onClick={() => handleSubmit()}
                      className="submit-btn"
                      text="Next"
                      disabled={disabledNext()}
                      variant="primary"
                    />
                  </ButtonContainer>
                </Hidden>
                <MobileFooter>
                  <Button
                    onClick={() => handleSubmit()}
                    className="submit-btn"
                    text="Next"
                    disabled={disabledNext()}
                    variant="primary"
                    takeFullWidth
                    icon={
                      <ChevronRight
                        width={14}
                        height={12}
                        fill="white"
                        style={{ paddingBottom: '2px' }}
                      />
                    }
                  />
                </MobileFooter>
              </>
            ) : (
              ''
            )}
          </SizeFormContainer>
        </ContainerWithCategoryImagePreview>
        <Hidden xs sm>
          <RequestDetailsContainer>
            <DetailsContainer>{detailsListComponent}</DetailsContainer>
          </RequestDetailsContainer>
        </Hidden>
      </RequestRow>
    </>
  );
};

export default SelectSizeView;
