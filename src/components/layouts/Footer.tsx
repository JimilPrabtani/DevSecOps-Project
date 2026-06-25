export default function Footer() {
  return (
    <footer
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: 150,
        padding: "0 60px",
        color: "rgba(255,255,255,0.7)",
      }}
    >
      <div
        style={{
          height: 1,
          width: "100%",
          background: "rgba(255,255,255,0.2)",
          marginBottom: 16,
        }}
      />
      <div style={{ fontSize: 18 }}>
        Developed by{" "}
        <a
          href="https://github.com/jimilprabtani"
          target="_blank"
          rel="noreferrer"
          style={{ color: "white", textDecoration: "none" }}
        >
          Jimil Prabtani
        </a>
      </div>
    </footer>
  );
}
