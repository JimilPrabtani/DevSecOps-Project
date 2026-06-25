import { forwardRef } from "react";

const NetflixIconButton = forwardRef<
  HTMLButtonElement,
  { [key: string]: any }
>(({ children, sx, size, ...others }, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      {...others}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        border: "2px solid #454f5b",
        borderRadius: 4,
        background: "transparent",
        color: "white",
        cursor: "pointer",
        ...(sx ?? {}),
      }}
    >
      {children}
    </button>
  );
});

export default NetflixIconButton;
