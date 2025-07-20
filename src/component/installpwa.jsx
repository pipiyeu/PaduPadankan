import { useEffect, useState } from "react";
import { Download } from "lucide-react"; // pastikan lucide-react terinstal

export default function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstall(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(outcome);
    setDeferredPrompt(null);
    setShowInstall(false);
  };

  if (!showInstall) return null;

  return (
    <button
      onClick={handleInstall}
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        background: "#10b981",
        color: "white",
        padding: "12px 16px",
        borderRadius: "9999px",
        display: "flex",
        alignItems: "center",
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        gap: 8,
        fontWeight: "600",
        border: "none",
        cursor: "pointer",
        transition: "transform 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      <Download size={18} />
      Install App
    </button>
  );
}
