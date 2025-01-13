import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const Heading = () => {
  return (
    <Card className="card-shadow-sm w-[40%]">
      <CardHeader className="p-0">
        <CardTitle className="flex h-full w-full select-none items-center justify-center text-[60px]">
          <span className="h-fit">$BCT Raid</span>
        </CardTitle>
      </CardHeader>
    </Card>
  );
};

export default Heading;
