import { useState, useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  RoundedBox,
  Float,
  ContactShadows,
  Html,
} from "@react-three/drei";
import * as THREE from "three";
import { playClickSound, playHoverSound } from "../../utils/sound";

/* ------------------------------------------------------------- */
/* Dynamic Live Screen Canvas Texture Generator                  */
/* ------------------------------------------------------------- */
function createDeviceScreenTexture(projectIndex = 0, screenMode = "laptop") {
  const canvas = document.createElement("canvas");
  canvas.width = screenMode === "laptop" ? 1024 : 512;
  canvas.height = screenMode === "laptop" ? 640 : 1024;
  const ctx = canvas.getContext("2d");

  const projects = [
    {
      name: "VideoVault",
      tag: "FULL STACK VIDEO PLATFORM",
      desc: "Authentication • Video Streaming • Restricted Downloads • Dashboard",
      tech: "React • Node.js • Express • MongoDB • Tailwind",
      status: "ACTIVE • PORT 5173",
      accent: "#3b82f6",
      code: [
        "const express = require('express');",
        "const router = express.Router();",
        "router.get('/api/videos', authMiddleware, async (req, res) => {",
        "  const videos = await Video.find({ status: 'published' });",
        "  res.json({ success: true, count: videos.length, data: videos });",
        "});",
      ],
    },
    {
      name: "Watch Party App",
      tag: "REAL-TIME VIDEO STREAMING",
      desc: "Synchronized Playback • Multi-room Chat • WebSockets",
      tech: "React • Socket.IO • Node.js • MongoDB",
      status: "DEPLOYED • NETLIFY LIVE",
      accent: "#a855f7",
      code: [
        "io.on('connection', (socket) => {",
        "  socket.on('join-room', ({ roomId, user }) => {",
        "    socket.join(roomId);",
        "    socket.to(roomId).emit('user-connected', user);",
        "  });",
        "  socket.on('sync-video', (time) => io.to(roomId).emit('seek', time));",
        "});",
      ],
    },
    {
      name: "Todo List Pro",
      tag: "LIGHTWEIGHT TASK ENGINE",
      desc: "Local State • Priority Filtering • Smooth UI Animations",
      tech: "React • JavaScript • LocalStorage • CSS3",
      status: "DEPLOYED • GITHUB",
      accent: "#10b981",
      code: [
        "export function useTaskManager() {",
        "  const [tasks, setTasks] = useState(() => loadStoredTasks());",
        "  const addTask = (title, priority) => {",
        "    setTasks(prev => [...prev, { id: crypto.randomUUID(), title, priority }]);",
        "  };",
        "  return { tasks, addTask };",
        "}",
      ],
    },
  ];

  const current = projects[projectIndex % projects.length];

  // Background
  ctx.fillStyle = "#09090b";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (screenMode === "laptop") {
    // macOS Dark Top Window Bar
    ctx.fillStyle = "#18181b";
    ctx.fillRect(0, 0, 1024, 48);

    // Window traffic lights
    ["#ef4444", "#f59e0b", "#10b981"].forEach((c, i) => {
      ctx.fillStyle = c;
      ctx.beginPath();
      ctx.arc(32 + i * 24, 24, 7, 0, Math.PI * 2);
      ctx.fill();
    });

    // Address Bar / Tab
    ctx.fillStyle = "#27272a";
    ctx.roundRect(140, 10, 420, 28, 8);
    ctx.fill();
    ctx.fillStyle = "#a1a1aa";
    ctx.font = "14px monospace";
    ctx.fillText(`tharun.dev/projects/${current.name.toLowerCase().replace(/ /g, "-")}`, 160, 29);

    // Status Badge
    ctx.fillStyle = "#10b981";
    ctx.font = "12px monospace";
    ctx.fillText(`● ${current.status}`, 820, 30);

    // Left Sidebar: Code Editor
    ctx.fillStyle = "#121215";
    ctx.fillRect(30, 75, 480, 530);
    ctx.strokeStyle = "#27272a";
    ctx.lineWidth = 1;
    ctx.strokeRect(30, 75, 480, 530);

    // Editor Tab Header
    ctx.fillStyle = "#18181b";
    ctx.fillRect(30, 75, 480, 36);
    ctx.fillStyle = "#38bdf8";
    ctx.font = "bold 13px monospace";
    ctx.fillText(`${current.name.replace(/ /g, "")}.js`, 50, 98);

    // Code lines
    let y = 145;
    current.code.forEach((line, idx) => {
      ctx.fillStyle = "#52525b";
      ctx.font = "13px monospace";
      ctx.fillText(String(idx + 1).padStart(2, "0"), 48, y);

      ctx.fillStyle = idx === 0 || idx === 1 ? "#c084fc" : idx === 2 ? "#60a5fa" : "#f43f5e";
      if (line.includes("const") || line.includes("function") || line.includes("export")) {
        ctx.fillStyle = "#38bdf8";
      } else if (line.includes("=>") || line.includes("return")) {
        ctx.fillStyle = "#c084fc";
      } else {
        ctx.fillStyle = "#e4e4e7";
      }
      ctx.font = "13px monospace";
      ctx.fillText(line, 80, y);
      y += 32;
    });

    // Right Side: Live Project Preview Card
    ctx.fillStyle = "#18181b";
    ctx.roundRect(540, 75, 450, 530, 16);
    ctx.fill();
    ctx.strokeStyle = current.accent;
    ctx.lineWidth = 1.5;
    ctx.strokeRect(540, 75, 450, 530);

    // Project Card Header
    ctx.fillStyle = current.accent;
    ctx.font = "bold 13px monospace";
    ctx.fillText(current.tag, 570, 120);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 32px sans-serif";
    ctx.fillText(current.name, 570, 165);

    ctx.fillStyle = "#a1a1aa";
    ctx.font = "15px sans-serif";
    ctx.fillText(current.desc, 570, 205);

    // Tech Stack pill tags
    ctx.fillStyle = "#27272a";
    ctx.roundRect(570, 240, 390, 48, 12);
    ctx.fill();
    ctx.fillStyle = "#38bdf8";
    ctx.font = "bold 14px monospace";
    ctx.fillText(`Tech: ${current.tech}`, 585, 270);

    // Performance Box
    ctx.fillStyle = "#121215";
    ctx.roundRect(570, 310, 390, 180, 14);
    ctx.fill();

    ctx.fillStyle = "#10b981";
    ctx.font = "bold 14px monospace";
    ctx.fillText("✓ 100% RESPONSIVE WEB ARCHITECTURE", 590, 350);
    ctx.fillText("✓ PRODUCTION API INTEGRATION", 590, 390);
    ctx.fillText("✓ REAL-TIME INTERACTION STREAM", 590, 430);
    ctx.fillText("✓ MODERN REACT 19 & TAILWIND V4", 590, 470);

    // Interactive Button on Screen
    ctx.fillStyle = current.accent;
    ctx.roundRect(570, 520, 390, 55, 12);
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 16px sans-serif";
    ctx.fillText("EXPLORE IN FULL PROJECT GALLERY →", 610, 554);
  } else {
    // iPhone Mobile Screen View
    // Dynamic Island
    ctx.fillStyle = "#000000";
    ctx.roundRect(176, 20, 160, 40, 20);
    ctx.fill();

    // App Header
    ctx.fillStyle = current.accent;
    ctx.font = "bold 14px monospace";
    ctx.fillText(current.tag, 40, 110);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 34px sans-serif";
    ctx.fillText(current.name, 40, 160);

    ctx.fillStyle = "#a1a1aa";
    ctx.font = "16px sans-serif";
    ctx.fillText(current.desc, 40, 200);

    // Code Card
    ctx.fillStyle = "#18181b";
    ctx.roundRect(40, 240, 432, 480, 20);
    ctx.fill();
    ctx.strokeStyle = "#27272a";
    ctx.strokeRect(40, 240, 432, 480);

    let y = 300;
    current.code.slice(0, 5).forEach((line, idx) => {
      ctx.fillStyle = "#38bdf8";
      ctx.font = "14px monospace";
      ctx.fillText(line.substring(0, 38), 60, y);
      y += 50;
    });

    // Tech Badge
    ctx.fillStyle = current.accent;
    ctx.roundRect(40, 760, 432, 70, 16);
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 18px sans-serif";
    ctx.fillText(`View ${current.name} →`, 160, 804);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/* ------------------------------------------------------------- */
/* 3D MacBook Pro Model                                          */
/* ------------------------------------------------------------- */
function MacBookPro({ screenTexture, onScreenClick }) {
  const group = useRef();

  useFrame((state, delta) => {
    if (!group.current) return;
    // Subtle gentle floating breathing rotation
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.12;
  });

  return (
    <group ref={group} position={[0, -0.2, 0]} rotation={[0.2, -0.3, 0]}>
      {/* Laptop Base (Matte Space Gray / Black) */}
      <RoundedBox args={[4.4, 0.12, 3.0]} radius={0.06} smoothness={3} position={[0, 0, 0]}>
        <meshStandardMaterial color="#18181b" roughness={0.3} metalness={0.8} />
      </RoundedBox>

      {/* Trackpad */}
      <mesh position={[0, 0.065, 0.75]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.5, 1.0]} />
        <meshStandardMaterial color="#09090b" roughness={0.6} metalness={0.4} />
      </mesh>

      {/* Keyboard Inset Bed */}
      <mesh position={[0, 0.065, -0.35]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.8, 1.6]} />
        <meshStandardMaterial color="#09090b" roughness={0.8} />
      </mesh>

      {/* Keyboard Backlit Glow Key Array */}
      <mesh position={[0, 0.07, -0.35]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3.6, 1.4]} />
        <meshStandardMaterial
          color="#27272a"
          emissive="#38bdf8"
          emissiveIntensity={0.25}
          roughness={0.5}
        />
      </mesh>

      {/* Screen Lid (Opened) */}
      <group position={[0, 0.06, -1.45]} rotation={[-1.35, 0, 0]}>
        {/* Lid Aluminum Shell */}
        <RoundedBox args={[4.4, 2.9, 0.08]} radius={0.06} smoothness={3} position={[0, 1.45, 0]}>
          <meshStandardMaterial color="#18181b" roughness={0.3} metalness={0.85} />
        </RoundedBox>

        {/* Glossy Bezel */}
        <mesh position={[0, 1.45, 0.042]}>
          <planeGeometry args={[4.25, 2.75]} />
          <meshStandardMaterial color="#09090b" roughness={0.1} />
        </mesh>

        {/* Live Interactive Screen Display */}
        <mesh
          position={[0, 1.45, 0.045]}
          onClick={(e) => {
            e.stopPropagation();
            playClickSound();
            if (onScreenClick) onScreenClick();
          }}
          className="cursor-pointer"
        >
          <planeGeometry args={[4.1, 2.6]} />
          <meshBasicMaterial map={screenTexture} />
        </mesh>

        {/* Screen Ambient Specular Light */}
        <pointLight position={[0, 1.45, 0.8]} color="#38bdf8" intensity={1.5} distance={4} />
      </group>
    </group>
  );
}

