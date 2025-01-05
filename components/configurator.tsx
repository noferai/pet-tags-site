"use client";

import { useState, useEffect, useRef } from "react";

export default function ConfiguratorWithCanvas() {
  const [petName, setPetName] = useState("Барсик");
  const [phone, setPhone] = useState("+7 (900) 000-00-00");
  const [size, setSize] = useState("small");
  const [material, setMaterial] = useState("steel");
  const [coating, setCoating] = useState("none");
  const [charm, setCharm] = useState("none");
  const [ropeColor, setRopeColor] = useState("black");

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Очистка холста
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Задний фон (имитирует материал)
        const materialColors = {
          steel: "#C0C0C0",
          aluminum: "#D9D9D9",
          plastic: "#F0F0F0",
        };
        ctx.fillStyle = materialColors[material];
        ctx.beginPath();
        ctx.arc(150, 150, 100, 0, Math.PI * 2);
        ctx.fill();

        // Покрытие (наложение)
        if (coating !== "none") {
          ctx.fillStyle = coating === "gold" ? "#FFD700" : "#C0C0C0";
          ctx.globalAlpha = 0.3;
          ctx.beginPath();
          ctx.arc(150, 150, 100, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;
        }

        // Имя питомца
        ctx.fillStyle = "#000";
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.fillText(petName, 150, 140);

        // Телефон
        ctx.font = "16px Arial";
        ctx.fillText(phone, 150, 170);

        // Шарм
        if (charm !== "none") {
          const charmColors = {
            heart: "#FF0000",
            star: "#FFD700",
          };
          ctx.fillStyle = charmColors[charm];
          ctx.beginPath();
          ctx.arc(230, 150, 15, 0, Math.PI * 2);
          ctx.fill();
        }

        // Шнурок
        const ropeColors = {
          black: "#000",
          red: "#FF0000",
          blue: "#0000FF",
        };
        ctx.strokeStyle = ropeColors[ropeColor];
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.arc(150, 150, 110, Math.PI * 0.3, Math.PI * 0.7);
        ctx.stroke();
      }
    }
  }, [petName, phone, material, coating, charm, ropeColor]);

  return (
    <section className="relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Форма */}
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
              <label className="block text-sm font-medium">Материал</label>
              <select
                className="mt-1 w-full rounded border-gray-300 shadow-sm"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
              >
                <option value="steel">Сталь</option>
                <option value="aluminum">Алюминий</option>
                <option value="plastic">Пластик</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium">Покрытие</label>
              <select
                className="mt-1 w-full rounded border-gray-300 shadow-sm"
                value={coating}
                onChange={(e) => setCoating(e.target.value)}
              >
                <option value="none">Без покрытия</option>
                <option value="gold">Золото</option>
                <option value="silver">Серебро</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium">Шарм</label>
              <select
                className="mt-1 w-full rounded border-gray-300 shadow-sm"
                value={charm}
                onChange={(e) => setCharm(e.target.value)}
              >
                <option value="none">Без шарма</option>
                <option value="heart">Сердце</option>
                <option value="star">Звезда</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium">Цвет шнурка</label>
              <select
                className="mt-1 w-full rounded border-gray-300 shadow-sm"
                value={ropeColor}
                onChange={(e) => setRopeColor(e.target.value)}
              >
                <option value="black">Черный</option>
                <option value="red">Красный</option>
                <option value="blue">Синий</option>
              </select>
            </div>
          </div>

          {/* Превью на Canvas */}
          <div className="flex items-center justify-center bg-gray-100 p-6 rounded">
            <canvas ref={canvasRef} width={300} height={300} />
          </div>
        </div>
      </div>
    </section>
  );
}
