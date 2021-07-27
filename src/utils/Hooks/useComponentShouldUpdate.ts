import { useEffect, useState } from 'react';

// this behaves line componentShouldUpdate method in class component
// callback is not invoke on component mount. only when dependencies changes.
export const useComponentShouldUpdate = (
  callback: () => any | (() => void),
  dependencies: any[] = []
) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (!isMounted) setIsMounted(true);
  }, [isMounted]);

  useEffect(() => {
    if (isMounted) {
      let cleanUpFunction = callback?.();
      if (
        cleanUpFunction &&
        {}.toString.call(cleanUpFunction) !== '[object Function]'
      )
        cleanUpFunction = () => {}; // eslint-disable-line
      return cleanUpFunction;
    }
    return () => {}; // eslint-disable-line
  }, [...dependencies]);
};
