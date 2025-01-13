import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const PrettyDate = () => {
  const date = new Date();
  const day = date.getDate();
  const formattedDay = day < 10 ? `0${day}` : day;
  const month = date.toLocaleString("default", { month: "long" });
  const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
  const year = date.getFullYear();

  return (
    <Card className="w-[20%]">
      <CardHeader className="p-0">
        <CardTitle className="flex h-16 w-full select-none items-center text-sm">
          <div className="flex h-full w-[100px] items-center justify-center">
            <span className="text-[32px]">{formattedDay}</span>
          </div>
          <Separator orientation="vertical" />
          <div className="flex w-full flex-col items-center justify-between">
            <span>{capitalizedMonth}</span>
            <span>{year}</span>
          </div>
        </CardTitle>
      </CardHeader>
    </Card>
  );
};

export default PrettyDate;
