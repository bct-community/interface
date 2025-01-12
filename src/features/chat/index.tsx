import { useEffect } from "react";

const Chat = () => {
  useEffect(() => {
    document.title = "Comunidade $BCT – Chat";

    return () => {
      document.title = "Comunidade $BCT";
    };
  }, []);

  return (
    <div className="mt-[30px]">
      <span>Chat</span>
    </div>
  );
};

export default Chat;
