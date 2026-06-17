interface FlyingBirdProps {
  isFlying: boolean;
  direction?: "to" | "from";
}

export default function FlyingBird({ isFlying, direction = "to" }: FlyingBirdProps) {
  if (!isFlying) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      <div
        className={`absolute top-1/3 ${
          direction === "to" ? "animate-[flyAcross_3s_ease-in-out_forwards]" : "animate-[flyBack_3s_ease-in-out_forwards]"
        }`}
        style={{
          animation: direction === "to" 
            ? "flyAcross 3s ease-in-out forwards" 
            : "flyBack 3s ease-in-out forwards",
        }}
      >
        <div className="text-6xl animate-bounce-gentle">
          🐦
        </div>
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-xs bg-white/90 px-2 py-1 rounded-full whitespace-nowrap text-gray-600">
          {direction === "to" ? "送去爸爸妈妈那里..." : "爸爸妈妈回信啦！"}
        </div>
      </div>

      <style>{`
        @keyframes flyAcross {
          0% {
            left: -10%;
            transform: translateY(0) rotate(0deg);
          }
          25% {
            transform: translateY(-30px) rotate(5deg);
          }
          50% {
            transform: translateY(0) rotate(0deg);
          }
          75% {
            transform: translateY(-20px) rotate(-3deg);
          }
          100% {
            left: 110%;
            transform: translateY(0) rotate(0deg);
          }
        }
        @keyframes flyBack {
          0% {
            right: -10%;
            transform: translateY(0) scaleX(-1) rotate(0deg);
          }
          25% {
            transform: translateY(-30px) scaleX(-1) rotate(-5deg);
          }
          50% {
            transform: translateY(0) scaleX(-1) rotate(0deg);
          }
          75% {
            transform: translateY(-20px) scaleX(-1) rotate(3deg);
          }
          100% {
            right: 110%;
            transform: translateY(0) scaleX(-1) rotate(0deg);
          }
        }
      `}</style>
    </div>
  );
}
