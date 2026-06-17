import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  color: "warm" | "field" | "sky" | "wheat";
  to: string;
  badge?: string;
}

const colorClasses = {
  warm: {
    bg: "bg-warm-50 hover:bg-warm-100",
    iconBg: "bg-warm-200 text-warm-700",
    title: "text-warm-700",
    desc: "text-warm-600/70",
    border: "border-warm-200",
  },
  field: {
    bg: "bg-field-50 hover:bg-field-100",
    iconBg: "bg-field-200 text-field-700",
    title: "text-field-700",
    desc: "text-field-600/70",
    border: "border-field-200",
  },
  sky: {
    bg: "bg-sky-50 hover:bg-sky-100",
    iconBg: "bg-sky-200 text-sky-700",
    title: "text-sky-700",
    desc: "text-sky-600/70",
    border: "border-sky-200",
  },
  wheat: {
    bg: "bg-wheat-50 hover:bg-wheat-100",
    iconBg: "bg-wheat-200 text-wheat-700",
    title: "text-wheat-700",
    desc: "text-wheat-600/70",
    border: "border-wheat-200",
  },
};

export default function FeatureCard({
  icon,
  title,
  description,
  color,
  to,
  badge,
}: FeatureCardProps) {
  const colors = colorClasses[color];

  return (
    <Link
      to={to}
      className={`block p-5 sm:p-6 rounded-3xl ${colors.bg} border-2 ${colors.border} card-hover group`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`p-3 rounded-2xl ${colors.iconBg} group-hover:scale-110 transition-transform`}
        >
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className={`font-display text-lg sm:text-xl ${colors.title}`}>
              {title}
            </h3>
            {badge && (
              <span className="text-xs px-2 py-0.5 bg-white/60 rounded-full text-gray-600">
                {badge}
              </span>
            )}
          </div>
          <p className={`text-sm ${colors.desc} leading-relaxed`}>
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}
