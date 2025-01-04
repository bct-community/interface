import { useEffect } from "react";

const Chat = () => {
  useEffect(() => {
    document.title = "XYZ Community – Chat";

    return () => {
      document.title = "XYZ Community";
    };
  }, []);

  return (
    <div className="mt-[30px]">
      <span>Chat</span>
    </div>
  );
};

export default Chat;
