interface DownArrowProps {
  onClick?: () => void;
  size?: number;
}

export default function DownArrow({ onClick, size = 48 }: DownArrowProps) {
  return (
    <div
      className={"d-flex justify-content-center"}
      style={{
        position: "absolute",
        bottom: "0px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 999
      }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        className={`${onClick ? "cursor-pointer hover-grow" : ""}`}
        onClick={onClick}>
        <path
          d="M12 16L6 10L7.4 8.6L12 13.2L16.6 8.6L18 10L12 16Z"
          fill="white" />
      </svg>
    </div>
  );
}
