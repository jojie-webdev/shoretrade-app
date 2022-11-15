import React, { useState, useEffect, useReducer, useMemo } from 'react';

// import Alert from 'components/base/Alert';
import Button from 'components/base/Button';
import { Label2 } from 'components/base/Checkbox/Checkbox.style';
import Checkbox from 'components/base/Checkbox/Checkbox.view';
import Interactions from 'components/base/Interactions';
import Radio from 'components/base/Radio';
import Select from 'components/base/Select';
import { DollarSign, InfoFilled } from 'components/base/SVG';
import TextArea from 'components/base/TextArea';
import TextField from 'components/base/TextField';
import Typography from 'components/base/Typography';
import MobileFooter from 'components/layout/MobileFooter';
import DatePickerDropdown from 'components/module/DatePickerDropdown';
import DateRangePicker from 'components/module/DateRangePicker';
// import IconTooltip from 'components/module/IconTooltip';
import LocationSearch from 'components/module/LocationSearch';
import OfferTag from 'components/module/OfferTag';
import { ToolTip } from 'components/module/RefreshCreditButton/RefreshCreditButton.style';
import { BREAKPOINTS } from 'consts/breakpoints';
import { Moment } from 'moment';
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
// import { toPrice } from 'utils/String/toPrice';

import theme from 'utils/SFMTheme';

import { TOOLTIP_MESSAGES } from './AddDetails.constants';
import { AddDetailsProps } from './AddDetails.props';
import {
  Container,
  // CheckboxContainer,
  CustomCol,
  DatePickerTop,
  SfmContainer,
  GstBadge,
  LabelAndIconWrapper,
} from './AddDetails.style';
import { combineDateTime } from './AddDetails.transform';
import {
  isValid,
  isDateRangeValid,
  isValidAlt,
  isValidAuction,
  isValidPreAuction,
  isAuctionDateValid,
  isValidExpiryDate,
  isListingExpiryDateValid,
  isValidExpiryDateForDirectSale,
  isValidExpiryDateForPreAuction,
} from './AddDetails.validation';

// Note: even this is AEST, keep calculations on local time
const timeOptions = [...Array(48)].map((v, i) => {
  const value = `${
    (i / 2 < 10 ? '0' : '') +
    (i / 2 - ((i / 2) % 1)) +
    ((i / 2) % 1 !== 0 ? ':30' : ':00')
  }`;
  return {
    value,
    label: `${value} AEST`,
  };
});

const estimatedShippingOptions = [
  'Next day',
  'Within 2 days',
  'Between 3 to 5 days',
  'Between 1 to 2 weeks',
  'Between 2 to 4 weeks',
  'Next month',
  'Custom date',
].map((v) => ({ value: v, label: v }));

const catchRecurrenceOptions = [
  {
    label: 'Daily',
    value: 'DAILY',
  },
  { label: 'Weekly', value: 'WEEKLY' },
  { label: 'Fortnightly', value: 'FORTNIGHTLY' },
];

const SALES_CHANNELS = [
  {
    value: 'direct',
    name: 'Direct Sale',
    description: 'Sell your products directly to Buyers',
  },
  {
    value: 'aquafuture',
    name: 'Aquafuture',
    description: 'Lock in sales for products you will catch in the future',
  },
  {
    value: 'auction',
    // name: 'Auction',
    // description: 'Put your products to Auction at the Sydney Fish Markets',
    name: 'Pre-Auction',
    description:
      'Allow your products to be sold on the way to Auction for a set price',
  },
];

