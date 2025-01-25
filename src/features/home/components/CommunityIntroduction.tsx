import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface AnimatedTitleProps {
  children: React.ReactNode;
}

const AnimatedTitle = ({ children }: AnimatedTitleProps) => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      className="AnimatedTitle"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : -20 }}
      transition={{
        duration: 0.6,
        delay: 0.1,
      }}
    >
      {children}
    </motion.div>
  );
};

interface AnimatedPProps {
  children: React.ReactNode;
}

const AnimatedP = ({ children }: AnimatedPProps) => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      className="AnimatedP"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
      transition={{
        duration: 0.5,
        delay: 0.2,
      }}
    >
      {children}
    </motion.div>
  );
};

const CommunityIntroduction = () => {
  const paragraphs = [
    <>
      Eu não lembro exatamente como era minha vida antes da{" "}
      <span className="text-[var(--coin-pink)]">$BCT</span>... E, sendo bem
      sincero, acho que nem quero lembrar.
    </>,
    <>
      A primeira <span className="text-[var(--coin-pink)]">$BCT</span>, cara,
      ninguém esquece. Quando entra, é pra ficar.
    </>,
    <>
      Se você também respira{" "}
      <span className="text-[var(--coin-pink)]">$BCT</span>, vibra com{" "}
      <span className="text-[var(--coin-pink)]">$BCT</span> e não tira a{" "}
      <span className="text-[var(--coin-pink)]">$BCT</span> da cabeça, tá no
      lugar certo.
    </>,
    <>
      Aqui, cada movimento é pensado para extrair o mél da{" "}
      <span className="text-[var(--coin-pink)]">$BCT</span> – e não parar até
      conseguir.
    </>,
    <>
      A revolução começa agora. A{" "}
      <span className="text-[var(--coin-pink)]">$BCT</span> tá{" "}
      <span className="animate-pulse text-[var(--coin-pink)]">piscando</span>.
      Você vem?
    </>,
  ];

  return (
    <div className="flex w-[95%] flex-col items-center justify-center rounded-[12px] bg-transparent bg-opacity-20 px-8 py-16 text-center backdrop-blur-md backdrop-filter">
      <AnimatedTitle>
        <span className="text-giga mb-12 text-center">
          <p>COMUNIDADE</p>
          <p className="text-[var(--coin-pink)]">$BCT</p>
        </span>
      </AnimatedTitle>

      <div className="text-big flex max-w-[1000px] flex-col items-center justify-center">
        {paragraphs.map((content, index) => (
          <AnimatedP key={index}>{content}</AnimatedP>
        ))}
      </div>
    </div>
  );
};

export default CommunityIntroduction;
