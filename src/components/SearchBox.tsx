import { useRef, useState } from "react";

function SearchIcon() {
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
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

export default function SearchBox() {
  const [isFocused, setIsFocused] = useState(false);
  const searchInputRef = useRef<HTMLDivElement>(null);

  const handleClickSearchIcon = () => {
    if (!isFocused) {
      const input = searchInputRef.current?.querySelector("input");
      if (input) {
        input.focus();
      }
    }
  };

  return (
    <div
      ref={searchInputRef}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        width: "100%",
        border: isFocused ? "1px solid white" : "1px solid transparent",
        backgroundColor: isFocused ? "black" : "transparent",
        borderRadius: 4,
        overflow: "hidden",
      }}
    >
      <button
        type="button"
        onClick={handleClickSearchIcon}
        aria-label="focus search"
        style={{
          cursor: "pointer",
          border: 0,
          background: "transparent",
          color: "inherit",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 8px",
          height: "100%",
        }}
      >
        <SearchIcon />
      </button>
      <input
        type="search"
        placeholder="Titles, people, genres"
        aria-label="search"
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
        style={{
          flex: 1,
          minWidth: 0,
          border: 0,
          outline: 0,
          background: "transparent",
          color: "inherit",
          font: "inherit",
          width: isFocused ? 240 : 0,
          padding: isFocused ? "8px 12px 8px 0" : 0,
          transition: "width 200ms ease, padding 200ms ease",
        }}
      />
    </div>
  );
}
