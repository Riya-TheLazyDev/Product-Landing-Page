"use client";

import React, { createContext, useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export interface Notification {
  id: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
}

interface NotificationContextType {
  notifications: Notification[];
  showNotification: (message: string, type?: Notification["type"]) => void;
  removeNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const showNotification = (message: string, type: Notification["type"] = "info") => {
    const id = Math.random().toString(36).substr(2, 9);
    setNotifications((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      removeNotification(id);
    }, 4000);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotificationContext.Provider value={{ notifications, showNotification, removeNotification }}>
      {children}
      {/* Toast Notification Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        <AnimatePresence>
          {notifications.map((n) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
              className={`p-4 rounded-xl border pointer-events-auto shadow-lg backdrop-blur-md flex items-center justify-between text-[11px] font-bold uppercase tracking-widest ${
                n.type === "success"
                  ? "bg-emerald-950/90 border-emerald-500/20 text-emerald-400"
                  : n.type === "error"
                  ? "bg-rose-950/90 border-rose-500/20 text-rose-400"
                  : n.type === "warning"
                  ? "bg-amber-950/90 border-amber-500/20 text-amber-400"
                  : "bg-black/90 border-white/10 text-white"
              }`}
            >
              <span>{n.message}</span>
              <button
                onClick={() => removeNotification(n.id)}
                className="text-current opacity-60 hover:opacity-100 font-bold ml-4"
              >
                ✕
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
}

export function useNotificationContext() {
  const context = useContext(NotificationContext);
  if (!context) throw new Error("useNotificationContext must be used within a NotificationProvider");
  return context;
}
