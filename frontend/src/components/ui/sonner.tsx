"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "#ffffff",
          "--normal-text": "oklch(0.63 0.14 193.05)",
          "--normal-border": "oklch(0.63 0.14 193.05)",

          "--success-bg": "#ffffff",
          "--success-text": "oklch(0.63 0.14 193.05)",
          "--error-bg": "#ffffff",
          "--error-text": "#dc2626",
          "--warning-bg": "#ffffff",
          "--warning-text": "#d97706",
          "--info-bg": "#ffffff",
          "--info-text": "oklch(0.63 0.14 193.05)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
