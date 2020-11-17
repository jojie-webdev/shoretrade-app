import { Dispatch, SetStateAction } from 'react';

export interface SellerAssistantFormProps {
  type: 'EDIT' | 'CREATE';
  formikInitial: FormikForm;
  callingCode: string;

  // Specific to Edit Linked Account
  onClickDelete?: () => void;

  // Specific to Create Linked Account
  success?: boolean;
  error?: string;
  pending?: boolean;
  role?: Role;
  setRole?: Dispatch<SetStateAction<Role>>;
  setCallingCode?: Dispatch<SetStateAction<string>>;
}

export type RoleProps = {
  children: any;
  label: string;
  checked?: boolean;
  onClick: () => void;
};

export type Role = 'FISHERMAN' | 'ASSISTANT';

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
