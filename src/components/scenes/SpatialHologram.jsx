import { useRef, useEffect } from "react";
import * as THREE from "three";

export default function SpatialHologram() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const width = mountRef.current.clientWidth || window.innerWidth;
    const height = mountRef.current.clientHeight || 500;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // Central Icosahedron Crystal
    const geometry = new THREE.IcosahedronGeometry(4.5, 1);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const crystal = new THREE.Mesh(geometry, wireframeMat);
    group.add(crystal);

    // Core
    const coreGeo = new THREE.IcosahedronGeometry(2.6, 0);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    group.add(core);

    // Torus Rings
    const ringGeo = new THREE.TorusGeometry(6.5, 0.04, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.35 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 3;
    group.add(ring);

    const ringGeo2 = new THREE.TorusGeometry(7.8, 0.03, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.25 });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    group.add(ring2);

    // Particles
    const particleCount = 140;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 28;
      positions[i + 1] = (Math.random() - 0.5) * 28;
      positions[i + 2] = (Math.random() - 0.5) * 28;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({ color: 0x93c5fd, size: 0.08, transparent: true, opacity: 0.6 });
    const particles = new THREE.Points(particleGeo, particleMat);
    group.add(particles);

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
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    let reqId;
    const animate = () => {
      reqId = requestAnimationFrame(animate);
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      crystal.rotation.x += 0.003;
      crystal.rotation.y += 0.005;
      core.rotation.x -= 0.004;
      ring.rotation.z += 0.002;
      ring2.rotation.x += 0.002;
      particles.rotation.y += 0.0008;

      group.rotation.y = targetX * 0.5;
      group.rotation.x = -targetY * 0.5;

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
      geometry.dispose();
      coreGeo.dispose();
      ringGeo.dispose();
      ringGeo2.dispose();
      particleGeo.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full pointer-events-none" aria-hidden="true" />;
}
