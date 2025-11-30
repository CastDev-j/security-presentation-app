"use client";

import { useSecurityStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  AlertTriangle,
  CheckCircle2,
  Info,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";

export function TopicDetailPanel() {
  const {
    currentTopic,
    isDetailView,
    topics,
    navigateToNextTopic,
    navigateToPreviousTopic,
    closeDetailView,
  } = useSecurityStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  const topic = topics.find((t) => t.id === currentTopic);
  const currentIndex = topics.findIndex((t) => t.id === currentTopic);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [currentTopic]);

  if (!topic || !isDetailView) return null;

  const Icon = topic.Icon;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 400 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 400 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed inset-0 h-screen w-full md:w-[480px] md:right-0 md:left-auto bg-background md:border-l border-border shadow-2xl overflow-y-auto"
        style={{ zIndex: 10000 }}
        ref={scrollRef}
      >
        <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-10 p-3  border-b border-border">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex items-start justify-between gap-2 mt-1"
          >
            <div className="flex items-center gap-4 flex-1 min-w-0 px-2">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="shrink-0"
              >
                <Icon className="w-6 h-6 text-accent" strokeWidth={1.5} />
              </motion.div>
              <div className="min-w-0">
                <h2 className="text-lg font-bold text-balance">
                  {topic.title}
                </h2>
                <div className="min-w-0 block sm:hidden">
                  <p className="text-foreground">{topic.title}</p>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={closeDetailView}
              className="shrink-0"
            >
              <X className="h-5 w-5" />
            </Button>
          </motion.div>
        </div>

        <div className="p-6 space-y-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-accent" />
                  <CardTitle>Definición</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-balance">
                  {topic.details.definition}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  <CardTitle>Ejemplos Comunes</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {topic.details.examples.map((example, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                    className="flex items-start gap-2"
                  >
                    <Badge variant="outline" className="mt-0.5 shrink-0">
                      {index + 1}
                    </Badge>
                    <p className="text-sm leading-relaxed">{example}</p>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-accent" />
                  <CardTitle>Medidas de Prevención</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {topic.details.prevention.map((measure, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.6 + index * 0.05 }}
                    className="flex items-start gap-2"
                  >
                    <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <p className="text-sm leading-relaxed">{measure}</p>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <Card className="border-destructive/50 bg-destructive/5">
              <CardHeader>
                <CardTitle className="text-destructive">
                  Impacto Potencial
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-balance">
                  {topic.details.impact}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex gap-3"
          >
            <Button
              onClick={navigateToPreviousTopic}
              variant="outline"
              className="flex-1 bg-transparent"
              size="lg"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Anterior
            </Button>
            <Button
              onClick={navigateToNextTopic}
              variant="outline"
              className="flex-1 bg-transparent"
              size="lg"
            >
              Siguiente
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
