import { useRef, useEffect } from "react";
import * as THREE from "three";

export default function DeveloperRoom3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const width = mountRef.current.clientWidth || window.innerWidth;
    const height = mountRef.current.clientHeight || 550;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 1000);
    camera.position.set(12, 10, 16);
    camera.lookAt(0, 1, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    const roomGroup = new THREE.Group();
    scene.add(roomGroup);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const deskLight = new THREE.PointLight(0x6366f1, 3, 20);
    deskLight.position.set(0, 4, 1);
    scene.add(deskLight);

    const neonLight = new THREE.PointLight(0x38bdf8, 2.5, 15);
    neonLight.position.set(-4, 3, -2);
    scene.add(neonLight);

    const amberLight = new THREE.PointLight(0xf59e0b, 2, 15);
    amberLight.position.set(4, 2, 2);
    scene.add(amberLight);

    // 1. Isometric Floor / Base Platform
    const floorGeo = new THREE.BoxGeometry(12, 0.4, 12);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x0f1322,
      roughness: 0.3,
      metalness: 0.8,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.position.y = -0.2;
    roomGroup.add(floor);

    // Floor Grid Wireframe
    const gridHelper = new THREE.GridHelper(12, 12, 0x6366f1, 0x1e243b);
    gridHelper.position.y = 0.01;
    roomGroup.add(gridHelper);

    // 2. Developer Desk
    const deskTopGeo = new THREE.BoxGeometry(7, 0.25, 3.2);
    const deskMat = new THREE.MeshStandardMaterial({ color: 0x181c2e, roughness: 0.2, metalness: 0.6 });
    const deskTop = new THREE.Mesh(deskTopGeo, deskMat);
    deskTop.position.set(0, 2.2, 0);
    roomGroup.add(deskTop);

    // Desk Legs
    const legGeo = new THREE.BoxGeometry(0.2, 2.2, 0.2);
    const legMat = new THREE.MeshStandardMaterial({ color: 0x090c17, metalness: 0.9, roughness: 0.2 });
    const legPositions = [
      [-3.3, 1.1, -1.4],
      [3.3, 1.1, -1.4],
      [-3.3, 1.1, 1.4],
      [3.3, 1.1, 1.4],
    ];
    legPositions.forEach(([x, y, z]) => {
      const leg = new THREE.Mesh(legGeo, legMat);
      leg.position.set(x, y, z);
      roomGroup.add(leg);
    });

    // 3. Dual Ultrawide Curved Monitors
    // Main Monitor
    const monitorFrameGeo = new THREE.BoxGeometry(3.6, 2, 0.15);
    const monitorMat = new THREE.MeshStandardMaterial({ color: 0x0a0d18, metalness: 0.8 });
    const mainMonitor = new THREE.Mesh(monitorFrameGeo, monitorMat);
    mainMonitor.position.set(-0.6, 3.7, -0.6);
    roomGroup.add(mainMonitor);

    // Glowing Screen Content
    const screenGeo = new THREE.PlaneGeometry(3.4, 1.8);
    const screenMat = new THREE.MeshBasicMaterial({ color: 0x1e1b4b });
    const screen = new THREE.Mesh(screenGeo, screenMat);
    screen.position.set(-0.6, 3.7, -0.51);
    roomGroup.add(screen);

    // Side Vertical Monitor
    const sideMonitorFrameGeo = new THREE.BoxGeometry(1.4, 2.2, 0.15);
    const sideMonitor = new THREE.Mesh(sideMonitorFrameGeo, monitorMat);
    sideMonitor.position.set(2.1, 3.8, -0.4);
    sideMonitor.rotation.y = -Math.PI / 8;
    roomGroup.add(sideMonitor);

    const sideScreenGeo = new THREE.PlaneGeometry(1.25, 2.05);
    const sideScreenMat = new THREE.MeshBasicMaterial({ color: 0x064e3b });
    const sideScreen = new THREE.Mesh(sideScreenGeo, sideScreenMat);
    sideScreen.position.set(2.05, 3.8, -0.32);
    sideScreen.rotation.y = -Math.PI / 8;
    roomGroup.add(sideScreen);

    // Monitor Stand
    const standGeo = new THREE.CylinderGeometry(0.08, 0.08, 1.4);
    const stand = new THREE.Mesh(standGeo, legMat);
    stand.position.set(-0.6, 2.8, -0.6);
    roomGroup.add(stand);

    // 4. Keyboard & RGB Mousepad
    const padGeo = new THREE.BoxGeometry(4.5, 0.02, 1.8);
    const padMat = new THREE.MeshStandardMaterial({ color: 0x0b0e1b, roughness: 0.9 });
    const mousePad = new THREE.Mesh(padGeo, padMat);
    mousePad.position.set(0, 2.34, 0.5);
    roomGroup.add(mousePad);

    const kbGeo = new THREE.BoxGeometry(2, 0.08, 0.8);
    const kbMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.7 });
    const keyboard = new THREE.Mesh(kbGeo, kbMat);
    keyboard.position.set(-0.5, 2.39, 0.5);
    roomGroup.add(keyboard);

    // Mouse
    const mouseGeo = new THREE.BoxGeometry(0.3, 0.1, 0.45);
    const mouseMat = new THREE.MeshStandardMaterial({ color: 0x6366f1, metalness: 0.5 });
    const mouse = new THREE.Mesh(mouseGeo, mouseMat);
    mouse.position.set(1.2, 2.39, 0.5);
    roomGroup.add(mouse);

    // 5. Server Tower / Rig on the Floor with Blinking LEDs
    const pcGeo = new THREE.BoxGeometry(1.2, 2.4, 2.2);
    const pcMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.1, metalness: 0.9 });
    const pcCase = new THREE.Mesh(pcGeo, pcMat);
    pcCase.position.set(4.2, 1.2, 0.2);
    roomGroup.add(pcCase);

    // PC Glass RGB Window
    const pcGlassGeo = new THREE.PlaneGeometry(1.8, 2.0);
    const pcGlassMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.4 });
    const pcGlass = new THREE.Mesh(pcGlassGeo, pcGlassMat);
    pcGlass.position.set(3.59, 1.2, 0.2);
    pcGlass.rotation.y = -Math.PI / 2;
    roomGroup.add(pcGlass);

    // 6. Developer Chair
    const seatGeo = new THREE.BoxGeometry(1.8, 0.25, 1.8);
    const chairMat = new THREE.MeshStandardMaterial({ color: 0x1e1b4b, roughness: 0.5 });
    const seat = new THREE.Mesh(seatGeo, chairMat);
    seat.position.set(0, 1.4, 2.6);
    roomGroup.add(seat);

    const backGeo = new THREE.BoxGeometry(1.7, 2.2, 0.25);
    const back = new THREE.Mesh(backGeo, chairMat);
    back.position.set(0, 2.6, 3.4);
    roomGroup.add(back);

    const chairBaseGeo = new THREE.CylinderGeometry(0.12, 0.12, 1.4);
    const chairBase = new THREE.Mesh(chairBaseGeo, legMat);
    chairBase.position.set(0, 0.7, 2.6);
    roomGroup.add(chairBase);

    // 7. Floating Holographic Tech Badges Orbiting the Room
    const floatingNodes = [];
    const techColors = [0x6366f1, 0x38bdf8, 0xf59e0b, 0x10b981];
    for (let i = 0; i < 6; i++) {
      const nodeGeo = new THREE.OctahedronGeometry(0.35, 0);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: techColors[i % techColors.length],
        wireframe: true,
        emissive: techColors[i % techColors.length],
        emissiveIntensity: 0.4,
      });
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      const angle = (i / 6) * Math.PI * 2;
      node.position.set(Math.cos(angle) * 5.2, 4.2 + (i % 2) * 0.8, Math.sin(angle) * 5.2);
      roomGroup.add(node);
      floatingNodes.push({ mesh: node, angle, speed: 0.008 + i * 0.002 });
    }

    // Interaction & Mouse rotation
    let isDragging = false;
    let prevMouseX = 0;
    let rotationVelocity = 0;

    const handleMouseDown = (e) => {
      isDragging = true;
      prevMouseX = e.clientX;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleMouseMove = (e) => {
      if (isDragging) {
        const delta = e.clientX - prevMouseX;
        rotationVelocity = delta * 0.005;
        roomGroup.rotation.y += rotationVelocity;
        prevMouseX = e.clientX;
      }
    };

    const mount = mountRef.current;
    mount.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    let reqId;
    let time = 0;
    const animate = () => {
      reqId = requestAnimationFrame(animate);
      time += 0.02;

      if (!isDragging) {
        // Slow auto idle rotation
        roomGroup.rotation.y += 0.003;
      }

      // Floating tech nodes animation
      floatingNodes.forEach((item) => {
        item.angle += item.speed;
        item.mesh.position.x = Math.cos(item.angle) * 5.2;
        item.mesh.position.z = Math.sin(item.angle) * 5.2;
        item.mesh.position.y += Math.sin(time + item.angle) * 0.004;
        item.mesh.rotation.x += 0.02;
        item.mesh.rotation.y += 0.02;
      });

      // Pulse lighting
      deskLight.intensity = 2.5 + Math.sin(time * 2) * 0.5;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(reqId);
      if (mount) {
        mount.removeEventListener("mousedown", handleMouseDown);
      }
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (mount && renderer.domElement) mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing select-none">
      <div ref={mountRef} className="w-full h-full" />
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] font-mono text-slate-300 pointer-events-none flex items-center gap-2">
        <span>🔄 Drag to rotate 3D Room in 360°</span>
      </div>
    </div>
  );
}
