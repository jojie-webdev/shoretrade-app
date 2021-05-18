import React, { useEffect, useState } from 'react';

import Button from 'components/base/Button';
import Checkbox from 'components/base/Checkbox';
import Interactions from 'components/base/Interactions';
import Radio from 'components/base/Radio';
import Select from 'components/base/Select';
import { ArrowLeft, ChevronRight } from 'components/base/SVG';
import TextField from 'components/base/TextField';
import Typography from 'components/base/Typography';
import MobileModal from 'components/layout/MobileModal';
import Modal from 'components/layout/Modal';
import { BREAKPOINTS } from 'consts/breakpoints';
import { isEmpty } from 'ramda';
import { Row } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { useTheme } from 'utils/Theme';

import {
  MarketRequestOfferFilterModalProps,
  Filters,
  FilterType,
} from './MarketRequestOfferFilterModal.props';
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
} from './MarketRequestOfferFilterModal.style';

const FilterModal = (
  props: MarketRequestOfferFilterModalProps
): JSX.Element => {
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
    setType(fType);
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

  return (
    <ModalLayout {...modalProps}>
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

          <ClickableRow onClick={onReset} align="center" nogutter>
            {!selecting && <Reset variant="overline">Reset</Reset>}
          </ClickableRow>
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
                        color="shade9"
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
