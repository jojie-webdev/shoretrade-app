import { BuyerAssistantFormProps } from 'components/module/BuyerAssistantForm/BuyerAssistantForm.props';

export interface EditAssistantGeneratedProps extends BuyerAssistantFormProps {
  loading: boolean;
}
export type QueryParams = { companyId: string; assistantId: string };
