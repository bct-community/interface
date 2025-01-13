import { useEffect } from "react";

const Arts = () => {
  useEffect(() => {
    document.title = "Comunidade $BCT – Artes";

    return () => {
      document.title = "Comunidade $BCT";
    };
  }, []);

  return (
    <div className="mt-[30px]">
      <span>Artes</span>
    </div>
  );
};

export default Arts;
