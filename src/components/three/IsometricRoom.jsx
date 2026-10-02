import { useState, useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  RoundedBox,
  Float,
  Html,
  Sphere,
  Cylinder,
} from "@react-three/drei";
import * as THREE from "three";
import { playClickSound, playHoverSound } from "../../utils/sound";

/* ------------------------------------------------------------- */
/* Animated Code Texture for Monitor Screen                      */
/* ------------------------------------------------------------- */
function createScreenTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 320;
  const ctx = canvas.getContext("2d");

  // VS Code dark theme background
  ctx.fillStyle = "#1e1e2e";
  ctx.fillRect(0, 0, 512, 320);

  // Sidebar
  ctx.fillStyle = "#181825";
  ctx.fillRect(0, 0, 48, 320);

  // Editor Tabs
  ctx.fillStyle = "#11111b";
  ctx.fillRect(48, 0, 464, 28);
  ctx.fillStyle = "#1e1e2e";
  ctx.fillRect(48, 0, 120, 28);
  ctx.fillStyle = "#89b4fa";
  ctx.font = "bold 11px monospace";
  ctx.fillText("App.jsx", 60, 18);

  ctx.fillStyle = "#6c7086";
  ctx.font = "11px monospace";
  ctx.fillText("portfolio.js", 180, 18);

  // Code Lines
  const lines = [
    { text: "import { Developer } from 'react';", color: "#cba6f7" },
    { text: "import { ThreeScene } from 'r3f';", color: "#cba6f7" },
    { text: "", color: "" },
    { text: "export default function Tharun() {", color: "#89b4fa" },
    { text: "  const skills = ['React', 'Node.js', '3D'];", color: "#a6e3a1" },
    { text: "  const status = 'Building scalable apps';", color: "#f9e2af" },
    { text: "", color: "" },
    { text: "  return (", color: "#89b4fa" },
    { text: "    <Portfolio tharun={skills}>", color: "#f38ba8" },
    { text: "      <FullStackDeveloper mode='active' />", color: "#fab387" },
    { text: "    </Portfolio>", color: "#f38ba8" },
    { text: "  );", color: "#89b4fa" },
    { text: "}", color: "#89b4fa" },
  ];

  let y = 52;
  lines.forEach((l, idx) => {
    if (l.text) {
      ctx.fillStyle = "#585b70";
      ctx.font = "10px monospace";
      ctx.fillText(String(idx + 1).padStart(2, " "), 56, y);

      ctx.fillStyle = l.color;
      ctx.font = "11px monospace";
      ctx.fillText(l.text, 80, y);
    }
    y += 18;
  });

  // Mini terminal at bottom
  ctx.fillStyle = "#11111b";
  ctx.fillRect(48, 250, 464, 70);
  ctx.fillStyle = "#a6e3a1";
  ctx.font = "10px monospace";
  ctx.fillText("● Ready on localhost:5173 - Compiled successfully!", 60, 280);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/* ------------------------------------------------------------- */
/* Room Components                                               */
/* ------------------------------------------------------------- */

