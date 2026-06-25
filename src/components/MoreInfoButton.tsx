
function InfoOutlinedIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="28"
      height="28"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 10v6" />
      <path d="M12 7h.01" />
    </svg>
  );
}

export default function MoreInfoButton({ sx, size, ...others }: { [key: string]: any }) {
  return (
    <button
      type="button"
      {...others}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        padding: "8px 16px",
        border: 0,
        borderRadius: 4,
        background: "#6d6d6eb3",
        color: "#fff",
        fontWeight: 700,
        whiteSpace: "nowrap",
        cursor: "pointer",
        ...(sx ?? {}),
      }}
    >
      <InfoOutlinedIcon />
      More Info
    </button>
  );
}
