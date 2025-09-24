import config from "../config/Config";

export default function DebugBreakpoints() {
  const points = ["xs", "sm", "md", "lg", "xl", "xxl"];

  const resetStartupModal = () => {
    localStorage.removeItem(config.startupModalStorageKey);
    console.log("Startup modal storage reset");
  };

  return <aside
    style={{
      position: "fixed",
      right: 0,
      top: 0,
      zIndex: 999,
      backgroundColor: "gray",
      color: "white",
      textAlign: "center"
    }}>

    {points.map((size, i) => (
      <div key={i} className={
        (size === "xs" ? "d-block " : "d-none d-" + size + "-block ")
        + (points[i + 1] ? "d-" + points[i + 1] + "-none" : "")}>
        {size}
      </div>
    ))}

    {/* Reset local storage */}
    <button className="bg-dark" onClick={resetStartupModal}>
      Reset
    </button>
  </aside >;
}
