
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
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 15;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    // Create particle material
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.03,
      color: 0x00e5ff,
      transparent: true,
      opacity: 0.8,
    });
    
    // Create points mesh
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Create torus
    const torusGeometry = new THREE.TorusGeometry(3, 0.5, 16, 100);
    const torusMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xFF0044,
      transparent: true,
      opacity: 0.15,
      wireframe: true
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.rotation.x = Math.PI / 2;
    scene.add(torus);
    
    // Create octahedron
    const octahedronGeometry = new THREE.OctahedronGeometry(1.5, 0);
    const octahedronMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xFFD60A,
      transparent: true,
      opacity: 0.1,
      wireframe: true
    });
    const octahedron = new THREE.Mesh(octahedronGeometry, octahedronMaterial);
    octahedron.position.set(-5, 2, -3);
    scene.add(octahedron);
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Mouse movement effect
    let mouseX = 0;
    let mouseY = 0;
    
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    // Scroll effect
    const handleScroll = () => {
      setScrollY(window.scrollY);
      // Adjust camera and objects based on scroll
      const scrollFactor = window.scrollY * 0.0005;
      camera.position.z = 5 + scrollFactor * 2;
      particlesMesh.rotation.x = scrollFactor * 0.5;
      torus.rotation.z = scrollFactor * 0.8;
      octahedron.rotation.y = scrollFactor * 1.2;
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate particles based on mouse position and time
      particlesMesh.rotation.x += 0.0003;
      particlesMesh.rotation.y += 0.0003;
      
      particlesMesh.rotation.x += mouseY * 0.0005;
      particlesMesh.rotation.y += mouseX * 0.0005;
      
      // Rotate torus
      torus.rotation.z += 0.001;
      
      // Rotate octahedron
      octahedron.rotation.x += 0.001;
      octahedron.rotation.y += 0.002;
      
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
