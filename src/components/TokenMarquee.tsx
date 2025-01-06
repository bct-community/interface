import Marquee from "react-fast-marquee";
import classNames from "classnames";
import { useTokenData } from "@/api/getTokenData";

type ItemProps = {
  name: string;
  content: string | number;
  positive?: boolean;
  negative?: boolean;
};

const Item = ({ name, content, positive, negative }: ItemProps) => {
  return (
    <span className="mx-12 marquee-font">
      <span>{name}:</span>{" "}
      <span
        className={classNames({
          "text-red-500": negative,
          "text-green-500": positive,
        })}
      >
        {content}
      </span>
    </span>
  );
};

const TokenMarquee = () => {
  const { data: tokenData } = useTokenData();

  const tokenBirth = new Date("2024-12-18");
  const now = new Date();
  const ageInMilliseconds = now.getTime() - tokenBirth.getTime();
  const ageInDays = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24));

  return (
    <div className="h-[30px] flex items-center fixed top-0 left-0 w-full bg-[hsl(var(--background))] z-[1000] overflow-hidden select-none border-b">
      <Marquee pauseOnHover={true} className="h-[30px] overflow-hidden">
        <div className="w-full flex items-center justify-evenly mr-3 h-fit">
          <span className="mx-12 coin-ticker-font">$XYZ</span>
          <Item name={"Price"} content={tokenData?.tokenPriceInUSD || "$0"} />
          <Item
            name={"Price Change (24h)"}
            content={tokenData?.changeIn24H || "0%"}
            positive={tokenData?.changeIn24H?.includes("+")}
            negative={tokenData?.changeIn24H?.includes("-")}
          />
          <Item
            name={"Price Change (1h)"}
            content={tokenData?.changeIn1H || "0%"}
            positive={tokenData?.changeIn1H?.includes("+")}
            negative={tokenData?.changeIn1H?.includes("-")}
          />
          <Item
            name={"Volume (24h)"}
            content={tokenData?.volumeIn24H || "$0"}
          />
          <Item name={"Market Cap"} content={tokenData?.marketCap || "$0"} />
          <Item
            name={"Transactions (24h)"}
            content={tokenData?.transactions24H || 0}
          />

          <Item
            name={"Sell (24h)"}
            content={tokenData?.sell24H || 0}
            negative
          />
          <Item name={"Buy (24h)"} content={tokenData?.buy24H || 0} positive />
          <Item name={"Total Supply"} content={tokenData?.totalSupply || "0"} />
          <Item name={"Holders"} content={tokenData?.holders || "10K"} />

          <Item name={"Age"} content={`${ageInDays}d`} />
        </div>
      </Marquee>
    </div>
  );
};

export default TokenMarquee;
