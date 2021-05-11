export const isPaymentMethodAvailable = (
  modes: { label: string }[] | undefined,
  selectedMode: string
): boolean => {
  return (modes || []).findIndex(({ label }) => label === selectedMode) >= 0;
};
