import { useEffect } from 'react';

import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export function sellerScreenScrollToTop(): void {
  const elmnt = document.getElementById('screen');
  if (elmnt) {
    elmnt.scroll(0, 0);
  }
}
