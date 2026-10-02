import { useState, useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  RoundedBox,
  Float,
  Html,
  Sphere,
  Text,
} from "@react-three/drei";
import * as THREE from "three";
import { playClickSound, playHoverSound } from "../../utils/sound";

/* ------------------------------------------------------------- */
/* Camera Rig for Cinematic Spatial Waypoint Transitions         */
/* ------------------------------------------------------------- */
const WAYPOINTS = {
  overview: {
    pos: [11, 11, 11],
    target: [0, 0.5, 0],
    fov: 42,
  },
  projects: {
    pos: [0.1, 3.2, 1.4],
    target: [0.1, 3.4, -2.8],
    fov: 38,
  },
  about: {
    pos: [-2.2, 3.2, 0.4],
    target: [-0.6, 2.6, -2.4],
    fov: 40,
  },
  skills: {
    pos: [3.4, 4.8, -1.8],
    target: [2.6, 5.0, -4.8],
    fov: 38,
  },
  experience: {
    pos: [-3.8, 3.8, -1.4],
    target: [-4.8, 4.5, -2.5],
    fov: 42,
  },
  contact: {
    pos: [-1.4, 3.0, 0.8],
    target: [-1.8, 2.8, -2.0],
    fov: 38,
  },
};

function CinematicCamera({ currentSection, isOrbiting }) {
  const { camera } = useThree();
  const currentTarget = useRef(new THREE.Vector3(0, 0.5, 0));

  useFrame((state, delta) => {
    if (isOrbiting && currentSection === "overview") return;

    const wp = WAYPOINTS[currentSection] || WAYPOINTS.overview;
    const targetPos = new THREE.Vector3(...wp.pos);
    const lookTarget = new THREE.Vector3(...wp.target);

    // Smooth camera position interpolation
    camera.position.lerp(targetPos, delta * 3.2);
    currentTarget.current.lerp(lookTarget, delta * 3.5);
    camera.lookAt(currentTarget.current);
  });

  return null;
}

