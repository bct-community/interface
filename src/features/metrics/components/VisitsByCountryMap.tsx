import { scaleLinear } from "d3-scale";
import { useMemo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
  Sphere,
} from "react-simple-maps";

import geography from "@/assets/mapGeography/index.json";

import { useVisitsByCountry } from "../api/getVisitsByCountry";

const colorScale = scaleLinear<string>()
  .domain([0, 10])
  .range(["#ffd6d7", "#faa5a6"]);

const VisitsByCountryMap = ({
  setTooltipContent,
}: {
  setTooltipContent: (content: string) => void;
}) => {
  const { data } = useVisitsByCountry();

  const countryVisitsMap = useMemo(() => {
    if (!data) return new Map<string, number>();
    return new Map(
      data.countries.map(({ country, count }) => [country, count]),
    );
  }, [data]);

  return (
    <div data-tip="" className="max-h-[600px]">
      <ComposableMap
        projectionConfig={{
          rotate: [-10, 0, 0],
          scale: 147,
        }}
        className="px-16"
        height={450}
      >
        <Sphere
          stroke="hsl(var(--map-lines))"
          strokeWidth={0.5}
          id={"0"}
          fill={"transparent"}
        />
        <Graticule stroke="hsl(var(--map-lines))" strokeWidth={0.5} />

        <Geographies geography={geography}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const countryName = geo.properties.name;
              const visitCount = countryVisitsMap.get(countryName) || 0;

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={visitCount ? colorScale(visitCount) : "#ffe3f1"}
                  stroke="#E4E5E6"
                  strokeWidth={0.5}
                  className="hover:cursor-pointer"
                  onMouseEnter={() => {
                    setTooltipContent(`${countryName} ${visitCount} visitas`);
                  }}
                  onMouseLeave={() => setTooltipContent("")}
                  data-tooltip-id="my-tooltip"
                  style={{
                    default: { outline: "none" },
                    hover: {
                      outline: "none",
                      fill: "#faa5a6",
                      transitionDuration: "0.5s",
                    },
                    pressed: { outline: "none" },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default VisitsByCountryMap;
