export interface TouchableProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onPress: () => void;
  width?: number;
  height?: number;
  circle?: boolean;
  dark?: boolean;
}
