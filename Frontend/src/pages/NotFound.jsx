'use client';

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const NotFound = () => {
  const pathname = usePathname();
  const canvasRef = useRef(null);

  // Log the non-existent route to the console
  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      pathname
    );
  }, [pathname]);

  // Effect for the animated DNA background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationFrameId;
    let resizeTimeout;

    const setup = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Set initial size
    setup();

    // Handle window resize
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(setup, 100);
    };

    window.addEventListener("resize", handleResize);

    const dnaChars = "ATCG";
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    const draw = () => {
      // Semi-transparent sea blue background for fading trail
      ctx.fillStyle = "rgba(15, 76, 117, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Bright aqua color for text
      ctx.fillStyle = "#00d4ff";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = dnaChars.charAt(
          Math.floor(Math.random() * dnaChars.length)
        );
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset the drop randomly
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    const animate = () => {
      draw();
      animationFrameId = window.requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Load Google Sans font
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css?family=Google+Sans:400,500,700";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    return () => {
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

  return (
    <div
      style={{ fontFamily: "'Google Sans', sans-serif" }}
      className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-[#001f3f] via-[#003366] to-[#005f99] overflow-hidden"
    >
      {/* Canvas for the DNA background animation */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-0"
      ></canvas>

      {/* Content */}
      <div className="relative z-10 text-center p-8 bg-[#002a4d]/80 rounded-xl shadow-lg backdrop-blur-sm">
        <h1 className="text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 animate-pulse">
          404
        </h1>
        <p className="mt-4 mb-8 text-lg md:text-xl font-bold text-cyan-100">
          Oops! The page you're looking for has drifted away.
        </p>
        <a
          href="/"
          className="inline-block px-8 py-3 border-2 border-cyan-400 text-cyan-400 font-semibold rounded-lg transition-transform transform duration-300 ease-in-out hover:bg-cyan-400 hover:text-gray-900 hover:scale-105"
        >
          Return to Home Base
        </a>
      </div>
    </div>
  );
};

export default NotFound;
