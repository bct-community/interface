import { useEffect } from "react";

const Links = () => {
  useEffect(() => {
    document.title = "XYZ Community – Links";

    return () => {
      document.title = "XYZ Community";
    };
  }, []);

  return (
    <div className="mt-[30px]">
      <span>Links</span>
    </div>
  );
};

export default Links;
