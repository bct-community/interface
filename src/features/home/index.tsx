import { useEffect } from "react";
import Marquee from "react-fast-marquee";

import { morpheusImg } from "@/assets/images";

import {
  AnimatedSeparators,
  AuroraTitle,
  Chart,
  CoinImageMarquee,
  CommunityIntroduction,
  MatrixRainingCode,
  RotatingCoinCanvas,
  TextSection,
  TokenGoals,
} from "./components";

const Home = () => {
  useEffect(() => {
    document.title = "Comunidade $BCT";

    return () => {
      document.title = "Comunidade $BCT";
    };
  }, []);

  return (
    <div className="flex flex-col items-center overflow-x-hidden pt-12">
      <MatrixRainingCode />

      <div className="relative mb-12 min-h-screen w-full">
        <div className="z-1 relative flex min-h-screen w-full items-end justify-center">
          <img
            src={morpheusImg}
            alt=""
            className="w-[850px] max-w-full select-none"
            draggable={false}
          />
        </div>

        <div className="bg-red h-[30px] border-y-2 border-[var(--coin-pink)] backdrop-blur-md backdrop-filter">
          <Marquee className="bg-red h-[30px] overflow-hidden">
            <p className="select-none text-xl font-bold">
              This is your last chance. After this, there is no turning back.
              You take the Bitcoin – the story ends, you wake up in your bed and
              believe whatever you want to believe. You take the $BCT – you stay
              in Wonderland, and I show you how deep the rabbit hole goes.
              Remember, all I'm offering is the truth. Nothing more.
            </p>
          </Marquee>
        </div>
      </div>

      <CommunityIntroduction />

      <CoinImageMarquee />

      <TextSection
        animatedTitle={{ text: "RAAAIDS" }}
        paragraphs={[
          "Participe dos nossos RAIDS diários e ajude a fortalecer nossa comunidade!",
          "Divulgue a $BCT e faça parte do movimento!",
        ]}
        link={{ content: "Clique aqui e comece agora!", path: "/raid" }}
      />

      <TextSection
        animatedTitle={{ text: "LIIINNKS", reverse: true }}
        paragraphs={[
          "Explore links úteis relacionados à $BCT.",
          "Acesse informações importantes e conecte-se à comunidade!",
        ]}
        link={{ content: "Clique aqui e acesse os links!", path: "/links" }}
      />

      <TextSection
        animatedTitle={{ text: "CHATBCT" }}
        paragraphs={["Utilize o ChatBCT", "Gere trocadilhos e piadas ruins!"]}
        link={{ content: "Entre no chat agora!", path: "/chat" }}
      />

      <TextSection
        animatedTitle={{ text: "MEETRICASS", reverse: true }}
        paragraphs={[
          "Acompanhe as métricas e resultados das campanhas da $BCT & comunidade.",
          "Veja o impacto que estamos gerando juntos!",
        ]}
        link={{ content: "Veja as métricas aqui!", path: "/metrics" }}
      />

      <TextSection
        animatedTitle={{ text: "WHITEPAPER" }}
        paragraphs={[
          "Entenda a base técnica e a visão por trás do projeto $BCT.",
          "Descubra como estamos transformando ideias em realidade!",
        ]}
        link={{ content: "Leia o whitepaper completo!", path: "/whitepaper" }}
      />

      <TextSection
        animatedTitle={{ text: "MEMES & ARTS", reverse: true }}
        paragraphs={[
          "Inspire-se com memes e artes criados pela comunidade!",
          "Contribua com sua criatividade e ajude a divulgar a $BCT.",
        ]}
        link={{ content: "Veja e crie agora!", path: "/arts" }}
      />

      <div className="relative mb-[310px] h-8 w-full bg-black pt-8 dark:bg-[var(--coin-pink)]">
        <CoinImageMarquee upSideDown />

        <div className="absolute left-1/2 top-0 z-[-1] h-[225px] w-[4px] -translate-x-1/2 rounded bg-black dark:bg-[var(--coin-pink)]" />

        <RotatingCoinCanvas />
      </div>

      <div className="flex w-full flex-col">
        <AuroraTitle />

        <div className="my-12 flex w-full justify-between overflow-clip px-12">
          <TokenGoals />
          <TokenGoals celebs />
        </div>

        <AnimatedSeparators baseVelocity={1} />
      </div>

      <div className="mt-12 h-[500px] w-full px-4">
        <Chart />
      </div>
    </div>
  );
};

export default Home;