// Walls and Floor
function RoomShell() {
  return (
    <group>
      {/* Floor */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.05, 0]}
        receiveShadow
      >
        <boxGeometry args={[10, 10, 0.1]} />
        <meshStandardMaterial color="#1e1e2e" roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Floor Skirting board */}
      <mesh position={[0, 0.1, -4.95]}>
        <boxGeometry args={[10, 0.2, 0.05]} />
        <meshStandardMaterial color="#11111b" />
      </mesh>
      <mesh position={[-4.95, 0.1, 0]}>
        <boxGeometry args={[0.05, 0.2, 10]} />
        <meshStandardMaterial color="#11111b" />
      </mesh>

      {/* Back Wall Left */}
      <mesh position={[-5, 4.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[10, 9, 0.1]} />
        <meshStandardMaterial color="#181825" roughness={0.8} />
      </mesh>

      {/* Back Wall Right */}
      <mesh position={[0, 4.5, -5]} receiveShadow>
        <boxGeometry args={[10, 9, 0.1]} />
        <meshStandardMaterial color="#181825" roughness={0.8} />
      </mesh>

      {/* Area Rug */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.5, 0.01, 1]}>
        <circleGeometry args={[2.2, 32]} />
        <meshStandardMaterial color="#313244" roughness={0.9} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.5, 0.012, 1]}>
        <ringGeometry args={[1.8, 1.9, 32]} />
        <meshStandardMaterial color="#89b4fa" opacity={0.6} transparent />
      </mesh>

      {/* Wall Window with Sunlight/Nightlight */}
      <group position={[-4.94, 5, 0]}>
        {/* Window Frame */}
        <mesh position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[3.2, 3.6, 0.08]} />
          <meshStandardMaterial color="#313244" />
        </mesh>
        {/* Window Glass */}
        <mesh position={[0.02, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[2.8, 3.2]} />
          <meshBasicMaterial color="#89dceb" transparent opacity={0.35} />
        </mesh>
        {/* Blinds / Panes */}
        <mesh position={[0.03, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[0.08, 3.2, 0.02]} />
          <meshStandardMaterial color="#1e1e2e" />
        </mesh>
        <mesh position={[0.03, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[2.8, 0.08, 0.02]} />
          <meshStandardMaterial color="#1e1e2e" />
        </mesh>
        {/* Sunlight streaming into room */}
        <spotLight
          position={[0, 1, 0]}
          target-position={[3, 0, 0]}
          color="#89dceb"
          intensity={2.5}
          angle={0.6}
          penumbra={0.8}
        />
      </group>

      {/* Glowing Neon Sign on Back Wall */}
      <group position={[0, 6.8, -4.92]}>
        <mesh>
          <boxGeometry args={[4.5, 0.9, 0.04]} />
          <meshStandardMaterial color="#11111b" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0, 0.03]}>
          <planeGeometry args={[4.2, 0.7]} />
          <meshBasicMaterial color="#181825" />
        </mesh>
        <pointLight position={[0, 0, 0.3]} color="#89b4fa" intensity={2.2} distance={4} />
      </group>
    </group>
  );
}

