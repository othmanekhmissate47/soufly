'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    /* ── Renderer ── */
    const W = mount.clientWidth;
    const H = mount.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000);
    camera.position.set(0, 2, 10);

    /* ── Particles ── */
    const PARTICLE_COUNT = 3000;
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const r = 20 + Math.random() * 30;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;
      positions[i * 3]     = r * Math.cos(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * 0.6;
      positions[i * 3 + 2] = r * Math.cos(phi) * Math.sin(theta);

      const t = Math.random();
      if (t < 0.6) {
        colors[i * 3]     = 0;
        colors[i * 3 + 1] = 0.4 + t * 0.6;
        colors[i * 3 + 2] = 1;
      } else {
        colors[i * 3]     = 0;
        colors[i * 3 + 1] = 0.9;
        colors[i * 3 + 2] = t;
      }
      sizes[i] = 0.5 + Math.random() * 1.5;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color',    new THREE.BufferAttribute(colors, 3));
    geo.setAttribute('size',     new THREE.BufferAttribute(sizes, 1));

    const mat = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geo, mat);
    scene.add(particles);

    /* ── Grid ── */
    const gridGeo = new THREE.PlaneGeometry(80, 80, 40, 40);
    const gridMat = new THREE.MeshBasicMaterial({
      color: 0x0055cc,
      wireframe: true,
      transparent: true,
      opacity: 0.07,
    });
    const grid = new THREE.Mesh(gridGeo, gridMat);
    grid.rotation.x = -Math.PI / 2;
    grid.position.y = -5;
    scene.add(grid);

    /* ── Torus rings ── */
    const rings: THREE.Mesh[] = [];
    const ringData = [
      { radius: 4.0, tube: 0.015, color: 0x0066ff, opacity: 0.5 },
      { radius: 6.5, tube: 0.010, color: 0x00e5ff, opacity: 0.35 },
      { radius: 9.0, tube: 0.008, color: 0x0044cc, opacity: 0.25 },
    ];
    ringData.forEach(d => {
      const rg = new THREE.Mesh(
        new THREE.TorusGeometry(d.radius, d.tube, 8, 120),
        new THREE.MeshBasicMaterial({ color: d.color, transparent: true, opacity: d.opacity, blending: THREE.AdditiveBlending })
      );
      rg.rotation.x = -0.3;
      scene.add(rg);
      rings.push(rg);
    });

    /* ── Floating orbs ── */
    const orbs: Array<{ mesh: THREE.Mesh; speed: number; offset: number; orbit: number }> = [];
    for (let i = 0; i < 6; i++) {
      const r = 0.2 + Math.random() * 0.5;
      const orbGeo = new THREE.SphereGeometry(r, 16, 16);
      const orbMat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0x0066ff : 0x00e5ff,
        transparent: true,
        opacity: 0.12 + Math.random() * 0.12,
        wireframe: true,
      });
      const orb = new THREE.Mesh(orbGeo, orbMat);
      orb.position.set(
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8 - 2
      );
      scene.add(orb);
      orbs.push({ mesh: orb, speed: 0.3 + Math.random() * 0.5, offset: Math.random() * Math.PI * 2, orbit: 3 + Math.random() * 4 });
    }

    /* ── Mouse parallax ── */
    let mx = 0, my = 0;
    const onMouseMove = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth  - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    /* ── Animate ── */
    let t = 0;
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      t += 0.008;

      particles.rotation.y = t * 0.04 + mx * 0.05;
      particles.rotation.x = my * 0.03;

      rings.forEach((ring, i) => {
        ring.rotation.z = t * (0.06 + i * 0.02);
        ring.rotation.y = t * (0.04 - i * 0.01) + mx * 0.04;
      });

      orbs.forEach(o => {
        o.mesh.position.y += Math.sin(t * o.speed + o.offset) * 0.005;
        o.mesh.rotation.x += 0.004;
        o.mesh.rotation.y += 0.006;
      });

      // Slow camera drift
      camera.position.x += (mx * 1.5 - camera.position.x) * 0.02;
      camera.position.y += (-my * 0.8 + 2 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    /* ── Resize ── */
    const onResize = () => {
      const W2 = mount.clientWidth;
      const H2 = mount.clientHeight;
      renderer.setSize(W2, H2);
      camera.aspect = W2 / H2;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      geo.dispose();
      mat.dispose();
      gridGeo.dispose();
      gridMat.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
