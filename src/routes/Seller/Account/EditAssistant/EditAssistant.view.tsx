import React from 'react';

import Loading from 'components/module/Loading';
import SellerAssistantForm from 'components/module/SellerAssistantForm';

import { EditAssistantGeneratedProps } from './EditAssistant.props';

const EditAssistantView = (props: EditAssistantGeneratedProps) => {
  const { loading, ...sellerFormProps } = props;

  if (loading) {
    return <Loading />;
  }

  return <SellerAssistantForm {...sellerFormProps} />;
};

export default EditAssistantView;
