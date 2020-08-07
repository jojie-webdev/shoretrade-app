import React, { useState } from 'react';

import SellingView from './Selling.view';

const Selling = (): JSX.Element => {
  const [items, setItems] = useState<any[]>([]);

  const generatedProps = {
    // generated props here
    items: items,
    toggleEmptyState: () =>
      setItems(items.length === 0 ? Array.from('x'.repeat(10)) : []), // FOR TESTING
  };
  return <SellingView {...generatedProps} />;
};

export default Selling;