// Developer Desk, PC, Keyboard, Mouse, Monitors
function Workstation({ onSelect, screenTexture, lampOn, setLampOn }) {
  const [hovered, setHovered] = useState(null);

  return (
    <group position={[0.2, 0, -2.4]}>
      {/* Wooden Desk Top */}
      <RoundedBox
        args={[4.8, 0.14, 2.2]}
        radius={0.04}
        smoothness={3}
        position={[0, 2.2, 0]}
      >
        <meshStandardMaterial color="#45475a" roughness={0.4} metalness={0.2} />
      </RoundedBox>

      {/* Desk Legs (Metal Frame) */}
      {[-2.2, 2.2].map((x) => (
        <group key={x} position={[x, 1.1, 0]}>
          <RoundedBox args={[0.1, 2.2, 1.9]} radius={0.02} smoothness={2}>
            <meshStandardMaterial color="#11111b" roughness={0.5} metalness={0.8} />
          </RoundedBox>
        </group>
      ))}

      {/* Large Desk Mousepad */}
      <mesh position={[-0.2, 2.28, 0.1]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.2, 1.4]} />
        <meshStandardMaterial color="#181825" roughness={0.8} />
      </mesh>

      {/* Ultrawide / Main Curved Monitor */}
      <group
        position={[-0.2, 2.3, -0.4]}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered("monitor");
          playHoverSound();
        }}
        onPointerOut={() => setHovered(null)}
        onClick={(e) => {
          e.stopPropagation();
          playClickSound();
          onSelect("projects");
        }}
        className="cursor-pointer"
      >
        {/* Stand Base */}
        <mesh position={[0, 0.03, 0]}>
          <cylinderGeometry args={[0.35, 0.4, 0.05, 32]} />
          <meshStandardMaterial color="#11111b" metalness={0.8} />
        </mesh>
        {/* Stand Pillar */}
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.06, 0.07, 0.95, 16]} />
          <meshStandardMaterial color="#181825" metalness={0.8} />
        </mesh>
        {/* Screen Bezel */}
        <RoundedBox
          args={[2.6, 1.5, 0.08]}
          radius={0.04}
          smoothness={3}
          position={[0, 1.25, 0]}
        >
          <meshStandardMaterial
            color="#11111b"
            emissive={hovered === "monitor" ? "#89b4fa" : "#000000"}
            emissiveIntensity={0.3}
            metalness={0.7}
          />
        </RoundedBox>
        {/* Display Screen */}
        <mesh position={[0, 1.25, 0.045]}>
          <planeGeometry args={[2.46, 1.36]} />
          <meshBasicMaterial map={screenTexture} />
        </mesh>

        {/* Floating Tooltip Label */}
        {hovered === "monitor" && (
          <Html position={[0, 2.3, 0]} center distanceFactor={8}>
            <div className="bg-[#11111b]/95 border border-cyan-400 text-cyan-300 text-xs px-3 py-1.5 rounded-lg shadow-xl font-mono whitespace-nowrap pointer-events-none animate-bounce">
              💻 Click to View Projects
            </div>
          </Html>
        )}
      </group>

      {/* Secondary Portrait Monitor (Right) */}
      <group position={[1.6, 3.5, -0.3]} rotation={[0, -0.35, 0]}>
        <RoundedBox args={[1.0, 1.6, 0.06]} radius={0.03} smoothness={2}>
          <meshStandardMaterial color="#11111b" metalness={0.8} />
        </RoundedBox>
        <mesh position={[0, 0, 0.035]}>
          <planeGeometry args={[0.9, 1.5]} />
          <meshStandardMaterial
            color="#181825"
            emissive="#89b4fa"
            emissiveIntensity={0.2}
          />
        </mesh>
      </group>

      {/* PC Tower with RGB Internal Lighting */}
      <group position={[1.85, 2.27, 0.35]}>
        <RoundedBox args={[0.65, 1.2, 1.1]} radius={0.03} smoothness={3} position={[0, 0.6, 0]}>
          <meshStandardMaterial color="#11111b" metalness={0.8} roughness={0.2} />
        </RoundedBox>
        {/* Glass Side Panel */}
        <mesh position={[-0.33, 0.6, 0]}>
          <planeGeometry args={[0.02, 1.1]} />
          <meshStandardMaterial
            color="#89b4fa"
            transparent
            opacity={0.3}
            roughness={0.1}
          />
        </mesh>
        {/* RGB Internal Light */}
        <pointLight position={[-0.1, 0.6, 0]} color="#cba6f7" intensity={1.8} distance={2.5} />
      </group>

      {/* Mechanical Keyboard */}
      <group position={[-0.2, 2.28, 0.25]}>
        <RoundedBox args={[1.4, 0.04, 0.5]} radius={0.02} smoothness={2}>
          <meshStandardMaterial color="#181825" metalness={0.5} />
        </RoundedBox>
        {/* Keys array representation */}
        <mesh position={[0, 0.03, 0]}>
          <boxGeometry args={[1.3, 0.02, 0.42]} />
          <meshStandardMaterial
            color="#89b4fa"
            emissive="#313244"
            emissiveIntensity={0.5}
          />
        </mesh>
      </group>

      {/* Ergonomic Mouse */}
      <group position={[0.8, 2.28, 0.25]}>
        <RoundedBox args={[0.18, 0.06, 0.28]} radius={0.03} smoothness={3}>
          <meshStandardMaterial color="#313244" roughness={0.4} metalness={0.5} />
        </RoundedBox>
      </group>

      {/* Desktop Audio Studio Speakers */}
      {[-1.6, 1.2].map((x, i) => (
        <group key={x} position={[x, 2.65, -0.4]} rotation={[0, i === 0 ? 0.3 : -0.3, 0]}>
          <RoundedBox args={[0.32, 0.6, 0.35]} radius={0.03} smoothness={2}>
            <meshStandardMaterial color="#181825" roughness={0.6} />
          </RoundedBox>
          <mesh position={[0, 0.1, 0.18]}>
            <circleGeometry args={[0.09, 24]} />
            <meshStandardMaterial color="#89b4fa" metalness={0.6} />
          </mesh>
          <mesh position={[0, -0.12, 0.18]}>
            <circleGeometry args={[0.12, 24]} />
            <meshStandardMaterial color="#313244" metalness={0.6} />
          </mesh>
        </group>
      ))}

      {/* Coffee Mug with Steam */}
      <group
        position={[-1.7, 2.38, 0.3]}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered("coffee");
          playHoverSound();
        }}
        onPointerOut={() => setHovered(null)}
        onClick={(e) => {
          e.stopPropagation();
          playClickSound();
        }}
        className="cursor-pointer"
      >
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.12, 0.1, 0.24, 24]} />
          <meshStandardMaterial
            color="#cdd6f4"
            emissive={hovered === "coffee" ? "#f9e2af" : "#000000"}
            emissiveIntensity={0.2}
          />
        </mesh>
        {/* Mug handle */}
        <mesh position={[-0.14, 0.1, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.06, 0.02, 12, 24]} />
          <meshStandardMaterial color="#cdd6f4" />
        </mesh>

        {hovered === "coffee" && (
          <Html position={[0, 0.5, 0]} center distanceFactor={8}>
            <div className="bg-[#11111b]/95 border border-amber-400 text-amber-300 text-xs px-2.5 py-1 rounded shadow font-mono whitespace-nowrap pointer-events-none">
              ☕ Fueling Code
            </div>
          </Html>
        )}
      </group>

      {/* Interactive Desk Lamp */}
      <group
        position={[-1.85, 2.28, -0.6]}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered("lamp");
          playHoverSound();
        }}
        onPointerOut={() => setHovered(null)}
        onClick={(e) => {
          e.stopPropagation();
          playClickSound();
          setLampOn(!lampOn);
        }}
        className="cursor-pointer"
      >
        {/* Lamp Base */}
        <mesh position={[0, 0.03, 0]}>
          <cylinderGeometry args={[0.22, 0.25, 0.05, 24]} />
          <meshStandardMaterial color="#fab387" metalness={0.7} />
        </mesh>
        {/* Stem */}
        <mesh position={[0.1, 0.45, 0]} rotation={[0, 0, -0.25]}>
          <cylinderGeometry args={[0.03, 0.03, 0.9, 16]} />
          <meshStandardMaterial color="#fab387" metalness={0.7} />
        </mesh>
        {/* Lamp Head */}
        <mesh position={[0.3, 0.85, 0.2]} rotation={[0.6, 0.4, 0]}>
          <coneGeometry args={[0.25, 0.35, 24]} />
          <meshStandardMaterial color="#fab387" metalness={0.6} />
        </mesh>

        {/* Lamp Light */}
        {lampOn && (
          <>
            <pointLight position={[0.3, 0.75, 0.2]} color="#f9e2af" intensity={3.5} distance={5} />
            <spotLight
              position={[0.3, 0.85, 0.2]}
              target-position={[0, 0, 0.5]}
              color="#f9e2af"
              intensity={4.0}
              angle={0.6}
              penumbra={0.7}
            />
          </>
        )}

        {hovered === "lamp" && (
          <Html position={[0, 1.2, 0]} center distanceFactor={8}>
            <div className="bg-[#11111b]/95 border border-yellow-400 text-yellow-300 text-xs px-2.5 py-1 rounded shadow font-mono whitespace-nowrap pointer-events-none">
              💡 Click to Toggle Light
            </div>
          </Html>
        )}
      </group>
    </group>
  );
}

