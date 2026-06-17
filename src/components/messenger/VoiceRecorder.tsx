import { useState, useRef } from "react";
import { Mic, Square, Send } from "lucide-react";

interface VoiceRecorderProps {
  onSend: (voiceData: string) => void;
  disabled?: boolean;
}

export default function VoiceRecorder({ onSend, disabled }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recorded, setRecorded] = useState(false);
  const [duration, setDuration] = useState(0);
  const timerRef = useRef<number | null>(null);

  const startRecording = () => {
    if (disabled) return;
    setIsRecording(true);
    setRecorded(false);
    setDuration(0);

    timerRef.current = window.setInterval(() => {
      setDuration((d) => d + 1);
    }, 1000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    setRecorded(true);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleSend = () => {
    if (!recorded) return;
    onSend(`语音消息 (${formatDuration(duration)})`);
    setRecorded(false);
    setDuration(0);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <button
          onClick={isRecording ? stopRecording : startRecording}
          disabled={disabled}
          className={`w-24 h-24 rounded-full flex items-center justify-center transition-all btn-bounce ${
            isRecording
              ? "bg-red-500 text-white shadow-lg shadow-red-300 animate-pulse"
              : recorded
              ? "bg-field-500 text-white shadow-field"
              : "bg-warm-500 text-white shadow-warm"
          } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {isRecording ? (
            <Square size={36} fill="white" />
          ) : (
            <Mic size={36} />
          )}
        </button>

        {isRecording && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full animate-ping"></div>
        )}
      </div>

      <div className="h-8">
        {isRecording && (
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            <span className="text-sm text-gray-600">
              正在录音 {formatDuration(duration)}
            </span>
          </div>
        )}
        {recorded && !isRecording && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-field-600 font-medium">
              ✓ 已录制 {formatDuration(duration)}
            </span>
          </div>
        )}
      </div>

      {recorded && (
        <button
          onClick={handleSend}
          disabled={disabled}
          className="flex items-center gap-2 px-6 py-3 bg-warm-500 text-white rounded-full font-medium shadow-warm btn-bounce hover:bg-warm-600"
        >
          <Send size={18} />
          让小雁子送给爸爸妈妈
        </button>
      )}

      {!recorded && !isRecording && (
        <p className="text-sm text-gray-500">
          点击麦克风，说说你想对爸爸妈妈说的话
        </p>
      )}
    </div>
  );
}
