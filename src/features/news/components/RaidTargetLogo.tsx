import { RedditOutlineIcon } from "@/components/Icons";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const RaidTargetLogo = () => {
  return (
    <Card className="w-[20%]">
      <CardHeader>
        <CardTitle className="select-none flex items-center space-x-4 text-sm border rounded-full p-4 shadow-inner">
          <img src={RedditOutlineIcon} alt="" />
        </CardTitle>
      </CardHeader>
    </Card>
  );
};

export default RaidTargetLogo;
