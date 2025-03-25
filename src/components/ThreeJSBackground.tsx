
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const ThreeJSBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  
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
    
    // Create particles with improved distribution
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    
    const posArray = new Float32Array(particlesCount * 3);
    const sizeArray = new Float32Array(particlesCount);
    
    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Create a more interesting distribution pattern
      const radius = Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
      posArray[i+1] = radius * Math.sin(phi) * Math.sin(theta);
      posArray[i+2] = radius * Math.cos(phi);
      
      // Vary the size of particles
      sizeArray[i/3] = Math.random() * 0.03 + 0.01;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizeArray, 1));
    
    // Create custom shader material for more interesting particles
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: new THREE.Color(0x00e5ff),
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    
    // Create points mesh
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Add small distant stars (smaller, more numerous)
    const smallStarsGeometry = new THREE.BufferGeometry();
    const smallStarsCount = 5000;
    
    const smallStarsPosArray = new Float32Array(smallStarsCount * 3);
    
    for (let i = 0; i < smallStarsCount * 3; i += 3) {
      // Create a spherical distribution but much further away
      const radius = 15 + Math.random() * 20;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      smallStarsPosArray[i] = radius * Math.sin(phi) * Math.cos(theta);
      smallStarsPosArray[i+1] = radius * Math.sin(phi) * Math.sin(theta);
      smallStarsPosArray[i+2] = radius * Math.cos(phi);
    }
    
    smallStarsGeometry.setAttribute('position', new THREE.BufferAttribute(smallStarsPosArray, 3));
    
    const smallStarsMaterial = new THREE.PointsMaterial({
      size: 0.01,
      color: 0xffffff,
      transparent: true,
      opacity: 0.4,
    });
    
    const smallStarsMesh = new THREE.Points(smallStarsGeometry, smallStarsMaterial);
    scene.add(smallStarsMesh);
    
    // Add subtle ambient lighting for depth
    const ambientLight = new THREE.AmbientLight(0x002233, 0.2);
    scene.add(ambientLight);

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Mouse movement effect with smoother tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    
    const handleMouseMove = (event: MouseEvent) => {
      targetMouseX = (event.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    // Scroll effect with improved interpolation
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Animation loop with smooth transitions
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Smooth mouse tracking with lerp (linear interpolation)
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;
      
      // Scroll-based camera movement
      const scrollFactor = window.scrollY * 0.0003;
      camera.position.y = -scrollFactor * 2;
      
      // Gentle particle rotation
      particlesMesh.rotation.x += 0.0001;
      particlesMesh.rotation.y += 0.0001;
      
      // Mouse-controlled rotation
      particlesMesh.rotation.x += mouseY * 0.0003;
      particlesMesh.rotation.y += mouseX * 0.0003;
      
      // Small stars subtle rotation
      smallStarsMesh.rotation.x += 0.0001;
      smallStarsMesh.rotation.y += 0.00005;
      
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
    <div 
      ref={containerRef} 
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
      style={{ 
        transform: `translateY(${scrollY * 0.1}px)` 
      }}
    />
  );
};

export default ThreeJSBackground;
