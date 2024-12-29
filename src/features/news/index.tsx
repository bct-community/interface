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
    <div className="flex justify-center items-center h-full w-full flex-col gap-4">
      <div className="flex justify-evenly items-center gap-4 w-full">
        <PrettyDate />

        <Heading />

        <Card className="w-[20%]">
          <CardHeader>
            <CardTitle className="select-none">News</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <div className="flex justify-evenly items-center gap-4 w-full">
        <RaidTargetLogo />

        <Raid />

        <Player />
      </div>
    </div>
  );
};

export default News;
