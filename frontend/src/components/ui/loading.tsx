import React from "react";

export type LoadingType = "spinner" | "dots" | "skeleton";

export interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: LoadingType;
  size?: number;
  width?: number | string;
  height?: number | string;
  className?: string;
}

const Spinner: React.FC<Pick<LoadingProps, "size">> = ({ size = 24 }) => (
  <div
    className="animate-spin rounded-full border-2 border-muted-foreground border-t-transparent"
    style={{ width: size, height: size }}
  />
);

const Dots: React.FC<Pick<LoadingProps, "size">> = ({ size = 24 }) => {
  const dotSize = Math.max(4, Math.round(size / 4));
  return (
    <div className="flex items-center gap-1">
      <span
        className="animate-bounce rounded-full bg-muted-foreground"
        style={{ width: dotSize, height: dotSize }}
      />
      <span
        className="animate-bounce rounded-full bg-muted-foreground delay-150"
        style={{ width: dotSize, height: dotSize }}
      />
      <span
        className="animate-bounce rounded-full bg-muted-foreground delay-300"
        style={{ width: dotSize, height: dotSize }}
      />
    </div>
  );
};

const Skeleton: React.FC<Pick<LoadingProps, "size" | "width" | "height">> = ({
  size = 24,
  width,
  height,
}) => (
  <div
    className="animate-pulse rounded-md bg-gray-200"
    style={{
      width: width ?? size * 4,
      height: height ?? size / 3,
    }}
  />
);

export const Loading = React.forwardRef<HTMLDivElement, LoadingProps>(
  (
    { type = "spinner", size = 24, width, height, className, ...props },
    ref
  ) => {
    const renderLoading = () => {
      switch (type) {
        case "spinner":
          return <Spinner size={size} />;
        case "dots":
          return <Dots size={size} />;
        case "skeleton":
          return <Skeleton size={size} width={width} height={height} />;
        default:
          return null;
      }
    };

    return (
      <div
        ref={ref}
        className={className}
        {...props}
      >
        {renderLoading()}
      </div>
    );
  }
);

Loading.displayName = "Loading";
