import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const Heading = () => {
  return (
    <Card className="w-[40%] card-shadow-sm">
      <CardHeader className="p-0">
        <CardTitle className="text-[60px] text-center select-none">
          News
        </CardTitle>
      </CardHeader>
    </Card>
  );
};

export default Heading;
