// components/Toast.tsx
import { useEffect } from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
}

const Toast = ({ message, type = "info", onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000); // auto-close after 4s

    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor =
    type === "success" ? "bg-green-500" :
    type === "error" ? "bg-red-500" :
    "bg-blue-500";

  return (
    <div className={`fixed top-5 right-5 z-50 px-6 py-4 rounded-lg shadow-lg ${bgColor} text-white font-semibold animate-slideIn`}>
      {message}
      <button onClick={onClose} className="ml-4 font-bold">×</button>
    </div>
  );
};

export default Toast;
