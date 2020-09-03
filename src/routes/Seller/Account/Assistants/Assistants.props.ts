import { GetLinkedAccountsResponseItem } from 'types/store/GetLinkedAccountsState';

export interface AssistantsGeneratedProps {
  pending: boolean;
  accounts: GetLinkedAccountsResponseItem[];
  goToCreateAssistant: () => void;
  onClickAssistant: (assistantId: string) => void;
}
