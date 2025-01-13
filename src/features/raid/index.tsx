import { useEffect } from "react";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";

import { Heading, PrettyDate, RaidTarget } from "./components";

const Raid = () => {
  useEffect(() => {
    document.title = "Comunidade $BCT – Raid";

    return () => {
      document.title = "Comunidade $BCT";
    };
  }, []);

  return (
    <div className="mt-[30px] flex h-full w-full flex-col items-center justify-center gap-4 p-2">
      <div className="flex items-center w-full gap-4 justify-evenly">
        <PrettyDate />

        <Heading />

        <Card className="w-[20%]">
          <CardHeader>
            <CardTitle className="w-full text-center select-none">
              <span>Make $BCT Great again</span>
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* <RaidTargetLogo /> */}

      <RaidTarget />

      {/* <div className="flex w-[20%] items-center justify-center">
          <Player />
        </div> */}
    </div>
  );
};

export default Raid;
