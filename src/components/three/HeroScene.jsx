import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox, Float } from "@react-three/drei";
import * as THREE from "three";

const pointer = { x: 0, y: 0 };

function makeRandom(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

/* Procedural Cyber Matrix Code Texture with neon glow lines */
function createCyberCodeTexture(seed, theme = "blue") {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 320;
  const ctx = canvas.getContext("2d");

  // Background
  ctx.fillStyle = "#030712";
  ctx.fillRect(0, 0, 512, 320);

  // Grid scanlines
  ctx.strokeStyle = "rgba(59, 130, 246, 0.08)";
  ctx.lineWidth = 1;
  for (let i = 0; i < 320; i += 8) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(512, i);
    ctx.stroke();
  }

  // Header Bar
  ctx.fillStyle = "#0f172a";
  ctx.fillRect(0, 0, 512, 28);
  const dots = ["#ef4444", "#eab308", "#10b981"];
  dots.forEach((c, i) => {
    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.arc(16 + i * 18, 14, 5, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.fillStyle = "#38bdf8";
  ctx.font = "10px monospace";
  ctx.fillText("tharun@dev-station: ~/workspace", 80, 18);

  const rnd = makeRandom(seed);
  const palette =
    theme === "blue"
      ? ["#38bdf8", "#60a5fa", "#818cf8", "#c084fc", "#34d399", "#f43f5e"]
      : ["#a855f7", "#ec4899", "#f43f5e", "#38bdf8", "#fbbf24"];

  let y = 48;
  while (y < 304) {
    if (rnd() < 0.12) {
      y += 14;
      continue;
    }
    const indent = 20 + (rnd() < 0.4 ? 36 : 0) + (rnd() < 0.2 ? 30 : 0);
    let x = indent;
    const segments = 1 + Math.floor(rnd() * 4);
    for (let i = 0; i < segments && x < 480; i++) {
      const w = 24 + rnd() * 85;
      ctx.fillStyle = palette[Math.floor(rnd() * palette.length)];
      ctx.shadowColor = ctx.fillStyle;
      ctx.shadowBlur = 4;
      ctx.globalAlpha = 0.9;
      ctx.beginPath();
      ctx.roundRect(x, y, Math.min(w, 485 - x), 10, 4);
      ctx.fill();
      x += w + 12;
    }
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
    y += 18;
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

function CameraRig({ reduced }) {
  useFrame((state, delta) => {
    if (reduced) return;

    const camera = state.camera;
    const scrollP = Math.min(
      window.scrollY / Math.max(window.innerHeight * 2, 1),
      1
    );

    const tx = pointer.x * 0.45;
    const ty = 1.25 - pointer.y * 0.25 + scrollP * 1.1;
    const tz = 7.4 + scrollP * 2.2;

    const k = Math.min(1, delta * 3);
    camera.position.x += (tx - camera.position.x) * k;
    camera.position.y += (ty - camera.position.y) * k;
    camera.position.z += (tz - camera.position.z) * k;
    camera.lookAt(0, 0.95 + scrollP * 0.35, 0);
  });

  return null;
}

function FloatingTechBadge({ position, rotation, color, label }) {
  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={0.8}>
      <group position={position} rotation={rotation}>
        <mesh>
          <octahedronGeometry args={[0.35, 0]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.6}
            roughness={0.1}
            metalness={0.8}
            wireframe
          />
        </mesh>
        <pointLight color={color} intensity={0.5} distance={2} />
      </group>
    </Float>
  );
}

function Laptop({ texture }) {
  return (
    <group position={[-0.55, 0.02, 0.15]} rotation={[0, 0.22, 0]}>
      {/* Base */}
      <RoundedBox args={[1.9, 0.07, 1.25]} radius={0.03} smoothness={3} position={[0, 0.035, 0]}>
        <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.7} />
      </RoundedBox>
      {/* Trackpad */}
      <mesh position={[0, 0.072, 0.32]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.6, 0.4]} />
        <meshStandardMaterial color="#0f172a" roughness={0.6} metalness={0.4} />
      </mesh>
      {/* Keyboard Bed */}
      <mesh position={[0, 0.072, -0.1]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.6, 0.65]} />
        <meshStandardMaterial color="#020617" roughness={0.8} />
      </mesh>
      {/* Screen */}
      <group position={[0, 0.06, -0.6]} rotation={[-0.22, 0, 0]}>
        <RoundedBox args={[1.9, 1.2, 0.05]} radius={0.03} smoothness={3} position={[0, 0.6, 0]}>
          <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.8} />
        </RoundedBox>
        <mesh position={[0, 0.6, 0.03]}>
          <planeGeometry args={[1.72, 1.04]} />
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
        {/* Screen Neon Frame Glow */}
        <mesh position={[0, 0.6, 0.028]}>
          <planeGeometry args={[1.76, 1.08]} />
          <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.15} />
        </mesh>
      </group>
    </group>
  );
}

