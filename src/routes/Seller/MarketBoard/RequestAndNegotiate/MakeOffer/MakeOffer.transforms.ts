export const getGroupName = (name: string): string => {
  const lName = name.toUpperCase();

  switch (lName) {
    case 'FRESH':
    case 'FROZEN':
    case 'LIVE':
    case 'OPEN':
      return 'Conservation';
    case 'WILD':
    case 'FARMED':
      return 'CATCH TYPE';
    case 'COOKED':
    case 'RAW':
    case 'BONE IN':
    case 'BONE OUT':
      return 'State';
    default:
      return 'Condition';
  }
};
