import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <select
      className="switcher"
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
      data-test-id="theme-selector"
    >
      <option value="system">System</option>
      {mounted && (
        <>
          <option value="dark">Dark</option>
          <option value="light">Light</option>
        </>
      )}
    </select>
  );
};

export default ThemeSwitcher;
