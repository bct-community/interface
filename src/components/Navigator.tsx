import { useTheme } from "@/providers/theme";
import classNames from "classnames";
import {
  House,
  Newspaper,
  Link,
  Sun,
  Bot,
  ChartNoAxesCombined,
  Moon,
} from "lucide-react";
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
    { icon: <ChartNoAxesCombined size="18" />, path: "/metrics" },
    {
      icon: theme === "dark" ? <Sun size="18" /> : <Moon size="18" />,
      action: toggleTheme,
    },
  ];

  // const screenWidth = window.screen.availWidth;
  // const isMobile = screenWidth < 768;

  return (
    <nav
      className="bg-[hsl(var(--background))] fixed bottom-4 left-1/2 transform -translate-x-1/2 flex w-[190px] h-[30px] justify-evenly shadow-lg shadow-[rgba(0, 0, 0, 0.2)] rounded-md border shadow-inner duration-100 overflow-hidden"
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

const Button = (props: ButtonProps) => {
  const location = useLocation();

  return (
    <RouterLink
      draggable="false"
      to={props.path ?? "#"}
      onClick={props.action}
      className={classNames({
        "hover:bg-[#fff1] w-full h-full transition-all duration-200 ease-in-out flex items-center justify-center dark:hover:text-[#A6A6A6] hover:text-[#A6A6A6]":
          true,
        "text-[#ff708d] dark:text-[#ff708d]": location.pathname === props.path,
      })}
    >
      {props.icon}
    </RouterLink>
  );
};

export default Navigator;
