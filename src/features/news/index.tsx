import { Card, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Heading,
  Player,
  PrettyDate,
  Raid,
  RaidTargetLogo,
} from "./components";
import { useEffect } from "react";

const News = () => {
  useEffect(() => {
    document.title = "XYZ Community – News";

    return () => {
      document.title = "XYZ Community";
    };
  }, []);

  return (
    <div className="mt-[30px] p-2 flex justify-center items-center h-full w-full flex-col gap-4">
      <div className="flex justify-evenly items-center gap-4 w-full">
        <PrettyDate />

        <Heading />

        <Card className="w-[20%] card-shadow-sm">
          <CardHeader>
            <CardTitle className="select-none">News</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <div className="flex justify-evenly items-center gap-4 w-full">
        <RaidTargetLogo />

        <Raid />

        <div className="w-[20%] flex items-center justify-center">
          <Player />
        </div>
      </div>
    </div>
  );
};

export default News;
