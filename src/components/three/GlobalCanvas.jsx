import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, TorusKnot, Icosahedron, Octahedron } from "@react-three/drei";
import * as THREE from "three";

const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

function StarField({ count = 600 }) {
  const pointsRef = useRef();

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorA = new THREE.Color("#3b82f6");
    const colorB = new THREE.Color("#a855f7");
    const colorC = new THREE.Color("#06b6d4");

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 35;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 35;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30 - 5;

      const rndColor = Math.random() < 0.4 ? colorA : Math.random() < 0.7 ? colorB : colorC;
      col[i * 3] = rndColor.r;
      col[i * 3 + 1] = rndColor.g;
      col[i * 3 + 2] = rndColor.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.03;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.65}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function FloatingShapes() {
  const groupRef = useRef();

  useFrame((state, delta) => {
    mouse.x += (mouse.targetX - mouse.x) * 0.05;
    mouse.y += (mouse.targetY - mouse.y) * 0.05;

    if (groupRef.current) {
      groupRef.current.rotation.y = mouse.x * 0.3;
      groupRef.current.rotation.x = -mouse.y * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Upper Left Torus Knot */}
      <Float speed={1.5} rotationIntensity={0.8} floatIntensity={0.8}>
        <mesh position={[-7, 4, -8]} rotation={[0.4, 0.2, 0]}>
          <torusKnotGeometry args={[1.2, 0.28, 100, 16]} />
          <meshStandardMaterial
            color="#3b82f6"
            emissive="#1d4ed8"
            emissiveIntensity={0.2}
            wireframe
            transparent
            opacity={0.3}
          />
        </mesh>
      </Float>

      {/* Upper Right Glowing Icosahedron */}
      <Float speed={2} rotationIntensity={1.2} floatIntensity={1}>
        <mesh position={[8, 5, -10]} rotation={[0.2, 0.5, 0]}>
          <icosahedronGeometry args={[1.8, 1]} />
          <meshStandardMaterial
            color="#a855f7"
            emissive="#7e22ce"
            emissiveIntensity={0.25}
            wireframe
            transparent
            opacity={0.35}
          />
        </mesh>
      </Float>

      {/* Mid Left Octahedron */}
      <Float speed={1.2} rotationIntensity={0.6} floatIntensity={0.5}>
        <mesh position={[-9, -4, -12]} rotation={[0.6, 0.1, 0.3]}>
          <octahedronGeometry args={[2.2, 0]} />
          <meshStandardMaterial
            color="#06b6d4"
            emissive="#0891b2"
            emissiveIntensity={0.2}
            wireframe
            transparent
            opacity={0.25}
          />
        </mesh>
      </Float>

      {/* Bottom Right Cyber Ring */}
      <Float speed={1.7} rotationIntensity={0.9} floatIntensity={0.7}>
        <mesh position={[7, -5, -9]} rotation={[Math.PI / 3, 0.4, 0]}>
          <torusGeometry args={[2.2, 0.08, 16, 80]} />
          <meshStandardMaterial
            color="#ec4899"
            emissive="#db2777"
            emissiveIntensity={0.3}
            transparent
            opacity={0.4}
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function GlobalCanvas() {
  useEffect(() => {
    const handlePointerMove = (e) => {
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-20 pointer-events-none w-full h-full overflow-hidden"
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 50 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#60a5fa" />
        <pointLight position={[-10, -10, -5]} intensity={0.8} color="#c084fc" />

        <StarField count={450} />
        <FloatingShapes />
      </Canvas>
    </div>
  );
}
