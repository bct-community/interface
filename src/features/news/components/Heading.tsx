import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const Heading = () => {
  return (
    <Card className="w-[40%] card-shadow-sm">
      <CardHeader className="p-0">
        <CardTitle className="text-[60px] flex items-center justify-center select-none w-full h-full">
          <span className="h-fit">
            News
          </span>
        </CardTitle>
      </CardHeader>
    </Card>
  );
};

export default Heading;
