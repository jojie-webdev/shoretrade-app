export interface AddImageProps {
  image: File | null;
  onSelectImage: (image: File | null) => void;
  onRemoveImage: () => void;
}
