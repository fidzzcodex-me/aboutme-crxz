export function createRobotAnimator(parts) {
  let blinkTimer = randomBlinkInterval();
  let nextLookTimer = randomLookInterval();
  let lookTargetY = 0;
  let currentLookY = 0;

  function randomBlinkInterval() {
    return 2.5 + Math.random() * 3;
  }

  function randomLookInterval() {
    return 3 + Math.random() * 4;
  }

  function tick(elapsed, delta, talkLevel) {
    const p = parts;

    p.root.position.y = Math.sin(elapsed * 1.4) * 0.035;
    p.torso.rotation.z = Math.sin(elapsed * 1.1) * 0.02;

    blinkTimer -= delta;
    if (blinkTimer <= 0) {
      blinkTimer = randomBlinkInterval();
    }
    const blinkPhase = Math.max(0, 1 - blinkTimer / 0.12);
    const blinkScale = blinkTimer < 0.12 ? Math.max(0.08, 1 - blinkPhase) : 1;
    p.eyeL.scale.y = blinkScale;
    p.eyeR.scale.y = blinkScale;

    nextLookTimer -= delta;
    if (nextLookTimer <= 0) {
      nextLookTimer = randomLookInterval();
      lookTargetY = (Math.random() - 0.5) * 0.5;
    }
    currentLookY += (lookTargetY - currentLookY) * Math.min(1, delta * 2);
    p.head.rotation.y = currentLookY + Math.sin(elapsed * 0.5) * 0.04;
    p.head.rotation.x = Math.sin(elapsed * 0.8) * 0.03;

    p.armL.rotation.x = Math.sin(elapsed * 1.3) * 0.05;
    p.armR.rotation.x = Math.sin(elapsed * 1.3 + Math.PI) * 0.05;
    p.forearmL.rotation.x = Math.sin(elapsed * 1.6) * 0.06;
    p.forearmR.rotation.x = Math.sin(elapsed * 1.6 + Math.PI) * 0.06;

    if (talkLevel > 0.01) {
      const bob = talkLevel * 0.08;
      p.head.position.y = bob * Math.sin(elapsed * 14);
      p.head.rotation.x += talkLevel * 0.1 * Math.sin(elapsed * 10);
      p.chestPanel.material.emissiveIntensity = 0.9 + talkLevel * 1.8;
      p.armL.rotation.z = -0.12 - talkLevel * 0.1 * Math.sin(elapsed * 6);
      p.armR.rotation.z = 0.12 + talkLevel * 0.1 * Math.sin(elapsed * 6 + Math.PI);
    } else {
      p.head.position.y += (0 - p.head.position.y) * Math.min(1, delta * 4);
      p.chestPanel.material.emissiveIntensity +=
        (0.9 - p.chestPanel.material.emissiveIntensity) * Math.min(1, delta * 4);
      p.armL.rotation.z += (-0.12 - p.armL.rotation.z) * Math.min(1, delta * 4);
      p.armR.rotation.z += (0.12 - p.armR.rotation.z) * Math.min(1, delta * 4);
    }
  }

  return { tick };
}
