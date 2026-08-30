import * as THREE from "three";

const BLUE = 0x2563eb;
const BLUE_SOFT = 0x5b8def;
const NAVY = 0x0b1f3a;
const WHITE = 0xf7faff;
const EYE_GLOW = 0x7fa6f2;

function metal(color, roughness = 0.35, metalness = 0.6) {
  return new THREE.MeshStandardMaterial({ color, roughness, metalness });
}

export function buildRobot() {
  const root = new THREE.Group();

  const head = new THREE.Group();
  head.position.y = 1.55;

  const headCore = new THREE.Mesh(
    new THREE.BoxGeometry(0.78, 0.62, 0.68, 2, 2, 2),
    metal(WHITE, 0.4, 0.3)
  );
  headCore.castShadow = true;
  head.add(headCore);

  const visor = new THREE.Mesh(
    new THREE.BoxGeometry(0.62, 0.28, 0.05),
    metal(NAVY, 0.2, 0.5)
  );
  visor.position.set(0, 0.02, 0.35);
  head.add(visor);

  const eyeGeo = new THREE.SphereGeometry(0.07, 16, 16);
  const eyeMat = new THREE.MeshStandardMaterial({
    color: EYE_GLOW,
    emissive: EYE_GLOW,
    emissiveIntensity: 1.4,
    roughness: 0.3,
  });
  const eyeL = new THREE.Mesh(eyeGeo, eyeMat);
  eyeL.position.set(-0.17, 0.02, 0.39);
  const eyeR = eyeL.clone();
  eyeR.position.x = 0.17;
  head.add(eyeL, eyeR);

  const antenna = new THREE.Mesh(
    new THREE.CylinderGeometry(0.015, 0.015, 0.3, 8),
    metal(BLUE_SOFT, 0.3, 0.5)
  );
  antenna.position.set(0, 0.46, 0);
  const antennaTip = new THREE.Mesh(
    new THREE.SphereGeometry(0.045, 12, 12),
    new THREE.MeshStandardMaterial({
      color: BLUE,
      emissive: BLUE,
      emissiveIntensity: 1,
    })
  );
  antennaTip.position.set(0, 0.62, 0);
  head.add(antenna, antennaTip);

  const earL = new THREE.Mesh(
    new THREE.CylinderGeometry(0.06, 0.06, 0.14, 12),
    metal(BLUE_SOFT)
  );
  earL.rotation.z = Math.PI / 2;
  earL.position.set(-0.44, 0, 0);
  const earR = earL.clone();
  earR.position.x = 0.44;
  head.add(earL, earR);

  root.add(head);

  const neck = new THREE.Mesh(
    new THREE.CylinderGeometry(0.12, 0.14, 0.16, 12),
    metal(0x9fb6dd)
  );
  neck.position.y = 1.18;
  root.add(neck);

  const torso = new THREE.Group();
  torso.position.y = 0.72;

  const chest = new THREE.Mesh(
    new THREE.BoxGeometry(0.95, 0.85, 0.55, 2, 2, 2),
    metal(WHITE, 0.45, 0.25)
  );
  torso.add(chest);

  const chestPanel = new THREE.Mesh(
    new THREE.CircleGeometry(0.16, 24),
    new THREE.MeshStandardMaterial({
      color: BLUE,
      emissive: BLUE,
      emissiveIntensity: 0.9,
      side: THREE.DoubleSide,
    })
  );
  chestPanel.position.set(0, 0.1, 0.28);
  torso.add(chestPanel);

  const chestRing = new THREE.Mesh(
    new THREE.RingGeometry(0.17, 0.2, 24),
    new THREE.MeshStandardMaterial({ color: BLUE_SOFT, side: THREE.DoubleSide })
  );
  chestRing.position.set(0, 0.1, 0.281);
  torso.add(chestRing);

  root.add(torso);

  function buildArm(side) {
    const arm = new THREE.Group();
    const shoulder = new THREE.Mesh(
      new THREE.SphereGeometry(0.15, 16, 16),
      metal(BLUE_SOFT)
    );
    arm.add(shoulder);

    const upper = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.09, 0.42, 4, 8),
      metal(WHITE, 0.4, 0.3)
    );
    upper.position.y = -0.28;
    arm.add(upper);

    const elbow = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 12), metal(BLUE_SOFT));
    elbow.position.y = -0.5;
    arm.add(elbow);

    const forearmGroup = new THREE.Group();
    forearmGroup.position.y = -0.5;
    const forearm = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.075, 0.36, 4, 8),
      metal(0xdce7f7, 0.4, 0.3)
    );
    forearm.position.y = -0.22;
    forearmGroup.add(forearm);

    const hand = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 12), metal(BLUE));
    hand.position.y = -0.42;
    forearmGroup.add(hand);

    arm.add(forearmGroup);
    arm.position.set(side * 0.58, 0.28, 0);
    arm.rotation.z = side * 0.12;

    return { group: arm, forearm: forearmGroup };
  }

  const armL = buildArm(-1);
  const armR = buildArm(1);
  torso.add(armL.group, armR.group);

  function buildLeg(side) {
    const leg = new THREE.Group();
    const thigh = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.1, 0.34, 4, 8),
      metal(WHITE, 0.4, 0.3)
    );
    thigh.position.y = -0.2;
    leg.add(thigh);

    const shin = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.085, 0.3, 4, 8),
      metal(0xdce7f7, 0.4, 0.3)
    );
    shin.position.y = -0.52;
    leg.add(shin);

    const foot = new THREE.Mesh(
      new THREE.BoxGeometry(0.18, 0.08, 0.26),
      metal(BLUE, 0.3, 0.5)
    );
    foot.position.set(0, -0.7, 0.05);
    leg.add(foot);

    leg.position.set(side * 0.22, -0.42, 0);
    return leg;
  }

  const legL = buildLeg(-1);
  const legR = buildLeg(1);
  root.add(legL, legR);

  root.traverse((node) => {
    if (node.isMesh) {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });

  return {
    root,
    head,
    eyeL,
    eyeR,
    armL: armL.group,
    armR: armR.group,
    forearmL: armL.forearm,
    forearmR: armR.forearm,
    legL,
    legR,
    torso,
    chestPanel,
  };
}
