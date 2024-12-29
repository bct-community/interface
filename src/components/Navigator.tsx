import { useTheme } from "@/providers/theme";
import { House, Newspaper, Link, Sun, Bot } from "lucide-react";
import { ReactNode } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";

interface NavItem {
  icon: ReactNode;
  path?: string;
  action?: () => void;
}

const Navigator = () => {
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const items: NavItem[] = [
    { icon: <House size="18" />, path: "/" },
    { icon: <Newspaper size="18" />, path: "/news" },
    { icon: <Link size="18" />, path: "/links" },
    { icon: <Bot size="18" />, path: "/chat" },
    {
      icon: <Sun size="18" />,
      action: toggleTheme,
    },
  ];

  // const screenWidth = window.screen.availWidth;
  // const isMobile = screenWidth < 768;

  return (
    <nav
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex w-[180px] h-[30px] justify-between shadow-lg shadow-[rgba(0, 0, 0, 0.2)] rounded-md border shadow-inner w-[140px] duration-100 overflow-hidden"
      style={{ zIndex: 1000 }}
    >
      {items.map((item, index) => (
        <Button
          key={index}
          icon={item.icon}
          path={item.path}
          action={item.action}
        />
      ))}
    </nav>
  );
};

interface ButtonProps {
  icon: ReactNode;
  path?: string;
  action?: () => void;
}

const Button = ({ icon, path, action }: ButtonProps) => {
  const location = useLocation();

  return (
    <>
      {path ? (
        <RouterLink
          draggable="false"
          to={path}
          className={`hover:bg-[#fff1] w-full h-full transition-all duration-200 ease-in-out flex items-center justify-center dark:text-white text-black dark:hover:text-[#A6A6A6] hover:text-[#A6A6A6] ${
            location.pathname === path
              ? "text-[#ff708d] dark:text-[#ff708d]"
              : ""
          }`}
        >
          {icon}
        </RouterLink>
      ) : (
        <button
          draggable="false"
          className="hover:bg-[#fff1] w-full h-full transition-all duration-200 ease-in-out flex items-center justify-center dark:text-white text-black dark:hover:text-[#A6A6A6] hover:text-[#A6A6A6]"
          onClick={action}
        >
          {icon}
        </button>
      )}
    </>
  );
};

export default Navigator;
