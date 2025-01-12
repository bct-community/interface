import { useEffect } from "react";

const Metrics = () => {
  useEffect(() => {
    document.title = "Comunidade $BCT – Metricas";

    return () => {
      document.title = "Comunidade $BCT";
    };
  }, []);

  return (
    <div className="mt-[30px]">
      <span>Metrics</span>
    </div>
  );
};

export default Metrics;
