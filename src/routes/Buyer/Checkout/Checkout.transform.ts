import moment from 'moment';

export const shipmentModeToString = (shipmentMode: string) => {
  if (shipmentMode.indexOf('ROAD') !== -1) {
    return 'Road freight';
  }
  if (shipmentMode.indexOf('AIR') !== -1 || shipmentMode.indexOf('VA') !== -1) {
    return 'Air freight';
  }
  return 'Road freight';
};

export const serviceNameToString = (serviceName: string) => {
  if (serviceName === 'CLICK AND COLLECT') return 'Pick Up at';

  return serviceName.indexOf('TO DOOR') !== -1 ||
    serviceName.indexOf('METRO TO METRO') !== -1 ||
    serviceName.indexOf('MANAGED') !== -1
    ? 'delivery to door'
    : 'pickup at airport';
};

export const estimatedDeliveryToString = (
  minTransit: string,
  maxTransit: string
) => {
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
  return serviceName.indexOf('TO DOOR') !== -1 ||
    serviceName.indexOf('METRO TO METRO') !== -1 ||
    serviceName.indexOf('MANAGED') !== -1
    ? 'door'
    : 'depot';
};
