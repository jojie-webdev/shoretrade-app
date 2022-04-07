export const getButtonTextByStatus = (status: string) => {
  switch (status) {
    case 'UNSUCCESSFUL':
    case 'LATE':
    case 'ACTIVE':
      return 'Cancel Subscription';
    case 'UNSUBSCRIBED':
    case 'OVERDUE':
    case 'CANCELLED':
      return 'Renew Account';
    default:
      return null;
  }
};
