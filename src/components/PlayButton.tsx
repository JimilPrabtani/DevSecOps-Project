import { useNavigate } from "react-router-dom";
import { MAIN_PATH } from "src/constant";

function PlayArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="28"
      height="28"
      fill="currentColor"
    >
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

export default function PlayButton({ sx, size, ...others }: { [key: string]: any }) {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      {...others}
      onClick={() => navigate(`/${MAIN_PATH.watch}`)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        padding: "8px 16px",
        border: 0,
        borderRadius: 4,
        background: "#fff",
        color: "#000",
        fontWeight: 700,
        whiteSpace: "nowrap",
        cursor: "pointer",
        ...(sx ?? {}),
      }}
    >
      <PlayArrowIcon />
      Play
    </button>
  );
}
