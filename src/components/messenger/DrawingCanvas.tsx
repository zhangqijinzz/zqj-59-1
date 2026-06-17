import { useRef, useState, useEffect } from "react";
import { Send, Eraser, Palette, Trash2 } from "lucide-react";

interface DrawingCanvasProps {
  onSend: (drawingData: string) => void;
  disabled?: boolean;
}

const COLORS = ["#333333", "#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#9B59B6"];

export default function DrawingCanvas({ onSend, disabled }: DrawingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#333333");
  const [hasDrawing, setHasDrawing] = useState(false);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.strokeStyle = color;
  }, [color]);

  const getPosition = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ("touches" in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    if (disabled) return;
    setIsDrawing(true);
    lastPosRef.current = getPosition(e);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || disabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pos = getPosition(e);
    const lastPos = lastPosRef.current;

    if (lastPos) {
      ctx.beginPath();
      ctx.moveTo(lastPos.x, lastPos.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    }

    lastPosRef.current = pos;
    setHasDrawing(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    lastPosRef.current = null;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setHasDrawing(false);
  };

  const handleSend = () => {
    if (!hasDrawing || disabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL("image/png");
    onSend(dataUrl);
    clearCanvas();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative bg-white rounded-2xl shadow-soft p-2">
        <canvas
          ref={canvasRef}
          width={320}
          height={240}
          className="rounded-xl cursor-crosshair touch-none border-2 border-dashed border-gray-200"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 bg-white rounded-full px-2 py-1 shadow-soft">
          <Palette size={16} className="text-gray-400" />
          {COLORS.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={`w-6 h-6 rounded-full transition-transform ${
                color === c ? "scale-125 ring-2 ring-offset-2 ring-gray-300" : ""
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        <button
          onClick={clearCanvas}
          className="p-2 bg-white rounded-full shadow-soft text-gray-500 hover:text-red-500 btn-bounce"
          title="擦除"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {hasDrawing && (
        <button
          onClick={handleSend}
          disabled={disabled}
          className="flex items-center gap-2 px-6 py-3 bg-warm-500 text-white rounded-full font-medium shadow-warm btn-bounce hover:bg-warm-600"
        >
          <Send size={18} />
          把这幅画送给爸爸妈妈
        </button>
      )}

      {!hasDrawing && (
        <p className="text-sm text-gray-500">
          在画布上画一幅画，送给远方的爸爸妈妈
        </p>
      )}
    </div>
  );
}
