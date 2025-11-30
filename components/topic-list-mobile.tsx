"use client";

import { useSecurityStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export function TopicListMobile() {
  const { topics, setCurrentTopic, openDetailView, currentTopic } =
    useSecurityStore();

  const handleTopicClick = (topicId: string) => {
    setCurrentTopic(topicId);
    openDetailView();
  };

  return (
    <div
      className="md:hidden fixed inset-0 bg-background overflow-y-auto pt-16 pb-4"
      style={{ zIndex: 10 }}
    >
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Seguridad Informática</h1>
          <p className="text-sm text-muted-foreground">
            Selecciona un tema para conocer más sobre las amenazas digitales
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {topics.map((topic, index) => {
            const Icon = topic.Icon;
            const isActive = currentTopic === topic.id;
            return (
              <motion.div
                key={topic.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 200,
                }}
              >
                <Card
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    isActive ? "border-accent shadow-md" : ""
                  }`}
                  onClick={() => handleTopicClick(topic.id)}
                  style={{
                    backgroundColor: isActive ? `${topic.color}10` : undefined,
                  }}
                >
                  <div className="p-4 flex flex-col items-center gap-3 text-center">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${topic.color}20` }}
                    >
                      <Icon
                        className="w-8 h-8"
                        style={{ color: topic.color }}
                        strokeWidth={1.5}
                      />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold text-sm leading-tight">
                        {topic.shortTitle}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {topic.description}
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
