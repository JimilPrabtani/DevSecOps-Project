import PlayerControlButton from "./PlayerControlButton";

function VolumeUpSvg() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M5 10V14H8L12 18V6L8 10H5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M15 9C16.1 10.1 16.1 13.9 15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function VolumeOffSvg() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M5 10V14H8L12 18V6L8 10H5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M16 9L20 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 9L16 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function VolumeControllers({
  value,
  handleVolume,
  handleVolumeToggle,
  muted,
}: {
  value: number;
  handleVolume: (event: Event, value: number | number[]) => void;
  handleVolumeToggle: React.MouseEventHandler<HTMLButtonElement>;
  muted: boolean;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <PlayerControlButton onClick={handleVolumeToggle}>
        {!muted ? <VolumeUpSvg /> : <VolumeOffSvg />}
      </PlayerControlButton>
      <input
        type="range"
        min={0}
        max={100}
        value={Math.round(value * 100)}
        onChange={(e) => handleVolume(e as unknown as Event, Number(e.target.value))}
        style={{
          width: 90,
          accentColor: "red",
          cursor: "pointer",
        }}
        aria-label="volume"
      />
    </div>
  );
}
