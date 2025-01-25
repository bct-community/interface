import { LineChart } from "@opd/g2plot-react";

const Chart = ({
  max,
  data,
}: {
  max: number;
  data: { date: string; count: number }[];
}) => {
  const config = {
    height: 350,
    autoFit: true,
    xField: "date",
    yField: "count",
    smooth: true,
    meta: {
      count: {
        max,
      },
    },
    data,
  };

  return (
    <LineChart color={"#ffbfca"} className="select-none px-16" {...config} />
  );
};

export default Chart;
