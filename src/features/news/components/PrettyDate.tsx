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
        <CardTitle className="select-none flex h-16 items-center text-sm w-full">
          <div className="h-full w-[100px] flex items-center justify-center">
            <span className="text-[32px]">{formattedDay}</span>
          </div>
          <Separator orientation="vertical" />
          <div className="flex flex-col justify-between items-center w-full">
            <span>{capitalizedMonth}</span>
            <span>{year}</span>
          </div>
        </CardTitle>
      </CardHeader>
    </Card>
  );
};

export default PrettyDate;
