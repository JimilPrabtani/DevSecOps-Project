import { useRef, useEffect } from "react";
import VideoItemWithHover from "./VideoItemWithHover";
import { CustomGenre, Genre } from "src/types/Genre";
import { PaginatedMovieResult } from "src/types/Common";
import useIntersectionObserver from "src/hooks/useIntersectionObserver";

interface GridWithInfiniteScrollProps {
  genre: Genre | CustomGenre;
  data: PaginatedMovieResult;
  handleNext: (page: number) => void;
}
export default function GridWithInfiniteScroll({
  genre,
  data,
  handleNext,
}: GridWithInfiniteScrollProps) {
  const intersectionRef = useRef<HTMLDivElement>(null);
  const intersection = useIntersectionObserver(intersectionRef);

  useEffect(() => {
    if (
      intersection &&
      intersection.intersectionRatio === 1 &&
      data.page < data.total_pages
    ) {
      handleNext(data.page + 1);
    }
  }, [intersection]);

  return (
    <>
      <div
        style={{
          padding: "150px 60px 32px",
          background: "inherit",
          color: "white",
        }}
      >
        <h2 style={{ margin: "0 0 16px", fontWeight: 700 }}>{`${genre.name} Movies`}</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: 16,
          }}
        >
          {data.results
            .filter((v) => !!v.backdrop_path)
            .map((video, idx) => (
              <div key={`${video.id}_${idx}`} style={{ zIndex: 1 }}>
                <VideoItemWithHover video={video} />
              </div>
            ))}
        </div>
      </div>
      <div ref={intersectionRef} style={{ display: "none" }} />
    </>
  );
}