// Gaming / Ergonomic Chair
function Chair() {
  return (
    <group position={[0, 0, -0.9]} rotation={[0, 0.25, 0]}>
      {/* 5-wheel Caster Base */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.06, 5]} />
        <meshStandardMaterial color="#11111b" metalness={0.9} />
      </mesh>
      {/* Central Piston */}
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.8, 16]} />
        <meshStandardMaterial color="#313244" metalness={0.9} />
      </mesh>
      {/* Padded Seat */}
      <RoundedBox args={[1.1, 0.18, 1.0]} radius={0.06} smoothness={3} position={[0, 1.05, 0]}>
        <meshStandardMaterial color="#1e1e2e" roughness={0.6} />
      </RoundedBox>
      {/* Backrest */}
      <RoundedBox
        args={[0.95, 1.5, 0.15]}
        radius={0.06}
        smoothness={3}
        position={[0, 1.85, -0.45]}
        rotation={[0.1, 0, 0]}
      >
        <meshStandardMaterial color="#181825" roughness={0.6} />
      </RoundedBox>
      {/* Headrest */}
      <RoundedBox
        args={[0.65, 0.35, 0.14]}
        radius={0.04}
        smoothness={3}
        position={[0, 2.7, -0.4]}
      >
        <meshStandardMaterial color="#89b4fa" roughness={0.5} />
      </RoundedBox>
      {/* Armrests */}
      {[-0.55, 0.55].map((x) => (
        <group key={x} position={[x, 1.35, -0.05]}>
          <mesh position={[0, -0.15, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 0.45, 12]} />
            <meshStandardMaterial color="#11111b" />
          </mesh>
          <RoundedBox args={[0.12, 0.06, 0.5]} radius={0.02} smoothness={2} position={[0, 0.08, 0]}>
            <meshStandardMaterial color="#313244" />
          </RoundedBox>
        </group>
      ))}
    </group>
  );
}

