export interface AuthContainerProps {
  children: React.ReactNode;
  onCloseAction?: () => void;
  title?: string;
  onBackAction?: () => void;
  currentStep?: number;
  totalSteps?: number;
  containerBackground?: string;
  minHeight?: string;
  noLogo?: boolean;
  logoContainerMarginBottomHeight?: number;
}
