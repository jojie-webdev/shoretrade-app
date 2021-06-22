import React, { useState, useEffect, useReducer } from 'react';

import Alert from 'components/base/Alert';
import Button from 'components/base/Button';
import Select from 'components/base/Select';
import { DollarSign, Clock } from 'components/base/SVG';
import TextArea from 'components/base/TextArea';
import TextField from 'components/base/TextField';
import DatePickerDropdown from 'components/module/DatePickerDropdown';
import LocationSearch from 'components/module/LocationSearch';
import moment from 'moment-timezone';
import pathOr from 'ramda/es/pathOr';
import { Row, Col } from 'react-grid-system';
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
import theme from 'utils/Theme';

import { Step6Props } from './Step6.props';
import { Container } from './Step6.style';
import { combineDateTime } from './Step6.transform';
import { isValid, isDateRangeValid } from './Step6.validation';

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

function Step7({
  editableListing,
  onUpdateDetails,
  marketEstimate,
  listingFormData,
  navBack,
}: Step6Props) {
  const [errors, setErrors] = useReducer(
    createUpdateReducer<Record<string, string[]>>(),
    {}
  );

  const [price, setPrice] = useState(
    editableListing?.pricePerKilo ? editableListing.pricePerKilo.toString() : ''
  );
  const [catchDate, setCatchDate] = useState<Date | null>(
    editableListing?.catchDate
      ? moment(editableListing?.catchDate).toDate()
      : null
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
    if (catchDate) {
      setErrors(
        isValid({
          catchDate,
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

    if (catchDate && listingEndDate && listingEndTime) {
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

  const onNext = () => {
    const detailsError = isValid({
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
        pricePerKilo: Number(price),
        catchDate,
        ends: combineDateTime(listingEndDate, listingEndTime),
        origin: placeDataToOrigin(origin),
        description,
        addressId: shippingAddress,
      });
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
          <DatePickerDropdown
            placeholder=""
            label="Catch Date"
            date={catchDate ? moment(catchDate) : null}
            onDateChange={(d) => setCatchDate(d?.toDate() || null)}
            error={
              pathOr('', ['catchDate', '0'], errors) ||
              pathOr('', ['isDateRangeValid', '0'], errors)
            }
          />
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
            isOutsideRange={(date) => date < new Date().setHours(0, 0, 0, 0)}
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

      <Row justify="start" style={{ padding: '0 15px' }}>
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
    </Container>
  );
}

export default Step7;
