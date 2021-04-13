export interface AuthContainerProps {
  children: React.ReactNode;
  title?: string;
  onCloseAction?: () => void;
  onBackAction?: () => void;
  onSkipAction?: () => void;
  currentStep?: number;
  totalSteps?: number;
  containerBackground?: string;
  minHeight?: string;
  noLogo?: boolean;
  logoContainerMarginBottomHeight?: number;
  isRegister?: boolean;
  mobileFooter?: React.ReactNode;
}
