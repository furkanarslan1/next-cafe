"use client";

import { MENU_CONFIG, MainCategoryKey } from "@/config/menuConfig";
import { Download, QrCode } from "lucide-react";
import { useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const MENU_PAGES = [
  { label: "Main Menu", path: "/menu" },
  ...Object.entries(MENU_CONFIG).map(([key, val]) => ({
    label: val.label,
    path: `/menu/${key}`,
  })),
] satisfies { label: string; path: string }[];

export default function QrCodeGenerator() {
  const [baseUrl, setBaseUrl] = useState(
    typeof window !== "undefined" ? window.location.origin : "",
  );
  const [selectedPath, setSelectedPath] = useState("/menu");
  const [size, setSize] = useState(256);
  const canvasRef = useRef<HTMLDivElement>(null);

  const qrValue = `${baseUrl}${selectedPath}`;

  const handleDownload = () => {
    const canvas = canvasRef.current?.querySelector("canvas");
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `qr-${selectedPath.replace(/\//g, "-").slice(1) || "menu"}.png`;
    a.click();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      {/* SETTINGS */}
      <div className="space-y-5 border border-stone-200 rounded-2xl p-6 shadow-sm">
        <div className="space-y-1.5">
          <Label>Site URL</Label>
          <Input
            value={baseUrl}
            onChange={(e) => setBaseUrl(e.target.value.replace(/\/$/, ""))}
            placeholder="https://yourcafe.com"
          />
          <p className="text-xs text-muted-foreground">
            The domain where your menu is hosted.
          </p>
        </div>

        <div className="space-y-1.5">
          <Label>Menu Page</Label>
          <div className="flex flex-wrap gap-2">
            {MENU_PAGES.map((page) => (
              <button
                key={page.path}
                onClick={() => setSelectedPath(page.path)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border ${
                  selectedPath === page.path
                    ? "bg-stone-900 text-white border-stone-900"
                    : "bg-white text-stone-600 border-stone-200 hover:border-stone-400"
                }`}
              >
                {page.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <Label>Size: {size}px</Label>
          <input
            type="range"
            min={128}
            max={512}
            step={32}
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="w-full accent-stone-800"
          />
        </div>

        <div className="space-y-1.5">
          <Label>URL Preview</Label>
          <p className="text-xs font-mono bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 break-all text-stone-700">
            {qrValue}
          </p>
        </div>
      </div>

      {/* PREVIEW & DOWNLOAD */}
      <div className="flex flex-col items-center gap-5 border border-stone-200 rounded-2xl p-6 shadow-sm">
        <div ref={canvasRef} className="rounded-xl overflow-hidden p-4 bg-white border border-stone-100 shadow-inner">
          <QRCodeCanvas
            value={qrValue}
            size={size}
            bgColor="#ffffff"
            fgColor="#1c1917"
            level="M"
          />
        </div>

        <Button onClick={handleDownload} className="w-full gap-2">
          <Download className="w-4 h-4" />
          Download PNG
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          Print and place on tables. Customers scan to open the menu directly.
        </p>
      </div>
    </div>
  );
}