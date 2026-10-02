import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox, Sphere, Torus, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

/* ------------------------------------------------------------- */
/* Scroll Progress State Tracker                                 */
/* ------------------------------------------------------------- */
const scrollState = {
  progress: 0,
  targetProgress: 0,
  mouse: { x: 0, y: 0, targetX: 0, targetY: 0 },
};

/* ------------------------------------------------------------- */
/* 1. Hero 3D Objects: Sleek Floating Laptop + Pastel Rings      */
/* ------------------------------------------------------------- */
function HeroObjects({ progress }) {
  const group = useRef();

  useFrame(() => {
    if (!group.current) return;
    // Fade out and translate up as you scroll past section 1 (progress: 0 -> 0.2)
    const p = Math.min(Math.max(progress / 0.22, 0), 1);
    group.current.position.y = -p * 8;
    group.current.position.z = -p * 5;
    group.current.rotation.y = p * 1.5;
    group.current.scale.setScalar(Math.max(1 - p * 0.8, 0.001));
  });

  return (
    <group ref={group} position={[0, 0, 0]}>
      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
        {/* Modern Ceramic Laptop Base */}
        <group position={[0, -0.2, 0]} rotation={[0.2, -0.3, 0]}>
          <RoundedBox args={[2.6, 0.08, 1.8]} radius={0.04} smoothness={3}>
            <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.1} />
          </RoundedBox>
          <mesh position={[0, 0.045, 0.45]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.9, 0.55]} />
            <meshStandardMaterial color="#e2e8f0" roughness={0.3} />
          </mesh>

          {/* Screen Top */}
          <group position={[0, 0.05, -0.85]} rotation={[-1.25, 0, 0]}>
            <RoundedBox args={[2.6, 1.7, 0.06]} radius={0.04} smoothness={3} position={[0, 0.85, 0]}>
              <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.1} />
            </RoundedBox>
            {/* Screen Glass */}
            <mesh position={[0, 0.85, 0.035]}>
              <planeGeometry args={[2.45, 1.55]} />
              <meshStandardMaterial
                color="#f8fafc"
                roughness={0.1}
                emissive="#dbeafe"
                emissiveIntensity={0.3}
              />
            </mesh>
          </group>
        </group>

        {/* Orbiting Pastel Geometric Ring 1 */}
        <mesh position={[2.2, 0.8, -0.5]} rotation={[0.6, 0.4, 0.2]}>
          <torusGeometry args={[1.1, 0.12, 16, 64]} />
          <meshStandardMaterial
            color="#c7d2fe"
            roughness={0.25}
            metalness={0.1}
          />
        </mesh>

        {/* Pastel Sphere */}
        <mesh position={[-2.4, 0.5, 0.2]}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial
            color="#fecdd3"
            roughness={0.3}
            metalness={0.05}
          />
        </mesh>

        {/* Pastel Mint Octahedron */}
        <mesh position={[1.8, -1.2, 0.6]} rotation={[0.3, 0.5, 0.2]}>
          <octahedronGeometry args={[0.5, 0]} />
          <meshStandardMaterial
            color="#a7f3d0"
            roughness={0.3}
            metalness={0.1}
          />
        </mesh>
      </Float>
    </group>
  );
}

