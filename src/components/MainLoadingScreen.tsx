function MainLoadingScreen() {
  return (
    <div
      style={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        backgroundColor: "#141414",
        opacity: 0.75,
        zIndex: 2,
      }}
    >
      <span
        style={{
          width: 40,
          height: 40,
          border: "3px solid rgba(255,255,255,0.2)",
          borderTopColor: "white",
          borderRadius: "50%",
          display: "inline-block",
          animation: "spin 0.8s linear infinite",
        }}
      />
    </div>
  );
}

export default MainLoadingScreen;
