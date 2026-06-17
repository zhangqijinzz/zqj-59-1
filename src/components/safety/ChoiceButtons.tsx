import { StoryChoice } from "@/data/mockStories";
import { CheckCircle, XCircle } from "lucide-react";

interface ChoiceButtonsProps {
  choices: StoryChoice[];
  onChoose: (nextNodeId: string, isCorrect?: boolean) => void;
  disabled?: boolean;
  showResult?: boolean;
  selectedIndex?: number;
}

export default function ChoiceButtons({
  choices,
  onChoose,
  disabled,
  showResult,
  selectedIndex,
}: ChoiceButtonsProps) {
  return (
    <div className="space-y-3 animate-fade-in-up">
      <p className="text-sm text-gray-500 text-center mb-2">你会怎么做呢？</p>
      {choices.map((choice, index) => {
        const isSelected = selectedIndex === index;
        const showCorrectness = showResult && isSelected;
        const isCorrect = choice.isCorrect;

        return (
          <button
            key={index}
            onClick={() => onChoose(choice.nextNodeId, choice.isCorrect)}
            disabled={disabled}
            className={`w-full p-4 text-left rounded-2xl font-medium transition-all btn-bounce
              ${
                showCorrectness
                  ? isCorrect
                    ? "bg-field-100 border-2 border-field-400 text-field-700"
                    : "bg-red-100 border-2 border-red-400 text-red-700"
                  : isSelected
                  ? "bg-sky-100 border-2 border-sky-400 text-sky-700"
                  : "bg-white border-2 border-gray-200 text-gray-700 hover:border-sky-300 hover:bg-sky-50"
              }
              ${disabled && !isSelected ? "opacity-50 cursor-not-allowed" : ""}
            `}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold
                ${
                  showCorrectness
                    ? isCorrect
                      ? "bg-field-500 text-white"
                      : "bg-red-500 text-white"
                    : isSelected
                    ? "bg-sky-500 text-white"
                    : "bg-gray-100 text-gray-500"
                }
              `}
              >
                {showCorrectness ? (
                  isCorrect ? (
                    <CheckCircle size={18} />
                  ) : (
                    <XCircle size={18} />
                  )
                ) : (
                  index + 1
                )}
              </div>
              <span className="flex-1">{choice.text}</span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