/* ------------------------------------------------------------- */
/* 2. About 3D Architecture Stack (progress: 0.15 -> 0.4)        */
/* ------------------------------------------------------------- */
function ArchitectureStack({ progress }) {
  const group = useRef();

  useFrame(() => {
    if (!group.current) return;
    // Enter around 0.15, active at 0.25, exit at 0.4
    const enter = Math.min(Math.max((progress - 0.1) / 0.15, 0), 1);
    const exit = Math.min(Math.max((progress - 0.35) / 0.15, 0), 1);

    const scale = (enter - exit);
    group.current.scale.setScalar(Math.max(scale, 0.0001));
    group.current.position.y = (1 - enter) * 6 - exit * 6;
    group.current.rotation.y = enter * 1.5 + exit * 1.0;
  });

  return (
    <group ref={group} position={[2.5, 0, 0]}>
      <Float speed={1.8} rotationIntensity={0.3} floatIntensity={0.4}>
        {/* Layer 1: Database (Mint) */}
        <group position={[0, -1.1, 0]}>
          <RoundedBox args={[2.2, 0.4, 2.2]} radius={0.08} smoothness={3}>
            <meshStandardMaterial color="#d1fae5" roughness={0.2} />
          </RoundedBox>
        </group>

        {/* Layer 2: API Engine (Sky Blue) */}
        <group position={[0, -0.4, 0]}>
          <RoundedBox args={[2.0, 0.4, 2.0]} radius={0.08} smoothness={3}>
            <meshStandardMaterial color="#bae6fd" roughness={0.2} />
          </RoundedBox>
        </group>

        {/* Layer 3: UI & 3D Layer (Lavender/Violet) */}
        <group position={[0, 0.3, 0]}>
          <RoundedBox args={[1.8, 0.4, 1.8]} radius={0.08} smoothness={3}>
            <meshStandardMaterial color="#e0e7ff" roughness={0.2} />
          </RoundedBox>
        </group>

        {/* Floating Top Jewel */}
        <mesh position={[0, 1.2, 0]} rotation={[0.4, 0.2, 0]}>
          <icosahedronGeometry args={[0.45, 0]} />
          <meshStandardMaterial color="#fbcfe8" roughness={0.15} />
        </mesh>
      </Float>
    </group>
  );
}

