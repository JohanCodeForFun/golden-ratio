import { Object3DNode } from '@react-three/fiber';
import * as THREE from 'three';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      line: Object3DNode<THREE.Line, typeof THREE.Line>;
    }
  }
}
