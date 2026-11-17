import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { useUIStore } from "@/stores/uiStore";
import { ScrollToTop } from "./components/layout/ScrollToTop";

export default function App() {
  const theme = useUIStore((state) => state.theme);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col transition-colors duration-150">
      <ScrollToTop />
      <Header />

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
