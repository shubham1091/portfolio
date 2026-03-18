/* eslint-disable @typescript-eslint/no-explicit-any */
import * as THREE from 'three'
import { useEffect, useRef, useState, useMemo, Suspense } from 'react'
import { Canvas, extend, useThree, useFrame, type ThreeEvent } from '@react-three/fiber'
import { useGLTF, useTexture, Environment } from '@react-three/drei'
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier'
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'

extend({ MeshLineGeometry, MeshLineMaterial })

declare module '@react-three/fiber' {
  interface ThreeElements {
    meshLineGeometry: object
    meshLineMaterial: { color?: string; depthTest?: boolean; resolution?: [number, number]; useMap?: boolean; map?: THREE.Texture; repeat?: [number, number]; lineWidth?: number }
  }
}

const GLB_URL = '/tag-2.glb'
const BAND_URL = '/band.png'

type CardGLTF = {
  nodes: {
    card: THREE.Mesh
    clip: THREE.Mesh
    clamp: THREE.Mesh
  }
  materials: {
    base: THREE.MeshStandardMaterial
    metal: THREE.Material
  }
}

useGLTF.preload(GLB_URL)
useTexture.preload(BAND_URL)

function Band({ maxSpeed = 50, minSpeed = 10 }) {
  const band = useRef<any>(null), fixed = useRef<any>(null), j1 = useRef<any>(null), j2 = useRef<any>(null), j3 = useRef<any>(null), card = useRef<any>(null) // prettier-ignore
  const vec = new THREE.Vector3(), ang = new THREE.Vector3(), rot = new THREE.Vector3(), dir = new THREE.Vector3() // prettier-ignore
  const segmentProps = { type: 'dynamic' as const, canSleep: true, colliders: false as const, angularDamping: 2, linearDamping: 2 }
  
  const { nodes, materials } = useGLTF(GLB_URL) as unknown as CardGLTF
  const texture = useTexture(BAND_URL)
  const bandTexture = useMemo(() => {
    const next = texture.clone()
    next.wrapS = THREE.RepeatWrapping
    next.wrapT = THREE.RepeatWrapping
    next.needsUpdate = true
    return next
  }, [texture])
  
  const { width, height } = useThree((state) => state.size)
  const curve = useMemo(() => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]), [])
  const [dragged, drag] = useState<THREE.Vector3 | false>(false)
  const [hovered, hover] = useState(false)
  const [isInteractive, setIsInteractive] = useState(false)
  const windTime = useRef(0)

  useEffect(() => {
    return () => {
      bandTexture.dispose()
    }
  }, [bandTexture])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
    const updateInteractivity = () => {
      setIsInteractive(mediaQuery.matches)
      if (!mediaQuery.matches) {
        hover(false)
        drag(false)
      }
    }

    updateInteractivity()
    mediaQuery.addEventListener('change', updateInteractivity)

    return () => {
      mediaQuery.removeEventListener('change', updateInteractivity)
    }
  }, [])

  // Joints should be called early but they depend on refs
  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1])
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1])
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1])
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]])

  useEffect(() => {
    if (isInteractive && hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab'
      return () => void (document.body.style.cursor = 'auto')
    }
  }, [hovered, dragged, isInteractive])

  useFrame((state, delta) => {
    windTime.current += delta

    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera)
      dir.copy(vec).sub(state.camera.position).normalize()
      vec.add(dir.multiplyScalar(state.camera.position.length()))
      ;[card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp())
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z })
    }

    if (fixed.current && j1.current && j2.current && j3.current && card.current && band.current) {
      if (!dragged) {
        const swayX = Math.sin(windTime.current * 0.7) * 0.35
        const swayZ = Math.cos(windTime.current * 0.55) * 0.2

        ;[j2, j3, card].forEach((ref) => ref.current?.wakeUp())
        j2.current.applyImpulse({ x: swayX * delta, y: 0, z: swayZ * delta }, true)
        j3.current.applyImpulse({ x: swayX * delta * 1.2, y: 0, z: swayZ * delta * 1.2 }, true)
        card.current.applyTorqueImpulse({ x: 0, y: swayX * delta * 0.03, z: swayZ * delta * 0.06 }, true)
      }

      ;[j1, j2].forEach((ref) => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation())
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())))
        ref.current.lerped.lerp(ref.current.translation(), delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)))
      })

      curve.points[0].copy(j3.current.translation())
      curve.points[1].copy(j2.current.lerped)
      curve.points[2].copy(j1.current.lerped)
      curve.points[3].copy(fixed.current.translation())
      const geometry = band.current.geometry as unknown as { setPoints: (points: THREE.Vector3[]) => void }
      geometry.setPoints(curve.getPoints(32))

      ang.copy(card.current.angvel())
      rot.copy(card.current.rotation())
      const spinY = dragged ? 0 : 0.55
      card.current.setAngvel({ x: ang.x, y: spinY - rot.y * 0.25, z: ang.z }, true)
    }
  })

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={isInteractive ? () => hover(true) : undefined}
            onPointerOut={isInteractive ? () => hover(false) : undefined}
            onPointerUp={isInteractive ? (e: ThreeEvent<PointerEvent>) => {
              const target = e.currentTarget as HTMLElement
              target.releasePointerCapture(e.pointerId)
              drag(false)
            } : undefined}
            onPointerDown={isInteractive ? (e: ThreeEvent<PointerEvent>) => (
              (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId),
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())))
            ) : undefined}>
            <mesh geometry={nodes.card.geometry}>
              <meshStandardMaterial map={materials.base.map} roughness={0.5} metalness={0.2} transparent opacity={1} />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial color="white" depthTest={false} resolution={[width, height]} useMap map={bandTexture} repeat={[-3, 1]} lineWidth={1} />
      </mesh>
    </>
  )
}

export default function HangingCard() {
  const [error, setError] = useState<string | null>(null);

  if (error) {
    return (
      <div className="w-full h-150 flex items-center justify-center bg-indigo-900/10 rounded-3xl text-sm text-white/60 border border-white/5 p-8 text-center">
        <div>
          <p className="font-bold mb-2">3D Scene Unavailable</p>
          <p className="opacity-70">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-150">
      <Canvas 
        shadows={false} 
        camera={{ position: [0, 0, 13], fov: 25 }} 
        gl={{ alpha: true, antialias: true, failIfMajorPerformanceCaveat: false }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
        onError={(err: unknown) => {
          console.error("Canvas Error:", err);
          if (err instanceof Error) {
            setError(err.message);
            return;
          }
          setError("WebGL initialization failed");
        }}
      >
        <ambientLight intensity={Math.PI / 2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <Suspense fallback={null}>
          <Physics gravity={[0, -40, 0]}>
            <Band />
          </Physics>
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  )
}
