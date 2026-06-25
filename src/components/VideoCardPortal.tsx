import { useNavigate } from "react-router-dom";
import { Movie } from "src/types/Movie";
import { usePortal } from "src/providers/PortalProvider";
import { useDetailModal } from "src/providers/DetailModalProvider";
import { formatMinuteToReadable, getRandomNumber } from "src/utils/common";
import { useGetConfigurationQuery } from "src/store/slices/configuration";
import { MEDIA_TYPE } from "src/types/Common";
import { useGetGenresQuery } from "src/store/slices/genre";
import { MAIN_PATH } from "src/constant";

function IconSvg({ children }: { children: React.ReactNode }) {
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
      {children}
    </svg>
  );
}

function VolumeSvg() {
  return (
    <IconSvg>
      <path d="M5 10V14H8L12 18V6L8 10H5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M15 9C16.1 10.1 16.1 13.9 15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </IconSvg>
  );
}

function PlaySvg() {
  return (
    <IconSvg>
      <path d="M9 6L18 12L9 18V6Z" fill="currentColor" />
    </IconSvg>
  );
}

function PlusSvg() {
  return (
    <IconSvg>
      <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </IconSvg>
  );
}

function ThumbsUpSvg() {
  return (
    <IconSvg>
      <path
        d="M9.5 10.5V19H6.5C5.67 19 5 18.33 5 17.5V10.5C5 9.67 5.67 9 6.5 9H9.5V10.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 10.5L11.5 5.5C11.9 4.5 13.1 4.1 14 4.7C14.6 5.1 14.9 5.8 14.8 6.5L14.2 9H18.5C19.33 9 20 9.67 20 10.5V12.2C20 12.47 19.95 12.74 19.85 12.99L18.25 17.24C18.02 17.83 17.45 18.22 16.82 18.22H9.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </IconSvg>
  );
}

function ExpandMoreSvg() {
  return (
    <IconSvg>
      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </IconSvg>
  );
}

interface VideoCardModalProps {
  video: Movie;
  anchorElement: HTMLElement;
}

export default function VideoCardModal({
  video,
  anchorElement,
}: VideoCardModalProps) {
  const navigate = useNavigate();

  const { data: configuration } = useGetConfigurationQuery(undefined);
  const { data: genres } = useGetGenresQuery(MEDIA_TYPE.Movie);
  const setPortal = usePortal();
  const rect = anchorElement.getBoundingClientRect();
  const { setDetailType } = useDetailModal();

  return (
    <div
      onPointerLeave={() => {
        setPortal(null, null);
      }}
      style={{
        width: rect.width * 1.5,
        height: "100%",
        background: "#181818",
        color: "white",
      }}
    >
      <div
        style={{
          width: "100%",
          position: "relative",
          paddingTop: "calc(9 / 16 * 100%)",
        }}
      >
        <img
          src={`${configuration?.images.base_url}w780${video.backdrop_path}`}
          style={{
            top: 0,
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            backgroundPosition: "50%",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            left: 0,
            right: 0,
            bottom: 0,
            paddingLeft: "16px",
            paddingRight: "16px",
            paddingBottom: "4px",
            position: "absolute",
          }}
        >
          <div
            style={{
              width: "80%",
              fontWeight: 700,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {video.title}
          </div>
          <div style={{ flexGrow: 1 }} />
          <button type="button" style={iconButtonStyle}>
            <VolumeSvg />
          </button>
        </div>
      </div>
      <div style={{ padding: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", flexDirection: "row", gap: 8, alignItems: "center" }}>
            <button type="button" onClick={() => navigate(`/${MAIN_PATH.watch}`)} style={iconButtonStyle}>
              <PlaySvg />
            </button>
            <button type="button" style={iconButtonStyle}>
              <PlusSvg />
            </button>
            <button type="button" style={iconButtonStyle}>
              <ThumbsUpSvg />
            </button>
            <div style={{ flexGrow: 1 }} />
            <button
              type="button"
              onClick={() => {
                setDetailType({ mediaType: MEDIA_TYPE.Movie, id: video.id });
              }}
              style={iconButtonStyle}
            >
              <ExpandMoreSvg />
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "row", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            <span style={{ color: "#46d369" }}>{`${getRandomNumber(100)}% Match`}</span>
            <span style={chipStyle}>{`${getRandomNumber(20)}+`}</span>
            <span>{`${formatMinuteToReadable(getRandomNumber(180))}`}</span>
            <span style={chipStyle}>HD</span>
          </div>
          {genres && (
            <div style={{ color: "rgba(255,255,255,0.72)", fontSize: 14 }}>
              {genres
                .filter((genre) => video.genre_ids.includes(genre.id))
                .map((genre) => genre.name)
                .join(" • ")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const iconButtonStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 40,
  height: 40,
  border: "2px solid #454f5b",
  borderRadius: 4,
  background: "transparent",
  color: "white",
  cursor: "pointer",
  padding: 0,
};

const chipStyle: React.CSSProperties = {
  border: "1px solid rgba(255,255,255,0.32)",
  borderRadius: 4,
  padding: "2px 8px",
  fontSize: 12,
  lineHeight: 1.4,
};
