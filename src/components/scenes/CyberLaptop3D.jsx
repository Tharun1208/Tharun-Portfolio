import { useRef, useEffect } from "react";
import * as THREE from "three";

export default function CyberLaptop3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const width = mountRef.current.clientWidth || window.innerWidth;
    const height = mountRef.current.clientHeight || 550;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 2.5, 12);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    const laptopGroup = new THREE.Group();
    scene.add(laptopGroup);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x6366f1, 3, 20);
    pointLight.position.set(0, 6, 6);
    scene.add(pointLight);

    const cyanLight = new THREE.PointLight(0x38bdf8, 2.5, 15);
    cyanLight.position.set(-5, 0, 4);
    scene.add(cyanLight);

    const amberLight = new THREE.PointLight(0xf59e0b, 2, 15);
    amberLight.position.set(5, -2, 4);
    scene.add(amberLight);

    // Metallic Material
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x1a1d2e,
      metalness: 0.85,
      roughness: 0.2,
    });

    // 1. Laptop Base / Bottom Chassis
    const baseGeo = new THREE.BoxGeometry(6.4, 0.2, 4.4);
    const base = new THREE.Mesh(baseGeo, bodyMat);
    base.position.set(0, -0.1, 0);
    laptopGroup.add(base);

    // Keyboard well & trackpad
    const kbGeo = new THREE.BoxGeometry(5.4, 0.02, 2.4);
    const kbMat = new THREE.MeshStandardMaterial({ color: 0x0a0c16, roughness: 0.8 });
    const keyboard = new THREE.Mesh(kbGeo, kbMat);
    keyboard.position.set(0, 0.01, -0.6);
    laptopGroup.add(keyboard);

    // Trackpad
    const trackpadGeo = new THREE.BoxGeometry(2.2, 0.02, 1.3);
    const trackpadMat = new THREE.MeshStandardMaterial({ color: 0x141829, metalness: 0.6, roughness: 0.3 });
    const trackpad = new THREE.Mesh(trackpadGeo, trackpadMat);
    trackpad.position.set(0, 0.01, 1.3);
    laptopGroup.add(trackpad);

    // 2. Laptop Lid / Screen
    const screenGroup = new THREE.Group();
    screenGroup.position.set(0, 0, -2.15); // Hinge location
    laptopGroup.add(screenGroup);

    const lidGeo = new THREE.BoxGeometry(6.4, 4.3, 0.15);
    const lid = new THREE.Mesh(lidGeo, bodyMat);
    lid.position.set(0, 2.15, 0);
    screenGroup.add(lid);

    // Screen Display Plane (Emissive Terminal)
    const screenGeo = new THREE.PlaneGeometry(6.0, 3.9);
    const screenMat = new THREE.MeshBasicMaterial({
      color: 0x0f172a,
    });
    const screen = new THREE.Mesh(screenGeo, screenMat);
    screen.position.set(0, 2.15, 0.08);
    screenGroup.add(screen);

    // Tilt Screen Lid open at 110 degrees
    screenGroup.rotation.x = -Math.PI / 10;

    // 3. Floating 3D Code Cubes and Orbital Satellites
    const floatingElements = [];
    const colors = [0x6366f1, 0x38bdf8, 0x10b981, 0xf59e0b, 0xec4899];
    for (let i = 0; i < 8; i++) {
      const geo = new THREE.BoxGeometry(0.4, 0.4, 0.4);
      const mat = new THREE.MeshStandardMaterial({
        color: colors[i % colors.length],
        wireframe: true,
        emissive: colors[i % colors.length],
        emissiveIntensity: 0.5,
      });
      const mesh = new THREE.Mesh(geo, mat);
      const angle = (i / 8) * Math.PI * 2;
      mesh.position.set(Math.cos(angle) * 5.2, Math.sin(angle) * 2.5 + 1.5, Math.sin(angle * 2) * 2);
      laptopGroup.add(mesh);
      floatingElements.push({ mesh, angle, speed: 0.01 + i * 0.002 });
    }

    // 4. Floating Holographic Ring beneath laptop
    const ringGeo = new THREE.RingGeometry(4.5, 4.6, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.4,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = -1.5;
    laptopGroup.add(ring);

    // Mouse Tracking with Lerp
    let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0;
    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix;
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    let reqId;
    let time = 0;
    const animate = () => {
      reqId = requestAnimationFrame(animate);
      time += 0.02;

      targetX += (mouseX - targetX) * 0.06;
      targetY += (mouseY - targetY) * 0.06;

      // Floating bobbing motion
      laptopGroup.position.y = Math.sin(time) * 0.2;
      laptopGroup.rotation.y = targetX * 0.6 + Math.sin(time * 0.5) * 0.1;
      laptopGroup.rotation.x = -targetY * 0.4 + 0.3;

      // Floating elements
      floatingElements.forEach((el) => {
        el.angle += el.speed;
        el.mesh.position.x = Math.cos(el.angle) * 5.2;
        el.mesh.position.z = Math.sin(el.angle) * 3.5;
        el.mesh.rotation.x += 0.03;
        el.mesh.rotation.y += 0.03;
      });

      ring.rotation.z += 0.005;

      renderer.render(scene, camera);
    };
    animate();

    const mount = mountRef.current;
    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (mount && renderer.domElement) mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full pointer-events-none" aria-hidden="true" />;
}
