import { forwardRef } from "react";

const PlayerControlButton = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, style, ...others }, ref) => (
  <button
    ref={ref}
    type="button"
    {...others}
    style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 6,
      border: 0,
      borderRadius: 4,
      background: "transparent",
      color: "white",
      cursor: "pointer",
      transition: "transform .3s",
      ...style,
    }}
    onMouseEnter={(e) => {
      (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.3)";
    }}
    onMouseLeave={(e) => {
      (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
    }}
  >
    {children}
  </button>
));

export default PlayerControlButton;
