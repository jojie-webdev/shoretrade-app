import React from 'react';

import BuyerAssistantForm from 'components/module/BuyerAssistantForm';
import Loading from 'components/module/Loading';

import { EditAssistantGeneratedProps } from './EditAssistant.props';
const EditAssistantView = (props: EditAssistantGeneratedProps) => {
  const { loading, ...buyerFormProps } = props;
  if (loading) {
    return <Loading />;
  }

  return <BuyerAssistantForm {...buyerFormProps} />;
};

export default EditAssistantView;
