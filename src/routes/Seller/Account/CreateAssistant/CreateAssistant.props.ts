import { Dispatch, SetStateAction } from 'react';

export interface CreateAssistantGeneratedProps {
  role: Role;
  setRole: Dispatch<SetStateAction<Role>>;
  callingCode: string;
  setCallingCode: Dispatch<SetStateAction<string>>;
  onClickCreate: (form: AssistantForm) => void;
  success: boolean;
  error: boolean;
  pending: boolean;
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
