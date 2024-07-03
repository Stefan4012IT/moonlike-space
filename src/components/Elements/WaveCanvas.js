import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { createNoise3D } from 'simplex-noise';
import * as THREE from 'three';

const Wave = () => {
    const mesh = useRef();
    const noise3D = createNoise3D();

    // Inicijalizacija pozicija
    const positions = useMemo(() => {
        const size = 300;
        const sep = 1;
        const newPositions = [];

        for (let x = -size / 2; x < size / 2; x += sep) {
            for (let y = -size / 2; y < size / 2; y += sep) {
                const z = Math.sin((x * y) / 100) * 5;
                newPositions.push(x, y, z);
            }
        }

        return new Float32Array(newPositions);
    }, []);

    // Ažuriranje pozicija
    useFrame(({ clock }) => {
        const time = clock.getElapsedTime();
        for (let i = 0; i < positions.length; i += 3) {
            const x = positions[i];
            const y = positions[i + 1];
            positions[i + 2] = noise3D(x * 0.03, y * 0.03, time * 0.1) * 10;
        }
        if (mesh.current) {
            mesh.current.geometry.setAttribute(
                'position',
                new THREE.Float32BufferAttribute(positions, 3)
            );
            mesh.current.geometry.attributes.position.needsUpdate = true;
        }
    });

    return (
        <points ref={mesh}>
            <bufferGeometry attach="geometry">
                <bufferAttribute
                    attachObject={['attributes', 'position']}
                    array={positions}
                    itemSize={3}
                    count={positions.length / 3}
                />
            </bufferGeometry>
            <pointsMaterial size={1} color="#D90512" />
        </points>
    );
};

const WaveCanvas = () => {
    return (
        <Canvas className='waveCanvas'
            camera={{ position: [0, -200, 250], fov: 10 }}
            style={{ width: '100vw', height: '100vh', position: 'fixed' }}
            onCreated={({ gl }) => {
                gl.setClearColor('#000');
            }}
        >
            <Wave />
            <OrbitControls enableZoom={false} enableRotate={false} />
        </Canvas>
    );
};

export default WaveCanvas;
