"use client";

import { useSecurityStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export function TopicListMobile() {
  const { topics, setCurrentTopic, toggleDetailView } = useSecurityStore();

  const handleTopicClick = (topicId: string) => {
    setCurrentTopic(topicId);
    toggleDetailView();
  };

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border"
      style={{ zIndex: 9997 }}
    >
      <div className="p-4 overflow-x-auto">
        <div className="flex gap-3 pb-2">
          {topics.map((topic, index) => {
            const Icon = topic.Icon;
            return (
              <motion.div
                key={topic.id}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 200,
                }}
              >
                <Card
                  className="shrink-0 cursor-pointer hover:border-accent transition-colors"
                  onClick={() => handleTopicClick(topic.id)}
                >
                  <Button
                    variant="ghost"
                    className="h-auto p-4 flex flex-col items-center gap-2"
                  >
                    <Icon
                      className="w-8 h-8 text-foreground"
                      strokeWidth={1.5}
                    />
                    <span className="text-xs font-medium text-center whitespace-nowrap">
                      {topic.shortTitle}
                    </span>
                    <ChevronRight className="h-3 w-3 text-muted-foreground" />
                  </Button>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
