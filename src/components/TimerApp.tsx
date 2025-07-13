"use client";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import TimerDisplay from "./TimerDisplay";

const TimerApp = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            作業時間
          </CardTitle>
          <CardContent className="flex justify-center">
            <TimerDisplay minutes={25} seconds={0} />
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
};

export default TimerApp;
