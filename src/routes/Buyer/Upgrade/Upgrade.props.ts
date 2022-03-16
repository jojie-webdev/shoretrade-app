export interface UpgradeGeneratedProps {
  annualPrice: string;
  monthlyPrice: string;
  upgrading: boolean;
  upgradeSubscription: (interval: 'MONTHLY' | 'ANNUAL') => void;
}
