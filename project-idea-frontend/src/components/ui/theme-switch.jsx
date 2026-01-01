"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function ThemeSwitch({
  variant = "icon-click",
  modes = ["light", "dark", "system"],
  icons,
  showInactiveIcons = "all",
  className,
}) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {modes.map((mode, index) => {
        const isActive = theme === mode;
        const icon = icons[index];

        if (!isActive && showInactiveIcons !== "all") return null;

        return (
          <button
            key={mode}
            onClick={() => setTheme(mode)}
            className={cn(
              "p-2 rounded-full transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800",
              isActive ? "text-primary bg-neutral-100 dark:bg-neutral-800" : "text-muted-foreground"
            )}
            title={`Switch to ${mode} mode`}
          >
            {isActive ? (
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                >
                    {icon}
                </motion.div>
            ) : (
                icon
            )}
          </button>
        );
      })}
    </div>
  );
}
