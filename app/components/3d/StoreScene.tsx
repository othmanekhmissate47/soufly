'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { cn } from '@/lib/utils';

interface Section {
  key: string;
  label: string;
  emoji: string;
  color: number;
  position: [number, number, number];
  glowColor: string;
}

const SECTIONS: Section[] = [
  { key: 'football',    label: 'Football',    emoji: '⚽', color: 0x0066ff, position: [-10, 0, -6], glowColor: '#0066ff' },
  { key: 'running',     label: 'Running',     emoji: '👟', color: 0x00ff88, position: [-4,  0, -6], glowColor: '#00ff88' },
  { key: 'fitness',     label: 'Fitness',     emoji: '🏋️', color: 0xff4500, position: [4,   0, -6], glowColor: '#ff4500' },
  { key: 'recovery',    label: 'Recovery',    emoji: '🧘', color: 0xc084fc, position: [10,  0, -6], glowColor: '#c084fc' },
  { key: 'accessories', label: 'Accessories', emoji: '🎒', color: 0xffd700, position: [-5,  0,  4], glowColor: '#ffd700' },
  { key: 'supplements', label: 'Supplements', emoji: '💊', color: 0x00e5ff, position: [5,   0,  4], glowColor: '#00e5ff' },
];

export function StoreScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeSection, setActiveSection] = useState<string>('all');
  const sceneRef = useRef<{ dispose: () => void } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ── Renderer ──────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000510, 1);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000510, 0.025);

    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 200);
    camera.position.set(0, 7, 16);
    camera.lookAt(0, 0, 0);

    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();

    // ── Floor ─────────────────────────────────────────────────────────────────
    const floorSolid = new THREE.Mesh(
      new THREE.PlaneGeometry(50, 50),
      new THREE.MeshBasicMaterial({ color: 0x010208 })
    );
    floorSolid.rotation.x = -Math.PI / 2;
    floorSolid.position.y = -2;
    scene.add(floorSolid);

    const floorGrid = new THREE.Mesh(
      new THREE.PlaneGeometry(50, 50, 30, 30),
      new THREE.MeshBasicMaterial({
        color: 0x0066ff,
        wireframe: true,
        transparent: true,
        opacity: 0.12,
      })
    );
    floorGrid.rotation.x = -Math.PI / 2;
    floorGrid.position.y = -1.99;
    scene.add(floorGrid);

    // ── Ceiling ───────────────────────────────────────────────────────────────
    const ceiling = new THREE.Mesh(
      new THREE.PlaneGeometry(50, 50),
      new THREE.MeshBasicMaterial({ color: 0x010208 })
    );
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = 10;
    scene.add(ceiling);

    // ── Walls (back) ──────────────────────────────────────────────────────────
    const wallMat = new THREE.MeshBasicMaterial({ color: 0x020310, side: THREE.DoubleSide });
    const backWall = new THREE.Mesh(new THREE.PlaneGeometry(50, 14), wallMat);
    backWall.position.set(0, 5, -14);
    scene.add(backWall);

    // ── Shelving Units ────────────────────────────────────────────────────────
    const shelfGroups: THREE.Group[] = [];

    SECTIONS.forEach(sec => {
      const group = new THREE.Group();

      // Back panel
      const panel = new THREE.Mesh(
        new THREE.BoxGeometry(5, 6, 0.15),
        new THREE.MeshBasicMaterial({ color: 0x06061a })
      );
      panel.position.z = -0.1;
      group.add(panel);

      // Shelf boards
      for (let i = 0; i < 4; i++) {
        const shelf = new THREE.Mesh(
          new THREE.BoxGeometry(5, 0.06, 0.9),
          new THREE.MeshBasicMaterial({ color: sec.color, transparent: true, opacity: 0.35 })
        );
        shelf.position.y = -2 + i * 1.4;
        shelf.position.z = 0.35;
        group.add(shelf);
      }

      // Left / right pillars
      [-2.4, 2.4].forEach(x => {
        const pillar = new THREE.Mesh(
          new THREE.BoxGeometry(0.06, 6, 0.9),
          new THREE.MeshBasicMaterial({ color: sec.color, transparent: true, opacity: 0.3 })
        );
        pillar.position.x = x;
        group.add(pillar);
      });

      // Glowing top strip
      const strip = new THREE.Mesh(
        new THREE.BoxGeometry(5, 0.04, 0.04),
        new THREE.MeshBasicMaterial({ color: sec.color, transparent: true, opacity: 1 })
      );
      strip.position.y = 2.9;
      group.add(strip);

      // Floating product orbs on shelves
      const orbPositions = [-1.3, 0, 1.3];
      const orbRows = [-0.7, 0.7];
      orbRows.forEach(ry => {
        orbPositions.forEach((rx, idx) => {
          const orb = new THREE.Mesh(
            new THREE.SphereGeometry(0.3, 16, 16),
            new THREE.MeshBasicMaterial({
              color: sec.color,
              transparent: true,
              opacity: 0.15,
              wireframe: true,
            })
          );
          orb.position.set(rx, ry, 0.5);
          orb.userData = { baseY: ry, offset: idx * 0.8 + orbRows.indexOf(ry) * 1.2 };
          group.add(orb);
        });
      });

      // Label plane (section name via custom approach)
      const namePlate = new THREE.Mesh(
        new THREE.BoxGeometry(3, 0.4, 0.04),
        new THREE.MeshBasicMaterial({ color: sec.color, transparent: true, opacity: 0.15 })
      );
      namePlate.position.y = 3.4;
      group.add(namePlate);

      group.position.set(...sec.position);
      scene.add(group);
      shelfGroups.push(group);
    });

    // ── Central Display Pedestal ──────────────────────────────────────────────
    const pedGeo = new THREE.CylinderGeometry(2, 2.2, 0.12, 32);
    const pedMat = new THREE.MeshBasicMaterial({ color: 0x0066ff, transparent: true, opacity: 0.25 });
    const pedestal = new THREE.Mesh(pedGeo, pedMat);
    pedestal.position.y = -1.95;
    scene.add(pedestal);

    // Pedestal glow ring
    const glowRingGeo = new THREE.TorusGeometry(2.3, 0.02, 8, 64);
    const glowRingMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.9 });
    const glowRing = new THREE.Mesh(glowRingGeo, glowRingMat);
    glowRing.rotation.x = Math.PI / 2;
    glowRing.position.y = -1.9;
    scene.add(glowRing);

    // Hero product at center
    const heroCoreGeo = new THREE.IcosahedronGeometry(0.9, 2);
    const heroCoreMat = new THREE.MeshBasicMaterial({ color: 0x0066ff, wireframe: true, transparent: true, opacity: 0.25 });
    const heroCore = new THREE.Mesh(heroCoreGeo, heroCoreMat);
    heroCore.position.y = 1.5;
    scene.add(heroCore);

    // Orbiting rings
    const orbitData: { mesh: THREE.Mesh; speed: number; tilt: number }[] = [];
    [1.4, 2.0, 2.6].forEach((r, i) => {
      const oGeo = new THREE.TorusGeometry(r, 0.012, 8, 80);
      const oMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.4 - i * 0.1 });
      const oMesh = new THREE.Mesh(oGeo, oMat);
      oMesh.position.y = 1.5;
      scene.add(oMesh);
      orbitData.push({ mesh: oMesh, speed: 0.4 + i * 0.15, tilt: i * 0.6 });
    });

    // ── Ceiling Lights ────────────────────────────────────────────────────────
    for (let i = 0; i < 10; i++) {
      const light = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.05, 0.5),
        new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9 })
      );
      light.position.set(-13.5 + i * 3, 9, -4);
      scene.add(light);

      // Light beam cone
      const beamGeo = new THREE.CylinderGeometry(0.05, 0.7, 8, 8, 1, true);
      const beamMat = new THREE.MeshBasicMaterial({
        color: 0x3399ff,
        transparent: true,
        opacity: 0.03,
        side: THREE.DoubleSide,
      });
      const beam = new THREE.Mesh(beamGeo, beamMat);
      beam.position.set(-13.5 + i * 3, 5.5, -4);
      scene.add(beam);
    }

    // ── Ambient Particles ─────────────────────────────────────────────────────
    const N = 600;
    const pPos = new Float32Array(N * 3);
    const pCol = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      pPos[i * 3]     = (Math.random() - 0.5) * 30;
      pPos[i * 3 + 1] = Math.random() * 10;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 24;
      pCol[i * 3]     = 0;
      pCol[i * 3 + 1] = 0.5 + Math.random() * 0.5;
      pCol[i * 3 + 2] = 1;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
    const pMat = new THREE.PointsMaterial({ size: 0.04, vertexColors: true, transparent: true, opacity: 0.5 });
    scene.add(new THREE.Points(pGeo, pMat));

    // ── Mouse drag rotation ───────────────────────────────────────────────────
    let isDragging = false;
    let lastX = 0, lastY = 0;
    let rotY = 0, rotX = 0;
    let targetRotY = 0, targetRotX = 0;
    let targetZ = 16;

    const onDown = (e: MouseEvent) => { isDragging = true; lastX = e.clientX; lastY = e.clientY; };
    const onMove = (e: MouseEvent) => {
      if (!isDragging) return;
      targetRotY += (e.clientX - lastX) * 0.01;
      targetRotX += (e.clientY - lastY) * 0.005;
      targetRotX = Math.max(-0.35, Math.min(0.35, targetRotX));
      lastX = e.clientX; lastY = e.clientY;
    };
    const onUp = () => { isDragging = false; };
    const onWheel = (e: WheelEvent) => {
      targetZ = Math.max(6, Math.min(22, targetZ + e.deltaY * 0.015));
    };

    canvas.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    canvas.addEventListener('wheel', onWheel, { passive: true });

    // Touch support
    let lastTouchX = 0;
    const onTouchStart = (e: TouchEvent) => { lastTouchX = e.touches[0].clientX; };
    const onTouchMove = (e: TouchEvent) => {
      targetRotY += (e.touches[0].clientX - lastTouchX) * 0.012;
      lastTouchX = e.touches[0].clientX;
    };
    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    canvas.addEventListener('touchmove', onTouchMove, { passive: true });

    // ── Animation Loop ────────────────────────────────────────────────────────
    let frame: number;
    let t = 0;

    const animate = () => {
      frame = requestAnimationFrame(animate);
      t += 0.012;

      // Smooth camera rotation
      rotY += (targetRotY - rotY) * 0.06;
      rotX += (targetRotX - rotX) * 0.06;
      const camZ = targetZ + (targetZ - camera.position.z) * 0.05;
      camera.position.x = Math.sin(rotY) * camZ;
      camera.position.z = Math.cos(rotY) * camZ;
      camera.position.y = 7 - rotX * 6;
      camera.lookAt(0, 0, 0);

      // Hero core
      heroCore.rotation.x = t * 0.3;
      heroCore.rotation.y = t * 0.5;
      heroCore.position.y = 1.5 + Math.sin(t * 0.8) * 0.25;

      // Orbit rings
      orbitData.forEach(({ mesh, speed, tilt }) => {
        mesh.rotation.y = t * speed;
        mesh.rotation.x = Math.sin(t * 0.2) * 0.4 + tilt;
        mesh.position.y = 1.5 + Math.sin(t * 0.7) * 0.15;
      });

      // Glow ring pulse
      (glowRingMat as THREE.MeshBasicMaterial).opacity = 0.5 + Math.sin(t * 1.5) * 0.4;

      // Shelf orbs float
      shelfGroups.forEach(group => {
        group.children.forEach(child => {
          if (child instanceof THREE.Mesh && child.geometry instanceof THREE.SphereGeometry) {
            if (child.userData.baseY !== undefined) {
              child.position.y = child.userData.baseY + Math.sin(t * 0.9 + child.userData.offset) * 0.12;
              child.rotation.y += 0.012;
            }
          }
        });
      });

      // Grid scroll
      floorGrid.position.z = (t * 0.25) % 1.5;

      renderer.render(scene, camera);
    };
    animate();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    sceneRef.current = {
      dispose: () => {
        cancelAnimationFrame(frame);
        canvas.removeEventListener('mousedown', onDown);
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseup', onUp);
        canvas.removeEventListener('wheel', onWheel);
        canvas.removeEventListener('touchstart', onTouchStart);
        canvas.removeEventListener('touchmove', onTouchMove);
        ro.disconnect();
        renderer.dispose();
      },
    };

    return () => sceneRef.current?.dispose();
  }, []);

  return (
    <div className="relative w-full h-full">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
        aria-label="Interactive 3D Store"
      />

      {/* HUD Overlay */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-wrap gap-2 justify-center z-10 px-4">
        {[{ key: 'all', label: 'Full Store' }, ...SECTIONS].slice(0, 5).map(sec => (
          <button
            key={sec.key}
            onClick={() => setActiveSection(sec.key)}
            className={cn(
              'px-4 py-2 rounded-full border text-[10px] font-bold tracking-widest uppercase transition-all duration-300 backdrop-blur-xl',
              activeSection === sec.key
                ? 'border-cyan-500/60 bg-cyan-500/10 text-cyan-400'
                : 'border-white/10 bg-black/50 text-white/40 hover:border-white/20 hover:text-white/70'
            )}
          >
            {'emoji' in sec ? `${sec.emoji} ` : ''}{sec.label}
          </button>
        ))}
      </div>

      {/* Drag hint */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-[10px] text-white/25 tracking-widest uppercase pointer-events-none">
        Drag to rotate · Scroll to zoom
      </div>

      {/* Section legend */}
      <div className="absolute top-24 right-6 flex flex-col gap-2 z-10 hidden lg:flex">
        {SECTIONS.map(sec => (
          <div key={sec.key} className="flex items-center gap-2">
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: sec.glowColor, boxShadow: `0 0 6px ${sec.glowColor}` }}
            />
            <span className="text-[9px] text-white/30 uppercase tracking-widest">{sec.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
