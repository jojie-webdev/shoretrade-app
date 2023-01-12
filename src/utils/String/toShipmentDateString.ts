import moment from 'moment';

export const CLICK_AND_COLLECT_SERVICE = 'CLICK & COLLECT';

export const shipmentModeToString = (
  shipmentMode: string,
  serviceName: string
) => {
  if (serviceName.includes('COLLECT') || serviceName.includes('PICKUP')) {
    return '';
  }
  if (shipmentMode.indexOf('ROAD') !== -1) {
    return 'Road Freight';
  }
  if (shipmentMode.indexOf('AIR') !== -1 || shipmentMode.indexOf('VA') !== -1) {
    return 'Air Freight';
  }
  return 'Road Freight';
};

export const serviceNameToString = (
  serviceName: string,
  locationName?: string,
  sellerCompany?: string
) => {
  if (serviceName === CLICK_AND_COLLECT_SERVICE) return 'Pickup at';

  // serviceName value from shorefreight returns complete sentence on this option
  if (!locationName) {
    return `Pickup from ${sellerCompany || ''}`;
  }

  return serviceName.indexOf('DELIVERY BY SUPPLIER') !== -1 ||
    serviceName.indexOf('TO DOOR') !== -1 ||
    serviceName.indexOf('METRO TO METRO') !== -1 ||
    serviceName.indexOf('MANAGED') !== -1
    ? 'Delivery to Door'
    : `Pickup at ${locationName || 'airport'}`;
};

export const subAddressToString = (
  serviceName: string,
  address: string | undefined
) => {
  return (address || '').replace(`${serviceName}, `, '');
};

export const estimatedDeliveryToString = (
  minTransit: string,
  maxTransit: string,
  estimatedDate?: string,
) => {
  if (estimatedDate) {
    const dateSplit = estimatedDate.split('-').map((d) => d.trim());
    const dateFrom = moment(dateSplit[0]).format('D MMM');
    const dateTo = moment(dateSplit[1]).format('D MMM');
    return `Est. delivery: ${dateFrom}${dateTo ? ` - ${dateTo}` : ''}`;
  }
  const minDeliveryDate = moment(minTransit, 'YYYYMMDD').format('D MMM');
  const maxDeliveryDate = moment(maxTransit, 'YYYYMMDD').format('D MMM');

  return `Est. delivery: ${
    minDeliveryDate === maxDeliveryDate
      ? minDeliveryDate
      : `${minDeliveryDate} - ${maxDeliveryDate}`.replace(
          'Invalid date',
          'Unknown'
        )
  }`;
};

export const shipmentModeToDeliveryMethod = (
  shipmentMode: string,
  serviceName = ''
) => {
  const serviceNameMatcher = serviceName.toUpperCase();
  if (
    serviceNameMatcher === 'PICKUP FROM SUPPLIER' ||
    serviceNameMatcher === 'DELIVERY BY SUPPLIER'
  ) {
    return 'seller';
  }
  if (shipmentMode.indexOf('ROAD') !== -1) {
    return 'road';
  }
  if (shipmentMode.indexOf('AIR') !== -1 || shipmentMode.indexOf('VA') !== -1) {
    return 'air';
  }
  return 'road';
};

export const serviceNameToDeliveryOption = (serviceName: string) => {
  switch (serviceName.toUpperCase()) {
    case 'DELIVERY BY SUPPLIER':
    case 'DELIVERY TO DOOR':
      return 'door';
    case 'PICKUP FROM SUPPLIER':
    case CLICK_AND_COLLECT_SERVICE:
      return 'collect';
    case 'PICKUP AT':
    default:
      return 'depot';
  }
};

export const deliveryOptionToServiceNameString = (
  deliveryMethod: string,
  deliveryOption: string,
  locationName: string,
  sellerCompanyName: string
) => {
  switch (deliveryOption.toUpperCase()) {
    case 'DOOR':
      return 'Delivery to Door';
    case 'COLLECT':
      if (deliveryMethod === 'ROAD') return `Pickup at ${locationName}`;
      return `Pickup from ${sellerCompanyName}`;
    case 'DEPOT':
      return `Pickup at ${locationName}`;
    default:
      return '';
  }
};
