"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "./ui/card";
import TimerDisplay from "./TimerDisplay";
import Controls from "./Controls";
import MetadataUpdater from "./MetaDataUpdater";
import { useState, useEffect } from "react";
import { playNotificationSound } from "@/utils/sound";

//タイマーのモードを表す型
type Mode = "work" | "break";

const TimerApp = () => {
  //タイマーの実行状態を管理するstate
  const [isRunning, setIsRunning] = useState(false);

  //作業時間を管理する状態変数
  const [workDuration, setWorkDuration] = useState(25);

  //タイマーの残り時間を保持する状態変数
  const [timeLeft, setTimeLeft] = useState({
    minutes: workDuration,
    seconds: 0,
  });

  //モードの状態を管理する変数
  const [mode, setMode] = useState<Mode>("work");

  //モードを切り替える関数
  const toggleMode = () => {
    //現在のモードを切り替える
    const newMode = mode === "work" ? "break" : "work";
    setMode(newMode);

    //モードに応じてタイマーの時間をリセット
    //作業モードなら25分、休憩モードなら5分
    setTimeLeft({
      minutes: newMode === "work" ? workDuration : 5,
      seconds: 0,
    });

    //タイマーを停止状態にする
    setIsRunning(false);
  };

  //開始/停止ボタンのハンドラ
  const handleStart = () => {
    setIsRunning(!isRunning);
  };

  //リセットボタンのハンドラ
  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft({
      minutes: mode === "work" ? workDuration : 5,
      seconds: 0,
    });
  };

  useEffect(() => {
    //setIntervalの戻り値(タイマーID)を保持する変数
    let intervalId: NodeJS.Timeout;

    if (isRunning) {
      intervalId = setInterval(() => {
        setTimeLeft((prev) => {
          //秒数が0の場合
          if (prev.seconds === 0) {
            //分数が0の場合
            if (prev.minutes === 0) {
              setIsRunning(false); //タイマーを停止
              toggleMode(); //モードを自動で切替
              void playNotificationSound(); //音声を再生
              return prev; //現在の状態（0分0秒）を返す
            }
            //分数がまだ残っている場合
            return { minutes: prev.minutes - 1, seconds: 59 };
          }
          //秒数が1以上の場合は、秒を1減らす
          return { ...prev, seconds: prev.seconds - 1 };
        });
      }, 1); //動作確認用に1ミリ秒を設定
    }

    //クリーンアップ関数
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {mode === "work" ? "作業時間" : "休憩時間"}
          </CardTitle>
          <CardContent className="flex flex-col items-center gap-6">
            <TimerDisplay
              minutes={timeLeft.minutes}
              seconds={timeLeft.seconds}
              mode={mode}
            />
            <Controls
              onStart={handleStart}
              onReset={handleReset}
              onModeToggle={toggleMode}
              isRunning={isRunning}
            />
          </CardContent>
        </CardHeader>
        <CardFooter className="flex justify-center gap-2 items-center">
          <label className="text-sm font-medium">作業時間</label>
          <select
            value={workDuration}
            onChange={(e) => {
              const newDuration = parseInt(e.target.value);
              setWorkDuration(newDuration);
              if (mode === "work" && !isRunning) {
                setTimeLeft({ minutes: newDuration, seconds: 0 });
              }
            }}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {[5, 10, 15, 30, 45, 60].map((minutes) => (
              <option key={minutes} value={minutes}>
                {minutes}
              </option>
            ))}
          </select>
        </CardFooter>
      </Card>
      <MetadataUpdater
        minutes={timeLeft.minutes}
        seconds={timeLeft.seconds}
        mode={mode}
      />
    </div>
  );
};

export default TimerApp;
