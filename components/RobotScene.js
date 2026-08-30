"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { buildRobot } from "@/lib/robot-builder";
import { createRobotAnimator } from "@/lib/robot-animator";

export default function RobotScene({ talkLevelRef }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(
      38,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.1, 4.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.shadowMap.enabled = true;
    mount.appendChild(renderer.domElement);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.6);
    keyLight.position.set(2.5, 4, 3);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x5b8def, 0.6);
    fillLight.position.set(-3, 1.5, -2);
    scene.add(fillLight);

    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambient);

    const groundGeo = new THREE.CircleGeometry(2.2, 48);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0xeaf1ff,
      roughness: 0.9,
      metalness: 0,
      transparent: true,
      opacity: 0.5,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.85;
    ground.receiveShadow = true;
    scene.add(ground);

    const parts = buildRobot();
    parts.root.position.y = -0.3;
    scene.add(parts.root);

    const animator = createRobotAnimator(parts);

    let dragging = false;
    let dragStartX = 0;
    let baseRotation = 0;
    let targetRotationY = 0;
    let autoRotate = true;

    function onPointerDown(event) {
      dragging = true;
      autoRotate = false;
      dragStartX = event.clientX;
      baseRotation = parts.root.rotation.y;
    }

    function onPointerMove(event) {
      if (!dragging) return;
      const delta = (event.clientX - dragStartX) * 0.008;
      targetRotationY = baseRotation + delta;
    }

    function onPointerUp() {
      dragging = false;
    }

    mount.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    function handleResize() {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    }
    window.addEventListener("resize", handleResize);

    const clock = new THREE.Clock();
    let frameId;

    function animate() {
      const elapsed = clock.getElapsedTime();
      const delta = clock.getDelta();

      if (autoRotate) {
        targetRotationY += delta * 0.15;
      }
      parts.root.rotation.y += (targetRotationY - parts.root.rotation.y) * Math.min(1, delta * 4);

      animator.tick(elapsed, delta, talkLevelRef.current);

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      mount.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      scene.traverse((node) => {
        if (node.isMesh) {
          node.geometry.dispose();
          if (Array.isArray(node.material)) {
            node.material.forEach((m) => m.dispose());
          } else {
            node.material.dispose();
          }
        }
      });
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [talkLevelRef]);

  return <div ref={mountRef} className="robot-canvas-mount" />;
}
