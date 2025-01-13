import { useEffect } from "react";

import { Header, RaidTarget } from "./components";

const Raid = () => {
  useEffect(() => {
    document.title = "Comunidade $BCT – Raid";

    return () => {
      document.title = "Comunidade $BCT";
    };
  }, []);

  return (
    <div className="mt-[30px] flex h-full w-full flex-col items-center justify-center gap-4 p-2">
      <Header />

      <RaidTarget />
    </div>
  );
};

export default Raid;
