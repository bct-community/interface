import { useEffect } from "react";

const Metrics = () => {
  useEffect(() => {
    document.title = "XYZ Community – Metrics";

    return () => {
      document.title = "XYZ Community";
    };
  }, []);

  return (
    <div className="mt-[30px]">
      <span>Metrics</span>
    </div>
  );
};

export default Metrics;
