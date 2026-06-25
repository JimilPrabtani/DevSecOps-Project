import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useOffSetTop from "src/hooks/useOffSetTop";
import { APP_BAR_HEIGHT } from "src/constant";
import Logo from "../Logo";
import SearchBox from "../SearchBox";
import NetflixNavigationLink from "../NetflixNavigationLink";

const pages = ["My List", "Movies", "Tv Shows"];

function MenuIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </svg>
  );
}

const MainHeader = () => {
  const isOffset = useOffSetTop(APP_BAR_HEIGHT);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        padding: "0 60px",
        height: APP_BAR_HEIGHT,
        display: "flex",
        alignItems: "center",
        backgroundImage: "none",
        backgroundColor: isOffset ? "rgba(20,20,20,0.9)" : "transparent",
        boxShadow: isOffset ? "0 2px 8px rgba(0,0,0,0.6)" : "none",
      }}
    >
      <Logo />

      <nav style={{ flexGrow: 1, marginLeft: 24 }}>
        <ul
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 24,
            listStyle: "none",
            padding: 0,
            margin: 0,
          }}
        >
          {pages.map((page) => (
            <li key={page}>
              <NetflixNavigationLink
                to=""
                onClick={handleCloseNavMenu}
              >
                {page}
              </NetflixNavigationLink>
            </li>
          ))}
        </ul>
      </nav>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <SearchBox />
        <button
          type="button"
          onClick={handleOpenUserMenu}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 36,
            height: 36,
            border: 0,
            borderRadius: 4,
            background: "transparent",
            color: "white",
            cursor: "pointer",
            padding: 0,
          }}
          aria-label="Open settings"
        >
          <img
            src="/avatar.png"
            alt="user_avatar"
            style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 4 }}
          />
        </button>
        {anchorElUser && (
          <div
            style={{
              position: "absolute",
              top: APP_BAR_HEIGHT,
              right: 60,
              background: "#181818",
              padding: 8,
              borderRadius: 4,
              boxShadow: "0 2px 8px rgba(0,0,0,0.6)",
            }}
          >
            {["Account", "Logout"].map((setting) => (
              <button
                key={setting}
                type="button"
                onClick={handleCloseUserMenu}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "8px 16px",
                  background: "transparent",
                  color: "white",
                  border: 0,
                  textAlign: "left",
                  cursor: "pointer",
                }}
              >
                {setting}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};
export default MainHeader;
