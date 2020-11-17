export const createUpdateReducer = <T extends Record<any, any>>() => (
  state: T,
  newState: Partial<T>
): T => ({
  ...state,
  ...newState,
});

export default createUpdateReducer;
