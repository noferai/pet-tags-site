"use client";

import { useState, useEffect, useRef } from "react";

// Типы для параметров
type MaterialType = "steel" | "aluminum" | "plastic";
type RopeColorType = "black" | "red" | "blue";
type CharmType = "none" | "heart" | "star";

export default function ConfiguratorWithCanvas() {
  const [petName, setPetName] = useState("Барсик");
  const [phone, setPhone] = useState("+7 (900) 000-00-00");
  const [material, setMaterial] = useState<MaterialType>("steel");
  const [charm, setCharm] = useState<CharmType>("none");
  const [ropeColor, setRopeColor] = useState<RopeColorType>("black");
  const [isFlipped, setIsFlipped] = useState(false); // Состояние переворота медальона
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Цвета для материалов
  const materialColors: Record<MaterialType, string> = {
    steel: "#C0C0C0",
    aluminum: "#D9D9D9",
    plastic: "#F0F0F0",
  };

  // Цвета для шнурков
  const ropeColors: Record<RopeColorType, string> = {
    black: "#000",
    red: "#FF0000",
    blue: "#0000FF",
  };

  // Цвета для шарма
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

        // Цвет материала медальона
        ctx.fillStyle = materialColors[material];
        ctx.beginPath();
        ctx.arc(150, 150, 100, 0, Math.PI * 2);
        ctx.fill();

        // Рельеф медальона
        ctx.fillStyle = "#e0e0e0";
        ctx.beginPath();
        ctx.arc(150, 150, 90, 0, Math.PI * 2);
        ctx.fill();

        if (!isFlipped) {
          // Передняя сторона

          // Гравировка (шарм)
          if (charm !== "none") {
            ctx.fillStyle = charmColors[charm]!;
            ctx.beginPath();
            if (charm === "heart") {
              ctx.moveTo(150, 110);
              ctx.arc(140, 110, 10, 0, Math.PI * 2);
              ctx.arc(160, 110, 10, 0, Math.PI * 2);
              ctx.lineTo(150, 130);
            } else if (charm === "star") {
              for (let i = 0; i < 5; i++) {
                const angle = (Math.PI / 5) * (2 * i + 1);
                const x = 150 + 15 * Math.cos(angle);
                const y = 95 + 15 * Math.sin(angle);
                ctx.lineTo(x, y);
              }
            }
            ctx.closePath();
            ctx.fill();
          }

          // Имя питомца
          ctx.fillStyle = "#000";
          ctx.font = "20px Arial";
          ctx.textAlign = "center";
          ctx.fillText(petName, 150, 140);
        } else {
          // Задняя сторона
          ctx.fillStyle = "#000";
          ctx.font = "18px Arial";
          ctx.textAlign = "center";
          ctx.fillText(phone, 150, 150);
        }

        // Шнурок (ошейник)
        ctx.strokeStyle = ropeColors[ropeColor];
        ctx.lineWidth = 10;
        ctx.beginPath();
        ctx.arc(150, 150, 115, Math.PI * 0.3, Math.PI * 0.7);
        ctx.stroke();
      }
    }
  }, [petName, phone, material, charm, ropeColor, isFlipped]);

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
                onChange={(e) => setMaterial(e.target.value as MaterialType)}
              >
                <option value="steel">Сталь</option>
                <option value="aluminum">Алюминий</option>
                <option value="plastic">Пластик</option>
              </select>
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

            <div>
              <label className="block text-sm font-medium">Цвет шнурка</label>
              <select
                className="mt-1 w-full rounded border-gray-300 shadow-sm"
                value={ropeColor}
                onChange={(e) => setRopeColor(e.target.value as RopeColorType)}
              >
                <option value="black">Черный</option>
                <option value="red">Красный</option>
                <option value="blue">Синий</option>
              </select>
            </div>

            <button
              onClick={() => setIsFlipped((prev) => !prev)}
              className="mt-4 w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Перевернуть медальон
            </button>
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
