import { FC, useEffect, useState } from "react";

interface DynamicIconProps {
  iconName: string;
  size: number;
}

const DynamicIcon: FC<DynamicIconProps> = ({ iconName, size }) => {
  const [IconComponent, setIconComponent] = useState<React.ComponentType<{
    size: number;
  }> | null>(null);

  useEffect(() => {
    const loadIcon = async () => {
      try {
        const icons = await import("@icons-pack/react-simple-icons");
        if ((icons as any)[iconName]) {
          setIconComponent(
            () =>
              (icons as any)[iconName] as React.ComponentType<{ size: number }>,
          );
        } else {
          setIconComponent(
            () =>
              (icons as any)["SiX"] as React.ComponentType<{ size: number }>,
          );
        }
      } catch (error) {
        const icons = await import("@icons-pack/react-simple-icons");
        setIconComponent(
          () => icons["SiX"] as React.ComponentType<{ size: number }>,
        );
      }
    };

    loadIcon();
  }, [iconName]);

  if (!IconComponent) return <span>...</span>;

  return <IconComponent size={size} />;
};

export default DynamicIcon;
