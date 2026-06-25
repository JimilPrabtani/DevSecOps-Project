import { styled } from "@mui/material/styles";
import { MouseEventHandler, ReactNode } from "react";

const ArrowStyle = styled("div")(({ theme }) => ({
  top: 0,
  bottom: 0,
  position: "absolute",
  zIndex: 9,
  height: "100%",
  opacity: 0.48,
  display: "flex",
  cursor: "pointer",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.common.white,
  // background: theme.palette.grey[700],
  transition: theme.transitions.create("opacity"),
  "&:hover": {
    opacity: 0.8,
    background: theme.palette.grey[900],
  },
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

function ArrowBackIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ArrowForwardIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

interface CustomNaviationProps {
  isEnd: boolean;
  arrowWidth: number;
  children: ReactNode;
  activeSlideIndex: number;
  onNext: MouseEventHandler<HTMLDivElement>;
  onPrevious: MouseEventHandler<HTMLDivElement>;
}

export default function CustomNavigation({
  isEnd,
  onNext,
  children,
  onPrevious,
  arrowWidth,
  activeSlideIndex,
}: CustomNaviationProps) {
  return (
    <>
      {activeSlideIndex > 0 && (
        <ArrowStyle
          onClick={onPrevious}
          sx={{
            left: 0,
            width: { xs: arrowWidth / 2, sm: arrowWidth },
            borderTopRightRadius: { xs: "4px" },
            borderBottomRightRadius: { xs: "4px" },
            // backgroundImage: (theme) =>
            //   `linear-gradient(to right, ${theme.palette.background.default} 0%, rgba(0,0,0,0) 100%)`,
          }}
        >
          <ArrowBackIcon />
        </ArrowStyle>
      )}

      {children}
      {!isEnd && (
        <ArrowStyle
          onClick={onNext}
          sx={{
            right: 0,
            width: { xs: arrowWidth / 2, sm: arrowWidth },
            borderTopLeftRadius: { xs: "4px" },
            borderBottomLeftRadius: { xs: "4px" },
            // backgroundImage: (theme) =>
            //   `linear-gradient(to left, ${theme.palette.background.default} 0%, rgba(0,0,0,0) 100%)`,
          }}
        >
          <ArrowForwardIcon />
        </ArrowStyle>
      )}
    </>
  );
}