/* ------------------------------------------------------------- */
/* 3D iPhone 16 Pro Model                                        */
/* ------------------------------------------------------------- */
function IPhonePro({ screenTexture, onScreenClick }) {
  const group = useRef();

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
  });

  return (
    <group ref={group} position={[0, 0, 0]} rotation={[0.1, -0.2, 0]}>
      {/* Titanium Body Frame */}
      <RoundedBox args={[2.2, 4.4, 0.22]} radius={0.25} smoothness={4}>
        <meshStandardMaterial color="#18181b" roughness={0.2} metalness={0.9} />
      </RoundedBox>

      {/* Display Screen */}
      <mesh
        position={[0, 0, 0.115]}
        onClick={(e) => {
          e.stopPropagation();
          playClickSound();
          if (onScreenClick) onScreenClick();
        }}
        className="cursor-pointer"
      >
        <planeGeometry args={[2.05, 4.2]} />
        <meshBasicMaterial map={screenTexture} />
      </mesh>

      {/* Camera Module Bump (Back) */}
      <RoundedBox args={[1.0, 1.0, 0.1]} radius={0.15} smoothness={3} position={[-0.45, 1.45, -0.15]}>
        <meshStandardMaterial color="#27272a" metalness={0.8} />
      </RoundedBox>
    </group>
  );
}

