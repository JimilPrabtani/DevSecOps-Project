import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import VideoItemWithHover from "src/components/VideoItemWithHover";
import { ARROW_MAX_WIDTH } from "src/constant";
import NetflixNavigationLink from "src/components/NetflixNavigationLink";
import MotionContainer from "src/components/animate/MotionContainer";
import { varFadeIn } from "src/components/animate/variants/fade/FadeIn";
import { CustomGenre, Genre } from "src/types/Genre";
import { Movie } from "src/types/Movie";
import { PaginatedMovieResult } from "src/types/Common";

const RootStyle = styled("div")(() => ({
  position: "relative",
  overflow: "inherit",
}));

interface SlideItemProps {
  item: Movie;
}

function SlideItem({ item }: SlideItemProps) {
  return (
    <Box sx={{ pr: { xs: 0.5, sm: 1 } }}>
      <VideoItemWithHover video={item} />
    </Box>
  );
}

function ArrowButton({
  direction,
  onClick,
}: {
  direction: "left" | "right";
  onClick: () => void;
}) {
  return (
    <Box
      component="button"
      type="button"
      onClick={onClick}
      sx={{
        top: 0,
        bottom: 0,
        position: "absolute",
        zIndex: 9,
        width: { xs: ARROW_MAX_WIDTH / 2, sm: ARROW_MAX_WIDTH },
        opacity: 0.48,
        cursor: "pointer",
        alignItems: "center",
        justifyContent: "center",
        color: "common.white",
        border: 0,
        background: "transparent",
        transition: (theme) => theme.transitions.create("opacity"),
        "&:hover": {
          opacity: 0.8,
          backgroundColor: "grey.900",
        },
        ...(direction === "left"
          ? {
              left: 0,
              borderTopRightRadius: { xs: 4 },
              borderBottomRightRadius: { xs: 4 },
            }
          : {
              right: 0,
              borderTopLeftRadius: { xs: 4 },
              borderBottomLeftRadius: { xs: 4 },
            }),
        display: { xs: "none", sm: "flex" },
      }}
    >
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
        {direction === "left" ? <path d="m15 18-6-6 6-6" /> : <path d="m9 18 6-6-6-6" />}
      </svg>
    </Box>
  );
}

interface SlickSliderProps {
  data: PaginatedMovieResult;
  genre: Genre | CustomGenre;
  handleNext: (page: number) => void;
}

export default function SlickSlider({ data, genre, handleNext }: SlickSliderProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const lastRequestedPageRef = useRef<number | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [showExplore, setShowExplore] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const theme = useTheme();

  const updateScrollState = useCallback(() => {
    const element = scrollerRef.current;
    if (!element) {
      return;
    }

    const nearStart = element.scrollLeft <= 8;
    const nearEnd = element.scrollLeft + element.clientWidth >= element.scrollWidth - 40;

    setActiveSlideIndex(nearStart ? 0 : 1);
    setIsEnd(nearEnd);

    if (nearEnd && data.page < data.total_pages) {
      const nextPage = data.page + 1;
      if (lastRequestedPageRef.current !== nextPage) {
        lastRequestedPageRef.current = nextPage;
        handleNext(nextPage);
      }
    }
  }, [data.page, data.total_pages, handleNext]);

  useEffect(() => {
    lastRequestedPageRef.current = null;
    updateScrollState();
  }, [data.page, data.results.length, updateScrollState]);

  const handlePrevious = () => {
    const element = scrollerRef.current;
    if (!element) {
      return;
    }
    element.scrollBy({ left: -element.clientWidth * 0.8, behavior: "smooth" });
  };

  const handleNextScroll = () => {
    const element = scrollerRef.current;
    if (!element) {
      return;
    }
    element.scrollBy({ left: element.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <Box sx={{ overflow: "hidden", height: "100%", zIndex: 1 }}>
      {data.results.length > 0 && (
        <>
          <Stack
            spacing={2}
            direction="row"
            alignItems="center"
            sx={{ mb: 2, pl: { xs: "30px", sm: "60px" } }}
          >
            <NetflixNavigationLink
              to={`/genre/${genre.id || genre.name.toLowerCase().replace(" ", "_")}`}
              style={{
                display: "inline-block",
                fontWeight: 700,
              }}
              onMouseOver={() => {
                setShowExplore(true);
              }}
              onMouseLeave={() => {
                setShowExplore(false);
              }}
            >
              {`${genre.name} Movies `}
              <MotionContainer
                open={showExplore}
                initial="initial"
                sx={{ display: "inline", color: "success.main" }}
              >
                {"Explore All".split("").map((letter, index) => (
                  <motion.span key={index} variants={varFadeIn}>
                    {letter}
                  </motion.span>
                ))}
              </MotionContainer>
            </NetflixNavigationLink>
          </Stack>

          <RootStyle>
            {activeSlideIndex > 0 && <ArrowButton direction="left" onClick={handlePrevious} />}
            {!isEnd && <ArrowButton direction="right" onClick={handleNextScroll} />}
              <Box
                ref={scrollerRef}
                onScroll={updateScrollState}
                sx={{
                  display: "flex",
                  gap: { xs: 0.5, sm: 1 },
                  overflowX: "auto",
                  overflowY: "hidden",
                  scrollSnapType: "x mandatory",
                  scrollBehavior: "smooth",
                  px: { xs: "30px", sm: "60px" },
                  scrollbarWidth: "none",
                  "&::-webkit-scrollbar": {
                    display: "none",
                  },
                  [theme.breakpoints.up("sm")]: {
                    px: { xs: "30px", sm: "60px" },
                  },
                }}
              >
                {data.results
                  .filter((item) => !!item.backdrop_path)
                  .map((item) => (
                    <Box
                      key={item.id}
                      sx={{
                        flex: {
                          xs: "0 0 48%",
                          sm: "0 0 32%",
                          md: "0 0 24%",
                          lg: "0 0 16.66%",
                        },
                        scrollSnapAlign: "start",
                      }}
                    >
                      <SlideItem item={item} />
                    </Box>
                  ))}
              </Box>
          </RootStyle>
        </>
      )}
    </Box>
  );
}