/* ------------------------------------------------------------- */
/* 3. Skills: Orbiting Pastel Tech Bubbles (progress: 0.35 -> 0.6)*/
/* ------------------------------------------------------------- */
function SkillsOrbital({ progress }) {
  const group = useRef();

  const bubbles = useMemo(
    () => [
      { pos: [-2.2, 1.2, 0], color: "#bae6fd", size: 0.6 },
      { pos: [2.0, 0.8, -0.5], color: "#e0e7ff", size: 0.7 },
      { pos: [-1.4, -1.2, 0.8], color: "#d1fae5", size: 0.55 },
      { pos: [1.8, -1.0, 0.6], color: "#fed7aa", size: 0.65 },
      { pos: [0, 1.8, -0.8], color: "#fbcfe8", size: 0.5 },
      { pos: [-2.5, -0.2, -0.5], color: "#ddd6fe", size: 0.58 },
    ],
    []
  );

  useFrame((state, delta) => {
    if (!group.current) return;
    const enter = Math.min(Math.max((progress - 0.3) / 0.15, 0), 1);
    const exit = Math.min(Math.max((progress - 0.58) / 0.15, 0), 1);

    const scale = (enter - exit);
    group.current.scale.setScalar(Math.max(scale, 0.0001));
    group.current.position.y = (1 - enter) * 6 - exit * 6;
    group.current.rotation.y += delta * 0.4;
  });

  return (
    <group ref={group} position={[-2.2, 0, 0]}>
      {bubbles.map((b, i) => (
        <mesh key={i} position={b.pos}>
          <sphereGeometry args={[b.size, 32, 32]} />
          <meshStandardMaterial
            color={b.color}
            roughness={0.2}
            metalness={0.05}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ------------------------------------------------------------- */
/* 4. Projects: 3D Frosted Glass Displays (progress: 0.55 -> 0.8) */
/* ------------------------------------------------------------- */
function ProjectCards3D({ progress }) {
  const group = useRef();

  useFrame(() => {
    if (!group.current) return;
    const enter = Math.min(Math.max((progress - 0.52) / 0.15, 0), 1);
    const exit = Math.min(Math.max((progress - 0.78) / 0.15, 0), 1);

    const scale = (enter - exit);
    group.current.scale.setScalar(Math.max(scale, 0.0001));
    group.current.position.y = (1 - enter) * 6 - exit * 6;
    group.current.rotation.y = enter * -0.6;
  });

  return (
    <group ref={group} position={[2.6, 0, 0]}>
      <Float speed={1.6} rotationIntensity={0.3} floatIntensity={0.5}>
        {/* Main Tablet Display */}
        <RoundedBox args={[3.2, 2.2, 0.1]} radius={0.08} smoothness={3} position={[0, 0, 0]}>
          <meshStandardMaterial
            color="#ffffff"
            roughness={0.1}
            metalness={0.1}
          />
        </RoundedBox>
        {/* Frosted Screen Glass */}
        <mesh position={[0, 0, 0.06]}>
          <planeGeometry args={[3.0, 2.0]} />
          <meshStandardMaterial
            color="#e0e7ff"
            roughness={0.2}
            emissive="#c7d2fe"
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* Floating Accent Capsule */}
        <mesh position={[-1.2, 1.4, 0.4]} rotation={[0, 0, Math.PI / 4]}>
          <capsuleGeometry args={[0.18, 0.8, 16, 16]} />
          <meshStandardMaterial color="#fed7aa" roughness={0.2} />
        </mesh>
      </Float>
    </group>
  );
}

/* ------------------------------------------------------------- */
/* 5. Contact / Footer: Iridescent Pearl Orb (progress: 0.75 -> 1)*/
/* ------------------------------------------------------------- */
function ContactPearl({ progress }) {
  const group = useRef();

  useFrame((state, delta) => {
    if (!group.current) return;
    const enter = Math.min(Math.max((progress - 0.72) / 0.18, 0), 1);
    group.current.scale.setScalar(Math.max(enter, 0.0001));
    group.current.position.y = (1 - enter) * 6;
    group.current.rotation.y += delta * 0.3;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
  });

  return (
    <group ref={group} position={[0, 0, 0]}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.6}>
        {/* Glowing Soft Pastel Sphere */}
        <Sphere args={[1.5, 48, 48]}>
          <meshStandardMaterial
            color="#fdf2f8"
            emissive="#f472b6"
            emissiveIntensity={0.15}
            roughness={0.15}
            metalness={0.1}
          />
        </Sphere>

        {/* Orbit Ring A */}
        <mesh rotation={[Math.PI / 3, 0.2, 0]}>
          <torusGeometry args={[2.3, 0.04, 16, 100]} />
          <meshStandardMaterial color="#818cf8" roughness={0.2} />
        </mesh>

        {/* Orbit Ring B */}
        <mesh rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
          <torusGeometry args={[2.5, 0.03, 16, 100]} />
          <meshStandardMaterial color="#38bdf8" roughness={0.2} />
        </mesh>
      </Float>
    </group>
  );
}

/* ------------------------------------------------------------- */
/* Camera Rig that smooths scroll and mouse parallax             */
/* ------------------------------------------------------------- */
function SceneRig() {
  const [prog, setProg] = useState(0);

  useFrame((state, delta) => {
    scrollState.progress += (scrollState.targetProgress - scrollState.progress) * 0.08;
    scrollState.mouse.x += (scrollState.mouse.targetX - scrollState.mouse.x) * 0.05;
    scrollState.mouse.y += (scrollState.mouse.targetY - scrollState.mouse.y) * 0.05;

    setProg(scrollState.progress);

    // Subtle camera parallax
    state.camera.position.x = scrollState.mouse.x * 0.4;
    state.camera.position.y = -scrollState.mouse.y * 0.3;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <HeroObjects progress={prog} />
      <ArchitectureStack progress={prog} />
      <SkillsOrbital progress={prog} />
      <ProjectCards3D progress={prog} />
      <ContactPearl progress={prog} />
      <ContactShadows
        position={[0, -2.8, 0]}
        opacity={0.35}
        scale={12}
        blur={2.2}
        far={6}
        color="#94a3b8"
      />
    </>
  );
}

export default function CinematicScrollCanvas() {
  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      scrollState.targetProgress = Math.min(
        Math.max(window.scrollY / maxScroll, 0),
        1
      );
    };

    const handlePointerMove = (e) => {
      scrollState.mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      scrollState.mouse.targetY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none w-full h-full"
    >
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 42 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        {/* Apple-style Soft Studio Lighting */}
        <ambientLight intensity={1.2} />
        <directionalLight position={[6, 10, 8]} intensity={1.8} color="#ffffff" />
        <directionalLight position={[-6, 4, -4]} intensity={0.8} color="#e0e7ff" />
        <pointLight position={[0, 4, 3]} intensity={1.0} color="#fed7aa" />

        <SceneRig />
      </Canvas>
    </div>
  );
}
