import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";

export default function NetflixNavigationLink({
  sx,
  children,
  style,
  ...others
}: RouterLinkProps & { sx?: React.CSSProperties; style?: React.CSSProperties }) {
  return (
    <RouterLink
      {...others}
      style={{
        color: "rgba(255,255,255,0.85)",
        textDecoration: "none",
        ...style,
      }}
    >
      {children}
    </RouterLink>
  );
}
