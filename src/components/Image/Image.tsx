import { LazyLoadImage, type LazyLoadImageProps } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export const Image: React.FC<LazyLoadImageProps & { className: string }> = ({
  alt,
  height,
  src,
  width,
  className,
  ...props
}) => (
  <div className={className}>
    <LazyLoadImage effect="blur" alt={alt} height={height} src={src} width={width} {...props} />
  </div>
);
