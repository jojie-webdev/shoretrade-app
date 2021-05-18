import { BUYER_ROUTES } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import { useMediaQuery } from 'react-responsive';
import { useLocation } from 'react-router-dom';

const useHomeOld = () => {
  const { pathname } = useLocation();
  const isOld = useMediaQuery({ query: BREAKPOINTS['homeDesktop'] });

  return isOld && pathname.includes(BUYER_ROUTES.HOME);
};

export default useHomeOld;
