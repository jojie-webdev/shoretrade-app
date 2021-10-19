import React, { useState, useEffect, useReducer } from 'react';

import Alert from 'components/base/Alert';
import Button from 'components/base/Button';
import Checkbox from 'components/base/Checkbox/Checkbox.view';
import Select from 'components/base/Select';
import { Calendar, DollarSign, InfoFilled } from 'components/base/SVG';
import TextArea from 'components/base/TextArea';
import TextField from 'components/base/TextField';
import Typography from 'components/base/Typography';
import MobileFooter from 'components/layout/MobileFooter';
import DatePickerDropdown from 'components/module/DatePickerDropdown';
import IconTooltip from 'components/module/IconTooltip';
import LocationSearch from 'components/module/LocationSearch';
import { BREAKPOINTS } from 'consts/breakpoints';
import moment from 'moment-timezone';
import pathOr from 'ramda/es/pathOr';
import { Row, Col } from 'react-grid-system';
import { useMediaQuery } from 'react-responsive';
import { GetCompanyAddresses } from 'store/selectors/seller/addresses';
import { PlaceData } from 'types/PlaceData';
import { originToPlaceData } from 'utils/Address/originToPlaceData';
import { placeDataToOrigin } from 'utils/Address/placeDataToOrigin';
import { createUpdateReducer } from 'utils/Hooks';
import {
  formatMeasurementUnit,
  formatUnitToPricePerUnit,
} from 'utils/Listing/formatMeasurementUnit';
import { toPrice } from 'utils/String/toPrice';

import { AddDetailsProps } from './AddDetails.props';
import { Container, CheckboxContainer } from './AddDetails.style';
import { combineDateTime } from './AddDetails.transform';
import { isValid, isDateRangeValid, isValidAlt } from './AddDetails.validation';

// Note: even this is AEST, keep calculations on local time
const timeOptions = [...Array(48)].map((v, i) => {
  const value = `${
    (i / 2 < 10 ? '0' : '') +
    (i / 2 - ((i / 2) % 1)) +
    ((i / 2) % 1 != 0 ? ':30' : ':00')
  }`;
  return {
    value,
    label: `${value} AEST`,
  };
});

const catchRecurrenceOptions = [
  {
    label: 'Daily',
    value: 'DAILY',
  },
  { label: 'Weekly', value: 'WEEKLY' },
  { label: 'Fortnightly', value: 'FORTNIGHTLY' },
];

