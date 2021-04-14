import { ReactNode } from 'react';

export interface MobileHeaderPublicProps {
  children: ReactNode;
  showBack?: boolean;
  title?: string;
  onBackOverride?: () => void;
}

export interface MobileHeaderGeneratedProps extends MobileHeaderPublicProps {
  onBack: () => void;
}