// Wall Shelves with Tech Books, Awards, and Plants
function WallShelf({ onSelect }) {
  const [hovered, setHovered] = useState(false);

  return (
    <group
      position={[2.6, 4.8, -4.9]}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        playHoverSound();
      }}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => {
        e.stopPropagation();
        playClickSound();
        onSelect("skills");
      }}
      className="cursor-pointer"
    >
      {/* Shelf 1 */}
      <RoundedBox args={[2.8, 0.08, 0.6]} radius={0.02} smoothness={2} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#45475a"
          emissive={hovered ? "#89b4fa" : "#000000"}
          emissiveIntensity={0.3}
        />
      </RoundedBox>

      {/* Tech Books on Shelf */}
      <group position={[-0.8, 0.3, 0]}>
        {["#f38ba8", "#89b4fa", "#a6e3a1", "#f9e2af", "#cba6f7"].map((col, idx) => (
          <mesh key={col} position={[idx * 0.14, 0, 0]} rotation={[0, 0, idx === 4 ? -0.18 : 0]}>
            <boxGeometry args={[0.11, 0.52, 0.4]} />
            <meshStandardMaterial color={col} roughness={0.5} />
          </mesh>
        ))}
      </group>

      {/* Potted Succulent Plant */}
      <group position={[0.8, 0.22, 0]}>
        {/* Pot */}
        <mesh>
          <cylinderGeometry args={[0.18, 0.12, 0.28, 16]} />
          <meshStandardMaterial color="#eba0ac" roughness={0.4} />
        </mesh>
        {/* Green Plant Leaves */}
        <mesh position={[0, 0.2, 0]}>
          <dodecahedronGeometry args={[0.18]} />
          <meshStandardMaterial color="#a6e3a1" roughness={0.6} />
        </mesh>
      </group>

      {/* Shelf 2 (Higher) */}
      <RoundedBox args={[2.0, 0.08, 0.6]} radius={0.02} smoothness={2} position={[-0.4, 1.4, 0]}>
        <meshStandardMaterial color="#45475a" />
      </RoundedBox>

      {/* Trophy / Certificate Frame */}
      <group position={[-0.4, 1.75, 0]}>
        <mesh>
          <cylinderGeometry args={[0.08, 0.12, 0.45, 16]} />
          <meshStandardMaterial color="#f9e2af" metalness={0.9} roughness={0.2} />
        </mesh>
        <pointLight position={[0, 0.2, 0.2]} color="#f9e2af" intensity={0.8} distance={1.5} />
      </group>

      {hovered && (
        <Html position={[0, 2.2, 0]} center distanceFactor={8}>
          <div className="bg-[#11111b]/95 border border-purple-400 text-purple-300 text-xs px-3 py-1.5 rounded-lg shadow-xl font-mono whitespace-nowrap pointer-events-none animate-bounce">
            📚 Click to View Skills & Education
          </div>
        </Html>
      )}
    </group>
  );
}

