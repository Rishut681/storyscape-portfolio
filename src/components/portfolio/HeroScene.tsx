import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Sphere, Torus, Icosahedron } from "@react-three/drei";
import * as THREE from "three";

function CoreOrb() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.35;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.1;
  });
  return (
    <group>
      <Sphere ref={ref} args={[1.15, 64, 64]}>
        <meshStandardMaterial
          color="#0a1420"
          metalness={0.85}
          roughness={0.15}
          emissive="#0a2a3a"
          emissiveIntensity={0.4}
        />
      </Sphere>
      {/* Inner glow core */}
      <Sphere args={[0.55, 32, 32]}>
        <meshBasicMaterial color="#f59e0b" />
      </Sphere>
      {/* Orbit rings */}
      {[1.7, 2.1, 2.5].map((r, i) => (
        <Torus key={r} args={[r, 0.006, 16, 128]} rotation={[Math.PI / 2 + i * 0.2, i * 0.3, 0]}>
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.35} />
        </Torus>
      ))}
    </group>
  );
}

function OrbitNode({ angle, radius, label, color, speed = 0.15 }: { angle: number; radius: number; label: string; color: string; speed?: number }) {
  const ref = useRef<THREE.Group>(null!);
  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + angle;
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.z = Math.sin(t) * radius;
    ref.current.position.y = Math.sin(t * 1.5) * 0.15;
    ref.current.rotation.y = -t;
  });
  return (
    <group ref={ref}>
      <Float floatIntensity={0.6} rotationIntensity={0.4} speed={2}>
        <Icosahedron args={[0.32, 0]}>
          <meshStandardMaterial color={color} metalness={0.7} roughness={0.25} emissive={color} emissiveIntensity={0.35} />
        </Icosahedron>
      </Float>
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight position={[5, 5, 5]} intensity={40} color="#38bdf8" />
      <pointLight position={[-4, -3, 2]} intensity={20} color="#a3e635" />
      <pointLight position={[0, 0, 3]} intensity={8} color="#f59e0b" />
      <CoreOrb />
      <OrbitNode angle={0} radius={2.4} label="Design" color="#38bdf8" speed={0.18} />
      <OrbitNode angle={1.05} radius={2.4} label="Frontend" color="#a3e635" speed={0.18} />
      <OrbitNode angle={2.1} radius={2.4} label="Backend" color="#f472b6" speed={0.18} />
      <OrbitNode angle={3.14} radius={2.4} label="AI" color="#f59e0b" speed={0.18} />
      <OrbitNode angle={4.19} radius={2.4} label="Deploy" color="#818cf8" speed={0.18} />
      <OrbitNode angle={5.24} radius={2.4} label="Systems" color="#22d3ee" speed={0.18} />
    </>
  );
}

export function HeroScene() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return (
      <div className="relative aspect-square w-full">
        <div className="absolute inset-1/4 rounded-full bg-brand-cyan/20 blur-3xl animate-pulse" />
      </div>
    );
  }
  return (
    <Canvas camera={{ position: [0, 0.6, 5.5], fov: 45 }} dpr={[1, 2]} className="!absolute inset-0">
      <Scene />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.6} />
    </Canvas>
  );
}