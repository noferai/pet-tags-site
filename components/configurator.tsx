"use client";

import { useState, useEffect, useRef } from "react";

type CharmType = "none" | "heart" | "star";

export default function ConfiguratorWithCanvas() {
  const [petName, setPetName] = useState("Барсик");
  const [phone, setPhone] = useState("+7 (900) 000-00-00");
  const [material, setMaterial] = useState("steel");
  const [charm, setCharm] = useState<CharmType>("none");
  const [ropeColor, setRopeColor] = useState("black");

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const charmColors: Record<CharmType, string | null> = {
    none: null,
    heart: "#FF0000",
    star: "#FFD700",
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Шарм
        if (charm !== "none") {
          ctx.fillStyle = charmColors[charm]!;
          ctx.beginPath();
          ctx.arc(230, 150, 15, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  }, [charm]);

  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Настройте адресник</h2>

            <div>
              <label className="block text-sm font-medium">Имя питомца</label>
              <input
                type="text"
                className="mt-1 w-full rounded border-gray-300 shadow-sm"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Номер телефона</label>
              <input
                type="text"
                className="mt-1 w-full rounded border-gray-300 shadow-sm"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Шарм</label>
              <select
                className="mt-1 w-full rounded border-gray-300 shadow-sm"
                value={charm}
                onChange={(e) => setCharm(e.target.value as CharmType)}
              >
                <option value="none">Без шарма</option>
                <option value="heart">Сердце</option>
                <option value="star">Звезда</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-center bg-gray-100 p-6 rounded">
            <canvas ref={canvasRef} width={300} height={300} />
          </div>
        </div>
      </div>
    </section>
  );
}
