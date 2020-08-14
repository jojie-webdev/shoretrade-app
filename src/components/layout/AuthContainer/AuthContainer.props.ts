export interface AuthContainerProps {
  children: React.ReactNode;
  onCloseAction?: () => void;
  title?: string;
  onBackAction?: () => void;
  currentStep?: number;
  totalSteps?: number;
}
