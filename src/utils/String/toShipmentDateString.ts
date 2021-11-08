import moment from 'moment';

export const shipmentModeToString = (
  shipmentMode: string,
  serviceName: string
) => {
  if (serviceName.includes('COLLECT') || serviceName.includes('PICKUP')) {
    return '';
  }
  if (shipmentMode.indexOf('ROAD') !== -1) {
    return 'Road freight';
  }
  if (shipmentMode.indexOf('AIR') !== -1 || shipmentMode.indexOf('VA') !== -1) {
    return 'Air freight';
  }
  return 'Road freight';
};

export const serviceNameToString = (
  serviceName: string,
  locationName?: string
) => {
  if (serviceName === 'CLICK AND COLLECT') return 'Pick Up at';

  // serviceName value from shorefreight returns complete sentence on this option
  if (!locationName) {
    return 'Pickup from Supplier';
  }

  return serviceName.indexOf('TO DOOR') !== -1 ||
    serviceName.indexOf('METRO TO METRO') !== -1 ||
    serviceName.indexOf('MANAGED') !== -1
    ? 'delivery to door'
    : `Pickup at ${locationName || 'airport'}`;
};

export const estimatedDeliveryToString = (
  minTransit: string,
  maxTransit: string,
  estimatedDate?: string
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

export const shipmentModeToDeliveryMethod = (shipmentMode: string) => {
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
    case 'DELIVERY TO DOOR':
      return 'door';
    case 'CLICK & COLLECT':
      return 'collect';
    case 'PICKUP AT':
    default:
      return 'depot';
  }
};

export const deliveryOptionToServiceNameString = (
  deliveryOption: string,
  locationName: string
) => {
  switch (deliveryOption.toUpperCase()) {
    case 'DOOR':
      return 'delivery to door';
    case 'COLLECT':
    case 'DEPOT':
      return `Pickup at ${locationName}`;
    default:
      return '';
  }
};
