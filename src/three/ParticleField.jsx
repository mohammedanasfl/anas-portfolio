import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Deterministic pseudo-random (pure) — stable across renders.
const hash = (n) => {
  const s = Math.sin(n * 12.9898) * 43758.5453;
  return s - Math.floor(s);
};

const COUNT_X = 160;
const COUNT_Y = 90;
const SEP = 0.19;

// Approx. half-extent of the visible plane at the camera distance below —
// used to map the normalised cursor onto the field's own coordinate space.
const HALF_W = 9.4;
const HALF_H = 5.6;

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;   // cursor position in the field's plane space
  uniform float uSize;
  attribute float aRandom;
  varying float vElevation;
  varying float vFade;
  varying float vGlow;

  void main() {
    vec3 pos = position;

    // Flowing ambient ripples
    float w1 = sin(pos.x * 0.55 + uTime * 0.6) * cos(pos.y * 0.5 + uTime * 0.42);
    float w2 = sin((pos.x + pos.y) * 0.32 - uTime * 0.8);
    float w3 = sin(length(pos.xy) * 0.55 - uTime * 1.0);
    float elevation = w1 * 0.6 + w2 * 0.4 + w3 * 0.25;
    pos.z += elevation * 1.5;

    // Cursor interaction: points near the cursor lift toward the camera + spread
    float md = distance(pos.xy, uMouse);
    float glow = smoothstep(3.8, 0.0, md);
    pos.z += glow * 3.0;
    pos.xy += normalize(pos.xy - uMouse + 0.0001) * glow * 0.55;
    vGlow = glow;

    vElevation = elevation;
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    float dist = -mv.z;
    gl_PointSize = uSize * (0.55 + aRandom * 0.9) * (1.0 + glow * 2.2) * (1.0 / dist);
    vFade = smoothstep(22.0, 6.0, dist);
    gl_Position = projectionMatrix * mv;
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying float vElevation;
  varying float vFade;
  varying float vGlow;

  void main() {
    float d = distance(gl_PointCoord, vec2(0.5));
    if (d > 0.5) discard;
    float soft = smoothstep(0.5, 0.0, d);

    vec3 col = mix(uColorA, uColorB, smoothstep(0.25, 1.05, vElevation)); // red on crests
    col = mix(col, uColorB, vGlow);                                       // red around cursor
    float alpha = soft * vFade * (0.75 + vGlow * 0.6);
    gl_FragColor = vec4(col, clamp(alpha, 0.0, 1.0));
  }
`;

function Field({ pointer }) {
  const matRef = useRef(null);
  const groupRef = useRef(null);

  const { positions, randoms } = useMemo(() => {
    const positions = new Float32Array(COUNT_X * COUNT_Y * 3);
    const randoms = new Float32Array(COUNT_X * COUNT_Y);
    let i = 0;
    for (let x = 0; x < COUNT_X; x++) {
      for (let y = 0; y < COUNT_Y; y++) {
        positions[i * 3] = (x - COUNT_X / 2) * SEP;
        positions[i * 3 + 1] = (y - COUNT_Y / 2) * SEP;
        positions[i * 3 + 2] = 0;
        randoms[i] = hash(i + 1);
        i++;
      }
    }
    return { positions, randoms };
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(999, 999) }, // start off-plane (no glow until move)
      uSize: { value: 46 },
      uColorA: { value: new THREE.Color('#dbe3ff') }, // brighter pale base
      uColorB: { value: new THREE.Color('#ff2a2a') }, // brand red (crest + cursor)
    }),
    []
  );

  useFrame((state, delta) => {
    if (matRef.current) {
      matRef.current.uniforms.uTime.value += delta;
      const u = matRef.current.uniforms.uMouse.value;
      const tx = pointer.current.x * HALF_W;
      const ty = pointer.current.y * HALF_H;
      u.x += (tx - u.x) * 0.12;
      u.y += (ty - u.y) * 0.12;
    }
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.05) * 0.03;
    }
  });

  return (
    <group ref={groupRef} rotation={[-0.08, 0, 0]}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-aRandom" args={[randoms, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={matRef}
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

export default function ParticleField() {
  const pointer = useRef({ x: 3, y: 3 }); // off-screen until the user moves

  useEffect(() => {
    const set = (cx, cy) => {
      pointer.current.x = (cx / window.innerWidth) * 2 - 1;
      pointer.current.y = -((cy / window.innerHeight) * 2 - 1);
    };
    const onMouse = (e) => set(e.clientX, e.clientY);
    const onTouch = (e) => { if (e.touches[0]) set(e.touches[0].clientX, e.touches[0].clientY); };
    window.addEventListener('mousemove', onMouse);
    window.addEventListener('touchmove', onTouch, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('touchmove', onTouch);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 10.5], fov: 55 }}
        dpr={[1, 2]}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      >
        <Field pointer={pointer} />
      </Canvas>
    </div>
  );
}
