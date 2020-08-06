import React from 'react';

import SellingView from './Selling.view';

const Selling = (): JSX.Element => {
  const generatedProps = {
    // generated props here
    items: Array.from('x'.repeat(10)),
  };
  return <SellingView {...generatedProps} />;
};

export default Selling;
