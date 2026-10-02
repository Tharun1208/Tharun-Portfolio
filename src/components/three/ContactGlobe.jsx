import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere } from "@react-three/drei";
import * as THREE from "three";

function GlobeMesh() {
  const globeRef = useRef();
  const ringRef = useRef();
  const ring2Ref = useRef();
  const pointsRef = useRef();

  // Create points on a sphere surface for network matrix
  const { positions, colors } = useMemo(() => {
    const count = 350;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const color1 = new THREE.Color("#3b82f6");
    const color2 = new THREE.Color("#8b5cf6");
    const color3 = new THREE.Color("#06b6d4");

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const radius = 1.6;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      const mixed = color1.clone().lerp(i % 2 === 0 ? color2 : color3, Math.random());
      col[i * 3] = mixed.r;
      col[i * 3 + 1] = mixed.g;
      col[i * 3 + 2] = mixed.b;
    }
    return { positions: pos, colors: col };
  }, []);

  useFrame((state, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.25;
      globeRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.1;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.35;
      ringRef.current.rotation.x += delta * 0.15;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * 0.4;
      ring2Ref.current.rotation.z += delta * 0.2;
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.18;
    }
  });

  return (
    <group scale={1.2}>
      {/* Inner Glowing Core */}
      <Sphere ref={globeRef} args={[1.35, 32, 32]}>
        <meshStandardMaterial
          color="#1e1b4b"
          emissive="#3b82f6"
          emissiveIntensity={0.35}
          roughness={0.2}
          metalness={0.8}
          wireframe
          transparent
          opacity={0.35}
        />
      </Sphere>

      {/* Network Points */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.065}
          vertexColors
          transparent
          opacity={0.85}
          sizeAttenuation
        />
      </points>

      {/* Orbital Ring 1 */}
      <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.0, 0.02, 16, 100]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.6} />
      </mesh>

      {/* Orbital Ring 2 */}
      <mesh ref={ring2Ref} rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
        <torusGeometry args={[2.2, 0.015, 16, 100]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

export default function ContactGlobe() {
  return (
    <div className="w-full h-80 md:h-96 relative flex items-center justify-center">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#60a5fa" />
        <pointLight position={[-5, -5, -5]} intensity={1.0} color="#c084fc" />
        <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.6}>
          <GlobeMesh />
        </Float>
      </Canvas>
    </div>
  );
}
