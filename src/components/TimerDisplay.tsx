interface TimerDisplay {
  minutes: number;
  seconds: number;
  mode: "work" | "break";
}

const TimerDisplay = ({ minutes, seconds, mode }: TimerDisplay) => {
  return (
    <div
      className={`text-6xl font-mono font-bold
          ${mode === "work" ? "text-red-500" : "text-green-500"}
      `}
    >
      {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
    </div>
  );
};

export default TimerDisplay;
