import { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";

import VisitsByCountryMap from "./components/VisitsByCountryMap";

const Metrics = () => {
  useEffect(() => {
    document.title = "Comunidade $BCT – Metricas";

    return () => {
      document.title = "Comunidade $BCT";
    };
  }, []);

  const [content, setContent] = useState("");

  return (
    <div className="mt-[30px] flex min-h-full w-full flex-col items-center justify-center px-12">
      <h1 className="mt-2 text-3xl italic font-normal select-none">
        Métricas da comunidade
      </h1>
      <div className="w-full h-full">
        <h2 className="mt-8 text-xl italic font-normal select-none">
          🌎 Visitas por país
        </h2>

        <VisitsByCountryMap setTooltipContent={setContent} />
        <Tooltip id="my-tooltip" float className="select-none">
          {content}
        </Tooltip>
      </div>
    </div>
  );
};

export default Metrics;
