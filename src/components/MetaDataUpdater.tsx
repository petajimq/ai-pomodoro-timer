import { useEffect } from "react";

interface MetadataUpdateProps {
  minutes: number;
  seconds: number;
  mode: "work" | "break";
}

const MetadataUpdater = ({ minutes, seconds, mode }: MetadataUpdateProps) => {
  useEffect(() => {
    const timeString = `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;
    const modeString = mode === "work" ? "作業" : "休憩";
    // タイトルを更新
    document.title = `(${timeString}) ${modeString} - AI Pomodoro Timer`;
  }, [minutes, seconds, mode]);

  return null;
};

export default MetadataUpdater;
