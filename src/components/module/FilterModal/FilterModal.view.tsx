import React, { useEffect, useState } from 'react';

import Button from 'components/base/Button';
import Checkbox from 'components/base/Checkbox';
import Interactions from 'components/base/Interactions';
import Radio from 'components/base/Radio';
import Select from 'components/base/Select';
import { ArrowLeft, ChevronRight, Close } from 'components/base/SVG';
import TextField from 'components/base/TextField';
import Typography from 'components/base/Typography';
import MobileModal from 'components/layout/MobileModal';
import Modal from 'components/layout/Modal';
import { BREAKPOINTS } from 'consts/breakpoints';
import { isEmpty } from 'ramda';
import { Row, Visible } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { useTheme } from 'utils/Theme';

import { FilterModalProps, Filters, FilterType } from './FilterModal.props';
import {
  HeaderContainer,
  Title,
  Reset,
  RadioContainer,
  CheckboxContainer,
  DropdownContainer,
  InputContainer,
  Scroll,
  ClickableRow,
  Filter,
  ButtonContainer,
  HeaderRight,
} from './FilterModal.style';

const FilterModal = (props: FilterModalProps): JSX.Element => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery({ query: BREAKPOINTS['sm'] });
  const ModalLayout = isSmallScreen ? MobileModal : Modal;

  const {
    filters,
    checkboxFilters,
    selectedFilters,
    setSelectedFilters,
    selectedCheckboxFilters,
    setSelectedCheckboxFilters,
    selectedSize,
    setSelectedSize,
    onClickClose,
    isBuyerRequestFilters,
    buyerRequestFilter,
    setBuyerRequestFilter,
    ...modalProps
  } = props;

  const [selecting, setSelecting] = useState<null | string>(null);
  const [type, setType] = useState<FilterType | ''>('');
  const [currentValue, setCurrentValue] = useState('');
  const [sizeFrom, setSizeFrom] = useState('');
  const [sizeTo, setSizeTo] = useState('');
  const [sizeErrors, setSizeErrors] = useState<string[]>([]);

  const getFilter = (): Filters =>
    (filters.find((f) => f.label === selecting) as Filters) || { values: [] };

  const getFilterValue = (label: string, fType: FilterType) => {
    if (fType === 'size_dropdown') {
      const sizeFilter = filters.find((f) => f.label === 'Size');
      const sizeValues = sizeFilter?.sizeDropdownValues;

      if (sizeValues) {
        const from = sizeValues.from.find((f) => f.value === sizeFrom);
        const to =
          sizeValues.to && sizeValues.to.find((t) => t.value === sizeTo);

        return from && to ? `${from.label} - ${to.label}` : null;
      }

      return null;
    }

    if (fType === 'size_input') {
      const sizeFilter = filters.find((f) => f.label === 'Size');
      // @ts-ignore
      const { unit } = sizeFilter;

      if (sizeFrom && sizeTo) {
        const from = `${sizeFrom} ${unit}`;
        const to = `${sizeTo} ${unit}`;

        return `${from} - ${to}`;
      }

      return null;
    }

    const found = filters.find((f) => f.label === label);
    const value = found?.values?.find((v) => selectedFilters.includes(v));

    return value || null;
  };

  const filterValues = getFilter().values;
  const { sizeDropdownValues, unit } = getFilter();

  const onBack = () => {
    setCurrentValue('');
    setSelecting(null);
    setType('');

    if (sizeErrors.length > 0) {
      setSizeFrom('');
      setSizeTo('');
      setSizeErrors([]);
    }
  };

  const onReset = () => {
    if (selecting) {
      setSelectedFilters((prevState) =>
        prevState.filter((f) => f !== currentValue)
      );

      setCurrentValue('');
      if (setSelectedSize) {
        setSelectedSize(null);
      }
    } else {
      props.onReset();
    }

    setSizeFrom('');
    setSizeTo('');
  };

  const onChoice = (v: string) => {
    const isExisting = selectedFilters.some((f) => f === v);

    if (!isExisting) {
      const removedPrev = selectedFilters.filter((f) => f !== currentValue);
      const newValues = [...removedPrev, v];
      setSelectedFilters(newValues);
    }

    setCurrentValue(v);
  };

  const onPressFilter = (label: string, fType: FilterType) => {
    setSelecting(label);
    if (isBuyerRequestFilters) {
      setType('multiple');
    } else {
      setType(fType);
    }
  };

  const onCheckboxPress = (label: string) => {
    if (selectedCheckboxFilters && setSelectedCheckboxFilters) {
      const isExisting = selectedCheckboxFilters.some((f) => f === label);

      if (!isExisting) {
        setSelectedCheckboxFilters([...selectedCheckboxFilters, label]);
      } else {
        const newValues = selectedCheckboxFilters.filter((f) => f !== label);
        setSelectedCheckboxFilters(newValues);
      }
    }
  };

  useEffect(() => {
    const currentFilter = getFilter();

    if (currentFilter && currentFilter.type === 'choice') {
      const initialValue = selectedFilters.find((sf) =>
        // @ts-ignore
        currentFilter.values.includes(sf)
      );

      if (initialValue) setCurrentValue(initialValue);
    }
  }, [selecting]);

  useEffect(() => {
    if (sizeFrom && sizeTo && type === 'size_dropdown') {
      // @ts-ignore
      const { from, to } = sizeDropdownValues;

      const fromIndex = from.findIndex(
        (options: { value: string }) => sizeFrom === options.value
      );
      const toIndex = to.findIndex(
        (options: { value: string }) => sizeTo === options.value
      );
      if (fromIndex > toIndex) {
        setSizeTo(sizeFrom);
      }
    }
  }, [sizeFrom, sizeTo]);

  const onBuyerRequestPress = (label: string) => {
    if (buyerRequestFilter && setBuyerRequestFilter) {
      const isExisting = buyerRequestFilter.some((f) => f.value === label);
      if (!isExisting) {
        setBuyerRequestFilter([
          ...buyerRequestFilter,
          { label: getFilter().label, value: label },
        ]);
      } else {
        const newValues = buyerRequestFilter.filter((f) => f.value !== label);
        setBuyerRequestFilter(newValues);
      }
    }
  };

  useEffect(() => {
    if (sizeFrom && sizeTo && type === 'size_input') {
      const nSizeFrom = Number(sizeFrom);
      const nSizeTo = Number(sizeTo);
      const nSizeMin = Number(filterValues ? filterValues[0] : '');
      const nSizeMax = Number(filterValues ? filterValues[1] : '');
      if (nSizeFrom !== 0 && nSizeTo !== 0) {
        const errors: string[] = [];

        if (nSizeFrom < nSizeMin) {
          errors.push(
            `The 'from weight' cannot be lower than the minimum weight (${nSizeMin}${unit?.toLowerCase()})`
          );
        }

        if (nSizeTo > nSizeMax) {
          errors.push(
            `The 'to weight' cannot be larger than the maximum weight (${nSizeMax}${unit?.toLowerCase()})`
          );
        }

        if (nSizeTo < nSizeFrom) {
          errors.push(
            `The 'to weight' cannot be smaller than the 'from weight'`
          );
        }
        setSizeErrors(errors);
      }
    }
  }, [sizeFrom, sizeTo]);

  useEffect(() => {
    if (sizeFrom && sizeTo && setSelectedSize) {
      setSelectedSize(`${sizeFrom} - ${sizeTo}`);
    }
  }, [sizeFrom, sizeTo]);

  return (
    <ModalLayout {...modalProps} onClickClose={onClickClose}>
      <>
        <HeaderContainer>
          {selecting ? (
            <ClickableRow onClick={onBack} align="center" nogutter>
              <ArrowLeft fill={theme.grey.shade6} />
              <Title variant="title5" marginLeft="11px">
                Back
              </Title>
            </ClickableRow>
          ) : (
            <Title variant="title5">Filters</Title>
          )}
          <HeaderRight>
            <ClickableRow onClick={onReset} align="center" nogutter>
              {!selecting && <Reset variant="overline">Reset</Reset>}
            </ClickableRow>
            <Visible xs>
              <ClickableRow onClick={onClickClose} align="center" nogutter>
                <Button
                  style={{ width: '32px', height: '32px' }}
                  circular
                  variant="white"
                  icon={<Close />}
                />
              </ClickableRow>
            </Visible>
          </HeaderRight>
        </HeaderContainer>

        {selecting ? (
          <>
            {type === 'choice' && (
              <Scroll>
                {filterValues &&
                  filterValues.map((v) => (
                    <RadioContainer key={v} onClick={() => onChoice(v)}>
                      <Radio label={v} checked={v === currentValue} />
                    </RadioContainer>
                  ))}
              </Scroll>
            )}

            {type === 'size_dropdown' && sizeDropdownValues && (
              <Scroll>
                <DropdownContainer>
                  <Select
                    label="from"
                    options={sizeDropdownValues.from}
                    value={sizeFrom}
                    onChange={(v) => setSizeFrom(v.value)}
                  />
                </DropdownContainer>
                <DropdownContainer>
                  <Select
                    label="to"
                    options={sizeDropdownValues.to}
                    value={sizeTo}
                    onChange={(v) => setSizeTo(v.value)}
                  />
                </DropdownContainer>
              </Scroll>
            )}

            {type === 'size_input' && (
              <Scroll>
                <InputContainer>
                  <TextField
                    label="from"
                    LeftComponent={
                      <Typography color="shade6">{unit}</Typography>
                    }
                    value={sizeFrom}
                    onChangeText={setSizeFrom}
                    type="number"
                    inputType="decimal"
                    placeholder={filterValues ? filterValues[0] : ''}
                  />
                </InputContainer>
                <InputContainer>
                  <TextField
                    label="to"
                    LeftComponent={
                      <Typography color="shade6">{unit}</Typography>
                    }
                    value={sizeTo}
                    onChangeText={setSizeTo}
                    type="number"
                    inputType="decimal"
                    placeholder={filterValues ? filterValues[1] : ''}
                  />
                </InputContainer>

                <InputContainer>
                  {sizeErrors.map((v) => (
                    <Typography key={v} variant="caption" color="error">
                      {v}
                    </Typography>
                  ))}
                </InputContainer>
              </Scroll>
            )}

            {buyerRequestFilter &&
              setBuyerRequestFilter &&
              type === 'multiple' && (
                <Scroll>
                  {filterValues &&
                    filterValues.map((v) => (
                      <RadioContainer
                        key={v}
                        onClick={() => onBuyerRequestPress(v)}
                      >
                        <Checkbox
                          label={v}
                          checked={buyerRequestFilter.some(
                            (x) => x.value === v
                          )}
                        />
                      </RadioContainer>
                    ))}
                </Scroll>
              )}
          </>
        ) : (
          <Scroll>
            {filters.map((f) => (
              <Filter key={f.label}>
                <Interactions
                  value={f.label}
                  onClick={() => onPressFilter(f.label, f.type)}
                  rightComponent={
                    <Row align="center" nogutter>
                      <Typography
                        color="noshade"
                        variant="label"
                        style={{ marginRight: 16 }}
                      >
                        {getFilterValue(f.label, f.type)}
                      </Typography>
                      <ChevronRight width={8} height={12} />
                    </Row>
                  }
                  padding="16px"
                />
              </Filter>
            ))}

            {checkboxFilters &&
              selectedCheckboxFilters &&
              !isEmpty(checkboxFilters) &&
              checkboxFilters.map((cf) => (
                <CheckboxContainer key={cf.label}>
                  <Checkbox
                    label={cf.label}
                    checked={selectedCheckboxFilters.includes(cf.label)}
                    onClick={() => onCheckboxPress(cf.label)}
                  />
                </CheckboxContainer>
              ))}
          </Scroll>
        )}

        <ButtonContainer>
          {selecting ? (
            <Button
              onClick={onBack}
              disabled={sizeErrors.length > 0}
              text="Done"
              takeFullWidth
            />
          ) : (
            <Button onClick={props.onApply} text="Apply" takeFullWidth />
          )}
        </ButtonContainer>
      </>
    </ModalLayout>
  );
};

export default React.memo(FilterModal);
