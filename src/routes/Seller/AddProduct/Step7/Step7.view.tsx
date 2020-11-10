import React, { useState, useEffect, useReducer } from 'react';

import Button from 'components/base/Button';
import Select from 'components/base/Select';
import { DollarSign, Clock } from 'components/base/SVG';
import TextArea from 'components/base/TextArea';
import TextField from 'components/base/TextField';
import DatePickerDropdown from 'components/module/DatePickerDropdown';
import LocationSearch from 'components/module/LocationSearch';
import moment from 'moment';
import pathOr from 'ramda/es/pathOr';
import { Row, Col } from 'react-grid-system';
import { GetCompanyAddresses } from 'store/selectors/seller/addresses';
import { PlaceData } from 'types/PlaceData';
import { originToPlaceData } from 'utils/Address/originToPlaceData';
import { placeDataToOrigin } from 'utils/Address/placeDataToOrigin';
import { createUpdateReducer } from 'utils/Hooks';
import { formatMeasurementUnit } from 'utils/Listing/formatMeasurementUnit';
import { toPrice } from 'utils/String/toPrice';
import theme from 'utils/Theme';

import { Step7Props } from './Step7.props';
import { Container, PriceAlertInfo } from './Step7.style';
import { combineDateTime } from './Step7.transform';
import { isValid, isDateRangeValid } from './Step7.validation';

function Step7({
  editableListing,
  onUpdateDetails,
  marketEstimate,
  listingFormData,
}: Step7Props) {
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
    editableListing?.ends ? moment(editableListing?.ends).toDate() : null
  );

  const [listingEndTimeString, setListingEndTimeString] = useState(
    editableListing?.ends ? moment(editableListing?.ends).format('HH:mm') : ''
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
      label: `${address.streetNumber} ${address.streetName}, ${address.suburb}, ${address.state}, ${address.countryCode}, ${address.postcode}`,
      value: address.id,
    })
  );

  useEffect(() => {
    if (
      listingEndTimeString.length === 5 &&
      listingEndTimeString.includes(':')
    ) {
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
      // do something
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
        )} per ${formatMeasurementUnit(
          listingFormData?.measurementUnit
        )} in the past 14 days`
      : 'No Data Available';

  return (
    <Container>
      <Row>
        <Col>
          <PriceAlertInfo
            label={`Like products sold for: ${priceAlertMessage}`}
          />
        </Col>
      </Row>
      <Row className="textfield-row">
        <Col md={6} className="textfield-col">
          <TextField
            label="Price (exluding freight)"
            LeftComponent={<DollarSign height={15} width={15} />}
            value={price}
            onChangeText={(v) => {
              if (!Number.isNaN(Number(v))) {
                setPrice(v);
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
            onDateChange={(d) => setListingEndDate(d?.toDate() || null)}
            error={
              pathOr('', ['listingEndDate', '0'], errors) ||
              pathOr('', ['isDateRangeValid', '0'], errors)
            }
          />
        </Col>
        <Col md={6} className="textfield-col">
          <TextField
            className="time-picker"
            label="LISTING VALID UNTIL"
            placeholder="00:00"
            LeftComponent={<Clock fill={theme.grey.shade6} />}
            value={listingEndTimeString}
            onChangeText={(v) => {
              // Note: This is hacky way to handle time input
              // But this makes sure that is is supported by all browsers
              // unlike when using type='time'
              const x = v.split(':');
              const [h, m] = x;
              const [H, M] = x.map((X) => (X ? Number(X) : NaN));

              if (!Number.isNaN(H)) {
                if (H < 24 && H >= 0) {
                  if (h.length === 1 && !v.includes(':') && H > 2) {
                    setListingEndTimeString(`0${h}:`);
                  } else if (h.length === 2 && !v.includes(':')) {
                    setListingEndTimeString(`${h}:`);
                  } else if ((m || '').length > 0 && v.includes(':')) {
                    if (!Number.isNaN(M)) {
                      if (M < 60 && M >= 0) {
                        // avoid trailing zeros
                        if (m.length <= 2) {
                          setListingEndTimeString(v);
                        }
                      }
                    }
                  } else {
                    setListingEndTimeString(v);
                  }
                }
              } else {
                setListingEndTimeString(v);
              }
            }}
            error={
              pathOr('', ['listingEndTime', '0'], errors) ||
              pathOr('', ['isDateRangeValid', '0'], errors)
            }
          />
        </Col>

        <Col md={12} className="textfield-col">
          <TextArea
            label="Additional notes (Optional)"
            value={description}
            onChangeText={setDescription}
            autoHeight
            style={{ height: '100px' }}
          />
        </Col>
      </Row>

      <Row justify="end" style={{ padding: '0 15px' }}>
        <Button
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
