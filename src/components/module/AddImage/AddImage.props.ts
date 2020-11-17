export interface AddImageProps {
  image: File | string | null;
  onSelectImage: (image: File | null) => void;
  onRemoveImage: () => void;
}
