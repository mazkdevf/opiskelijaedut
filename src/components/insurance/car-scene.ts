import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

const BODY_WIDTH = 1.76;
const CABIN_WIDTH = 1.46;
const WHEEL_RADIUS = 0.37;
const AXLES = [1.45, -1.45];
const AUTO_SPEED = 0.25;
const DRAG_SPEED = 0.008;

function extrude(shape: THREE.Shape, width: number, bevel: number) {
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: width,
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 4,
    curveSegments: 24,
  });
  geometry.translate(0, 0, -width / 2);
  return geometry;
}

function bodyShape() {
  const shape = new THREE.Shape();
  shape.moveTo(-2.25, 0.3);
  shape.quadraticCurveTo(-2.38, 0.32, -2.36, 0.6);
  shape.lineTo(-2.33, 0.92);
  shape.quadraticCurveTo(-2.3, 1, -2.1, 1);
  shape.lineTo(-1.55, 1.02);
  shape.lineTo(1.05, 1);
  shape.quadraticCurveTo(1.8, 0.97, 2.2, 0.84);
  shape.quadraticCurveTo(2.38, 0.78, 2.36, 0.55);
  shape.quadraticCurveTo(2.36, 0.32, 2.2, 0.3);
  for (const x of AXLES) {
    shape.lineTo(x + 0.43, 0.3);
    shape.absarc(x, 0.34, 0.43, 0, Math.PI, false);
  }
  shape.lineTo(-2.25, 0.3);
  return shape;
}

function cabinShape() {
  const shape = new THREE.Shape();
  shape.moveTo(-1.62, 0.98);
  shape.lineTo(-0.95, 1.4);
  shape.quadraticCurveTo(-0.3, 1.47, 0.3, 1.43);
  shape.lineTo(1.12, 0.98);
  shape.closePath();
  return shape;
}

function roofShape() {
  const shape = new THREE.Shape();
  shape.moveTo(-0.97, 1.4);
  shape.quadraticCurveTo(-0.3, 1.475, 0.32, 1.432);
  shape.lineTo(0.32, 1.462);
  shape.quadraticCurveTo(-0.3, 1.505, -0.97, 1.43);
  shape.closePath();
  return shape;
}

function shadowTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 256;
  const context = canvas.getContext("2d")!;
  const gradient = context.createRadialGradient(128, 128, 0, 128, 128, 128);
  gradient.addColorStop(0, "rgba(0,0,0,0.55)");
  gradient.addColorStop(0.6, "rgba(0,0,0,0.25)");
  gradient.addColorStop(1, "rgba(0,0,0,0)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, 256, 256);
  return new THREE.CanvasTexture(canvas);
}