/* ------------------------------------------------------------- */
/* Animated Screen Textures                                      */
/* ------------------------------------------------------------- */
function createProjectScreenTexture(projectIndex = 0) {
  const canvas = document.createElement("canvas");
  canvas.width = 640;
  canvas.height = 400;
  const ctx = canvas.getContext("2d");

  const projectsInfo = [
    {
      title: "VideoVault",
      badge: "MERN STACK • VIDEO PLATFORM",
      status: "ACTIVE PROJECT",
      tech: "React • Node.js • Express • MongoDB",
      accent: "#38bdf8",
      lines: [
        "> Initializing VideoVault core authentication...",
        "> Restricted download streams configured.",
        "> Dashboard analytics: 2,400+ views",
        "> Status: Running on production cluster.",
      ],
    },
    {
      title: "Watch Party Application",
      badge: "REALTIME • WEBSOCKETS",
      status: "DEPLOYED & LIVE",
      tech: "React • Socket.IO • Node.js • MongoDB",
      accent: "#a855f7",
      lines: [
        "> Synchronized video playback stream: OK",
        "> Real-time chat socket cluster active.",
        "> Live Demo: watch-partyy.netlify.app",
        "> Multi-user low latency connection established.",
      ],
    },
    {
      title: "Todo List Application",
      badge: "REACT • STATE ENGINE",
      status: "DEPLOYED",
      tech: "React • JavaScript • CSS • LocalStorage",
      accent: "#34d399",
      lines: [
        "> Task state persistence layer: READY",
        "> Interactive animated UI filters loaded.",
        "> GitHub Repository synchronized.",
        "> Fast lightweight client-side workflow.",
      ],
    },
  ];

  const p = projectsInfo[projectIndex % projectsInfo.length];

  // Dark IDE Frame
  ctx.fillStyle = "#090d16";
  ctx.fillRect(0, 0, 640, 400);

  // Top Bar
  ctx.fillStyle = "#0f172a";
  ctx.fillRect(0, 0, 640, 36);
  ctx.fillStyle = p.accent;
  ctx.fillRect(0, 34, 640, 2);

  // Window Controls
  ["#ef4444", "#eab308", "#10b981"].forEach((c, i) => {
    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.arc(20 + i * 20, 18, 5, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.fillStyle = "#94a3b8";
  ctx.font = "bold 12px monospace";
  ctx.fillText(`tharun-dev // ${p.title}`, 85, 22);

  // Project Header Banner
  ctx.fillStyle = "#1e293b";
  ctx.fillRect(24, 55, 592, 90);
  ctx.strokeStyle = p.accent;
  ctx.lineWidth = 1.5;
  ctx.strokeRect(24, 55, 592, 90);

  ctx.fillStyle = p.accent;
  ctx.font = "bold 22px monospace";
  ctx.fillText(p.title, 42, 92);

  ctx.fillStyle = "#f8fafc";
  ctx.font = "11px monospace";
  ctx.fillText(p.badge, 42, 115);

  ctx.fillStyle = "#10b981";
  ctx.font = "10px monospace";
  ctx.fillText(`● ${p.status}`, 460, 92);

  ctx.fillStyle = "#94a3b8";
  ctx.font = "11px monospace";
  ctx.fillText(`Stack: ${p.tech}`, 42, 132);

  // Terminal Console
  ctx.fillStyle = "#030712";
  ctx.fillRect(24, 160, 592, 215);
  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  ctx.strokeRect(24, 160, 592, 215);

  ctx.fillStyle = "#38bdf8";
  ctx.font = "12px monospace";
  ctx.fillText("--- LIVE SYSTEM DIAGNOSTICS ---", 42, 190);

  let y = 220;
  p.lines.forEach((line) => {
    ctx.fillStyle = "#cbd5e1";
    ctx.font = "11px monospace";
    ctx.fillText(line, 42, y);
    y += 24;
  });

  ctx.fillStyle = "#38bdf8";
  ctx.fillText("$ git push origin main [OK]", 42, y);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/* ------------------------------------------------------------- */
/* 3D Isometric Developer Room Model                             */
/* ------------------------------------------------------------- */
function RoomEnvironment({
  currentSection,
  onNavigate,
  lampOn,
  setLampOn,
  projectIndex,
  nightMode,
}) {
  const [hovered, setHovered] = useState(null);

  const screenTexture = useMemo(
    () => createProjectScreenTexture(projectIndex),
    [projectIndex]
  );

  useEffect(() => {
    return () => screenTexture.dispose();
  }, [screenTexture]);

  return (
    <group position={[0, -1.6, 0]}>
      {/* ================= FLOOR & WALLS ================= */}
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
        <boxGeometry args={[10.5, 10.5, 0.1]} />
        <meshStandardMaterial
          color={nightMode ? "#0b0f19" : "#1e1e2e"}
          roughness={0.7}
          metalness={0.15}
        />
      </mesh>

      {/* Floor Grid Lines */}
      <gridHelper
        args={[10.5, 21, nightMode ? "#1e293b" : "#313244", nightMode ? "#0f172a" : "#181825"]}
        position={[0, 0.01, 0]}
      />

      {/* Area Rug */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.5, 0.02, 0.8]}>
        <circleGeometry args={[2.4, 36]} />
        <meshStandardMaterial color="#1e293b" roughness={0.85} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.5, 0.022, 0.8]}>
        <ringGeometry args={[1.9, 2.05, 36]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.6} />
      </mesh>

      {/* Back Left Wall */}
      <mesh position={[-5.2, 4.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[10.5, 9, 0.15]} />
        <meshStandardMaterial color={nightMode ? "#070a12" : "#11111b"} roughness={0.9} />
      </mesh>

      {/* Back Right Wall */}
      <mesh position={[0, 4.5, -5.2]} receiveShadow>
        <boxGeometry args={[10.5, 9, 0.15]} />
        <meshStandardMaterial color={nightMode ? "#070a12" : "#11111b"} roughness={0.9} />
      </mesh>

      {/* Glowing Neon "THARUN.DEV" Wall Sign */}
      <group
        position={[0, 7.2, -5.1]}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered("neon");
          playHoverSound();
        }}
        onPointerOut={() => setHovered(null)}
        onClick={() => {
          playClickSound();
          onNavigate("overview");
        }}
        className="cursor-pointer"
      >
        <RoundedBox args={[5.2, 1.1, 0.08]} radius={0.03} smoothness={3}>
          <meshStandardMaterial color="#0b1329" roughness={0.4} metalness={0.8} />
        </RoundedBox>
        <mesh position={[0, 0, 0.05]}>
          <planeGeometry args={[4.8, 0.8]} />
          <meshBasicMaterial color="#030712" />
        </mesh>
        <pointLight position={[0, 0, 0.4]} color="#38bdf8" intensity={2.8} distance={5} />
      </group>

      {/* Window with Daylight/Moonlight Stream */}
      <group position={[-5.12, 5.2, 0]}>
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[3.4, 4.0, 0.1]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        <mesh position={[0.03, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[3.0, 3.6]} />
          <meshBasicMaterial
            color={nightMode ? "#1e1b4b" : "#89dceb"}
            transparent
            opacity={0.35}
          />
        </mesh>
        {/* Blinds / Panes */}
        {[-0.9, 0, 0.9].map((y) => (
          <mesh key={y} position={[0.04, y, 0]} rotation={[0, Math.PI / 2, 0]}>
            <boxGeometry args={[3.0, 0.06, 0.02]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
        ))}
        {/* Sunlight/Moonlight Cone */}
        <spotLight
          position={[0.2, 1.5, 0]}
          target-position={[3, 0, 0]}
          color={nightMode ? "#818cf8" : "#89dceb"}
          intensity={nightMode ? 1.5 : 3.0}
          angle={0.65}
          penumbra={0.8}
        />
      </group>

      {/* ================= DEVELOPER WORKSTATION ================= */}
      <group position={[0.2, 0, -2.4]}>
        {/* Desk Top */}
        <RoundedBox args={[5.2, 0.15, 2.4]} radius={0.04} smoothness={3} position={[0, 2.2, 0]}>
          <meshStandardMaterial color="#334155" roughness={0.3} metalness={0.4} />
        </RoundedBox>

        {/* Neon Edge Bar on Desk */}
        <mesh position={[0, 2.2, 1.21]}>
          <boxGeometry args={[5.2, 0.03, 0.02]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>

        {/* Desk Legs */}
        {[-2.4, 2.4].map((x) => (
          <RoundedBox
            key={x}
            args={[0.12, 2.2, 2.1]}
            radius={0.03}
            smoothness={2}
            position={[x, 1.1, 0]}
          >
            <meshStandardMaterial color="#0f172a" roughness={0.4} metalness={0.8} />
          </RoundedBox>
        ))}

        {/* Mousepad */}
        <mesh position={[-0.2, 2.29, 0.15]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[3.4, 1.5]} />
          <meshStandardMaterial color="#0b0f19" roughness={0.8} />
        </mesh>

        {/* MAIN ULTRAWIDE SCREEN (PROJECTS STATION) */}
        <group
          position={[-0.2, 2.3, -0.45]}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered("monitor");
            playHoverSound();
          }}
          onPointerOut={() => setHovered(null)}
          onClick={(e) => {
            e.stopPropagation();
            playClickSound();
            onNavigate("projects");
          }}
          className="cursor-pointer"
        >
          {/* Base & Stand */}
          <mesh position={[0, 0.04, 0]}>
            <cylinderGeometry args={[0.38, 0.45, 0.06, 32]} />
            <meshStandardMaterial color="#0f172a" metalness={0.8} />
          </mesh>
          <mesh position={[0, 0.55, 0]}>
            <cylinderGeometry args={[0.07, 0.08, 1.05, 16]} />
            <meshStandardMaterial color="#1e293b" metalness={0.8} />
          </mesh>

          {/* Screen Body */}
          <RoundedBox
            args={[2.8, 1.6, 0.09]}
            radius={0.04}
            smoothness={3}
            position={[0, 1.35, 0]}
          >
            <meshStandardMaterial
              color="#0b0f19"
              emissive={hovered === "monitor" ? "#38bdf8" : "#000000"}
              emissiveIntensity={0.35}
              metalness={0.8}
            />
          </RoundedBox>

          {/* Interactive Screen Display */}
          <mesh position={[0, 1.35, 0.05]}>
            <planeGeometry args={[2.65, 1.45]} />
            <meshBasicMaterial map={screenTexture} />
          </mesh>

          {/* Backlight Glow */}
          <pointLight position={[0, 1.35, -0.4]} color="#38bdf8" intensity={1.8} distance={3} />

          {/* Hotspot Ring */}
          <group position={[0, 2.4, 0]}>
            <Float speed={2.5} rotationIntensity={0.5} floatIntensity={0.5}>
              <mesh>
                <ringGeometry args={[0.15, 0.2, 32]} />
                <meshBasicMaterial color="#38bdf8" side={THREE.DoubleSide} />
              </mesh>
            </Float>
            <Html center distanceFactor={7}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate("projects");
                }}
                className="bg-cyan-500/90 hover:bg-cyan-400 text-black font-bold text-xs px-3 py-1.5 rounded-full shadow-[0_0_15px_#38bdf8] flex items-center gap-1 font-mono transition-transform hover:scale-110 whitespace-nowrap cursor-pointer"
              >
                <span>💻 PROJECTS</span>
              </button>
            </Html>
          </group>
        </group>

        {/* SECONDARY PORTRAIT MONITOR */}
        <group position={[1.8, 3.65, -0.3]} rotation={[0, -0.35, 0]}>
          <RoundedBox args={[1.1, 1.7, 0.06]} radius={0.03} smoothness={2}>
            <meshStandardMaterial color="#0f172a" metalness={0.8} />
          </RoundedBox>
          <mesh position={[0, 0, 0.035]}>
            <planeGeometry args={[1.0, 1.58]} />
            <meshStandardMaterial
              color="#090d16"
              emissive="#818cf8"
              emissiveIntensity={0.25}
            />
          </mesh>
          <pointLight position={[0, 0, 0.2]} color="#818cf8" intensity={1.0} distance={2} />
        </group>

        {/* HIGH-END PC TOWER */}
        <group position={[2.05, 2.3, 0.4]}>
          <RoundedBox args={[0.7, 1.3, 1.15]} radius={0.03} smoothness={3} position={[0, 0.65, 0]}>
            <meshStandardMaterial color="#090d16" metalness={0.9} roughness={0.15} />
          </RoundedBox>
          {/* Glass Side */}
          <mesh position={[-0.36, 0.65, 0]}>
            <planeGeometry args={[0.02, 1.15]} />
            <meshStandardMaterial color="#38bdf8" transparent opacity={0.3} roughness={0.1} />
          </mesh>
          {/* Internal RGB Lighting */}
          <pointLight position={[-0.1, 0.65, 0]} color="#a855f7" intensity={2.2} distance={3} />
        </group>

        {/* MECHANICAL KEYBOARD */}
        <group position={[-0.2, 2.29, 0.3]}>
          <RoundedBox args={[1.5, 0.04, 0.55]} radius={0.02} smoothness={2}>
            <meshStandardMaterial color="#0f172a" metalness={0.6} />
          </RoundedBox>
          <mesh position={[0, 0.03, 0]}>
            <boxGeometry args={[1.4, 0.02, 0.45]} />
            <meshStandardMaterial
              color="#38bdf8"
              emissive="#0284c7"
              emissiveIntensity={0.4}
            />
          </mesh>
        </group>

        {/* ERGONOMIC MOUSE */}
        <group position={[0.9, 2.29, 0.3]}>
          <RoundedBox args={[0.2, 0.06, 0.3]} radius={0.03} smoothness={3}>
            <meshStandardMaterial color="#1e293b" metalness={0.6} roughness={0.3} />
          </RoundedBox>
        </group>

        {/* DESK SPEAKERS */}
        {[-1.8, 1.4].map((x, i) => (
          <group key={x} position={[x, 2.7, -0.4]} rotation={[0, i === 0 ? 0.28 : -0.28, 0]}>
            <RoundedBox args={[0.35, 0.65, 0.38]} radius={0.03} smoothness={2}>
              <meshStandardMaterial color="#0f172a" roughness={0.5} />
            </RoundedBox>
            <mesh position={[0, 0.12, 0.2]}>
              <circleGeometry args={[0.1, 24]} />
              <meshStandardMaterial color="#38bdf8" metalness={0.7} />
            </mesh>
            <mesh position={[0, -0.14, 0.2]}>
              <circleGeometry args={[0.13, 24]} />
              <meshStandardMaterial color="#1e293b" metalness={0.7} />
            </mesh>
          </group>
        ))}

        {/* COFFEE MUG */}
        <group
          position={[-1.9, 2.38, 0.35]}
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
          <mesh position={[0, 0.12, 0]}>
            <cylinderGeometry args={[0.13, 0.11, 0.26, 24]} />
            <meshStandardMaterial
              color="#f8fafc"
              emissive={hovered === "coffee" ? "#f59e0b" : "#000000"}
              emissiveIntensity={0.25}
            />
          </mesh>
          <mesh position={[-0.15, 0.12, 0]} rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[0.07, 0.02, 12, 24]} />
            <meshStandardMaterial color="#f8fafc" />
          </mesh>
        </group>

        {/* INTERACTIVE DESK LAMP */}
        <group
          position={[-2.1, 2.29, -0.7]}
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
          <mesh position={[0, 0.04, 0]}>
            <cylinderGeometry args={[0.25, 0.28, 0.06, 24]} />
            <meshStandardMaterial color="#f59e0b" metalness={0.8} />
          </mesh>
          <mesh position={[0.12, 0.5, 0]} rotation={[0, 0, -0.25]}>
            <cylinderGeometry args={[0.035, 0.035, 1.0, 16]} />
            <meshStandardMaterial color="#f59e0b" metalness={0.8} />
          </mesh>
          <mesh position={[0.35, 0.95, 0.2]} rotation={[0.6, 0.4, 0]}>
            <coneGeometry args={[0.28, 0.4, 24]} />
            <meshStandardMaterial color="#f59e0b" metalness={0.7} />
          </mesh>

          {lampOn && (
            <>
              <pointLight position={[0.35, 0.85, 0.2]} color="#fde047" intensity={4.0} distance={6} />
              <spotLight
                position={[0.35, 0.95, 0.2]}
                target-position={[0, 0, 0.6]}
                color="#fde047"
                intensity={5.0}
                angle={0.65}
                penumbra={0.7}
              />
            </>
          )}

          {/* Lamp Hotspot */}
          <group position={[0.35, 1.5, 0.2]}>
            <Html center distanceFactor={7}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  playClickSound();
                  setLampOn(!lampOn);
                }}
                className="bg-amber-500/90 hover:bg-amber-400 text-black font-bold text-xs px-2.5 py-1 rounded-full shadow-[0_0_12px_#f59e0b] font-mono transition-transform hover:scale-110 whitespace-nowrap cursor-pointer"
              >
                💡 {lampOn ? "LAMP ON" : "LAMP OFF"}
              </button>
            </Html>
          </group>
        </group>
      </group>

      {/* ================= GAMING / OFFICE CHAIR ================= */}
      <group position={[0, 0, -0.8]} rotation={[0, 0.22, 0]}>
        <mesh position={[0, 0.15, 0]}>
          <cylinderGeometry args={[0.55, 0.55, 0.06, 5]} />
          <meshStandardMaterial color="#090d16" metalness={0.9} />
        </mesh>
        <mesh position={[0, 0.65, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 0.85, 16]} />
          <meshStandardMaterial color="#1e293b" metalness={0.9} />
        </mesh>
        <RoundedBox args={[1.2, 0.2, 1.1]} radius={0.06} smoothness={3} position={[0, 1.1, 0]}>
          <meshStandardMaterial color="#0f172a" roughness={0.6} />
        </RoundedBox>
        <RoundedBox
          args={[1.0, 1.6, 0.16]}
          radius={0.06}
          smoothness={3}
          position={[0, 1.95, -0.48]}
          rotation={[0.1, 0, 0]}
        >
          <meshStandardMaterial color="#090d16" roughness={0.6} />
        </RoundedBox>
        <RoundedBox args={[0.7, 0.38, 0.15]} radius={0.04} smoothness={3} position={[0, 2.85, -0.42]}>
          <meshStandardMaterial color="#38bdf8" roughness={0.5} />
        </RoundedBox>
      </group>

      {/* ================= WALL SHELVES & BOOKS (SKILLS & EDUCATION) ================= */}
      <group
        position={[2.8, 5.0, -5.0]}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered("shelf");
          playHoverSound();
        }}
        onPointerOut={() => setHovered(null)}
        onClick={() => {
          playClickSound();
          onNavigate("skills");
        }}
        className="cursor-pointer"
      >
        {/* Shelf Planks */}
        <RoundedBox args={[3.2, 0.09, 0.7]} radius={0.02} smoothness={2} position={[0, 0, 0]}>
          <meshStandardMaterial
            color="#334155"
            emissive={hovered === "shelf" ? "#c084fc" : "#000000"}
            emissiveIntensity={0.3}
          />
        </RoundedBox>

        {/* Colorful Tech Books */}
        <group position={[-1.0, 0.35, 0]}>
          {["#38bdf8", "#818cf8", "#c084fc", "#34d399", "#f43f5e"].map((col, idx) => (
            <mesh key={col} position={[idx * 0.16, 0, 0]} rotation={[0, 0, idx === 4 ? -0.2 : 0]}>
              <boxGeometry args={[0.13, 0.58, 0.45]} />
              <meshStandardMaterial color={col} roughness={0.4} />
            </mesh>
          ))}
        </group>

        {/* Trophy */}
        <group position={[0.9, 0.35, 0]}>
          <mesh>
            <cylinderGeometry args={[0.1, 0.14, 0.5, 16]} />
            <meshStandardMaterial color="#fde047" metalness={0.9} roughness={0.2} />
          </mesh>
          <pointLight position={[0, 0.2, 0.2]} color="#fde047" intensity={1.2} distance={2} />
        </group>

        {/* Shelf 2 (Higher) */}
        <RoundedBox args={[2.4, 0.09, 0.7]} radius={0.02} smoothness={2} position={[-0.4, 1.5, 0]}>
          <meshStandardMaterial color="#334155" />
        </RoundedBox>

        {/* Succulent Plant on Higher Shelf */}
        <group position={[-0.4, 1.8, 0]}>
          <mesh>
            <cylinderGeometry args={[0.2, 0.14, 0.32, 16]} />
            <meshStandardMaterial color="#fb7185" roughness={0.4} />
          </mesh>
          <mesh position={[0, 0.22, 0]}>
            <dodecahedronGeometry args={[0.22]} />
            <meshStandardMaterial color="#34d399" roughness={0.6} />
          </mesh>
        </group>

        {/* Hotspot Ring */}
        <group position={[0, 2.3, 0]}>
          <Html center distanceFactor={7}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNavigate("skills");
              }}
              className="bg-purple-500/90 hover:bg-purple-400 text-white font-bold text-xs px-3 py-1.5 rounded-full shadow-[0_0_15px_#c084fc] flex items-center gap-1 font-mono transition-transform hover:scale-110 whitespace-nowrap cursor-pointer"
            >
              <span>📚 SKILLS & EDU</span>
            </button>
          </Html>
        </group>
      </group>

      {/* ================= ABOUT / TERMINAL STATION (LEFT) ================= */}
      <group position={[-4.5, 3.2, -2.0]}>
        {/* Wall Terminal Screen */}
        <RoundedBox args={[0.08, 1.8, 2.4]} radius={0.03} smoothness={2}>
          <meshStandardMaterial color="#090d16" metalness={0.8} />
        </RoundedBox>
        <mesh position={[0.05, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[2.2, 1.6]} />
          <meshBasicMaterial color="#0f172a" />
        </mesh>
        <pointLight position={[0.3, 0, 0]} color="#38bdf8" intensity={1.5} distance={3} />

        {/* Hotspot */}
        <group position={[0.3, 1.2, 0]}>
          <Html center distanceFactor={7}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNavigate("about");
              }}
              className="bg-emerald-500/90 hover:bg-emerald-400 text-black font-bold text-xs px-3 py-1.5 rounded-full shadow-[0_0_15px_#34d399] flex items-center gap-1 font-mono transition-transform hover:scale-110 whitespace-nowrap cursor-pointer"
            >
              <span>⚡ ABOUT ME</span>
            </button>
          </Html>
        </group>
      </group>

      {/* ================= CORNER FLOOR PLANT ================= */}
      <group position={[-4.2, 0, -4.2]}>
        <mesh position={[0, 0.7, 0]}>
          <cylinderGeometry args={[0.5, 0.36, 1.4, 24]} />
          <meshStandardMaterial color="#1e293b" roughness={0.6} />
        </mesh>
        {[
          { pos: [0, 1.6, 0], rot: [0.2, 0.3, 0.1], scale: 0.55 },
          { pos: [-0.25, 1.8, 0.25], rot: [-0.3, 0.8, -0.2], scale: 0.5 },
          { pos: [0.25, 1.9, -0.15], rot: [0.4, -0.5, 0.3], scale: 0.52 },
          { pos: [0, 2.2, 0], rot: [0.1, 0, 0], scale: 0.58 },
        ].map((leaf, i) => (
          <mesh key={i} position={leaf.pos} rotation={leaf.rot} scale={leaf.scale}>
            <sphereGeometry args={[0.8, 16, 16]} />
            <meshStandardMaterial color="#34d399" roughness={0.7} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/* ------------------------------------------------------------- */
/* Root 3D Spatial Canvas Viewport                               */
/* ------------------------------------------------------------- */
export default function Spatial3DWorld({
  currentSection,
  onNavigate,
  projectIndex,
  nightMode,
}) {
  const [lampOn, setLampOn] = useState(true);

  return (
    <div className="w-full h-full relative select-none">
      <Canvas
        shadows
        camera={{
          position: [11, 11, 11],
          fov: 42,
          near: 0.1,
          far: 100,
        }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        {/* Ambient & Directional Lighting */}
        <ambientLight intensity={nightMode ? 0.35 : 0.7} />
        <directionalLight
          position={[10, 18, 12]}
          intensity={nightMode ? 0.8 : 1.6}
          color={nightMode ? "#818cf8" : "#ffffff"}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <directionalLight position={[-10, 8, -10]} intensity={0.5} color="#38bdf8" />

        {/* Spatial Camera Controller */}
        <CinematicCamera currentSection={currentSection} />

        {/* 3D Room World Model */}
        <RoomEnvironment
          currentSection={currentSection}
          onNavigate={onNavigate}
          lampOn={lampOn}
          setLampOn={setLampOn}
          projectIndex={projectIndex}
          nightMode={nightMode}
        />
      </Canvas>
    </div>
  );
}
