"use client";

import { Shield } from "lucide-react";
import { useSecurityStore } from "@/lib/store";
import { motion } from "framer-motion";

export function Header() {
  const { currentTopic, topics } = useSecurityStore();
  const topic = topics.find((t) => t.id === currentTopic);
  const Icon = topic?.Icon;

  return (
    <header
      className="fixed top-0 left-0 right-0 border-b border-border bg-background/80 backdrop-blur-md"
      style={{ zIndex: 9998 }}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <Shield className="h-6 w-6 text-accent" />
          <div>
            <h1 className="text-xl font-bold">Sistemas Operativos</h1>
            <p className="text-xs text-muted-foreground hidden md:block">
              Protección y Seguridad
            </p>
          </div>
        </motion.div>

        {topic && Icon && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="flex items-center gap-2 text-sm"
          >
            <Icon className="w-6 h-6 text-accent" strokeWidth={1.5} />
            <span className="font-medium hidden md:inline">{topic.title}</span>
          </motion.div>
        )}
      </div>
    </header>
  );
}
