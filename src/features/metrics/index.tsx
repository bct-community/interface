import { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";

import { sortByDate } from "@/utils/sortByDate";

import { useChatMetrics } from "./api/chat/getChatMetrics";
import { useChatRaidMessagesMetrics } from "./api/chat/getChatRaidMessagesMetrics";
import { useLinksMetrics } from "./api/links/getLinksMetrics";
import { useLinksTrendingMetrics } from "./api/links/getLinksTrendingMetrics";
import { useRaidsMetrics } from "./api/raids/getRaidsMetrics";
import { useRaidsTrendingMetrics } from "./api/raids/getRaidsTrendingMetrics";
import { useVisitsMetrics } from "./api/visits/getVisitsMetrics";
import Chart from "./components/Chart";
import TrendingMetricsMarquee from "./components/TrendingMetricsMarquee";
import VisitsByCountryMap from "./components/VisitsByCountryMap";

const Metrics = () => {
  useEffect(() => {
    document.title = "Comunidade $BCT – Métricas";

    return () => {
      document.title = "Comunidade $BCT";
    };
  }, []);

  const { data: visitsMetrics } = useVisitsMetrics();
  const sortedVisitsMetrics = sortByDate(
    visitsMetrics || { total: 0, highestCount: 0, daily: [] },
  );

  const { data: raidsMetrics } = useRaidsMetrics();
  const sortedRaidsMetrics = sortByDate(
    raidsMetrics || { total: 0, highestCount: 0, daily: [] },
  );

  const { data: chatRaidMessagesMetrics } = useChatRaidMessagesMetrics();
  const sortedChatRaidMessagesMetrics = sortByDate(
    chatRaidMessagesMetrics || { total: 0, highestCount: 0, daily: [] },
  );

  const { data: raidsTrendingMetrics } = useRaidsTrendingMetrics();

  const { data: linksMetrics } = useLinksMetrics();
  const sortedLinksMetrics = sortByDate(
    linksMetrics || { total: 0, highestCount: 0, daily: [] },
  );

  const { data: linksTrendingMetrics } = useLinksTrendingMetrics();

  const { data: chatMetrics } = useChatMetrics();
  const sortedChatMetrics = sortByDate(
    chatMetrics || { total: 0, highestCount: 0, daily: [] },
  );

  const [mapTooltipContent, setMapTooltipContent] = useState("");

  return (
    <div className="mt-[30px] flex min-h-full w-full flex-col items-center justify-center">
      <h1 className="mt-2 select-none text-3xl font-normal italic">
        Métricas da comunidade
      </h1>

      <div className="h-full w-full px-12 py-8">
        <h2 className="mt-8 select-none pb-12 text-xl font-normal italic">
          📌 Visitas - Total {visitsMetrics?.total || 0}
        </h2>

        <Chart
          data={sortedVisitsMetrics.daily || []}
          max={sortedVisitsMetrics.highestCount || 0}
        />
      </div>

      <div className="h-full w-full px-12 py-8">
        <h2 className="mt-8 select-none text-xl font-normal italic">
          🌎 Visitas por país
        </h2>

        <VisitsByCountryMap setTooltipContent={setMapTooltipContent} />
        <Tooltip id="my-tooltip" float className="select-none">
          {mapTooltipContent}
        </Tooltip>
      </div>

      <div className="h-full w-full px-12 py-8">
        <h2 className="mt-8 select-none pb-12 text-xl font-normal italic">
          🎯 Raids
        </h2>

        <div className="flex w-full flex-col items-center justify-between gap-8 px-12 md:flex-row">
          <div className="flex w-full flex-col md:w-1/2">
            <p className="select-none pb-8 text-lg font-light italic">
              • Acessos a raids - {sortedRaidsMetrics.total} (7d)
            </p>
            <Chart
              data={sortedRaidsMetrics.daily || []}
              max={sortedRaidsMetrics.highestCount || 0}
            />
          </div>

          <div className="flex w-full flex-col md:w-1/2">
            <p className="select-none pb-8 text-xl font-light italic">
              • Mensagens geradas para raids - Total{" "}
              {sortedChatRaidMessagesMetrics.total} (7d)
            </p>
            <Chart
              data={sortedChatRaidMessagesMetrics.daily || []}
              max={sortedChatRaidMessagesMetrics.highestCount || 0}
            />
          </div>
        </div>
      </div>

      <div className="w-full pb-2 pt-12">
        <TrendingMetricsMarquee raids={raidsTrendingMetrics?.raids || []} />
      </div>

      <div className="h-full w-full px-12 py-8">
        <h2 className="mt-8 select-none pb-12 text-xl font-normal italic">
          🔗 Links - {sortedLinksMetrics.total} Links acessados (7d)
        </h2>

        <Chart
          data={sortedLinksMetrics.daily || []}
          max={sortedLinksMetrics.highestCount || 0}
        />
      </div>

      <div className="w-full pb-2 pt-12">
        <TrendingMetricsMarquee links={linksTrendingMetrics?.links || []} />
      </div>

      <div className="h-full w-full px-12 py-8">
        <h2 className="mt-8 select-none pb-12 text-xl font-normal italic">
          🤖 Chat - {sortedChatMetrics.total} Mensagens enviadas (7d)
        </h2>

        <Chart
          data={sortedChatMetrics.daily || []}
          max={sortedChatMetrics.highestCount || 0}
        />
      </div>
    </div>
  );
};

export default Metrics;
