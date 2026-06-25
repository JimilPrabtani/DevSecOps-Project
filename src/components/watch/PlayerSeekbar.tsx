import { formatTime } from "src/utils/common";

function PlayerSeekbar({
  playedSeconds,
  duration,
  seekTo,
}: {
  playedSeconds: number;
  duration: number;
  seekTo: (value: number) => void;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, color: "white" }}>
      <input
        type="range"
        min={0}
        max={duration || 0}
        value={playedSeconds}
        onChange={(e) => seekTo(Number(e.target.value))}
        style={{
          flexGrow: 1,
          accentColor: "red",
          cursor: "pointer",
        }}
        aria-label="seek"
      />
      <span style={{ fontVariantNumeric: "tabular-nums" }}>
        {formatTime(playedSeconds)} / {formatTime(duration)}
      </span>
    </div>
  );
}

export default PlayerSeekbar;
