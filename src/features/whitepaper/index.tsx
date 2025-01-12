import { a, useTrail } from "@react-spring/web";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

const Trail: React.FC<{ open: boolean; children: React.ReactNode }> = ({
  open,
  children,
}) => {
  const items = React.Children.toArray(children);
  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: open ? 1 : 0,
    x: open ? 0 : -20,
    from: { opacity: 0, x: -20 },
  });

  return (
    <div className="flex gap-2">
      {trail.map(({ x, ...style }, index) => (
        <a.span
          key={index}
          style={{
            ...style,
            transform: x.to((x) => `translate3d(${x}px, 0, 0)`),
          }}
        >
          {items[index]}
        </a.span>
      ))}
    </div>
  );
};

const Whitepaper = () => {
  useEffect(() => {
    document.title = "Comunidade $BCT – Whitepaper";

    return () => {
      document.title = "Comunidade $BCT";
    };
  }, []);

  const title = "A comunidade $BCT".split(" ");
  const paragraphs = [
    "Bem-vindo à nossa comunidade! Somos um grupo dedicado a quem já possui o token $BCT e quer colaborar para gerar valor ao token, além de esclarecer dúvidas sobre sua autenticidade e promover seu crescimento. Aqui, incentivamos a colaboração aberta e proativa, combinada com a inovação para criar projetos e divulgar o $BCT de forma impactante.",
    "Nossa comunidade funciona como um ponto de encontro para criadores, desenvolvedores e entusiastas, onde você pode:",
    " • Produzir e compartilhar artes, músicas, vídeos, jogos e aplicativos.",
    " • Participar de projetos open-source no GitHub, que podem ser usados como experiência profissional.",
    " • Engajar-se nos daily raids nas redes sociais, organizados diariamente para alavancar o alcance do token.",
    "Utilizamos Discord para comunicação principal, X (antigo Twitter) para publicações e engajamento, e GitHub para hospedar e gerenciar projetos open-source. No site da comunidade, você pode acompanhar métricas como cliques em raids, acessos à plataforma e outros indicadores importantes para avaliar o impacto de nossas ações.",
    "Não há requisitos mínimos para participar: basta acompanhar o Discord, o X e nossa plataforma para se manter conectado e contribuir com o que puder. Junte-se a nós e faça parte de uma comunidade dedicada a transformar o $BCT em um token de destaque!",
  ];

  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  const paragraphTrail = useTrail(paragraphs.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: inView ? 1 : 0,
    y: inView ? 0 : 20,
    from: { opacity: 0, y: 20 },
  });

  return (
    <div ref={ref} className="mt-12 flex w-full justify-center">
      <div className="flex w-[60%] flex-col gap-6">
        <Trail open={inView}>
          {title.map((word, index) => (
            <span
              key={index}
              className="select-none text-3xl font-normal italic"
            >
              {word}
            </span>
          ))}
        </Trail>

        {paragraphTrail.map(({ y, ...style }, index) => (
          <a.p
            key={index}
            style={{
              ...style,
              transform: y.to((y) => `translate3d(0, ${y}px, 0)`),
            }}
            className="m-0 select-none text-pretty break-words pb-1 text-justify align-middle text-sm text-white"
          >
            {paragraphs[index]}
          </a.p>
        ))}
      </div>
    </div>
  );
};

export default Whitepaper;
