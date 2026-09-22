import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import './LightPillar.css';

export interface LightPillarProps {
  topColor?: string;
  bottomColor?: string;
  intensity?: number;
  rotationSpeed?: number;
  interactive?: boolean;
  className?: string;
  glowAmount?: number;
  pillarWidth?: number;
  pillarHeight?: number;
  noiseIntensity?: number;
  mixBlendMode?: React.CSSProperties['mixBlendMode'];
  pillarRotation?: number;
  quality?: 'low' | 'medium' | 'high';
  lightMode?: boolean;
  style?: React.CSSProperties;
}

function isWebGLAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return Boolean(gl);
  } catch {
    return false;
  }
}

const LightPillar: React.FC<LightPillarProps> = ({
  topColor = '#5227FF',
  bottomColor = '#FF9FFC',
  intensity = 1.0,
  rotationSpeed = 0.3,
  interactive = false,
  className = '',
  glowAmount = 0.005,
  pillarWidth = 3.0,
  pillarHeight = 0.4,
  noiseIntensity = 0.5,
  mixBlendMode = 'screen',
  pillarRotation = 0,
  quality = 'high',
  lightMode = false,
  style
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const geometryRef = useRef<THREE.PlaneGeometry | null>(null);
  const mouseRef = useRef(new THREE.Vector2(0, 0));
  const timeRef = useRef(0);
  const rotationSpeedRef = useRef(rotationSpeed);
  const [webGLSupported, setWebGLSupported] = useState<boolean>(() => isWebGLAvailable());

  useEffect(() => {
    if (!containerRef.current || !webGLSupported) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    cameraRef.current = camera;

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isLowEndDevice = isMobile || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);

    let effectiveQuality = quality;
    if (isLowEndDevice && quality === 'high') effectiveQuality = 'medium';
    if (isMobile && quality !== 'low') effectiveQuality = 'low';

    const qualitySettings = {
      low: { iterations: 20, waveIterations: 1, pixelRatio: 0.5, precision: 'mediump', stepMultiplier: 1.6 },
      medium: { iterations: 32, waveIterations: 2, pixelRatio: 0.75, precision: 'mediump', stepMultiplier: 1.3 },
      high: {
        iterations: 44,
        waveIterations: 3,
        pixelRatio: Math.min(window.devicePixelRatio || 1, 1.25),
        precision: 'highp',
        stepMultiplier: 1.1
      }
    };

    const settings = qualitySettings[effectiveQuality] || qualitySettings.medium;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: true,
        powerPreference: 'default',
        failIfMajorPerformanceCaveat: false,
        precision: settings.precision as any,
        stencil: false,
        depth: false
      });
    } catch {
      setWebGLSupported(false);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(settings.pixelRatio);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const parseColor = (hex: string) => {
      const color = new THREE.Color(hex);
      return new THREE.Vector3(color.r, color.g, color.b);
    };

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      precision ${settings.precision} float;

      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec2 uMouse;
      uniform vec3 uTopColor;
      uniform vec3 uBottomColor;
      uniform float uIntensity;
      uniform bool uInteractive;
      uniform float uGlowAmount;
      uniform float uPillarWidth;
      uniform float uPillarHeight;
      uniform float uNoiseIntensity;
      uniform float uLightMode;
      uniform float uRotCos;
      uniform float uRotSin;
      uniform float uPillarRotCos;
      uniform float uPillarRotSin;

      const int ITERATIONS = ${settings.iterations};
      const int WAVE_ITERATIONS = ${settings.waveIterations};
      const float STEP_MULT = ${settings.stepMultiplier.toFixed(1)};

      varying vec2 vUv;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
          mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
          u.y
        );
      }

      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        vec2 shift = vec2(100.0);
        mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
        for (int i = 0; i < WAVE_ITERATIONS; ++i) {
          v += a * noise(p);
          p = rot * p * 2.0 + shift;
          a *= 0.5;
        }
        return v;
      }

      void main() {
        vec2 coord = vUv * 2.0 - 1.0;
        coord.x *= uResolution.x / uResolution.y;

        vec2 rotCoord = vec2(
          coord.x * uPillarRotCos - coord.y * uPillarRotSin,
          coord.x * uPillarRotSin + coord.y * uPillarRotCos
        );

        if (uInteractive) {
          vec2 mouseOffset = (uMouse - 0.5) * 0.4;
          rotCoord -= mouseOffset;
        }

        vec3 ro = vec3(0.0, 0.0, -3.0);
        vec3 rd = normalize(vec3(rotCoord, 2.0));

        vec3 col = vec3(0.0);
        float t = 0.1;
        float maxDepth = 6.0;

        for (int i = 0; i < ITERATIONS; i++) {
          if (t > maxDepth) break;
          vec3 pos = ro + rd * t;

          vec2 rotatedXZ = vec2(
            pos.x * uRotCos - pos.z * uRotSin,
            pos.x * uRotSin + pos.z * uRotCos
          );
          pos.x = rotatedXZ.x;
          pos.z = rotatedXZ.y;

          float noiseVal = fbm(pos.xz * uNoiseIntensity + vec2(0.0, uTime * 0.3));
          float d = length(pos.xz) - (uPillarWidth * 0.15 + noiseVal * 0.1);
          d = max(d, abs(pos.y) - uPillarHeight);

          if (d < 0.02) {
            float gradT = clamp((pos.y + uPillarHeight) / (2.0 * uPillarHeight), 0.0, 1.0);
            vec3 gradCol = mix(uBottomColor, uTopColor, gradT);
            col += gradCol * (0.04 * uIntensity / (d * 20.0 + 1.0));
          } else {
            col += mix(uBottomColor, uTopColor, 0.5) * (uGlowAmount / (d * d + 0.1));
          }

          t += max(d * STEP_MULT, 0.04);
        }

        if (uLightMode > 0.5) {
          col = 1.0 - exp(-col * 1.2);
        }

        gl_FragColor = vec4(col, length(col) * 0.8);
      }
    `;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(width, height) },
        uMouse: { value: mouseRef.current },
        uTopColor: { value: parseColor(topColor) },
        uBottomColor: { value: parseColor(bottomColor) },
        uIntensity: { value: intensity },
        uInteractive: { value: interactive },
        uGlowAmount: { value: glowAmount },
        uPillarWidth: { value: pillarWidth },
        uPillarHeight: { value: pillarHeight },
        uNoiseIntensity: { value: noiseIntensity },
        uLightMode: { value: lightMode ? 1 : 0 },
        uRotCos: { value: 1.0 },
        uRotSin: { value: 0.0 },
        uPillarRotCos: { value: Math.cos((pillarRotation * Math.PI) / 180) },
        uPillarRotSin: { value: Math.sin((pillarRotation * Math.PI) / 180) }
      },
      transparent: true,
      depthWrite: false,
      depthTest: false
    });
    materialRef.current = material;

    const geometry = new THREE.PlaneGeometry(2, 2);
    geometryRef.current = geometry;
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      mouseRef.current.set(x, y);
    };

    if (interactive) {
      container.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    let lastTime = performance.now();
    const targetFPS = effectiveQuality === 'low' ? 30 : 60;
    const frameTime = 1000 / targetFPS;
    let isVisible = true;

    const animate = (currentTime: number) => {
      if (!isVisible) {
        rafRef.current = null;
        return;
      }
      if (!materialRef.current || !rendererRef.current || !sceneRef.current || !cameraRef.current) return;

      const deltaTime = currentTime - lastTime;

      if (deltaTime >= frameTime) {
        timeRef.current += 0.016 * rotationSpeedRef.current;
        const t = timeRef.current;
        materialRef.current.uniforms.uTime.value = t;
        materialRef.current.uniforms.uRotCos.value = Math.cos(t * 0.3);
        materialRef.current.uniforms.uRotSin.value = Math.sin(t * 0.3);
        rendererRef.current.render(sceneRef.current, cameraRef.current);
        lastTime = currentTime - (deltaTime % frameTime);
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    // Auto pause rendering when Hero is scrolled out of view to save GPU cycles and make scrolling butter-smooth
    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisible;
        isVisible = entry.isIntersecting;
        if (isVisible && !wasVisible && !rafRef.current) {
          lastTime = performance.now();
          rafRef.current = requestAnimationFrame(animate);
        } else if (!isVisible && rafRef.current) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    rafRef.current = requestAnimationFrame(animate);

    let resizeTimeout: number | null = null;
    const handleResize = () => {
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }

      resizeTimeout = window.setTimeout(() => {
        if (!rendererRef.current || !materialRef.current || !containerRef.current) return;
        const newWidth = containerRef.current.clientWidth;
        const newHeight = containerRef.current.clientHeight;
        rendererRef.current.setSize(newWidth, newHeight);
        materialRef.current.uniforms.uResolution.value.set(newWidth, newHeight);
      }, 150);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      if (interactive) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current.forceContextLoss();
        if (container.contains(rendererRef.current.domElement)) {
          container.removeChild(rendererRef.current.domElement);
        }
      }
      if (materialRef.current) materialRef.current.dispose();
      if (geometryRef.current) geometryRef.current.dispose();

      rendererRef.current = null;
      materialRef.current = null;
      sceneRef.current = null;
      cameraRef.current = null;
      geometryRef.current = null;
      rafRef.current = null;
    };
  }, [webGLSupported, quality]);

  useEffect(() => {
    rotationSpeedRef.current = rotationSpeed;
  }, [rotationSpeed]);

  useEffect(() => {
    if (!materialRef.current) return;
    const parseColor = (hex: string) => {
      const color = new THREE.Color(hex);
      return new THREE.Vector3(color.r, color.g, color.b);
    };
    materialRef.current.uniforms.uTopColor.value = parseColor(topColor);
  }, [topColor]);

  useEffect(() => {
    if (!materialRef.current) return;
    const parseColor = (hex: string) => {
      const color = new THREE.Color(hex);
      return new THREE.Vector3(color.r, color.g, color.b);
    };
    materialRef.current.uniforms.uBottomColor.value = parseColor(bottomColor);
  }, [bottomColor]);

  useEffect(() => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uIntensity.value = intensity;
  }, [intensity]);

  useEffect(() => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uInteractive.value = interactive;
  }, [interactive]);

  useEffect(() => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uGlowAmount.value = glowAmount;
  }, [glowAmount]);

  useEffect(() => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uPillarWidth.value = pillarWidth;
  }, [pillarWidth]);

  useEffect(() => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uPillarHeight.value = pillarHeight;
  }, [pillarHeight]);

  useEffect(() => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uNoiseIntensity.value = noiseIntensity;
  }, [noiseIntensity]);

  useEffect(() => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uLightMode.value = lightMode ? 1 : 0;
  }, [lightMode]);

  useEffect(() => {
    if (!materialRef.current) return;
    const pillarRotRad = (pillarRotation * Math.PI) / 180;
    materialRef.current.uniforms.uPillarRotCos.value = Math.cos(pillarRotRad);
    materialRef.current.uniforms.uPillarRotSin.value = Math.sin(pillarRotRad);
  }, [pillarRotation]);

  if (!webGLSupported) {
    return (
      <CSSLightPillarFallback 
        topColor={topColor} 
        bottomColor={bottomColor} 
        className={className} 
        mixBlendMode={mixBlendMode} 
        style={style} 
      />
    );
  }

  return (
    <div 
      ref={containerRef} 
      className={`light-pillar-container ${className}`} 
      style={{ mixBlendMode, ...style }} 
    />
  );
};

export const CSSLightPillarFallback: React.FC<{
  topColor?: string;
  bottomColor?: string;
  className?: string;
  mixBlendMode?: React.CSSProperties['mixBlendMode'];
  style?: React.CSSProperties;
}> = ({
  topColor = '#5227FF',
  bottomColor = '#FF9FFC',
  className = '',
  mixBlendMode = 'screen',
  style
}) => {
  return (
    <div 
      className={`relative w-full h-full overflow-hidden pointer-events-none flex items-center justify-center ${className}`}
      style={{ mixBlendMode, ...style }}
    >
      {/* Outer Atmospheric Glow */}
      <div 
        className="absolute w-[360px] sm:w-[480px] md:w-[600px] h-[130%] rounded-full opacity-45 blur-[80px] sm:blur-[110px]"
        style={{
          background: `radial-gradient(ellipse at center, ${bottomColor} 0%, ${topColor} 45%, transparent 70%)`
        }}
      />
      {/* Volumetric Pillar Column */}
      <div 
        className="absolute w-[140px] sm:w-[180px] md:w-[220px] h-[140%] -top-[20%] rounded-full opacity-70 blur-[40px] sm:blur-[60px]"
        style={{
          background: `linear-gradient(180deg, ${topColor} 0%, ${bottomColor} 45%, ${topColor} 100%)`,
          animation: 'pillarBreath 8s ease-in-out infinite'
        }}
      />
      {/* Inner Focused Core Beam */}
      <div 
        className="absolute w-[36px] sm:w-[50px] md:w-[68px] h-[150%] -top-[25%] rounded-full opacity-85 blur-[14px] sm:blur-[20px]"
        style={{
          background: `linear-gradient(180deg, rgba(255,255,255,0.95) 0%, ${bottomColor} 40%, rgba(255,255,255,0.85) 75%, ${topColor} 100%)`,
          animation: 'pillarBreath 6s ease-in-out infinite alternate'
        }}
      />
      {/* Razor White Center Light Line */}
      <div 
        className="absolute w-[4px] sm:w-[6px] md:w-[8px] h-[150%] -top-[25%] rounded-full opacity-95 blur-[2px] sm:blur-[3px]"
        style={{
          background: `linear-gradient(180deg, #ffffff 0%, rgba(255, 159, 252, 0.95) 50%, #ffffff 100%)`
        }}
      />
    </div>
  );
};

export default LightPillar;
