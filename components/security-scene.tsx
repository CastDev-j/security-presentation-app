"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Environment, Float, Html } from "@react-three/drei";
import { useSecurityStore } from "@/lib/store";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";

function SecurityNode({
  position,
  topic,
  index,
}: {
  position: [number, number, number];
  topic: any;
  index: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const { setCurrentTopic, openDetailView, currentTopic, isDetailView } =
    useSecurityStore();
  const isActive = currentTopic === topic.id;
  const Icon = topic.Icon;
  const targetScale = useRef(1);

  const handleClick = (e: any) => {
    e.stopPropagation();
    setCurrentTopic(topic.id);
    openDetailView();
  };

  useEffect(() => {
    targetScale.current = isActive ? 2 : 1;
  }, [isActive]);

  useFrame(() => {
    if (meshRef.current) {
      const currentScale = meshRef.current.scale.x;
      const newScale = THREE.MathUtils.lerp(
        currentScale,
        targetScale.current,
        0.1
      );
      meshRef.current.scale.setScalar(newScale);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <group position={position}>
        <mesh ref={meshRef} onClick={handleClick}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color={isActive ? topic.color : "#e5e7eb"}
            metalness={0.3}
            roughness={0.4}
            emissive={isActive ? topic.color : "#000000"}
            emissiveIntensity={isActive ? 0.5 : 0}
          />
        </mesh>
      </group>
    </Float>
  );
}

function SecurityNodeLabels({
  position,
  topic,
  index,
  isActive,
}: {
  position: [number, number, number];
  topic: any;
  index: number;
  isActive: boolean;
}) {
  const Icon = topic.Icon;
  const iconYPosition = isActive ? 1.4 : 0.7;
  const textYPosition = isActive ? 1.9 : 1.1;

  return (
    <group position={position}>
      <Html
        position={[0, iconYPosition, 0]}
        center
        distanceFactor={8}
        zIndexRange={[0, 0]}
        style={{
          transition: "all 0.3s",
          opacity: 1,
          pointerEvents: "none",
        }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: index * 0.1,
            type: "spring",
            stiffness: 200,
          }}
          className="flex items-center justify-center"
        >
          <Icon
            className="w-10 h-10"
            style={{ color: topic.iconColor }}
            strokeWidth={1.5}
          />
        </motion.div>
      </Html>

      <Html
        position={[0, textYPosition, 0]}
        center
        distanceFactor={10}
        zIndexRange={[0, 0]}
        style={{
          pointerEvents: "none",
        }}
      >
        <div className="text-sm font-bold text-foreground whitespace-nowrap">
          {topic.shortTitle}
        </div>
      </Html>
    </group>
  );
}

function ConnectionLines() {
  const { topics } = useSecurityStore();
  const radius = 4;

  return (
    <group>
      {topics.map((_, index) => {
        const angle1 = (index / topics.length) * Math.PI * 2;
        const x1 = Math.cos(angle1) * radius;
        const z1 = Math.sin(angle1) * radius;

        const nextIndex = (index + 1) % topics.length;
        const angle2 = (nextIndex / topics.length) * Math.PI * 2;
        const x2 = Math.cos(angle2) * radius;
        const z2 = Math.sin(angle2) * radius;

        const points = [
          new THREE.Vector3(x1, 0, z1),
          new THREE.Vector3(x2, 0, z2),
        ];

        const geometry = new THREE.BufferGeometry().setFromPoints(points);

        return (
          <line key={index} geometry={geometry}>
            <lineBasicMaterial color="#cbd5e0" opacity={0.3} transparent />
          </line>
        );
      })}
    </group>
  );
}

function CameraController() {
  const { camera } = useThree();
  const { currentTopic, topics, isDetailView } = useSecurityStore();
  const targetPosition = useRef(new THREE.Vector3(0, 0, 10));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useEffect(() => {
    if (currentTopic && isDetailView) {
      const topicIndex = topics.findIndex((t) => t.id === currentTopic);
      if (topicIndex !== -1) {
        const radius = 4;
        const angle = (topicIndex / topics.length) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;

        const cameraDistance = 8;
        const cameraX = Math.cos(angle) * cameraDistance;
        const cameraZ = Math.sin(angle) * cameraDistance;

        targetPosition.current.set(cameraX, 5, cameraZ);
        targetLookAt.current.set(x, 0, z);
      }
    } else {
      targetPosition.current.set(0, 5, 10);
      targetLookAt.current.set(0, 0, 0);
    }
  }, [currentTopic, isDetailView, topics]);

  useFrame(() => {
    camera.position.lerp(targetPosition.current, 0.05);

    const currentLookAt = new THREE.Vector3();
    camera.getWorldDirection(currentLookAt);
    currentLookAt.multiplyScalar(10).add(camera.position);

    currentLookAt.lerp(targetLookAt.current, 0.05);
    camera.lookAt(currentLookAt);
  });

  return null;
}

export function SecurityScene() {
  const { topics, currentTopic } = useSecurityStore();
  const radius = 4;

  return (
    <div className="w-full h-screen">
      <Canvas
        camera={{ position: [2, 5, 10], fov: 50 }}
        style={{ background: "transparent" }}
        raycaster={{ filter: (items) => items.slice(0, 1) }}
      >
        <ambientLight intensity={0.5} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        <Environment preset="city" />

        <ConnectionLines />

        {topics.map((topic, index) => {
          const angle = (index / topics.length) * Math.PI * 2;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          const isActive = currentTopic === topic.id;

          return (
            <group key={topic.id}>
              <SecurityNode position={[x, 0, z]} topic={topic} index={index} />
              <SecurityNodeLabels
                position={[x, 0, z]}
                topic={topic}
                index={index}
                isActive={isActive}
              />
            </group>
          );
        })}

        <CameraController />

        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={11}
          maxDistance={15}
          maxPolarAngle={Math.PI}
          minPolarAngle={Math.PI / 2.2}
        />
      </Canvas>
    </div>
  );
}
