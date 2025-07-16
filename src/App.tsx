import { useState, useEffect, type ChangeEvent, type FormEvent } from 'react';
import { Canvas, useLoader, extend, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { Text } from '@react-three/drei';
import './App.css';

function Scene({ hovered }: { hovered: boolean }) {
  const gltf = useLoader(GLTFLoader, '/golden-ratio/assets/figures-low-poly.gltf');

  const modelRef = useRef<THREE.Object3D>(null);
  const ellipseRef = useRef<THREE.Line>(null);
  const textRef = useRef<THREE.Object3D>(null);

  // Log the scene graph once after loading
  useEffect(() => {
    // Traverse and log all mesh/group names
    gltf.scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        console.log('Mesh:', obj.name, obj);
      } else if (obj instanceof THREE.Group) {
        console.log('Group:', obj.name, obj);
      }
    });
  }, [gltf]);

  const waistY = 0.5; // Set this to the correct y-coordinate for the waist

  // Memoize ellipse geometry
  const ellipse = useMemo(() => {
    const curve = new THREE.EllipseCurve(
      0, waistY,      // ax, ay (center)
      0.8, 0.12,      // xRadius, yRadius (adjust for your model)
      0, 2 * Math.PI, // startAngle, endAngle
      false,          // clockwise
      0               // rotation
    );
    const points = curve.getPoints(50);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return geometry;
  }, [waistY]);

  // Animate scale on hover
  useFrame(() => {
    const targetScale = hovered ? 3 : 1.5;
    const targetY = hovered ? -3 : 0;

    if (!modelRef.current) {
      return;
    } else {
      modelRef.current.scale.x += (targetScale - modelRef.current.scale.x) * 0.1;
      modelRef.current.scale.y += (targetScale - modelRef.current.scale.y) * 0.1;
      modelRef.current.scale.z += (targetScale - modelRef.current.scale.z) * 0.1;
      modelRef.current.position.y += (targetY - modelRef.current.position.y) * 0.1;
    }

    if (!ellipseRef.current) {
      return;
    } else {
      ellipseRef.current.scale.x += (targetScale - ellipseRef.current.scale.x) * 0.1;
      ellipseRef.current.scale.y += (targetScale - ellipseRef.current.scale.y) * 0.1;
      ellipseRef.current.scale.z += (targetScale - ellipseRef.current.scale.z) * 0.1;
      ellipseRef.current.position.y += (targetY - ellipseRef.current.position.y) * 0.1;
    }

    // Text
    if (!textRef.current) {
      return;
    } else {
      textRef.current.scale.x += (targetScale - textRef.current.scale.x) * 0.1;
      textRef.current.scale.y += (targetScale - textRef.current.scale.y) * 0.1;
      textRef.current.scale.z += (targetScale - textRef.current.scale.z) * 0.1;
      textRef.current.position.y += (targetY - textRef.current.position.y) * 0.1;
    }

    // Smooth move down when hovered
    modelRef.current.position.y += (targetY - modelRef.current.position.y) * 0.1;
  });

  return (
    <>
      <primitive
        ref={modelRef}
        object={gltf.scene}
        scale={[1, 1, 1]}
        position={[0, -3, 0]}
      />
      {/* Ellipse around waist */}
      <line
        ref={ellipseRef}
        position={[0, waistY - 0.8, .25]} // Move to waist in world coordinates
        scale={[1.301, 1.301, 1.301]} // Match model scale
        geometry={ellipse}
      >
        <lineBasicMaterial attach="material" color="yellow" />
      </line>
      <Text
        ref={textRef}
        position={[1, waistY - 0.8, 0.25]} // Adjust X/Y/Z as needed
        fontSize={.30}
        color="yellow"
        anchorX="left"
        anchorY="middle"
      >
        Waist: 80cm
      </Text>
    </>
  );
}

function App() {
  const [inputValue, setInputValue] = useState<string>("");
  const [showFigure, setShowFigure] = useState<boolean>(false);
  const [hovered, setHovered] = useState(false);

  const wrist = Number(inputValue); // user input in inches

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  function handleCalculate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isNaN(wrist) && wrist > 0) {
      setShowFigure(true);
    }
  }

  return (
    <>
      <h1>Golden Ratio Calculator</h1>
      <div className='figure-container'>
        <h2>Figure frame</h2>
        <Canvas
          style={{ width: 300, height: 300 }}
          onPointerOver={() => { setHovered(true); }}
          onPointerOut={() => { setHovered(false); }}
        >
          <Scene hovered={hovered} />
          <ambientLight intensity={0.1} />
          <directionalLight color="red" position={[0, 0, 5]} />
        </Canvas>
      </div>

      {!showFigure && (
        <div className="input">
          <h3>Input your wrist measurement (in inches)</h3>
          <form onSubmit={handleCalculate}>
            <input
              type="number"
              min="1"
              max="23"
              step="any"
              value={inputValue}
              onChange={handleInputChange}
              required
            />
            <br />
            <button
              disabled={inputValue === "" || isNaN(Number(inputValue))}
            >
              Calculate!
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default App;