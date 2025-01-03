import Marquee from "react-fast-marquee";
import classNames from "classnames";

type ItemProps = {
  name: string;
  content: string;
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
  return (
    <div className="h-[30px] flex items-center fixed top-0 left-0 w-full bg-[hsl(var(--background))] z-[1000] overflow-hidden select-none border-b">
      <Marquee pauseOnHover={true} className="h-[30px] overflow-hidden">
        <div className="w-full flex items-center justify-evenly mr-3 h-fit">
          <span className="mx-12 coin-ticker-font">$XYZ</span>
          <Item name={"Price"} content={"$0.01"} />
          <Item name={"Price Change (24h)"} content={"+5%"} positive />
          <Item name={"Volume (24h)"} content={"$1M"} />
          <Item name={"Market Cap"} content={"$10M"} />
          <Item name={"Holders"} content={"1,000"} />
          <Item name={"Transactions"} content={"5,000"} />
          <Item name={"Age"} content={"1 year"} />
        </div>
      </Marquee>
    </div>
  );
};

export default TokenMarquee;