function buildCar() {
  const paint = new THREE.MeshPhysicalMaterial({
    color: 0x070707,
    metalness: 0.55,
    roughness: 0.3,
    clearcoat: 1,
    clearcoatRoughness: 0.06,
  });
  const glass = new THREE.MeshPhysicalMaterial({
    color: 0x020203,
    metalness: 0.9,
    roughness: 0.04,
  });
  const tyre = new THREE.MeshStandardMaterial({
    color: 0x0c0c0c,
    roughness: 0.9,
  });
  const rim = new THREE.MeshStandardMaterial({
    color: 0x9a9a9a,
    metalness: 1,
    roughness: 0.28,
  });
  const headlight = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0xf4f6ff,
    emissiveIntensity: 1.6,
  });
  const taillight = new THREE.MeshStandardMaterial({
    color: 0x3a0000,
    emissive: 0xff1a1a,
    emissiveIntensity: 1.4,
  });

  const car = new THREE.Group();
  car.add(
    new THREE.Mesh(extrude(bodyShape(), BODY_WIDTH - 0.1, 0.12), paint),
    new THREE.Mesh(extrude(cabinShape(), CABIN_WIDTH, 0.08), glass),
    new THREE.Mesh(extrude(roofShape(), 1.3, 0.05), paint),
  );

  const pillar = new THREE.Mesh(
    new THREE.BoxGeometry(0.08, 0.44, CABIN_WIDTH + 0.17),
    paint,
  );
  pillar.position.set(-0.28, 1.2, 0);
  car.add(pillar);

  const tyreGeometry = new THREE.CylinderGeometry(
    WHEEL_RADIUS,
    WHEEL_RADIUS,
    0.25,
    48,
  );
  const rimGeometry = new THREE.CylinderGeometry(0.23, 0.23, 0.262, 48);
  const hubGeometry = new THREE.CylinderGeometry(0.07, 0.07, 0.27, 24);
  for (const x of AXLES) {
    for (const side of [1, -1]) {
      const wheel = new THREE.Group();
      wheel.add(
        new THREE.Mesh(tyreGeometry, tyre),
        new THREE.Mesh(rimGeometry, rim),
        new THREE.Mesh(hubGeometry, tyre),
      );
      wheel.rotation.x = Math.PI / 2;
      wheel.position.set(x, WHEEL_RADIUS, side * 0.83);
      car.add(wheel);
    }
  }

  const headlightGeometry = new THREE.BoxGeometry(0.06, 0.1, 0.46);
  const taillightGeometry = new THREE.BoxGeometry(0.06, 0.11, 0.52);
  for (const side of [1, -1]) {
    const front = new THREE.Mesh(headlightGeometry, headlight);
    front.position.set(2.37, 0.7, side * 0.62);
    const rear = new THREE.Mesh(taillightGeometry, taillight);
    rear.position.set(-2.36, 0.85, side * 0.58);
    car.add(front, rear);
  }

  const grille = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.2, 0.62), glass);
  grille.position.set(2.385, 0.6, 0);
  car.add(grille);

  const shadow = new THREE.Mesh(
    new THREE.PlaneGeometry(7, 3.8),
    new THREE.MeshBasicMaterial({
      map: shadowTexture(),
      transparent: true,
      depthWrite: false,
    }),
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = 0.002;
  car.add(shadow);

  return car;
}

export function mountCarScene(container: HTMLElement): () => void {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.domElement.style.display = "block";
  container.append(renderer.domElement);

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

  const key = new THREE.DirectionalLight(0xffffff, 2.2);
  key.position.set(4, 6, 5);
  scene.add(key);

  const camera = new THREE.PerspectiveCamera(26, 1, 0.1, 50);
  camera.position.set(5.2, 1.9, 6);
  camera.lookAt(0, 0.6, 0);

  const car = buildCar();
  car.rotation.y = 0.35;
  scene.add(car);

  const resize = () => {
    const { clientWidth, clientHeight } = container;
    if (clientWidth === 0 || clientHeight === 0) return;
    renderer.setSize(clientWidth, clientHeight, false);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    camera.aspect = clientWidth / clientHeight;
    camera.zoom = Math.min(0.95, camera.aspect / 1.7);
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
  };
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(container);

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let dragging = false;
  let lastX = 0;

  const onPointerDown = (event: PointerEvent) => {
    dragging = true;
    lastX = event.clientX;
    container.setPointerCapture(event.pointerId);
  };
  const onPointerMove = (event: PointerEvent) => {
    if (!dragging) return;
    car.rotation.y += (event.clientX - lastX) * DRAG_SPEED;
    lastX = event.clientX;
    renderer.render(scene, camera);
  };
  const onPointerUp = () => {
    dragging = false;
  };
  container.addEventListener("pointerdown", onPointerDown);
  container.addEventListener("pointermove", onPointerMove);
  container.addEventListener("pointerup", onPointerUp);
  container.addEventListener("pointercancel", onPointerUp);

  const clock = new THREE.Clock();
  const tick = () => {
    const delta = clock.getDelta();
    if (!dragging && !reducedMotion.matches) {
      car.rotation.y += delta * AUTO_SPEED;
    }
    renderer.render(scene, camera);
  };

  const visibility = new IntersectionObserver(([entry]) => {
    clock.getDelta();
    renderer.setAnimationLoop(entry?.isIntersecting ? tick : null);
  });
  visibility.observe(container);

  return () => {
    visibility.disconnect();
    resizeObserver.disconnect();
    renderer.setAnimationLoop(null);
    container.removeEventListener("pointerdown", onPointerDown);
    container.removeEventListener("pointermove", onPointerMove);
    container.removeEventListener("pointerup", onPointerUp);
    container.removeEventListener("pointercancel", onPointerUp);
    scene.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) return;
      object.geometry.dispose();
      for (const material of [object.material].flat()) {
        material.map?.dispose();
        material.dispose();
      }
    });
    scene.environment?.dispose();
    pmrem.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