function Monitor({ texture }) {
  return (
    <group position={[2.1, 0, -0.45]} rotation={[0, -0.24, 0]}>
      {/* Base */}
      <mesh position={[0, 0.03, 0]}>
        <cylinderGeometry args={[0.42, 0.48, 0.06, 32]} />
        <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.7} />
      </mesh>
      {/* Stand */}
      <mesh position={[0, 0.48, 0]}>
        <cylinderGeometry args={[0.06, 0.08, 0.88, 16]} />
        <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.7} />
      </mesh>
      {/* Screen Body */}
      <RoundedBox args={[2.35, 1.4, 0.07]} radius={0.03} smoothness={3} position={[0, 1.35, 0]}>
        <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.8} />
      </RoundedBox>
      <mesh position={[0, 1.35, 0.04]}>
        <planeGeometry args={[2.18, 1.22]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
      {/* Backlight Glow */}
      <pointLight position={[0, 1.35, -0.3]} color="#8b5cf6" intensity={1.5} distance={3} />
    </group>
  );
}

function Keyboard() {
  const keys = useMemo(() => {
    const list = [];
    const cols = 14;
    const rows = 4;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        list.push([(c - (cols - 1) / 2) * 0.115, 0.01, (r - (rows - 1) / 2) * 0.125]);
      }
    }
    return list;
  }, []);

  const ref = useRef();

  useLayoutEffect(() => {
    if (!ref.current) return;
    const matrix = new THREE.Matrix4();
    keys.forEach((pos, i) => {
      matrix.makeTranslation(pos[0], pos[1], pos[2]);
      ref.current.setMatrixAt(i, matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  }, [keys]);

  return (
    <group position={[1.75, 0.02, 1.1]} rotation={[0, -0.12, 0]}>
      <RoundedBox args={[1.75, 0.06, 0.62]} radius={0.02} smoothness={3} position={[0, 0.03, 0]}>
        <meshStandardMaterial color="#0f172a" roughness={0.4} metalness={0.6} />
      </RoundedBox>
      <instancedMesh ref={ref} args={[undefined, undefined, keys.length]} position={[0, 0.07, 0]}>
        <boxGeometry args={[0.09, 0.025, 0.09]} />
        <meshStandardMaterial color="#38bdf8" roughness={0.3} metalness={0.5} emissive="#0284c7" emissiveIntensity={0.25} />
      </instancedMesh>
    </group>
  );
}

function Desk() {
  return (
    <group position={[0.3, 0, 0]}>
      {/* Tabletop */}
      <RoundedBox args={[7.6, 0.14, 3.4]} radius={0.05} smoothness={3} position={[0, -0.07, 0]}>
        <meshStandardMaterial color="#0b1329" roughness={0.3} metalness={0.5} />
      </RoundedBox>
      {/* Neon Edge strip */}
      <mesh position={[0, -0.07, 1.71]}>
        <boxGeometry args={[7.6, 0.02, 0.02]} />
        <meshBasicMaterial color="#38bdf8" />
      </mesh>
      {/* Legs */}
      {[-3.5, 3.5].map((x) => (
        <RoundedBox key={x} args={[0.14, 1.7, 2.8]} radius={0.04} smoothness={3} position={[x, -1.0, 0]}>
          <meshStandardMaterial color="#030712" roughness={0.4} metalness={0.6} />
        </RoundedBox>
      ))}
    </group>
  );
}

function HologramPanel({ texture, position, rotation, scale = 1, speed = 1, reduced }) {
  const content = (
    <>
      <RoundedBox args={[1.5, 0.95, 0.03]} radius={0.04} smoothness={3}>
        <meshStandardMaterial
          color="#0f172a"
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.88}
        />
      </RoundedBox>
      <mesh position={[0, 0, 0.025]}>
        <planeGeometry args={[1.38, 0.82]} />
        <meshBasicMaterial map={texture} transparent opacity={0.95} toneMapped={false} />
      </mesh>
    </>
  );

  if (reduced) {
    return (
      <group position={position} rotation={rotation} scale={scale}>
        {content}
      </group>
    );
  }

  return (
    <Float
      speed={1.2 * speed}
      rotationIntensity={0.25}
      floatIntensity={0.6}
      floatingRange={[-0.1, 0.1]}
    >
      <group position={position} rotation={rotation} scale={scale}>
        {content}
      </group>
    </Float>
  );
}

function Workspace({ reduced }) {
  const group = useRef();

  const texA = useMemo(() => createCyberCodeTexture(7, "blue"), []);
  const texB = useMemo(() => createCyberCodeTexture(23, "purple"), []);
  const texC = useMemo(() => createCyberCodeTexture(41, "blue"), []);

  useEffect(() => {
    return () => {
      texA.dispose();
      texB.dispose();
      texC.dispose();
    };
  }, [texA, texB, texC]);

  const { size } = useThree();
  const aspect = size.width / Math.max(size.height, 1);
  const scale = THREE.MathUtils.clamp(aspect / 1.65, 0.65, 1.05);

  useFrame((_, delta) => {
    if (reduced || !group.current) return;

    const scrollP = Math.min(
      window.scrollY / Math.max(window.innerHeight * 2, 1),
      1
    );

    const k = Math.min(1, delta * 2.2);
    const targetY = pointer.x * 0.08 + scrollP * 0.12;
    const targetX = -pointer.y * 0.05;

    group.current.rotation.y += (targetY - group.current.rotation.y) * k;
    group.current.rotation.x += (targetX - group.current.rotation.x) * k;
    group.current.rotation.z = scrollP * -0.035;
    group.current.position.y = scrollP * -0.5;
  });

  return (
    <group ref={group} scale={scale}>
      <Desk />
      <Laptop texture={texA} />
      <Monitor texture={texB} />
      <Keyboard />

      <HologramPanel
        texture={texC}
        position={[3.2, 2.55, -1.4]}
        rotation={[0, -0.35, 0]}
        speed={1}
        reduced={reduced}
      />
      <HologramPanel
        texture={texA}
        position={[-3.1, 2.8, -1.8]}
        rotation={[0, 0.32, 0]}
        scale={0.88}
        speed={1.3}
        reduced={reduced}
      />
      <HologramPanel
        texture={texB}
        position={[0.8, 3.4, -2.2]}
        rotation={[0, 0.1, 0]}
        scale={0.72}
        speed={0.8}
        reduced={reduced}
      />

      {/* Floating 3D Tech Crystals */}
      <FloatingTechBadge position={[-2.2, 1.8, 0.5]} rotation={[0.4, 0.2, 0]} color="#38bdf8" />
      <FloatingTechBadge position={[3.6, 1.6, 0.2]} rotation={[0.2, 0.5, 0.2]} color="#c084fc" />
      <FloatingTechBadge position={[-0.8, 2.6, -1.2]} rotation={[0.5, 0.3, 0.1]} color="#34d399" />
    </group>
  );
}

export default function HeroScene() {
  const wrapper = useRef();

  const [reduced] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  const [mobile] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 768px)").matches
  );

  useEffect(() => {
    const onMove = (e) => {
      pointer.x = (e.clientX / Math.max(window.innerWidth, 1)) * 2 - 1;
      pointer.y = (e.clientY / Math.max(window.innerHeight, 1)) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const p = Math.min(window.scrollY / (window.innerHeight * 1.6 || 1), 1);
      if (wrapper.current) wrapper.current.style.opacity = String(1 - p * 0.95);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={wrapper}
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none w-full h-full"
    >
      <Canvas
        dpr={[1, mobile ? 1.25 : 1.75]}
        camera={{ position: [0, 1.2, 7.4], fov: 40 }}
        gl={{ antialias: !mobile, alpha: true, powerPreference: "high-performance" }}
        frameloop={reduced ? "demand" : "always"}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 8, 6]} intensity={1.8} color="#ffffff" />
        <directionalLight position={[-6, 4, -4]} intensity={1.2} color="#818cf8" />
        <pointLight position={[0, 4, 3]} intensity={1.5} color="#38bdf8" distance={10} />

        <CameraRig reduced={reduced} />
        <Workspace reduced={reduced} />
      </Canvas>
    </div>
  );
}
