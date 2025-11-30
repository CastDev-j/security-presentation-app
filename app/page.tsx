"use client";

import { SecurityScene } from "@/components/security-scene";
import { TopicDetailPanel } from "@/components/topic-detail-panel";
import { Header } from "@/components/header";
import { TopicListMobile } from "@/components/topic-list-mobile";

export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden">
      <Header />

      <div className="absolute inset-0 pt-16 hidden md:block">
        <SecurityScene />
      </div>

      <TopicListMobile />
      <TopicDetailPanel />

      <div className="fixed top-20 left-6 z-20 max-w-md hidden lg:block">
        <div className="space-y-2">
          <h2 className="text-4xl font-bold text-balance leading-tight">
            Protección y Seguridad Informática
          </h2>
          <p className="text-lg text-muted-foreground text-balance leading-relaxed">
            Explora las amenazas digitales más comunes y aprende cómo protegerte
            en el mundo digital
          </p>
        </div>
      </div>
    </main>
  );
}
