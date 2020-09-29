import { Dispatch, SetStateAction } from 'react';

export interface BuyerAssistantFormProps {
  type: 'EDIT' | 'CREATE';
  formikInitial: FormikForm;
  callingCode: string;

  // Specific to Edit Linked Account
  onClickDelete?: () => void;

  // Specific to Create Linked Account
  success?: boolean;
  error?: boolean;
  pending?: boolean;
  setCallingCode?: Dispatch<SetStateAction<string>>;
}

export type AssistantForm = {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
};

export type FormikForm = {
  initialValues: AssistantForm;
  validate?: (attributes: Record<string, any>) => Record<string, string>;
  onSubmit: (form: AssistantForm) => void;
};
