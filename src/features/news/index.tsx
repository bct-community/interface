import { useEffect } from "react";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Heading,
  Player,
  PrettyDate,
  Raid,
  RaidTargetLogo,
} from "./components";

const News = () => {
  useEffect(() => {
    document.title = "XYZ Community – News";

    return () => {
      document.title = "XYZ Community";
    };
  }, []);

  return (
    <div className="mt-[30px] flex h-full w-full flex-col items-center justify-center gap-4 p-2">
      <div className="flex w-full items-center justify-evenly gap-4">
        <PrettyDate />

        <Heading />

        <Card className="w-[20%]">
          <CardHeader>
            <CardTitle className="select-none">News</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <div className="flex w-full items-center justify-evenly gap-4">
        <RaidTargetLogo />

        <Raid />

        <div className="flex w-[20%] items-center justify-center">
          <Player />
        </div>
      </div>
    </div>
  );
};

export default News;
