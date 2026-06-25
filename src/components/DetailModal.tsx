import { forwardRef, useCallback, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import Player from "video.js/dist/types/player";

import MaxLineTypography from "./MaxLineTypography";
import PlayButton from "./PlayButton";
import NetflixIconButton from "./NetflixIconButton";
import AgeLimitChip from "./AgeLimitChip";
import QualityChip from "./QualityChip";
import { formatMinuteToReadable, getRandomNumber } from "src/utils/common";
import SimilarVideoCard from "./SimilarVideoCard";
import { useDetailModal } from "src/providers/DetailModalProvider";
import { useGetSimilarVideosQuery } from "src/store/slices/discover";
import { MEDIA_TYPE } from "src/types/Common";
import VideoJSPlayer from "./watch/VideoJSPlayer";

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

function CloseSvg() {
  return (
    <IconSvg>
      <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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

function VolumeUpSvg() {
  return (
    <IconSvg>
      <path d="M5 10V14H8L12 18V6L8 10H5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M15 9C16.1 10.1 16.1 13.9 15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M17.5 6.5C19.9 8.9 19.9 15.1 17.5 17.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </IconSvg>
  );
}

function VolumeOffSvg() {
  return (
    <IconSvg>
      <path d="M5 10V14H8L12 18V6L8 10H5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M16 9L20 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 9L16 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </IconSvg>
  );
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DetailModal() {
  const { detail, setDetailType } = useDetailModal();
  const { data: similarVideos } = useGetSimilarVideosQuery(
    { mediaType: detail.mediaType ?? MEDIA_TYPE.Movie, id: detail.id ?? 0 },
    { skip: !detail.id }
  );
  const playerRef = useRef<Player | null>(null);
  const [muted, setMuted] = useState(true);

  const handleReady = useCallback((player: Player) => {
    playerRef.current = player;
    setMuted(!!player.muted());
  }, []);

  const handleMute = useCallback((status: boolean) => {
    if (playerRef.current) {
      playerRef.current.muted(!status);
      setMuted(!status);
    }
  }, []);

  if (detail.mediaDetail) {
    return (
      <Dialog
        fullWidth
        scroll="body"
        maxWidth="md"
        open={!!detail.mediaDetail}
        id="detail_dialog"
        TransitionComponent={Transition}
      >
        <DialogContent sx={{ p: 0, bgcolor: "#181818" }}>
          <Box
            sx={{
              top: 0,
              left: 0,
              right: 0,
              position: "relative",
              mb: 3,
            }}
          >
            <Box
              sx={{
                width: "100%",
                position: "relative",
                height: "calc(9 / 16 * 100%)",
              }}
            >
              <VideoJSPlayer
                options={{
                  loop: true,
                  autoplay: true,
                  controls: false,
                  responsive: true,
                  fluid: true,
                  techOrder: ["youtube"],
                  sources: [
                    {
                      type: "video/youtube",
                      src: `https://www.youtube.com/watch?v=${
                        detail.mediaDetail?.videos.results[0]?.key ||
                        "L3oOldViIgY"
                      }`,
                    },
                  ],
                }}
                onReady={handleReady}
              />

              <Box
                sx={{
                  background: `linear-gradient(77deg,rgba(0,0,0,.6),transparent 85%)`,
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: "26.09%",
                  opacity: 1,
                  position: "absolute",
                  transition: "opacity .5s",
                }}
              />
              <Box
                sx={{
                  backgroundColor: "transparent",
                  backgroundImage:
                    "linear-gradient(180deg,hsla(0,0%,8%,0) 0,hsla(0,0%,8%,.15) 15%,hsla(0,0%,8%,.35) 29%,hsla(0,0%,8%,.58) 44%,#141414 68%,#141414)",
                  backgroundRepeat: "repeat-x",
                  backgroundPosition: "0px top",
                  backgroundSize: "100% 100%",
                  bottom: 0,
                  position: "absolute",
                  height: "14.7vw",
                  opacity: 1,
                  top: "auto",
                  width: "100%",
                }}
              />
              <button
                type="button"
                onClick={() => {
                  setDetailType({ mediaType: undefined, id: undefined });
                }}
                style={{
                  border: 0,
                  top: 15,
                  right: 15,
                  position: "absolute",
                  backgroundColor: "#181818",
                  width: 36,
                  height: 36,
                  cursor: "pointer",
                  color: "white",
                }}
              >
                <CloseSvg />
              </button>
              <Box
                sx={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 16,
                  px: { xs: 2, sm: 3, md: 5 },
                }}
              >
                <MaxLineTypography variant="h4" maxLine={1} sx={{ mb: 2 }}>
                  {detail.mediaDetail?.title}
                </MaxLineTypography>
                <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                  <PlayButton sx={{ color: "black", py: 0 }} />
                  <NetflixIconButton>
                    <PlusSvg />
                  </NetflixIconButton>
                  <NetflixIconButton>
                    <ThumbsUpSvg />
                  </NetflixIconButton>
                  <Box flexGrow={1} />
                  <NetflixIconButton
                    size="large"
                    onClick={() => handleMute(muted)}
                    sx={{ zIndex: 2 }}
                  >
                    {!muted ? <VolumeUpSvg /> : <VolumeOffSvg />}
                  </NetflixIconButton>
                </Stack>

                <Container
                  sx={{
                    p: "0px !important",
                  }}
                >
                  <Grid container spacing={5} alignItems="center">
                    <Grid item xs={12} sm={6} md={8}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography
                          variant="subtitle1"
                          sx={{ color: "success.main" }}
                        >{`${getRandomNumber(100)}% Match`}</Typography>
                        <Typography variant="body2">
                          {detail.mediaDetail?.release_date.substring(0, 4)}
                        </Typography>
                        <AgeLimitChip label={`${getRandomNumber(20)}+`} />
                        <Typography variant="subtitle2">{`${formatMinuteToReadable(
                          getRandomNumber(180)
                        )}`}</Typography>
                        <QualityChip label="HD" />
                      </Stack>

                      <MaxLineTypography
                        maxLine={3}
                        variant="body1"
                        sx={{ mt: 2 }}
                      >
                        {detail.mediaDetail?.overview}
                      </MaxLineTypography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <Typography variant="body2" sx={{ my: 1 }}>
                        {`Genres : ${detail.mediaDetail?.genres
                          .map((g) => g.name)
                          .join(", ")}`}
                      </Typography>
                      <Typography variant="body2" sx={{ my: 1 }}>
                        {`Available in : ${detail.mediaDetail?.spoken_languages
                          .map((l) => l.name)
                          .join(", ")}`}
                      </Typography>
                    </Grid>
                  </Grid>
                </Container>
              </Box>
            </Box>
            {similarVideos && similarVideos.results.length > 0 && (
              <Container
                sx={{
                  py: 2,
                  px: { xs: 2, sm: 3, md: 5 },
                }}
              >
                <Typography variant="h6" sx={{ mb: 2 }}>
                  More Like This
                </Typography>
                <Grid container spacing={2}>
                  {similarVideos.results.map((sm) => (
                    <Grid item xs={6} sm={4} key={sm.id}>
                      <SimilarVideoCard video={sm} />
                    </Grid>
                  ))}
                </Grid>
              </Container>
            )}
          </Box>
        </DialogContent>
      </Dialog>
    );
  }

  return null;
}
