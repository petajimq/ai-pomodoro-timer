import { Button } from "./ui/button";

interface ControlProps {
  onStart: () => void;
  onReset: () => void;
  isRunning: boolean;
}

const Controls = ({ onStart, onReset, isRunning }: ControlProps) => {
  return (
    <div className="flex gap-4 ">
      <Button variant="default" size="lg" onClick={onStart}>
        {isRunning ? "停止" : "開始" }
      </Button>
      <Button variant="secondary" size="lg" onClick={onReset}>
        リセット
      </Button>
    </div>
  );
};

export default Controls;
