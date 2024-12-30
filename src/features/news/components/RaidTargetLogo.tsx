import { instagramLogo } from "@/assets/logos";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const RaidTargetLogo = () => {
  return (
    <Card className="w-[20%] card-shadow-lg">
      <CardHeader className="flex items-center justify-center">
        <CardTitle className="select-none w-[220px] h-[220px] flex items-center justify-center space-x-4 text-sm border rounded-full p-4">
          <img src={instagramLogo} draggable={false} className="w-[50%]" />
        </CardTitle>
      </CardHeader>
    </Card>
  );
};

export default RaidTargetLogo;
