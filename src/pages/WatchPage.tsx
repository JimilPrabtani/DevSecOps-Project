import { useState, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Player from "video.js/dist/types/player";
import { Box, Stack, Typography } from "@mui/material";


import useWindowSize from "src/hooks/useWindowSize";
import { formatTime } from "src/utils/common";

import MaxLineTypography from "src/components/MaxLineTypography";
import VolumeControllers from "src/components/watch/VolumeControllers";
import VideoJSPlayer from "src/components/watch/VideoJSPlayer";
import PlayerSeekbar from "src/components/watch/PlayerSeekbar";
import PlayerControlButton from "src/components/watch/PlayerControlButton";
import MainLoadingScreen from "src/components/MainLoadingScreen";

export function Component() {
  const playerRef = useRef<Player | null>(null);
  const [playerState, setPlayerState] = useState({
    paused: false,
    muted: false,
    playedSeconds: 0,
    duration: 0,
    volume: 0.8,
    loaded: 0,
  });

  const navigate = useNavigate();
  const [playerInitialized, setPlayerInitialized] = useState(false);

  const windowSize = useWindowSize();
  const videoJsOptions = useMemo(() => {
    return {
      preload: "metadata",
      autoplay: true,
      controls: false,
      // responsive: true,
      // fluid: true,
      width: windowSize.width,
      height: windowSize.height,
      sources: [
        {
          // src: videoData?.video,
          // src: "https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8",
          src: "https://bitmovin-a.akamaihd.net/content/sintel/hls/playlist.m3u8",
          type: "application/x-mpegurl",
        },
      ],
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowSize]);

  const handlePlayerReady = function (player: Player): void {
    player.on("pause", () => {
      setPlayerState((draft) => {
        return { ...draft, paused: true };
      });
    });

    player.on("play", () => {
      setPlayerState((draft) => {
        return { ...draft, paused: false };
      });
    });

    player.on("timeupdate", () => {
      setPlayerState((draft) => {
        return { ...draft, playedSeconds: player.currentTime() ?? 0 };
      });
    });

    player.one("durationchange", () => {
      setPlayerInitialized(true);
      setPlayerState((draft) => ({ ...draft, duration: player.duration() ?? 0 }));
    });

    playerRef.current = player;

    setPlayerState((draft) => {
      return { ...draft, paused: player.paused() };
    });
  };

  const handleVolumeChange = (_: Event, value: number | number[]) => {
    const newValue = Array.isArray(value) ? value[0] : value;
    playerRef.current?.volume(newValue / 100);
    setPlayerState((draft) => {
      return { ...draft, volume: newValue / 100 };
    });
  };

  const handleSeekTo = (v: number) => {
    playerRef.current?.currentTime(v);
  };

  const handleGoBack = () => {
    navigate("/browse");
  };

  if (!!videoJsOptions.width) {
    return (
      <Box
        sx={{
          position: "relative",
        }}
      >
        <VideoJSPlayer options={videoJsOptions} onReady={handlePlayerReady} />
        {playerRef.current && playerInitialized && (
          <Box
            sx={{
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              position: "absolute",
            }}
          >
            <Box px={2} sx={{ position: "absolute", top: 75 }}>
              <PlayerControlButton onClick={handleGoBack}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </PlayerControlButton>
            </Box>
            <Box
              px={2}
              sx={{
                position: "absolute",
                top: { xs: "40%", sm: "55%", md: "60%" },
                left: 0,
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 700,
                  color: "white",
                }}
              >
                Title
              </Typography>
            </Box>
            <Box
              px={{ xs: 0, sm: 1, md: 2 }}
              sx={{
                position: "absolute",
                top: { xs: "50%", sm: "60%", md: "70%" },
                right: 0,
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  px: 1,
                  py: 0.5,
                  fontWeight: 700,
                  color: "white",
                  bgcolor: "red",
                  borderRadius: "12px 0px 0px 12px",
                }}
              >
                12+
              </Typography>
            </Box>

            <Box
              px={{ xs: 1, sm: 2 }}
              sx={{ position: "absolute", bottom: 20, left: 0, right: 0 }}
            >
              {/* Seekbar */}
              <Stack direction="row" alignItems="center" spacing={1}>
                <PlayerSeekbar
                  playedSeconds={playerState.playedSeconds}
                  duration={playerState.duration}
                  seekTo={handleSeekTo}
                />
              </Stack>
              {/* end Seekbar */}

              {/* Controller */}
              <Stack direction="row" alignItems="center">
                {/* left controller */}
                <Stack
                  direction="row"
                  spacing={{ xs: 0.5, sm: 1.5, md: 2 }}
                  alignItems="center"
                >
                  {!playerState.paused ? (
                    <PlayerControlButton
                      onClick={() => {
                        playerRef.current?.pause();
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                        <rect x="6" y="5" width="4" height="14" fill="currentColor" />
                        <rect x="14" y="5" width="4" height="14" fill="currentColor" />
                      </svg>
                    </PlayerControlButton>
                  ) : (
                    <PlayerControlButton
                      onClick={() => {
                        playerRef.current?.play();
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                        <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
                      </svg>
                    </PlayerControlButton>
                  )}
                  <PlayerControlButton>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                      <path d="M5 5V19L13 12L5 5Z" fill="currentColor" />
                      <path d="M13 5V19L21 12L13 5Z" fill="currentColor" />
                    </svg>
                  </PlayerControlButton>
                  <VolumeControllers
                    muted={playerState.muted}
                    handleVolumeToggle={() => {
                      playerRef.current?.muted(!playerState.muted);
                      setPlayerState((draft) => {
                        return { ...draft, muted: !draft.muted };
                      });
                    }}
                    value={playerState.volume}
                    handleVolume={handleVolumeChange}
                  />
                  <Typography variant="caption" sx={{ color: "white" }}>
                    {`${formatTime(playerState.playedSeconds)} / ${formatTime(
                      playerState.duration
                    )}`}
                  </Typography>
                </Stack>
                {/* end left controller */}

                {/* middle time */}
                <Box flexGrow={1}>
                  <MaxLineTypography
                    maxLine={1}
                    variant="subtitle1"
                    textAlign="center"
                    sx={{ maxWidth: 300, mx: "auto", color: "white" }}
                  >
                    Description
                  </MaxLineTypography>
                </Box>
                {/* end middle time */}

                {/* right controller */}
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={{ xs: 0.5, sm: 1.5, md: 2 }}
                >
                  <PlayerControlButton>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                      <path d="M19.4 15C19.2 15.3 19.2 15.7 19.4 16L20.1 17.2C20.3 17.5 20.2 17.9 19.9 18.1L18.1 19.9C17.9 20.2 17.5 20.3 17.2 20.1L16 19.4C15.7 19.2 15.3 19.2 15 19.4L14.8 19.5C14.5 19.7 14.3 20 14.3 20.4V21.7C14.3 22 14 22.3 13.7 22.3H11.3C11 22.3 10.7 22 10.7 21.7V20.4C10.7 20 10.5 19.7 10.2 19.5L10 19.4C9.7 19.2 9.3 19.2 9 19.4L7.8 20.1C7.5 20.3 7.1 20.2 6.9 19.9L5.1 18.1C4.8 17.9 4.7 17.5 4.9 17.2L5.6 16C5.8 15.7 5.8 15.3 5.6 15L5.5 14.8C5.3 14.5 5 14.3 4.6 14.3H3.3C3 14.3 2.7 14 2.7 13.7V11.3C2.7 11 3 10.7 3.3 10.7H4.6C5 10.7 5.3 10.5 5.5 10.2L5.6 10C5.8 9.7 5.8 9.3 5.6 9L4.9 7.8C4.7 7.5 4.8 7.1 5.1 6.9L6.9 5.1C7.1 4.8 7.5 4.7 7.8 4.9L9 5.6C9.3 5.8 9.7 5.8 10 5.6L10.2 5.5C10.5 5.3 10.7 5 10.7 4.6V3.3C10.7 3 11 2.7 11.3 2.7H13.7C14 2.7 14.3 3 14.3 3.3V4.6C14.3 5 14.5 5.3 14.8 5.5L15 5.6C15.3 5.8 15.7 5.8 16 5.6L17.2 4.9C17.5 4.7 17.9 4.8 18.1 5.1L19.9 6.9C20.2 7.1 20.3 7.5 20.1 7.8L19.4 9C19.2 9.3 19.2 9.7 19.4 10L19.5 10.2C19.7 10.5 20 10.7 20.4 10.7H21.7C22 10.7 22.3 11 22.3 11.3V13.7C22.3 14 22 14.3 21.7 14.3H20.4C20 14.3 19.7 14.5 19.5 14.8L19.4 15Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                    </svg>
                  </PlayerControlButton>
                  <PlayerControlButton>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                      <path d="M4 6H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </PlayerControlButton>
                  <PlayerControlButton>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                      <path d="M4 9V4H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M20 9V4H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M4 15V20H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M20 15V20H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </PlayerControlButton>
                </Stack>
                {/* end right controller */}
              </Stack>
              {/* end Controller */}
            </Box>
          </Box>
        )}
      </Box>
    );
  }
  return null;
}

Component.displayName = "WatchPage";
