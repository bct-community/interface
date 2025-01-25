import classNames from "classnames";
import { motion } from "framer-motion";
import { Minus, Moon, Rocket } from "lucide-react";
import { useInView } from "react-intersection-observer";

import { Separator } from "@/components/ui/separator";

const Goal = ({
  title,
  text,
  xLink,
  separatorB,
  separatorT,
  reverse,
  reached,
  isLastestReached,
}: {
  title: string;
  text: string;
  xLink?: string;
  separatorB?: boolean;
  separatorT?: boolean;
  reverse?: boolean;
  reached?: boolean;
  isLastestReached?: boolean;
}) => {
  const openLink = () => (xLink ? window.open(xLink, "_blank") : null);

  // Hook para detectar quando o item entra na viewport
  const { ref, inView } = useInView({
    threshold: 0.2, // animação dispara quando 20% do elemento estiver visível
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }} // Ponto inicial
      animate={inView ? { opacity: 1, y: 0 } : {}} // Animação ao entrar na tela
      transition={{ duration: 0.5, ease: "easeOut" }} // Configuração da transição
      className={classNames({
        "flex gap-4": true,
        "flex-row-reverse": reverse,
      })}
    >
      <div className="flex flex-col items-center">
        {separatorT && (
          <Separator
            orientation="vertical"
            className={classNames({
              "my-2 h-8 w-1 rounded": true,
              "bg-primary": !reached,
              "bg-[var(--coin-pink)]": reached,
            })}
          />
        )}

        <Rocket
          className={classNames({
            "h-6 w-6": true,
            "text-primary": !reached,
            "text-[var(--coin-pink)]": reached,
            "animate-bounce": isLastestReached,
          })}
        />

        {separatorB && (
          <Separator
            orientation="vertical"
            className={classNames({
              "my-2 h-8 w-1 rounded": true,
              "bg-primary": !reached,
              "bg-[var(--coin-pink)]": reached,
            })}
          />
        )}
      </div>
      <div
        className={classNames({
          "flex flex-col": true,
          "mt-12": separatorT,
          "w-[125px]": xLink,
        })}
      >
        <span
          className={classNames({
            "select-none text-sm font-semibold": true,
            "hover:cursor-pointer hover:underline": xLink,
          })}
          onClick={openLink}
        >
          {title}
        </span>
        <span className="select-none text-xs text-muted-foreground">
          {text}
        </span>
      </div>
    </motion.div>
  );
};

const TokenGoals = ({ celebs }: { celebs?: boolean }) => {
  const priceGoals = [
    { price: "$0.34", text: "Prêmio secreto", reached: false },
    { price: "$0.0001", text: "Live da sala", reached: false },
    { price: "$0.16", text: "Reality Show & Token #2", reached: false },
    { price: "$0.08", text: "Live POV tatuagem", reached: false },
    { price: "$0.016", text: "Live da banheira", reached: false },
    {
      price: "$0.008",
      text: "Live da festa da piscina",
      reached: false,
    },
    { price: "$0.0025", text: "Live do quintal", reached: true },
    { price: "$0.001", text: "Live do quarto", reached: true },
    { price: "$0.0005", text: "Live da cozinha", reached: true },
    { price: "$0.00025", text: "Live da garagem", reached: true },
  ];

  const celebsGoals = [
    {
      celeb: "@nobru",
      xLink: "https://x.com/nobru",
      text: "Tatoo: $BCT > $BTC",
      reached: false,
    },
    {
      celeb: "@elonmusk",
      xLink: "https://x.com/elonmusk",
      text: "Maratona de lives",
      reached: false,
    },
    {
      celeb: "@neymarjr",
      xLink: "https://x.com/neymarjr",
      text: "Tatuagem da Anitta",
      reached: false,
    },
    {
      celeb: "@Felcca",
      xLink: "https://x.com/Felcca",
      text: "Eu pinto de rosa",
      reached: false,
    },
    {
      celeb: "@showdavida",
      xLink: "https://x.com/showdavida",
      text: "Airdrop de $BCT",
      reached: false,
    },
    {
      celeb: "@Gaules",
      xLink: "https://x.com/Gaules",
      text: "Airdrop de $BCT",
      reached: false,
    },
    {
      celeb: "@Anitta",
      xLink: "https://x.com/Anitta",
      text: "Airdrop de $BCT",
      reached: false,
    },
    {
      celeb: "@DaniloGentili",
      xLink: "https://x.com/DaniloGentili",
      text: "Airdrop de $BCT",
      reached: false,
    },
  ];

  type Goals = typeof priceGoals | typeof celebsGoals;

  const findLatestReached = (goals: Goals) => {
    return goals.findIndex((goal) => goal.reached === true);
  };

  return (
    <div
      className={classNames({
        "flex flex-col": true,
        "items-end": celebs,
      })}
    >
      <div className="mb-6 flex flex-col">
        <h1 className="font-[Sour Gummy] select-none text-xl font-bold">
          {celebs ? "Celebridades" : "Preço"}
        </h1>

        <p className="select-none text-xs text-muted-foreground">
          {celebs ? "Que precisam adotar #BCT" : "Alvos de recompensa"}
        </p>
      </div>

      <Moon
        className={classNames({
          "h-8 w-8 text-foreground": true,
          "-mr-1": celebs,
        })}
      />
      {!celebs &&
        priceGoals.map((goal, index) => (
          <Goal
            key={index}
            title={goal.price}
            text={goal.text}
            reached={goal.reached}
            isLastestReached={index === findLatestReached(priceGoals)}
            separatorT={index === 0}
            separatorB={index !== 0 || index === 0}
            reverse={celebs}
          />
        ))}

      {celebs &&
        celebsGoals.map((goal, index) => (
          <Goal
            key={index}
            title={goal.celeb}
            text={goal.text}
            xLink={goal.xLink}
            reached={goal.reached}
            isLastestReached={index === findLatestReached(celebsGoals)}
            separatorT={index === 0}
            separatorB={index !== 0 || index === 0}
            reverse={celebs}
          />
        ))}
      <Minus className="h-6 w-6 text-[var(--coin-pink)]" />
    </div>
  );
};

export default TokenGoals;
