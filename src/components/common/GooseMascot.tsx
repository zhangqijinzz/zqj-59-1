interface GooseMascotProps {
  size?: "sm" | "md" | "lg";
  message?: string;
  animated?: boolean;
}

export default function GooseMascot({
  size = "md",
  message,
  animated = true,
}: GooseMascotProps) {
  const sizeClasses = {
    sm: "text-4xl",
    md: "text-6xl",
    lg: "text-8xl",
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className={`${sizeClasses[size]} ${
          animated ? "animate-float" : ""
        } select-none`}
      >
        🐦
      </div>
      {message && (
        <div className="relative mt-3">
          <div className="bg-white px-5 py-3 rounded-2xl shadow-soft max-w-xs">
            <p className="text-gray-700 text-sm leading-relaxed">{message}</p>
          </div>
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white rotate-45"></div>
        </div>
      )}
    </div>
  );
}
