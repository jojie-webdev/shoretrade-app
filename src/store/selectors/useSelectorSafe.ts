import { useSelector } from 'react-redux';
import { Store } from 'types/store/Store';
import { Optional } from 'types/util/Optional';
import { fallback } from 'utils/Data';

function useSelectorSafe<Value>(
  fn: (optimisticObj: Required<Store>) => Optional<Value>,
  defaultVal: Value
): Value;

function useSelectorSafe<Value>(
  fn: (optimisticObj: Required<Store>) => Optional<Value>,
  defaultVal?: undefined
): Value | undefined;

function useSelectorSafe<Value>(
  fn: (optimisticObj: Required<Store>) => Optional<Value>,
  defaultVal?: Value
) {
  return useSelector(
    defaultVal !== undefined
      ? fallback<Store, Value>(fn, defaultVal)
      : fallback<Store, Value | undefined>(fn, undefined)
  );
}

export default useSelectorSafe;
