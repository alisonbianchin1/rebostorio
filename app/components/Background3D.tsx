'use client';

import { useEffect, useState } from 'react';

export default function Background3D() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-900/40 via-purple-900/40 to-violet-900/40 animate-gradient-shift animate-pulse-slow"></div>
      
      {/* Pulsating Blobs */}
      <div className="absolute top-0 left-0 w-full h-full">
        {/* Orange Blob */}
        <div className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-orange-600/20 rounded-full blur-[120px] animate-blob-float"></div>
        
        {/* Purple Blob */}
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-purple-600/25 rounded-full blur-[100px] animate-blob-float-delayed"></div>
        
        {/* Violet Blob */}
        <div className="absolute bottom-0 left-1/3 w-[700px] h-[700px] bg-violet-600/20 rounded-full blur-[110px] animate-blob-float-slow"></div>
        
        {/* Pink Blob */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-pink-600/15 rounded-full blur-[90px] animate-blob-float"></div>
        
        {/* Additional Pulsing Blobs */}
        <div className="absolute top-1/3 left-1/2 w-[550px] h-[550px] bg-orange-500/15 rounded-full blur-[100px] animate-blob-float-reverse"></div>
        <div className="absolute bottom-1/4 right-1/3 w-[650px] h-[650px] bg-purple-500/20 rounded-full blur-[115px] animate-blob-drift"></div>
        <div className="absolute top-2/3 left-1/4 w-[450px] h-[450px] bg-violet-500/18 rounded-full blur-[95px] animate-blob-float-delayed"></div>
        <div className="absolute bottom-1/3 right-1/2 w-[520px] h-[520px] bg-pink-500/12 rounded-full blur-[105px] animate-blob-drift-slow"></div>
      </div>

      {/* Gradient Overlay with Pulse */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70 animate-pulse-subtle"></div>
    </div>
  );
}