const AddDetails = ({
  isBulkUpload,
  editableListing,
  onUpdateDetails,
  marketEstimate,
  listingFormData,
  navBack,
  isGstIncl,
  disableBackBtn,
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

  const [selectedChannel, setSelectedChannel] = useState(
    editableListing?.isAquafuture
      ? SALES_CHANNELS[1].value
      : editableListing.isAuctionSale
      ? SALES_CHANNELS[2].value
      : SALES_CHANNELS[0].value
  );

  const [isAquafuture, setIsAquafuture] = useState<boolean>(
    !!editableListing?.isAquafuture
  );

  const [isAuctionSale, setIsAuctionSale] = useState<boolean>(
    !!editableListing?.isAuctionSale
  );

  const [isPreAuctionSale, setIsPreAuctionSale] = useState<boolean>(
    !!editableListing?.isPreAuctionSale
  );

  const [price, setPrice] = useState(
    editableListing?.pricePerKilo ? editableListing.pricePerKilo.toString() : ''
  );

  const [auctionDate, setAuctionDate] = useState<Date | null>(
    editableListing?.auctionDate
      ? moment(editableListing?.auctionDate).toDate()
      : null
  );

  const [catchDate, setCatchDate] = useState<Date | null>(
    editableListing?.catchDate
      ? moment(editableListing?.catchDate).toDate()
      : null
  );
  // eslint-disable-next-line
  const [catchRecurrence, setCatchRecurrence] = useState(
    editableListing?.catchRecurrence || catchRecurrenceOptions[1].value
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

  const [templateDeliveryDate, setTemplateDeliveryDate] = useState(
    (!isAquafuture && editableListing?.templateDeliveryDate) || null
  );
  const [customDeliveryDate, setCustomDeliveryDate] = useState<{
    from: Moment | null;
    to: Moment | null;
  }>({
    from: null,
    to: null,
  });

  const [shippingAddress, setShippingAddress] = useState(
    editableListing?.addressId || ''
  );
  const [description, setDescription] = useState(
    editableListing?.description || ''
  );

  const [mandatorySFM, setMandatorySFM] = useState({
    isChecked: false,
    gotSkipped: false,
  });

  const [restrictToState, setRestrictToState] = useState<boolean>(
    editableListing?.restrictToState || false
  );

  const selectedCompany = editableListing?.company || '';

  const shippingAddressOptions = GetCompanyAddresses(selectedCompany).map(
    (address) => ({
      label: `${address.streetNumber || ''} ${address.streetName}, ${
        address.suburb
      }, ${address.state}, ${address.countryCode}, ${address.postcode}`,
      value: address.id,
      isDefault: address.default,
      state: address.state,
    })
  );

  const defaultShippingAddress = shippingAddressOptions.find(
    (s) => s.isDefault
  );

  const selectedShippingState = useMemo(() => {
    const address = shippingAddressOptions.find(
      (s) => s.value === shippingAddress
    );

    return address ? address.state : '';
  }, [shippingAddress, shippingAddressOptions]);

  useEffect(() => {
    if (disableBackBtn) {
      setSelectedChannel('auction');
      handleToggleAuctionSale();
    }
  }, [disableBackBtn]);

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
    }
    // else if (catchRecurrence && alwaysAvailable) {
    //   setErrors(
    //     isValid({
    //       catchRecurrence,
    //     })
    //   );
    // }
    if (auctionDate && isAuctionSale) {
      setErrors(
        isValidAuction({
          auctionDate,
          isAuctionDateValid: isAuctionDateValid(auctionDate),
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
    if (catchDate && listingEndDate) {
      setErrors(
        isValidExpiryDate({
          isListingExpiryDateValid: isListingExpiryDateValid(
            onRevalidateCatchment()
          ),
        })
      );
    }
    if (selectedChannel === 'direct' && catchDate && listingEndDate) {
      setErrors(
        isValidExpiryDateForDirectSale({
          isListingExpiryDateValid: onRevalidateCatchmentForDirectSale(),
        })
      );
    }
    if (isPreAuctionSale && catchDate && auctionDate) {
      setErrors(
        isValidExpiryDateForPreAuction({
          isListingExpiryDateValid: onRevalidateCatchmentForPreAuction(),
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

    if (
      catchDate &&
      listingEndDate &&
      listingEndTime &&
      !(alwaysAvailable || isAuctionSale)
    ) {
      setErrors(
        isValid({
          catchDate,
          listingEndDate,
          listingEndTime,
          isDateRangeValid: isDateRangeValid(
            combineDateTime(listingEndDate, listingEndTime)
          ),
        })
      );
    }
    // eslint-disable-next-line
  }, [
    selectedChannel,
    catchDate,
    auctionDate,
    origin,
    listingEndDate,
    listingEndTime,
    shippingAddress,
  ]);

  const toggleAlwaysAvailable = () => {
    if (!isAquafuture && !isAuctionSale) {
      setCatchDate(null);
      setAlwaysAvailable((prevState) => !prevState);
    } else {
      setErrors(isValid({ alwaysAvailable }));
    }
  };

  const onNext = () => {
    let detailsError: any;

    if (!mandatorySFM.isChecked) {
      setMandatorySFM((prevState) => ({
        ...prevState,
        gotSkipped: true,
      }));
      return;
    }
    switch (true) {
      case isPreAuctionSale:
        detailsError = isValidPreAuction({
          price,
          catchDate,
          auctionDate,
          origin,
          isAuctionDateValid: isAuctionDateValid(auctionDate),
          endAndCatchmentDateForPreAuction: onRevalidateCatchmentForPreAuction(),
        });
        break;
      case isAuctionSale:
        detailsError = isValidAuction({
          catchDate,
          auctionDate,
          origin,
          isAuctionDateValid: isAuctionDateValid(auctionDate),
        });
        break;
      case alwaysAvailable:
        detailsError = isValidAlt({
          price,
          // catchRecurrence,
          origin,
          shippingAddress,
        });
        break;
      default:
        detailsError = isValid({
          price,
          auctionDate,
          catchDate,
          origin,
          listingEndDate,
          listingEndTime,
          shippingAddress,
          isDateRangeValid:
            listingEndDate && listingEndTime
              ? isDateRangeValid(
                  combineDateTime(listingEndDate, listingEndTime)
                )
              : false,
          endAndCatchmentDate: isListingExpiryDateValid(
            onRevalidateCatchment()
          ),
          endAndCatchmentDateForDirectSale: onRevalidateCatchmentForDirectSale(),
        });
        break;
    }

    const formattedDeliveryDate =
      templateDeliveryDate === 'Custom date'
        ? `${customDeliveryDate.from?.format(
            'MMM D'
          )} to ${customDeliveryDate.to?.format('MMM D')}`
        : templateDeliveryDate;

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
        shippingAddress &&
        !isAuctionSale
      ) {
        onUpdateDetails({
          isAquafuture,
          isAuctionSale,
          isPreAuctionSale,
          pricePerKilo: Number(price),
          catchDate,
          auctionDate,
          catchRecurrence: null,
          ends: combineDateTime(listingEndDate, listingEndTime),
          origin: placeDataToOrigin(origin),
          description,
          addressId: shippingAddress,
          alwaysAvailable: false,
          templateDeliveryDate: formattedDeliveryDate,
          restrictToState,
        });
      } else if (
        isEmptyError &&
        isAuctionSale &&
        auctionDate &&
        catchDate &&
        origin
      ) {
        onUpdateDetails({
          isAquafuture: false,
          isAuctionSale,
          isPreAuctionSale,
          pricePerKilo: Number(price),
          catchDate,
          auctionDate,
          catchRecurrence: null,
          ends: auctionDate,
          origin: placeDataToOrigin(origin),
          description,
          alwaysAvailable: false,
          addressId: shippingAddress || defaultShippingAddress?.value || '',
          templateDeliveryDate: formattedDeliveryDate,
          restrictToState,
        });
      }
    } else {
      if (isEmptyError && price.length > 0 && origin && shippingAddress) {
        onUpdateDetails({
          isAquafuture,
          isAuctionSale,
          isPreAuctionSale,
          pricePerKilo: Number(price),
          auctionDate,
          catchDate: null,
          catchRecurrence,
          ends: null,
          origin: placeDataToOrigin(origin),
          description,
          addressId: shippingAddress,
          alwaysAvailable: true,
          templateDeliveryDate: formattedDeliveryDate,
          restrictToState,
        });
      }
    }
  };

  // const priceAlertMessage =
  //   marketEstimate.min !== null && marketEstimate.max !== null
  //     ? `${toPrice(marketEstimate.min)} - ${toPrice(
  //         marketEstimate.max
  //       )} per ${formatUnitToPricePerUnit(
  //         formatMeasurementUnit(listingFormData?.measurementUnit)
  //       )} in the past 14 days`
  //     : 'No Data Available';

  const handleSelectedChannelChange = () => {
    setListingEndDate(null);
    setListingEndTimeString('');
    setTemplateDeliveryDate(null);
    setCatchDate(null);
  };

  const handleToggleAquafuture = () => {
    handleSelectedChannelChange();
    setIsAquafuture((prevState) => !prevState);
    setAlwaysAvailable(false);
    setIsAuctionSale(false);
    setIsPreAuctionSale(false);
  };

  const handleToggleAuctionSale = () => {
    handleSelectedChannelChange();
    setIsAuctionSale((prevState) => !prevState);
    setAlwaysAvailable(false);
    setIsAquafuture(false);
    setIsPreAuctionSale(true);
  };

  const handleToggleDirect = () => {
    handleSelectedChannelChange();
    setIsAquafuture(false);
    setIsAuctionSale(false);
    setIsPreAuctionSale(false);
  };

  const onRevalidateCatchment = (): boolean => {
    const isSameOrAfterToday = moment(listingEndDate).isSameOrAfter();

    if (isAquafuture)
      return (
        isSameOrAfterToday &&
        moment(listingEndDate).isSameOrBefore(moment(catchDate).endOf('day'))
      );
    else return isSameOrAfterToday;
  };

  const onRevalidateCatchmentForDirectSale = (): boolean => {
    const isCatchDateSameOrBeforeListingEndDate = moment(
      catchDate
    ).isSameOrBefore(moment(listingEndDate).endOf('day'));
    return isCatchDateSameOrBeforeListingEndDate;
  };

  const onRevalidateCatchmentForPreAuction = (): boolean => {
    const isCatchDateBeforeAuctionDate = moment(catchDate)
      .endOf('day')
      .isBefore(moment(auctionDate));
    return isCatchDateBeforeAuctionDate;
  };

  const isValidUntilOutsideRange = (date: Moment) => {
    const isBeforeToday = date.isBefore();

    if (isAquafuture) return isBeforeToday || date.isAfter(catchDate);
    else return isBeforeToday;
  };

  const tooltip = (name: string, message: JSX.Element) => (
    <ToolTip
      id={`${selectedChannel}-${name}`}
      className={`${selectedChannel}-${name}-tooltip`}
      effect="solid"
      backgroundColor={theme.grey.shade9}
      place="top"
      offset={{ right: 70 }}
    >
      {message}
    </ToolTip>
  );

  const label = (label: string, name: string) => (
    <LabelAndIconWrapper>
      <Typography
        variant="overline"
        color="shade6"
        weight="900"
        style={{ marginRight: 8 }}
      >
        {label}
      </Typography>
      <div data-tip data-for={`${selectedChannel}-${name}`}>
        <InfoFilled width={17} height={17} fill={theme.brand.info} />
      </div>
    </LabelAndIconWrapper>
  );

  return (
    <Container>
      {/* <Row>
        <Col>
          <Alert
            variant="infoAlert"
            fullWidth
            content={`Like products sold for: ${priceAlertMessage}`}
            style={{ marginBottom: 16 }}
          />
        </Col>
      </Row> */}
      <Row>
        <Col>
          <Typography
            variant="title6"
            color="noshade"
            className="title"
            style={{
              lineHeight: '24px',
              marginBottom: '8px',
            }}
            altFont
          >
            Sales Channel
          </Typography>
        </Col>
      </Row>
      <Row style={{ marginLeft: 0 }}>
        {SALES_CHANNELS.map((c) => (
          <CustomCol key={c.value} sm={4} md={3}>
            <Interactions
              disabled={c.value !== 'auction' && disableBackBtn}
              padding="12px"
              onClick={() => {
                if (selectedChannel === 'auction' && disableBackBtn) {
                  return;
                } else {
                  setSelectedChannel((prevState) => {
                    if (prevState === c.value) return '';
                    else return c.value;
                  });
                  if (c.value === 'aquafuture') {
                    handleToggleAquafuture();
                  } else if (c.value === 'auction') {
                    handleToggleAuctionSale();
                  } else {
                    handleToggleDirect();
                  }
                }
              }}
              leftComponent={
                <Typography
                  variant="label"
                  color="noshade"
                  style={{
                    paddingTop: '28px',
                    fontSize: '18px',
                    lineHeight: '24px',
                  }}
                >
                  {c.name}
                </Typography>
              }
              rightComponent={<Radio checked={c.value === selectedChannel} />}
              bottomComponent={
                <Typography variant="caption" color="shade6">
                  {c.description}
                </Typography>
              }
            />
          </CustomCol>
        ))}
      </Row>
      <Row>
        <Col>
          <Typography
            variant="title6"
            color="noshade"
            className="title"
            style={{
              lineHeight: '24px',
              marginTop: '40px',
              marginBottom: '8px',
            }}
            altFont
          >
            Product Information
          </Typography>
        </Col>
      </Row>
      {/* {!isBulkUpload && (
        <CheckboxContainer>
          <Typography variant={'overline'} color={'shade6'}>
            Optional Listing Type
          </Typography>
          <Row className="textfield-row checkbox-row">
            <Col>
              <div className="toolip-container">
                <Checkbox
                  onClick={handleToggleAquafuture}
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
      )} */}

      {/* {isAuctionSale && (
        <Row className="textfield-row" style={{ marginTop: '16px' }}>
          <Col sm={12} md={8} className="textfield-col">
            <Checkbox
              checked={isPreAuctionSale}
              label="Pre-Auction: Allow your products to be sold on the way to Auction for a set price"
              error={pathOr('', ['isPreAuctionSale', '0'], errors)}
              typographyProps={{ variant: 'label', weight: 'normal' }}
              style={{ cursor: 'not-allowed' }}
            />
          </Col>
        </Row>
      )} */}
      {(!isAuctionSale || (isAuctionSale && isPreAuctionSale)) && (
        <Row className="textfield-row">
          <Col md={6} className="textfield-col">
            <TextField
              inputType="decimal"
              label={`Price per ${formatUnitToPricePerUnit(
                formatMeasurementUnit(listingFormData?.measurementUnit)
              )} (excluding freight)`}
              LeftComponent={
                <DollarSign
                  fill={theme.isSFM ? theme.grey.shade6 : undefined}
                  height={15}
                  width={15}
                />
              }
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
              RightComponent={
                <>
                  {isGstIncl ? (
                    <GstBadge>
                      <OfferTag
                        text={'INCLUDE GST'}
                        badgeColor={'#E35D32'}
                        variantColor={'alert'}
                        color={'alert'}
                      />
                    </GstBadge>
                  ) : (
                    <></>
                  )}
                  <Typography
                    variant="overlineSmall"
                    color="shade6"
                    style={{ paddingRight: '14px' }}
                  >
                    AUD
                  </Typography>
                </>
              }
              rightComponentDirection={isGstIncl ? 'row' : 'column'}
            />
          </Col>
        </Row>
      )}
      {isAuctionSale && (
        <Row className="textfield-row">
          <Col sm={12} md={6} className="textfield-col">
            {tooltip('auctionDate', TOOLTIP_MESSAGES.auctionDate.preAuction)}
            <DatePickerDropdown
              placeholder=""
              label={label(
                'Auction date (date arriving at sfm)',
                'auctionDate'
              )}
              date={auctionDate ? moment(auctionDate) : null}
              onDateChange={(d) => setAuctionDate(d?.toDate() || null)}
              error={
                pathOr('', ['auctionDate', '0'], errors) ||
                pathOr('', ['isAuctionDateValid', '0'], errors) ||
                pathOr('', ['isListingExpiryDateValid', '0'], errors)
              }
              showCalendarIcon={true}
              showArrowDownIcon={true}
              isOutsideRange={(date) => date < new Date().setHours(0, 0, 0, 0)}
            />
          </Col>
        </Row>
      )}
      <Row className="textfield-row">
        <Col md={6} className="textfield-col">
          {/* {!alwaysAvailable ? ( */}
          {tooltip(
            'catchDate',
            selectedChannel === 'direct'
              ? TOOLTIP_MESSAGES.catchDate.directSale
              : isAquafuture
              ? TOOLTIP_MESSAGES.catchDate.aquafuture
              : TOOLTIP_MESSAGES.catchDate.preAuction
          )}
          <DatePickerDropdown
            placeholder={alwaysAvailable ? 'Always Available' : ''}
            label={label('Catch Date', 'catchDate')}
            date={!alwaysAvailable && catchDate ? moment(catchDate) : null}
            onDateChange={(d) => {
              setCatchDate(d?.toDate() || null);
              setAlwaysAvailable(false);
            }}
            error={
              pathOr('', ['catchDate', '0'], errors) ||
              pathOr('', ['isDateRangeValid', '0'], errors)
            }
            showCalendarIcon={true}
            showArrowDownIcon={true}
            isOutsideRange={(date) =>
              selectedChannel === 'direct'
                ? date.toDate().setHours(0, 0, 0, 0) >= new Date()
                : date < (isAquafuture && new Date().setHours(0, 0, 0, 0))
            }
            topComponent={
              !isAquafuture &&
              !isAuctionSale && (
                <DatePickerTop>
                  <Checkbox
                    onClick={toggleAlwaysAvailable}
                    checked={alwaysAvailable}
                    label="Always Available"
                    disabled={editableListing?.isAlreadyCreated}
                    error={pathOr('', ['alwaysAvailable', '0'], errors)}
                    typographyProps={{ color: 'shade9', variant: 'label' }}
                  />
                </DatePickerTop>
              )
            }
          />
          {/* ) : (
            <Select
              value={catchRecurrence}
              onChange={(option) => {
                setCatchRecurrence(option.value);
              }}
              options={catchRecurrenceOptions}
              label="Catch Date"
              error={pathOr('', ['catchRecurrence', '0'], errors)}
            />
          )}*/}
        </Col>
      </Row>
      <Row className="textfield-row">
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
      </Row>
      <Row className="textfield-row">
        <Col md={6} className="textfield-col">
          <Select
            value={shippingAddress}
            onChange={(option) => {
              setShippingAddress(option.value);
            }}
            options={shippingAddressOptions}
            label="Shipping From"
            error={pathOr('', ['shippingAddress', '0'], errors)}
          />
        </Col>
      </Row>
      {shippingAddress && (
        <Row className="textfield-row">
          <Col md={6} className="textfield-col">
            <Checkbox
              checked={restrictToState}
              label={`Restrict purchases to ${selectedShippingState} buyers only`}
              onClick={() => setRestrictToState(!restrictToState)}
            />
          </Col>
        </Row>
      )}
      {!alwaysAvailable && !isAuctionSale && (
        <>
          <Row className="textfield-row">
            <Col md={6} className="textfield-col">
              {tooltip(
                'listingValidUntilDate',
                selectedChannel === 'direct'
                  ? TOOLTIP_MESSAGES.listValidUntilDate.directSale
                  : TOOLTIP_MESSAGES.listValidUntilDate.aquafuture
              )}
              <DatePickerDropdown
                className="date-picker"
                placeholder=""
                label={label(
                  'Listing valid until (Date)',
                  'listingValidUntilDate'
                )}
                date={listingEndDate ? moment(listingEndDate) : null}
                onDateChange={(d) => setListingEndDate(d ? d?.toDate() : null)}
                error={
                  pathOr('', ['listingEndDate', '0'], errors) ||
                  pathOr('', ['isDateRangeValid', '0'], errors) ||
                  pathOr('', ['isListingExpiryDateValid', '0'], errors)
                }
                isOutsideRange={(date) => isValidUntilOutsideRange(date)}
                showCalendarIcon={true}
                showArrowDownIcon={true}
              />
            </Col>
          </Row>
          <Row className="textfield-row">
            <Col md={6} className="textfield-col">
              {tooltip(
                'listingValidUntilTime',
                selectedChannel === 'direct'
                  ? TOOLTIP_MESSAGES.listValidUntilTime.directSale
                  : TOOLTIP_MESSAGES.listValidUntilTime.aquafuture
              )}
              <Select
                value={listingEndTimeString}
                onChange={(option) => {
                  setListingEndTimeString(option.value);
                }}
                options={timeOptions}
                label={label('LISTING VALID UNTIL', 'listingValidUntilTime')}
                error={
                  pathOr('', ['listingEndTime', '0'], errors) ||
                  pathOr('', ['isDateRangeValid', '0'], errors)
                }
              />
            </Col>
          </Row>
          {!isAquafuture && (
            <Row className="textfield-row">
              <Col md={6} className="textfield-col">
                {templateDeliveryDate === 'Custom date' ? (
                  <DateRangePicker
                    label="WHEN WILL YOU SHIP THE PRODUCT?"
                    border="none"
                    startDate={customDeliveryDate.from}
                    endDate={customDeliveryDate.to}
                    onDatesChange={(val) => {
                      setCustomDeliveryDate({
                        from: val.startDate,
                        to: val.endDate,
                      });
                    }}
                    format="MMM D"
                    onClear={() => {
                      setTemplateDeliveryDate(null);
                      setCustomDeliveryDate({ from: null, to: null });
                    }}
                    isOpen
                  />
                ) : (
                  <Select
                    value={templateDeliveryDate ?? undefined}
                    onChange={(option) => setTemplateDeliveryDate(option.value)}
                    options={estimatedShippingOptions}
                    label="WHEN WILL YOU SHIP THE PRODUCT?"
                    error={pathOr('', ['templateDeliveryDate', '0'], errors)}
                  />
                )}
              </Col>
            </Row>
          )}
        </>
      )}

      <Row className="textfield-row">
        <Col md={12} className="textfield-col text-area">
          <TextArea
            label="Additional notes (Optional)"
            placeholder="Enter any additional note here…"
            value={description}
            onChangeText={setDescription}
            autoHeight
            style={{ height: '100px' }}
          />
        </Col>
      </Row>

      <Row className="textfield-row">
        <SfmContainer
          md={12}
          className={`textfield-col ${
            mandatorySFM.gotSkipped ? 'errors' : null
          }`}
        >
          <Interactions
            padding="16px 20px"
            type="none"
            leftComponent={
              <>
                <Checkbox
                  onClick={() => {
                    setMandatorySFM((prevState) => ({
                      ...prevState,
                      isChecked: !prevState.isChecked,
                    }));
                  }}
                  checked={mandatorySFM.isChecked}
                />
                <Label2 variant="label">
                  This product coincides with the{' '}
                  <a
                    href="https://shoretrade-prod-assets.s3.ap-southeast-2.amazonaws.com/Seafood_Handling_Guidelines.pdf"
                    style={{
                      textDecoration: 'underline',
                      cursor: 'pointer',
                      color: theme.grey.noshade,
                    }}
                    // eslint-disable-next-line react/jsx-no-target-blank
                    target="_blank"
                  >
                    SFM Quality Assurance
                  </a>{' '}
                  documents.
                </Label2>
              </>
            }
          />
          {mandatorySFM.gotSkipped && (
            <Typography variant="caption" color="error" className="sfm-error">
              Please confirm to proceed
            </Typography>
          )}
        </SfmContainer>
      </Row>

      {!isMobile && (
        <Row justify="start" nogutter>
          <Button
            variant="outline"
            className="back-btn"
            text="Back"
            disabled={disableBackBtn}
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
          disabled={disableBackBtn}
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
