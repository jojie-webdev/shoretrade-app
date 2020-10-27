import { GetLinkedAccountsResponseItem } from 'types/store/GetLinkedAccountsState';

export interface AssistantsGeneratedProps {
  pending: boolean;
  accounts: GetLinkedAccountsResponseItem[];
  addAssistant: () => void;
  editAssistant: (assistantId: string) => void;
  currentCompanyName: string;
  notifMsg: string;
}
