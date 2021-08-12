export interface TouchableProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onPress?: () => void;
  width?: number | string;
  height?: number | string;
  circle?: boolean;
  dark?: boolean;
  className?: string;
  justifyContent?: string;
}
