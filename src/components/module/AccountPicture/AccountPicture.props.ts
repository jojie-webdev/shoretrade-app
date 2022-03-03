export interface AccountPictureProps {
  profilePicture: string;
  updatingImage: boolean;
  updateImage: (image: File) => void;
  size?: number;
}
