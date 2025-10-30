'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';

interface LoadingPageProps {
  onLoadingComplete: () => void;
}

export default function LoadingPage({ onLoadingComplete }: LoadingPageProps) {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15; // Random increment for realism
      });
    }, 200);

    // Complete loading after 3-4 seconds
    const timeout = setTimeout(() => {
      setIsLoaded(true);
      controls.start({
        x: '100vw',
        scale: 0.5,
        filter: 'blur(10px)',
        transition: {
          duration: 0.8,
          ease: [0.4, 0, 0.2, 1]
        }
      });

      // Trigger completion callback after animation
      setTimeout(onLoadingComplete, 800);
    }, 3200);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [controls, onLoadingComplete]);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 bg-gradient-to-br from-slate-900 via-gray-900 to-black overflow-hidden"
        >
          {/* Background road texture effect */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4gIDxkZWZzPiAgICA8cGF0dGVybiBpZD0icm9hZCIgdGV4dHVyZVVuaXRzPSJ1c2Vyc3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj4gICAgICA8cmVjdCB3aWR0aD0iNCIgeGVpZ2h0PSI0MCIgeT0iMCIgZmlsbD0iIzMzMzMzZiIvPiAgICA8L3BhdHRlcm4+ICA8L2RlZnM+ICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3JvYWQpIi8+Cjwvc3ZnPg==')]" />
          </div>

          {/* Main car container */}
          <div className="flex items-center justify-center min-h-screen px-4">
            <div className="relative">
              {/* Car image with subtle animations */}
              <motion.div
                className="relative z-10"
                animate={controls}
                initial={{
                  x: 0,
                  scale: 0.8,
                  y: 20
                }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.6,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                  className="relative"
                >
                  {/* Car shadow */}
                  <motion.div
                    className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-48 h-6 bg-black/20 blur-lg rounded-full"
                    animate={{
                      scale: loadingProgress > 30 ? [1, 1.05, 1] : 1,
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />

                  {/* Car image */}
                  <Image
                    src="https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=500&h=300&fit=crop&crop=center"
                    alt="Sports car"
                    width={500}
                    height={300}
                    className="object-contain drop-shadow-2xl"
                    priority
                  />

                  {/* Engine vibration effect during 30-90% */}
                  {loadingProgress > 30 && loadingProgress < 90 && (
                    <>
                      <motion.div
                        className="absolute inset-0 bg-blue-400/20 rounded-lg blur-xl"
                        animate={{
                          opacity: [0.1, 0.3, 0.1],
                          scale: [1, 1.02, 1],
                        }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />

                      {/* Dust/cloud particles */}
                      <motion.div
                        className="absolute -right-8 top-1/3 w-4 h-4 bg-gray-300/40 rounded-full blur-sm"
                        animate={{
                          x: [0, -20],
                          opacity: [0.3, 0],
                        }}
                        transition={{
                          duration: 0.5,
                          repeat: Infinity,
                          ease: "easeOut"
                        }}
                      />
                      <motion.div
                        className="absolute -right-12 top-1/4 w-3 h-3 bg-gray-400/30 rounded-full blur-sm"
                        animate={{
                          x: [0, -25],
                          opacity: [0.2, 0],
                        }}
                        transition={{
                          duration: 0.7,
                          repeat: Infinity,
                          ease: "easeOut",
                          delay: 0.2
                        }}
                      />
                    </>
                  )}
                </motion.div>
              </motion.div>

              {/* Loading progress bar */}
              <div className="mt-8 relative">
                <div className="w-80 h-1 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(loadingProgress, 100)}%` }}
                    transition={{
                      duration: 0.3,
                      ease: "easeOut"
                    }}
                  />
                </div>

                {/* Progress text */}
                <motion.div
                  className="mt-4 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <span className="text-white text-lg font-medium">
                    Loading experience...
                  </span>
                  <motion.span
                    className="ml-2 text-cyan-400 font-bold"
                    animate={{
                      opacity: [1, 0.5, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                  >
                    {Math.round(Math.min(loadingProgress, 100))}%
                  </motion.span>
                </motion.div>

                {/* Loading states description */}
                <motion.div
                  className="mt-2 text-center text-gray-400 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <AnimatePresence mode="wait">
                    {loadingProgress < 30 && (
                      <motion.span
                        key="initializing"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="inline-block"
                      >
                        Initializing AI systems...
                      </motion.span>
                    )}
                    {loadingProgress >= 30 && loadingProgress < 90 && (
                      <motion.span
                        key="analyzing"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="inline-block"
                      >
                        Analyzing vehicle data...
                      </motion.span>
                    )}
                    {loadingProgress >= 90 && (
                      <motion.span
                        key="ready"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="inline-block text-cyan-300"
                      >
                        Launch sequence complete
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Footer credit */}
          <motion.div
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center text-gray-500 text-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="text-white/50 mb-1">{`{4real.ke}`}</div>
            <div>Photo by Unsplash</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
