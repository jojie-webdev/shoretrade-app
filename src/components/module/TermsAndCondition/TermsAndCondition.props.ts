export interface TermsAndConditionProps {
  appType: string;
  textWeb1?: string;
  textWeb2: string;
  textMobile1: string;
  textMobile2?: string;
  textMobile3: string;
  cardText1: string;
  cardText2: string;
  cardText3: string;
  isAcceptClicked: boolean;
  setIsAcceptClicked: React.Dispatch<React.SetStateAction<boolean>>;
  isNegotiations?: boolean;
}
