import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { COMMON_TITLES } from "src/constant";
import HeroSection from "src/components/HeroSection";
import { genreSliceEndpoints, useGetGenresQuery } from "src/store/slices/genre";
import { MEDIA_TYPE } from "src/types/Common";
import { CustomGenre, Genre } from "src/types/Genre";
import SliderRowForGenre from "src/components/VideoSlider";
import MainLoadingScreen from "src/components/MainLoadingScreen";
import store from "src/store";

export async function loader() {
  await store.dispatch(
    genreSliceEndpoints.getGenres.initiate(MEDIA_TYPE.Movie)
  );
  return null;
}
export function Component() {
  const {
    data: genres,
    isSuccess,
    isLoading,
    isError,
    refetch,
  } = useGetGenresQuery(MEDIA_TYPE.Movie);

  if (isLoading) {
    return <MainLoadingScreen />;
  }

  if (isError) {
    return (
      <Box
        sx={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
        }}
      >
        <Stack spacing={2} alignItems="center" maxWidth={640} textAlign="center">
          <Typography variant="h4" color="text.primary" fontWeight={700}>
            TMDB content could not be loaded
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Check the TMDB API key in Jenkins credentials or local .env, then rerun the pipeline.
            If the key is invalid, the app cannot load titles and the page will stay empty.
          </Typography>
          <Button variant="contained" onClick={() => refetch()}>
            Retry
          </Button>
        </Stack>
      </Box>
    );
  }

  if (isSuccess && genres && genres.length > 0) {
    return (
      <Stack spacing={2}>
        <HeroSection mediaType={MEDIA_TYPE.Movie} />
        {[...COMMON_TITLES, ...genres].map((genre: Genre | CustomGenre) => (
          <SliderRowForGenre
            key={genre.id || genre.name}
            genre={genre}
            mediaType={MEDIA_TYPE.Movie}
          />
        ))}
      </Stack>
    );
  }

  return <MainLoadingScreen />;
}

Component.displayName = "HomePage";
