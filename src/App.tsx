import { useState, useEffect, type ChangeEvent, type FormEvent } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import './App.css';

function Scene({ hovered }: { hovered: boolean }) {
  const gltf = useLoader(GLTFLoader, '/golden-ratio/assets/figures-low-poly.gltf');
  const ref = useRef<THREE.Object3D>(null);

  // Log the scene graph once after loading
  useEffect(() => {
    console.log('GLTF Nodes:', gltf.parser.json.nodes);
    console.log('GLTF Meshes:', gltf.parser.json.meshes);
    console.log('GLTF Scene Graph:', gltf.scene);
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
    if (ref.current) {
      const target = hovered ? 3 : 1.5;
      ref.current.scale.x += (target - ref.current.scale.x) * 1.3;
      ref.current.scale.y += (target - ref.current.scale.y) * 1.3;
      ref.current.scale.z += (target - ref.current.scale.z) * 1.3;

      // Smooth move down when hovered
      const targetY = hovered ? -3 : 0;
      ref.current.position.y += (targetY - ref.current.position.y) * 0.1;
    }
  });

  return (
    <>
      <primitive
        ref={ref}
        object={gltf.scene}
        scale={[1, 1, 1]}
        position={[0, -3, 0]}
      />
      {/* Ellipse around waist */}
      <line
        position={[0, waistY - 0.8, 0.25]} // Move to waist in world coordinates
        scale={[1.301, 1.301, 1.301]} // Match model scale
      >
        <bufferGeometry attach="geometry" {...ellipse} />
        <lineBasicMaterial attach="material" color="yellow" />
      </line>
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