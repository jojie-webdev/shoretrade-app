import React, { useState } from 'react';

import AddProductView from './AddProduct.view';

const AddProduct = (): JSX.Element => {
  const [currentPage, setCurrentpage] = useState<number>(1);

  const generatedProps = {
    currentPage,
  };
  return <AddProductView {...generatedProps} />;
};

export default AddProduct;
