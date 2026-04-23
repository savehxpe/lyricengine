"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Float, Line } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function ParticleField({ count = 2400 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.03;
    ref.current.rotation.x += delta * 0.01;
    const { x, y } = state.pointer;
    ref.current.rotation.y += x * 0.0015;
    ref.current.rotation.x += y * 0.0015;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#22d3ee"
        size={0.018}
        sizeAttenuation
        depthWrite={false}
        opacity={0.85}
      />
    </Points>
  );
}

function Soundwave({
  radius = 3.2,
  segments = 96,
  color = "#e879f9",
  speed = 0.8,
  amp = 0.35,
  yOffset = 0,
}: {
  radius?: number;
  segments?: number;
  color?: string;
  speed?: number;
  amp?: number;
  yOffset?: number;
}) {
  const ref = useRef<THREE.Group>(null);
  const basePoints = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= segments; i++) {
      const a = (i / segments) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius));
    }
    return pts;
  }, [radius, segments]);

  const lineRef = useRef<THREE.Vector3[]>(
    basePoints.map((p) => p.clone())
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed;
    for (let i = 0; i < basePoints.length; i++) {
      const bp = basePoints[i];
      const wobble =
        Math.sin(t + i * 0.25) * amp + Math.cos(t * 0.6 + i * 0.11) * amp * 0.5;
      lineRef.current[i].set(bp.x, bp.y + wobble + yOffset, bp.z);
    }
    if (ref.current) ref.current.rotation.y += 0.0015;
  });

  return (
    <group ref={ref}>
      <Line
        points={lineRef.current}
        color={color}
        lineWidth={1}
        transparent
        opacity={0.55}
      />
    </group>
  );
}

function WireTorus() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, d) => {
    if (!ref.current) return;
    ref.current.rotation.x += d * 0.12;
    ref.current.rotation.y += d * 0.08;
  });
  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <torusKnotGeometry args={[1.2, 0.28, 220, 20]} />
      <meshStandardMaterial
        color="#0b0d14"
        wireframe
        emissive="#22d3ee"
        emissiveIntensity={0.15}
      />
    </mesh>
  );
}

function Rig() {
  useFrame((state) => {
    const { x, y } = state.pointer;
    state.camera.position.x += (x * 1.6 - state.camera.position.x) * 0.03;
    state.camera.position.y += (-y * 0.8 - state.camera.position.y) * 0.03;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function Background3D() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 h-full w-full bg-obsidian-950"
    >
      <Canvas
        camera={{ position: [0, 0, 9], fov: 55 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <color attach="background" args={["#05060a"]} />
        <fog attach="fog" args={["#05060a", 8, 22]} />
        <ambientLight intensity={0.15} />
        <pointLight position={[6, 4, 6]} intensity={1.2} color="#22d3ee" />
        <pointLight position={[-6, -3, -4]} intensity={0.7} color="#e879f9" />

        <Rig />

        <Float speed={1.1} rotationIntensity={0.25} floatIntensity={0.8}>
          <WireTorus />
        </Float>

        <Soundwave radius={3.4} color="#22d3ee" speed={0.6} amp={0.2} yOffset={-1.6} />
        <Soundwave radius={4.1} color="#e879f9" speed={0.9} amp={0.3} yOffset={-2.1} />
        <Soundwave radius={5.0} color="#22d3ee" speed={0.45} amp={0.4} yOffset={-2.8} />

        <ParticleField />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-obsidian-950/30 to-obsidian-950" />
    </div>
  );
}
