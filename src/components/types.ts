/* eslint-disable no-unused-vars */
export interface Item {
  image: string;
  name: string;
}

export interface CircleItemProps {
  item: Item;
  isSelected: boolean;
  onClick: () => void;
}

export interface SelectedImageProps {
  src: string;
  onClose: () => void;
}

export interface CircleProps {
  images: string[];
  angle: number;
  rotate: (direction: number) => void;
  onSelectImage: (src: string) => void;
  onClose: () => void;
}

export interface OuterImageProps
{
  src: string;
  onClick: () => void;
}