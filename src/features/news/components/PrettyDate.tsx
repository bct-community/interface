import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const PrettyDate = () => {
  const date = new Date();
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  return (
    <Card className="w-[20%] card-shadow-sm">
      <CardHeader className="py-0">
        <CardTitle className="select-none flex h-16 items-center space-x-4 text-sm">
          <span className="text-[32px]">{day}</span>
          <Separator orientation="vertical" />
          <div className="flex flex-col justify-between items-center w-full">
            <span>{month}</span>
            <span>{year}</span>
          </div>
        </CardTitle>
      </CardHeader>
    </Card>
  );
};

export default PrettyDate;
