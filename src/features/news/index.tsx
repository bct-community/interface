import { Card, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Heading,
  Player,
  PrettyDate,
  Raid,
  RaidTargetLogo,
} from "./components";

const News = () => {
  return (
    <div className="p-2 flex justify-center items-center h-full w-full flex-col gap-4">
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