const AddDetails = ({
  isBulkUpload,
  editableListing,
  onUpdateDetails,
  marketEstimate,
  listingFormData,
  navBack,
}: AddDetailsProps) => {
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });

  const [errors, setErrors] = useReducer(
    createUpdateReducer<Record<string, string[]>>(),
    {}
  );

  const [alwaysAvailable, setAlwaysAvailable] = useState(
    editableListing?.catchRecurrence
      ? editableListing?.catchRecurrence.length > 0
      : false
  );

  const [isAquafuture, setIsAquaFuture] = useState<boolean>(
    !!editableListing?.isAquafuture
  );

  const [price, setPrice] = useState(
    editableListing?.pricePerKilo ? editableListing.pricePerKilo.toString() : ''
  );
  const [catchDate, setCatchDate] = useState<Date | null>(
    editableListing?.catchDate
      ? moment(editableListing?.catchDate).toDate()
      : null
  );
  const [catchRecurrence, setCatchRecurrence] = useState(
    editableListing?.catchRecurrence || ''
  );
  const [origin, setOrigin] = useState<PlaceData | null>(
    editableListing?.origin ? originToPlaceData(editableListing.origin) : null
  );
  const [listingEndDate, setListingEndDate] = useState<Date | null>(
    editableListing?.ends ? moment(editableListing?.ends).toDate() : null
  );

  const [listingEndTime, setListingEndTime] = useState<Date | null>(
    editableListing?.ends
      ? moment(
          moment(editableListing?.ends)
            .tz('Australia/Brisbane')
            .format('YYYY-MM-DD'),
          'YYYY-MM-DD'
        ).toDate()
      : null
  );

  const [listingEndTimeString, setListingEndTimeString] = useState(
    editableListing?.ends
      ? moment(editableListing?.ends).tz('Australia/Brisbane').format('HH:mm')
      : ''
  );

  const [shippingAddress, setShippingAddress] = useState(
    editableListing?.addressId || ''
  );
  const [description, setDescription] = useState(
    editableListing?.description || ''
  );
  const selectedCompany = editableListing?.company || '';

  const shippingAddressOptions = GetCompanyAddresses(selectedCompany).map(
    (address) => ({
      label: `${address.streetNumber || ''} ${address.streetName}, ${
        address.suburb
      }, ${address.state}, ${address.countryCode}, ${address.postcode}`,
      value: address.id,
    })
  );

  useEffect(() => {
    if (listingEndTimeString) {
      setListingEndTime(moment(listingEndTimeString, 'HH:mm').toDate());
    } else {
      setListingEndTime(null);
    }
  }, [listingEndTimeString]);

  // For dropdown validation checks (same behavior as TextField's onblur)
  useEffect(() => {
    if (catchDate && !alwaysAvailable) {
      setErrors(
        isValid({
          catchDate,
        })
      );
    } else if (catchRecurrence && alwaysAvailable) {
      setErrors(
        isValid({
          catchRecurrence,
        })
      );
    }

    if (origin) {
      setErrors(
        isValid({
          origin,
        })
      );
    }
    if (listingEndDate) {
      setErrors(
        isValid({
          listingEndDate,
        })
      );
    }
    if (listingEndTime) {
      setErrors(
        isValid({
          listingEndTime,
        })
      );
    }

    if (shippingAddress) {
      setErrors(
        isValid({
          shippingAddress,
        })
      );
    }

    if (catchDate && listingEndDate && listingEndTime && !alwaysAvailable) {
      setErrors(
        isValid({
          catchDate,
          listingEndDate,
          listingEndTime,
          isDateRangeValid: isDateRangeValid(
            combineDateTime(listingEndDate, listingEndTime),
            catchDate
          ),
        })
      );
    }
  }, [catchDate, origin, listingEndDate, listingEndTime, shippingAddress]);

  const toggleAlwaysAvailable = () => {
    if (isAquafuture) return;

    if (!editableListing?.isAquafuture) {
      setAlwaysAvailable((prevState) => !prevState);
    } else {
      setErrors(isValid({ alwaysAvailable }));
    }
  };

  const onNext = () => {
    const detailsError = alwaysAvailable
      ? isValidAlt({ price, catchRecurrence, origin, shippingAddress })
      : isValid({
          price,
          catchDate,
          origin,
          listingEndDate,
          listingEndTime,
          shippingAddress,
          isDateRangeValid:
            catchDate && listingEndDate && listingEndTime
              ? isDateRangeValid(
                  combineDateTime(listingEndDate, listingEndTime),
                  catchDate
                )
              : false,
        });

    const isEmptyError = Object.keys(detailsError).every(
      (k) => detailsError[k].length === 0
    );
    setErrors(detailsError);

    if (!alwaysAvailable) {
      if (
        isEmptyError &&
        price.length > 0 &&
        catchDate &&
        origin &&
        listingEndDate &&
        listingEndTime &&
        shippingAddress
      ) {
        onUpdateDetails({
          isAquafuture,
          pricePerKilo: Number(price),
          catchDate,
          catchRecurrence: null,
          ends: combineDateTime(listingEndDate, listingEndTime),
          origin: placeDataToOrigin(origin),
          description,
          addressId: shippingAddress,
          alwaysAvailable: false,
        });
      }
    } else {
      if (
        isEmptyError &&
        price.length > 0 &&
        catchRecurrence &&
        origin &&
        shippingAddress
      ) {
        onUpdateDetails({
          isAquafuture,
          pricePerKilo: Number(price),
          catchDate: null,
          catchRecurrence,
          ends: null,
          origin: placeDataToOrigin(origin),
          description,
          addressId: shippingAddress,
          alwaysAvailable: true,
        });
      }
    }
  };

  const priceAlertMessage =
    marketEstimate.min !== null && marketEstimate.max !== null
      ? `${toPrice(marketEstimate.min)} - ${toPrice(
          marketEstimate.max
        )} per ${formatUnitToPricePerUnit(
          formatMeasurementUnit(listingFormData?.measurementUnit)
        )} in the past 14 days`
      : 'No Data Available';

  const handleToggleAquaFuture = () => {
    if (editableListing.isAlreadyCreated) return;
    setIsAquaFuture((prevState) => !prevState);
    setAlwaysAvailable(false);
  };

  return (
    <Container>
      <Row>
        <Col>
          <Alert
            variant="infoAlert"
            fullWidth
            content={`Like products sold for: ${priceAlertMessage}`}
            style={{ marginBottom: 16 }}
          />
        </Col>
      </Row>
      {!isBulkUpload && (
        <CheckboxContainer>
          <Typography variant={'overline'} color={'shade6'}>
            Optional Listing Type
          </Typography>
          <Row className="textfield-row checkbox-row">
            <Col>
              <div className="toolip-container">
                <Checkbox
                  onClick={handleToggleAquaFuture}
                  checked={isAquafuture}
                  label="Aquafuture"
                  disabled={editableListing?.isAlreadyCreated}
                  error={pathOr('', ['isAquafuture', '0'], errors)}
                />
                <IconTooltip
                  iconSize={16}
                  variant="info"
                  content="If this product will be caught by a future date, select this box to gain sales in advance."
                />
              </div>
            </Col>
          </Row>
          <Row className="textfield-row">
            <Col>
              <div className="toolip-container">
                <Checkbox
                  onClick={toggleAlwaysAvailable}
                  checked={alwaysAvailable}
                  label="Always available"
                  disabled={isAquafuture}
                  error={pathOr('', ['alwaysAvailable', '0'], errors)}
                />
                <IconTooltip
                  iconSize={16}
                  variant="info"
                  content="Select this box if this product is caught on a regular basis and will be available for next day shipment."
                />
              </div>
            </Col>
          </Row>
        </CheckboxContainer>
      )}

      <Row className="textfield-row">
        <Col md={6} className="textfield-col">
          <TextField
            inputType="decimal"
            label={`Price per ${formatUnitToPricePerUnit(
              formatMeasurementUnit(listingFormData?.measurementUnit)
            )} (excluding freight)`}
            LeftComponent={<DollarSign height={15} width={15} />}
            value={price}
            onChangeText={(v) => {
              if (!Number.isNaN(Number(v))) {
                setPrice(
                  v.includes('.') && v.split('.')[1].length >= 2
                    ? parseFloat(v).toFixed(2).toString()
                    : v
                );
              }
            }}
            error={pathOr('', ['price', '0'], errors)}
            onBlur={() => {
              setErrors(isValid({ price }));
            }}
          />
        </Col>
        <Col md={6} className="textfield-col">
          {!alwaysAvailable ? (
            <DatePickerDropdown
              placeholder=""
              label="Catch Date"
              date={catchDate ? moment(catchDate) : null}
              onDateChange={(d) => setCatchDate(d?.toDate() || null)}
              error={
                pathOr('', ['catchDate', '0'], errors) ||
                pathOr('', ['isDateRangeValid', '0'], errors)
              }
              showCalendarIcon={true}
              showArrowDownIcon={true}
            />
          ) : (
            <Select
              value={catchRecurrence}
              onChange={(option) => {
                setCatchRecurrence(option.value);
              }}
              options={catchRecurrenceOptions}
              label="Catch Date"
              error={pathOr('', ['catchRecurrence', '0'], errors)}
            />
          )}
        </Col>
        <Col md={6} className="textfield-col">
          <LocationSearch
            onSelect={(location) => {
              if (location) {
                setOrigin(location);
              }
            }}
            autocompleteType={'(cities)'}
            textFieldProps={{
              value: origin?.address || '',
              label: 'Catchment Origin',
              error: pathOr('', ['origin', '0'], errors),
            }}
          />
        </Col>
        <Col md={6} className="textfield-col">
          <Select
            value={shippingAddress}
            onChange={(option) => {
              setShippingAddress(option.value);
            }}
            options={shippingAddressOptions}
            label="Shipping Address"
            error={pathOr('', ['shippingAddress', '0'], errors)}
          />
        </Col>
        {!alwaysAvailable && (
          <>
            <Col md={6} className="textfield-col">
              <DatePickerDropdown
                className="date-picker"
                placeholder=""
                label="Listing valid until"
                date={listingEndDate ? moment(listingEndDate) : null}
                onDateChange={(d) => setListingEndDate(d ? d?.toDate() : null)}
                error={
                  pathOr('', ['listingEndDate', '0'], errors) ||
                  pathOr('', ['isDateRangeValid', '0'], errors)
                }
                isOutsideRange={(date) =>
                  date < new Date().setHours(0, 0, 0, 0)
                }
                showCalendarIcon={true}
                showArrowDownIcon={true}
              />
            </Col>
            <Col md={6} className="textfield-col">
              <Select
                value={listingEndTimeString}
                onChange={(option) => {
                  setListingEndTimeString(option.value);
                }}
                options={timeOptions}
                label="LISTING VALID UNTIL"
                error={
                  pathOr('', ['listingEndTime', '0'], errors) ||
                  pathOr('', ['isDateRangeValid', '0'], errors)
                }
              />
            </Col>
          </>
        )}

        <Col md={12} className="textfield-col text-area">
          <TextArea
            label="Additional notes (Optional)"
            value={description}
            onChangeText={setDescription}
            autoHeight
            style={{ height: '100px' }}
          />
        </Col>
      </Row>

      {!isMobile && (
        <Row justify="start" nogutter>
          <Button
            variant="outline"
            className="back-btn"
            text="Back"
            onClick={() => {
              navBack();
            }}
          />
          <Button
            className="next-btn"
            text="Next"
            onClick={() => {
              onNext();
            }}
          />
        </Row>
      )}

      <MobileFooter>
        <Button
          takeFullWidth
          variant="outline"
          text="Back"
          onClick={() => {
            navBack();
          }}
          style={{ marginRight: 8 }}
        />
        <Button
          takeFullWidth
          text="Next"
          onClick={() => {
            onNext();
          }}
        />
      </MobileFooter>
    </Container>
  );
};

export default AddDetails;
