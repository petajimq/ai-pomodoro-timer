import { Button } from "./ui/button";

interface ControlProps {
  onStart: () => void;
  onReset: () => void;
  onModeToggle: () => void;
  isRunning: boolean;
}

const Controls = ({
  onStart,
  onReset,
  onModeToggle,
  isRunning,
}: ControlProps) => {
  return (
    <div className="flex flex-col items-center gap-4 ">
      <Button variant="default" size="lg" onClick={onStart}>
        {isRunning ? "停止" : "開始"}
      </Button>
      <Button variant="secondary" size="lg" onClick={onReset}>
        リセット
      </Button>
      <Button
        variant="ghost"
        className="text-muted-foreground"
        onClick={onModeToggle}
      >
        モード切り替え
      </Button>
    </div>
  );
};

export default Controls;
