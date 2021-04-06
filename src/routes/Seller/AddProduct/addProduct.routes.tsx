import React from 'react';

import { ADD_PRODUCT_ROUTES } from 'consts';
import { Route } from 'react-router-dom';

// Screens
import AddProduct from './AddProduct.container';
import BulkUploadPreview from './BulkUploadPreview';
import Preview from './Preview';

const ROUTES = {
  LANDING: {
    path: ADD_PRODUCT_ROUTES.LANDING,
    children: AddProduct,
  },
  PREVIEW: {
    path: ADD_PRODUCT_ROUTES.PREVIEW,
    children: Preview,
  },
  BULK_UPLOAD_PREVIEW: {
    path: ADD_PRODUCT_ROUTES.BULK_UPLOAD_PREVIEW,
    children: BulkUploadPreview,
  },
};

const ROUTES_ARRAY = Object.values(ROUTES).map((value) => value);

const SellingRoutes = (): JSX.Element => {
  return (
    <>
      {ROUTES_ARRAY.map((r) => (
        <Route key={r.path} path={`${r.path}`} exact component={r.children} />
      ))}
    </>
  );
};

export default SellingRoutes;
