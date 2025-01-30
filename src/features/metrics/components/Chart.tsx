import { LineChart } from "@opd/g2plot-react";

const Chart = ({
  max,
  data,
}: {
  max: number;
  data: { date: string; quantidade: number }[];
}) => {
  const config = {
    height: 350,
    autoFit: true,
    xField: "date",
    yField: "quantidade",
    smooth: true,
    meta: {
      quantidade: {
        max,
      },
    },
    data,
  };

  return (
    <LineChart color={"#ffbfca"} className="select-none lg:px-16" {...config} />
  );
};

export default Chart;
