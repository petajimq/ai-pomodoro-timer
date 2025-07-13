interface TimerDisplay {
  minutes: number;
  seconds: number;
}

const TimerDisplay = ({ minutes, seconds }: TimerDisplay) => {
  return (
    <div className="text-6xl font-mono font-bold text-primary">
      {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
    </div>
  );
};

export default TimerDisplay;
