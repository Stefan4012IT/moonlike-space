import React, { useEffect, useRef } from 'react';
import { createNoise3D } from 'simplex-noise';

const InteractiveCanvas = () => {
    const canvasRef = useRef(null);
    const noise3D = createNoise3D();
    let animationFrameId;
    const numParticles = 500;
    const particleSpacing = 15;

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const generateWave = (width, height, time) => {
            const waveData = [];
            const frequency = 0.05;
            const amplitude = 50;
            for (let y = 0; y < height; y += particleSpacing) {
                for (let x = 0; x < width; x += particleSpacing) {
                    const noiseValue = noise3D(x * frequency, y * frequency, time * frequency);
                    const z = noiseValue * amplitude;
                    waveData.push({ x, y, z });
                }
            }
            return waveData;
        };

        const drawWave = (waveData) => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.fillStyle = 'black';
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.fillStyle = '#D90512';

            waveData.forEach(({ x, y, z }) => {
                const size = Math.max(1, 3 - z / 10);
                context.beginPath();
                context.arc(x, y - z, size, 0, Math.PI * 2);
                context.fill();
            });
        };

        const animate = (time) => {
            const waveData = generateWave(canvas.width, canvas.height, time * 0.001);
            drawWave(waveData);
            animationFrameId = requestAnimationFrame(animate);
        };

        const onScroll = () => {
            const scrollOffset = window.scrollY * 0.002;
            const waveData = generateWave(canvas.width, canvas.height, scrollOffset);
            drawWave(waveData);
        };

        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('scroll', onScroll);
        resizeCanvas();
        animate(0);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('scroll', onScroll);
        };
    }, []);

    return <canvas ref={canvasRef} id="interactiveCanvas" style={{ display: 'block', width: '100%' }}></canvas>;
};

export default InteractiveCanvas;