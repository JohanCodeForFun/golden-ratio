import { useState, useEffect, type ChangeEvent, type FormEvent } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import './App.css';

function Scene({ hovered }: { hovered: boolean }) {
  const gltf = useLoader(GLTFLoader, 'src/assets/anatomy_study_2/figures-low-poly.gltf');
  const ref = useRef<THREE.Object3D>(null);

  // Log the scene graph once after loading
  useEffect(() => {
    if (gltf && gltf.scene) {
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
    }
  }, [gltf]);

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
    <primitive
      ref={ref}
      object={gltf.scene}
      scale={[0.001, 0.001, 0.001]}
      position={[0, -3, 0]}
    />
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
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
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