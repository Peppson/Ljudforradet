import { Outlet } from "react-router-dom";

interface MainProps {
  isVideoPlaying?: boolean;
}

export default function Main({ isVideoPlaying = true }: MainProps) {
  return (
    <main>
      <Outlet context={{ isVideoPlaying }} />
    </main>
  );
}
