import { a, useTrail } from "@react-spring/web";
import React, { useMemo } from "react";
import { useInView } from "react-intersection-observer";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import getCurrentDate from "@/utils/getCurrentDate";

const Header: React.FC = () => {
  const { ref, inView } = useInView({ threshold: 0.1 });
  const { formattedDay, capitalizedMonth, year } = useMemo(getCurrentDate, []);

  const elements = [
    {
      component: (
        <PrettyDate
          key="date"
          formattedDay={formattedDay}
          capitalizedMonth={capitalizedMonth}
          year={year}
        />
      ),
      width: "w-[20%]",
    },
    { component: <Heading key="heading" />, width: "w-[40%]" },
    { component: <CommunityLore key="lore" />, width: "w-[20%]" },
  ];

  const trail = useTrail(elements.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: inView ? 1 : 0,
    y: inView ? 0 : 20,
    from: { opacity: 0, y: 20 },
  });

  return (
    <div
      ref={ref}
      className="flex items-center w-full gap-4 mt-2 justify-evenly"
    >
      {trail.map(({ y, ...style }, index) => (
        <a.div
          key={index}
          className={elements[index].width}
          style={{
            ...style,
            transform: y.to((y) => `translate3d(0, ${y}px, 0)`),
          }}
        >
          {elements[index].component}
        </a.div>
      ))}
    </div>
  );
};

const PrettyDate: React.FC<{
  formattedDay: string;
  capitalizedMonth: string;
  year: number;
}> = ({ formattedDay, capitalizedMonth, year }) => (
  <Card className="w-full">
    <CardHeader className="p-0">
      <CardTitle className="flex items-center w-full h-16 text-sm select-none">
        <div className="flex h-full w-[100px] items-center justify-center">
          <span className="text-[32px]">{formattedDay}</span>
        </div>
        <Separator orientation="vertical" />
        <div className="flex flex-col items-center justify-between w-full">
          <span>{capitalizedMonth}</span>
          <span>{year}</span>
        </div>
      </CardTitle>
    </CardHeader>
  </Card>
);

const Heading: React.FC = () => (
  <Card className="w-full">
    <CardHeader className="p-0">
      <CardTitle className="flex h-full w-full select-none items-center justify-center text-[60px]">
        <span className="h-fit">$BCT Raid</span>
      </CardTitle>
    </CardHeader>
  </Card>
);

const CommunityLore: React.FC = () => (
  <Card className="w-full">
    <CardHeader>
      <CardTitle className="w-full text-center select-none">
        <span>Make $BCT Great again</span>
      </CardTitle>
    </CardHeader>
  </Card>
);

export default Header;
