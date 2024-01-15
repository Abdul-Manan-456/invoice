import { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
const ThemeToggle = () => {
  const [isDarkMode, setDarkMode] = useState(false);
  const { resolvedTheme, setTheme, theme } = useTheme();

  const handleThemeClick = () => {
    if (resolvedTheme === "dark") {
      console.log("resolved theme is dark");
      setDarkMode(false);
      // setTheme("light");
    }
    if (resolvedTheme === "light") {
      console.log("resolved theme is light");
      setDarkMode(true);
      // setTheme("dark");
    }
  };
  return (
    <div
      onClick={() => {
        setDarkMode(!isDarkMode);
        theme == "dark" ? setTheme("light") : setTheme("dark");
      }}
    >
      {isDarkMode ? (
        <Image
          src="/icons/sun.svg"
          alt="dark_mode_theme"
          width={20}
          height={20}
        />
      ) : (
        <Image
          src="/icons/moon.svg"
          alt="dark_mode_theme"
          width={20}
          height={20}
        />
      )}
    </div>
  );
};

export default ThemeToggle;
