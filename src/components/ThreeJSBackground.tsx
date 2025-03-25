
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const ThreeJSBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    
    // Create particles with a cleaner distribution
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    
    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);
    const sizeArray = new Float32Array(particlesCount);
    
    // Color palette for particles
    const colors = [
      new THREE.Color(0x00e5ff), // cyan
      new THREE.Color(0x4d88ff), // light blue
      new THREE.Color(0x9f7aea), // purple
      new THREE.Color(0x3c366b).multiplyScalar(1.5), // indigo
      new THREE.Color(0x7ee2fa), // light cyan
    ];
    
    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Use sphere distribution for more organized look
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 3 + Math.random() * 5 * Math.pow(Math.random(), 2); // Concentrate particles closer to center
      
      posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
      posArray[i+1] = radius * Math.sin(phi) * Math.sin(theta);
      posArray[i+2] = radius * Math.cos(phi);
      
      // Assign color from palette
      const color = colors[Math.floor(Math.random() * colors.length)];
      colorArray[i] = color.r;
      colorArray[i+1] = color.g;
      colorArray[i+2] = color.b;
      
      // Vary the size based on distance from center for depth effect
      const distance = Math.sqrt(posArray[i]**2 + posArray[i+1]**2 + posArray[i+2]**2);
      sizeArray[i/3] = Math.max(0.01, 0.04 * (1 - distance/12));
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizeArray, 1));
    
    // Create shader material for better-looking particles
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    
    // Create points mesh
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Add subtle ambient lighting for depth
    const ambientLight = new THREE.AmbientLight(0x002244, 0.3);
    scene.add(ambientLight);

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Enhanced mouse movement effect with smoother tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    
    const handleMouseMove = (event: MouseEvent) => {
      targetMouseX = (event.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      
      // Update cursor position for custom cursor
      if (cursorRef.current) {
        setMousePosition({
          x: event.clientX,
          y: event.clientY
        });
      }
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    // Enhanced scroll effect
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Animation loop with improved effects
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Smooth mouse tracking with improved lerp
      mouseX += (targetMouseX - mouseX) * 0.03;
      mouseY += (targetMouseY - mouseY) * 0.03;
      
      // More subtle scroll-based movement
      const scrollFactor = window.scrollY * 0.0002;
      camera.position.y = -scrollFactor * 1.5;
      
      // Elegant particle rotation
      particlesMesh.rotation.x += 0.0001;
      particlesMesh.rotation.y += 0.0001;
      
      // Mouse-controlled rotation with damping
      particlesMesh.rotation.x += mouseY * 0.0002;
      particlesMesh.rotation.y += mouseX * 0.0002;
      
      // Gentle camera zoom effect based on mouse position
      camera.position.z = 5 + mouseX * 0.3;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <>
      <div 
        ref={containerRef} 
        className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
        style={{ 
          transform: `translateY(${scrollY * 0.1}px)` 
        }}
      />
      <div 
        ref={cursorRef}
        className="fixed w-8 h-8 rounded-full mix-blend-difference bg-white pointer-events-none z-50 flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          opacity: 0.6,
          transform: `translate(-50%, -50%) scale(${1 - Math.abs(mousePosition.x / window.innerWidth - 0.5) * 0.5})`,
        }}
      />
    </>
  );
};

export default ThreeJSBackground;
