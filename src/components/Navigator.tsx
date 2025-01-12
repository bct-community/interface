import classNames from "classnames";
import {
  Bot,
  ChartNoAxesCombined,
  House,
  Link,
  Moon,
  Newspaper,
  Scroll,
  Sun,
} from "lucide-react";
import { ReactNode } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";

import { useTheme } from "@/providers/theme";

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
    { icon: <Scroll size="18" />, path: "/whitepaper" },
    {
      icon: theme === "dark" ? <Sun size="18" /> : <Moon size="18" />,
      action: toggleTheme,
    },
  ];

  // const screenWidth = window.screen.availWidth;
  // const isMobile = screenWidth < 768;

  return (
    <nav
      className="shadow-[rgba(0, 0, 0, 0.2)] fixed bottom-5 left-1/2 flex h-[30px] w-[220px] -translate-x-1/2 transform justify-evenly overflow-hidden rounded-md border bg-[hsl(var(--background))] shadow-inner shadow-lg duration-100"
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
        "flex h-full w-full items-center justify-center transition-all duration-200 ease-in-out hover:bg-[#fff1] hover:text-[#A6A6A6] dark:hover:text-[#A6A6A6]":
          true,
        "text-[#ff708d] dark:text-[#ff708d]": location.pathname === props.path,
      })}
    >
      {props.icon}
    </RouterLink>
  );
};

export default Navigator;
