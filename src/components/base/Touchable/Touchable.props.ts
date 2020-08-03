export interface TouchableProps {
  children: React.ReactNode;
  onPress: () => void;
  width?: number;
  height?: number;
  circle?: boolean;
  dark?: boolean;
}
