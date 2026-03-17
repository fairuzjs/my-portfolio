"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function FloatingShapes() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state: any) => {
    if (groupRef.current) {
      // Base rotation from time
      const timeRotationX = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
      const timeRotationY = state.clock.elapsedTime * 0.05;

      // Mouse parallax effect
      // state.pointer ranges from -1 to +1 on both x and y axes
      const targetRotationX = timeRotationX + (state.pointer.y * 0.2); 
      const targetRotationY = timeRotationY + (state.pointer.x * 0.3);

      // Smoothly interpolate current rotation to target rotation using Lerp
      groupRef.current.rotation.x += (targetRotationX - groupRef.current.rotation.x) * 0.05;
      groupRef.current.rotation.y += (targetRotationY - groupRef.current.rotation.y) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Tosca Cube */}
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[-4, 2, -5]} rotation={[Math.PI / 4, 0, 0]}>
          <boxGeometry args={[1.5, 1.5, 1.5]} />
          <meshPhysicalMaterial 
            color="#4FD1C5" 
            transmission={0.9} 
            opacity={1} 
            metalness={0.1} 
            roughness={0.1} 
            ior={1.5} 
            thickness={2} 
          />
        </mesh>
      </Float>

      {/* Blue Torus (Donut) */}
      <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
        <mesh position={[5, -1, -3]} rotation={[0, Math.PI / 3, 0]}>
          <torusGeometry args={[1.2, 0.4, 32, 64]} />
          <meshPhysicalMaterial 
            color="#2B6CB0" 
            transmission={0.9} 
            opacity={1} 
            metalness={0.1} 
            roughness={0.2} 
            ior={1.5} 
            thickness={2} 
          />
        </mesh>
      </Float>

      {/* Orange Octahedron */}
      <Float speed={1} rotationIntensity={2} floatIntensity={2}>
        <mesh position={[-3, -3, -4]}>
          <octahedronGeometry args={[1.5]} />
          <meshPhysicalMaterial 
            color="#FF6600" 
            transmission={0.8} 
            opacity={1} 
            metalness={0.1} 
            roughness={0.1} 
            ior={1.5} 
            thickness={1} 
          />
        </mesh>
      </Float>

      {/* Silver Icosahedron */}
      <Float speed={2.5} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[4, 3, -6]}>
          <icosahedronGeometry args={[1]} />
          <meshPhysicalMaterial 
            color="#94A3B8" 
            transmission={0.9} 
            opacity={1} 
            metalness={0.2} 
            roughness={0.1} 
            ior={1.5} 
            thickness={2} 
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function Hero3DBackground() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }} dpr={[1, 2]}>
        <ambientLight intensity={2} />
        <directionalLight position={[10, 10, 10]} intensity={3} color={"#ffffff"} />
        <directionalLight position={[-10, -10, -10]} intensity={2} color={"#4FD1C5"} />
        <pointLight position={[0, 0, 5]} intensity={1} color={"#2B6CB0"} />
        <FloatingShapes />
      </Canvas>
    </div>
  );
}