// Floor Plant in Corner
function FloorPlant() {
  return (
    <group position={[-3.8, 0, -3.8]}>
      {/* Ceramic Pot */}
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.45, 0.32, 1.2, 24]} />
        <meshStandardMaterial color="#313244" roughness={0.5} />
      </mesh>
      {/* Monstera Stem & Leaves */}
      {[
        { pos: [0, 1.4, 0], rot: [0.2, 0.3, 0.1], scale: 0.5 },
        { pos: [-0.2, 1.6, 0.2], rot: [-0.3, 0.8, -0.2], scale: 0.45 },
        { pos: [0.2, 1.7, -0.1], rot: [0.4, -0.5, 0.3], scale: 0.48 },
        { pos: [0, 1.9, 0], rot: [0.1, 0, 0], scale: 0.52 },
      ].map((leaf, i) => (
        <mesh key={i} position={leaf.pos} rotation={leaf.rot} scale={leaf.scale}>
          <sphereGeometry args={[0.7, 16, 16]} />
          <meshStandardMaterial color="#a6e3a1" roughness={0.7} />
        </mesh>
      ))}
    </group>
  );
}

/* ------------------------------------------------------------- */
/* Main Isometric Room Scene Canvas                              */
/* ------------------------------------------------------------- */
export default function IsometricRoom({ onNavigate }) {
  const [lampOn, setLampOn] = useState(true);
  const screenTexture = useMemo(() => createScreenTexture(), []);

  useEffect(() => {
    return () => screenTexture.dispose();
  }, [screenTexture]);

  const handleSelectSection = (targetId) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full h-full relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-[#0a0f1d]">
      <Canvas
        shadows
        orthographic
        camera={{
          position: [12, 12, 12],
          zoom: 55,
          near: -50,
          far: 100,
        }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        {/* Ambient Room Light */}
        <ambientLight intensity={0.6} />

        {/* Isometric Key Directional Light */}
        <directionalLight
          position={[10, 18, 12]}
          intensity={1.4}
          color="#cdd6f4"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />

        {/* Soft Blue Cyber Fill Light */}
        <directionalLight position={[-10, 8, -10]} intensity={0.6} color="#89b4fa" />

        {/* Orbit Controls with bounded angles for ideal isometric perspective */}
        <OrbitControls
          enableZoom={true}
          minZoom={35}
          maxZoom={90}
          maxPolarAngle={Math.PI / 2.1}
          minPolarAngle={Math.PI / 6}
          enablePan={false}
          dampingFactor={0.05}
          autoRotate={false}
        />

        {/* The 3D Room Group */}
        <group position={[0, -1.8, 0]}>
          <RoomShell />
          <Workstation
            onSelect={handleSelectSection}
            screenTexture={screenTexture}
            lampOn={lampOn}
            setLampOn={setLampOn}
          />
          <Chair />
          <WallShelf onSelect={handleSelectSection} />
          <FloorPlant />
        </group>
      </Canvas>

      {/* Interactive Helper Overlay Pill */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#11111b]/85 backdrop-blur-md border border-cyan-500/30 text-slate-300 text-xs px-4 py-2 rounded-full shadow-xl flex items-center gap-3 font-mono pointer-events-none whitespace-nowrap">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        <span>🖱️ Drag to rotate 3D room • Click monitors & items to explore</span>
      </div>
    </div>
  );
}