/* ------------------------------------------------------------- */
/* Main 3D Device Showcase Canvas Component                      */
/* ------------------------------------------------------------- */
export default function Device3DScene({
  projectIndex,
  deviceType = "laptop",
  onProjectSelect,
}) {
  const screenTexture = useMemo(
    () => createDeviceScreenTexture(projectIndex, deviceType),
    [projectIndex, deviceType]
  );

  useEffect(() => {
    return () => screenTexture.dispose();
  }, [screenTexture]);

  return (
    <div className="w-full h-full relative select-none">
      <Canvas
        camera={{ position: [0, 0.5, 7.5], fov: 42 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        {/* Studio Lighting */}
        <ambientLight intensity={1.0} />
        <directionalLight position={[5, 10, 8]} intensity={2.0} color="#ffffff" />
        <directionalLight position={[-6, 4, -4]} intensity={1.0} color="#38bdf8" />
        <pointLight position={[0, 4, 3]} intensity={1.5} color="#818cf8" />

        {/* Mouse Drag & Spin Orbit Controls with restricted tilt angles */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3.5}
          maxPolarAngle={Math.PI / 1.8}
          dampingFactor={0.05}
        />

        <Float speed={1.8} rotationIntensity={0.35} floatIntensity={0.5}>
          {deviceType === "laptop" ? (
            <MacBookPro
              screenTexture={screenTexture}
              onScreenClick={onProjectSelect}
            />
          ) : (
            <IPhonePro
              screenTexture={screenTexture}
              onScreenClick={onProjectSelect}
            />
          )}
        </Float>

        <ContactShadows
          position={[0, -2.4, 0]}
          opacity={0.4}
          scale={10}
          blur={2.0}
          far={5}
          color="#000000"
        />
      </Canvas>

      {/* Floating 3D Interaction Badge */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-zinc-900/80 backdrop-blur-md border border-zinc-800 text-zinc-400 text-xs px-4 py-2 rounded-full shadow-2xl flex items-center gap-2.5 font-mono pointer-events-none whitespace-nowrap">
        <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
        <span>3D INTERACTIVE DEVICE • DRAG TO ROTATE 360°</span>
      </div>
    </div>
  );
}
