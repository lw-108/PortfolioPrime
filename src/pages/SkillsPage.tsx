import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { PieChart } from '../components/charts/pie-chart';
import { PieSlice } from '../components/charts/pie-slice';
import { PieCenter } from '../components/charts/pie-center';
import { PatternLines } from '@visx/pattern';
import { techStackItems, getTechDetails, type TechMetric } from '../lib/tech-data';
import { Grab } from 'lucide-react';

/* ─── Texture Cache and Loader ─── */
const loadedTextures: Record<string, THREE.Texture> = {};

const loadAndRasterizeIcon = (url: string, size = 128): Promise<THREE.Texture> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, size, size);
        const imgAspect = img.width / img.height || 1;
        let drawWidth = size;
        let drawHeight = size;
        let offsetX = 0;
        let offsetY = 0;

        if (imgAspect > 1) {
          drawHeight = size / imgAspect;
          offsetY = (size - drawHeight) / 2;
        } else {
          drawWidth = size * imgAspect;
          offsetX = (size - drawWidth) / 2;
        }

        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }
      
      const texture = new THREE.CanvasTexture(canvas);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.colorSpace = THREE.SRGBColorSpace;
      resolve(texture);
    };
    img.onerror = (err) => {
      reject(err);
    };
    img.src = url;
  });
};

/* ─── Animated Section Title ─── */
const AnimatedTitle: React.FC<{ text: string }> = ({ text }) => {
  const words = text.split(' ');
  return (
    <motion.span
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.02 } } }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="inline-block"
    >
      {words.map((word, wordIdx) => (
        <span key={wordIdx} className="inline-block whitespace-nowrap">
          {word.split('').map((c, i) => (
            <motion.span
              key={i}
              variants={{
                hidden: { opacity: 0, y: 60 },
                visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 12, stiffness: 100 } },
              }}
              className="inline-block"
            >
              {c}
            </motion.span>
          ))}
          {wordIdx < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
    </motion.span>
  );
};

/* ─── SVG Dynamic Pie Chart Component ─── */
const DynamicPieChart: React.FC<{ metrics: TechMetric[] }> = ({ metrics }) => {
  const pieData = useMemo(() => {
    return metrics.map(m => ({
      label: m.label,
      value: m.value
    }));
  }, [metrics]);

  const avg = useMemo(() => {
    if (metrics.length === 0) return 0;
    return Math.round(metrics.reduce((acc, m) => acc + m.value, 0) / metrics.length);
  }, [metrics]);

  return (
    <div className="flex flex-col items-center justify-center bg-muted/10 border border-border rounded-xl p-4 w-full max-w-[240px] mx-auto aspect-square relative select-none">
      <PieChart data={pieData} innerRadius={55} size={200}>
        <PatternLines height={6} id="dp-1" orientation={["diagonal"]}
          stroke="var(--chart-1)" width={6} />
        <PatternLines height={6} id="dp-2" orientation={["horizontal"]}
          stroke="var(--chart-2)" width={6} />
        <PatternLines height={6} id="dp-3" orientation={["vertical"]}
          stroke="var(--chart-3)" width={6} />
        <PatternLines height={8} id="dp-4" orientation={["diagonalRightToLeft"]}
          stroke="var(--chart-4)" width={8} />
        <PieSlice fill="url(#dp-1)" index={0} />
        <PieSlice fill="url(#dp-2)" index={1} />
        <PieSlice fill="url(#dp-3)" index={2} />
        <PieSlice fill="url(#dp-4)" index={3} />
        <PieCenter defaultLabel="Average" displayValue={avg} suffix="%" />
      </PieChart>
    </div>
  );
};

/* ─── Space Portal (Black Hole) Component ─── */
const Portal: React.FC<{ portalX: number; portalY: number }> = ({ portalX, portalY }) => {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const ring1 = ring1Ref.current;
    const ring2 = ring2Ref.current;
    const core = coreRef.current;

    if (ring1) {
      ring1.rotation.z = time * 0.4;
      const pulse = 1.0 + Math.sin(time * 2.5) * 0.04;
      ring1.scale.set(pulse, pulse, 1);
    }
    if (ring2) {
      ring2.rotation.z = -time * 0.6;
      const pulse = 1.0 + Math.cos(time * 2.0) * 0.06;
      ring2.scale.set(pulse, pulse, 1);
    }
    if (core) {
      const pulse = 1.0 + Math.sin(time * 3.5) * 0.02;
      core.scale.set(pulse, pulse, 1);
    }
  });

  return (
    <group position={[portalX, portalY, -0.05]}>
      {/* Outer pulsing aura light */}
      <mesh position={[0, 0, -0.02]}>
        <circleGeometry args={[0.85, 32]} />
        <meshBasicMaterial color="#f54900" transparent opacity={0.06} />
      </mesh>

      {/* Orbiting ring 1 */}
      <mesh ref={ring1Ref}>
        <ringGeometry args={[0.65, 0.68, 64]} />
        <meshBasicMaterial color="#f54900" transparent opacity={0.35} />
      </mesh>

      {/* Orbiting ring 2 */}
      <mesh ref={ring2Ref}>
        <ringGeometry args={[0.52, 0.55, 64]} />
        <meshBasicMaterial color="#f54900" transparent opacity={0.5} />
      </mesh>

      {/* Glowing boundary */}
      <mesh>
        <ringGeometry args={[0.40, 0.43, 64]} />
        <meshBasicMaterial color="#f54900" transparent opacity={0.8} />
      </mesh>

      {/* Black Hole Core */}
      <mesh ref={coreRef}>
        <circleGeometry args={[0.42, 64]} />
        <meshBasicMaterial color="#0b0b0a" transparent opacity={0.95} />
      </mesh>
    </group>
  );
};

/* ─── Accretion Particle Swirl Component ─── */
const PortalParticles: React.FC<{ count: number; portalX: number; portalY: number }> = ({ count, portalX, portalY }) => {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, orbitData] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const data = [];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.55 + Math.random() * 1.25;
      const speed = 0.8 + Math.random() * 1.5;

      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      pos[i * 3] = x + portalX;
      pos[i * 3 + 1] = y + portalY;
      pos[i * 3 + 2] = -0.08;

      data.push({ angle, radius, speed });
    }
    return [pos, data];
  }, [count, portalX, portalY]);

  useFrame((_, delta) => {
    const points = pointsRef.current;
    if (!points) return;

    const posAttr = points.geometry.attributes.position;
    const array = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const data = orbitData[i];
      data.angle -= delta * data.speed;
      data.radius -= 0.0015;
      if (data.radius < 0.2) {
        data.radius = 1.3 + Math.random() * 0.4;
      }

      array[i * 3] = portalX + Math.cos(data.angle) * data.radius;
      array[i * 3 + 1] = portalY + Math.sin(data.angle) * data.radius;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#f54900"
        size={0.035}
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
};

/* ─── Physics Simulation Interface ─── */
interface BallState {
  id: string;
  title: string;
  image: string;
  item: typeof techStackItems[0];
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  rotation: number;
  angularVelocity: number;
  isDragged: boolean;
  isCaptured: boolean;
  scale: number;
}

/* ─── Individual Ball Component ─── */
/* ─── Responsive Size Config ─── */
const getResponsiveSizes = (width: number) => {
  if (width < 640) {
    // Mobile
    return { radius: 0.17, meshSize: 0.3 };
  } else if (width < 1024) {
    // Tablet
    return { radius: 0.30, meshSize: 0.55 };
  } else {
    // Desktop
    return { radius: 0.38, meshSize: 0.7 };
  }
};

/* ─── Individual Ball Component ─── */
const Ball: React.FC<{
  item: typeof techStackItems[0];
  ballsRef: React.MutableRefObject<BallState[]>;
  draggedIndexRef: React.MutableRefObject<number | null>;
  selectedTech: typeof techStackItems[0] | null;
}> = ({ item, ballsRef, draggedIndexRef, selectedTech }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [loadError, setLoadError] = useState(false);


  const canvasRef = useRef<HTMLElement | null>(null);

  const preventScroll = useCallback((e: TouchEvent) => {
    e.preventDefault();
  }, []);

  useEffect(() => {
    return () => {
      if (canvasRef.current) {
        canvasRef.current.removeEventListener('touchmove', preventScroll);
      }
    };
  }, [preventScroll]);

  useEffect(() => {
    if (loadedTextures[item.image]) {
      setTexture(loadedTextures[item.image]);
      setIsReady(true);
      return;
    }

    loadAndRasterizeIcon(item.image)
      .then((tex) => {
        loadedTextures[item.image] = tex;
        setTexture(tex);
        setIsReady(true);
      })
      .catch((err) => {
        console.warn("Failed to load logo texture for", item.title, err);
        setLoadError(true);
      });
  }, [item.image, item.title]);

  useFrame(() => {
    const group = groupRef.current;
    if (!group) return;

    const ball = ballsRef.current.find((b) => b.title === item.title);
    if (!ball) return;

    group.position.set(ball.x, ball.y, 0);
    // Keep ball completely upright (no rotation)
    group.rotation.set(0, 0, 0);

    let displayScale = ball.scale;
    if (ball.isCaptured && !selectedTech) {
      // Gentle pulsing while docked in portal core
      const pulse = 1.0 + Math.sin(Date.now() * 0.004) * 0.07;
      displayScale = ball.scale * pulse;
    }
    group.scale.setScalar(displayScale);
  });

  const handlePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    const canvasEl = e.nativeEvent.target as HTMLElement;
    canvasRef.current = canvasEl;
    try {
      canvasEl.setPointerCapture(e.pointerId);
    } catch (err) {}
    document.body.style.cursor = 'grabbing';

    // Prevent default page scroll only while actively dragging an icon
    canvasEl.addEventListener('touchmove', preventScroll, { passive: false });

    const balls = ballsRef.current;
    const idx = balls.findIndex((b) => b.title === item.title);
    if (idx !== -1) {
      draggedIndexRef.current = idx;
      balls[idx].isDragged = true;
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    e.stopPropagation();
    const canvasEl = e.nativeEvent.target as HTMLElement;
    try {
      canvasEl.releasePointerCapture(e.pointerId);
    } catch (err) {}
    document.body.style.cursor = 'grab';

    // Remove active touchmove blocker to restore natural page scrolling
    canvasEl.removeEventListener('touchmove', preventScroll);

    const idx = draggedIndexRef.current;
    if (idx !== null) {
      const balls = ballsRef.current;
      if (balls[idx]) {
        balls[idx].isDragged = false;
      }
    }
    draggedIndexRef.current = null;
  };

  const [stripeTexture, setStripeTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load("/stripe.svg", (tex) => {
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
          tex.repeat.set(8, 8);
      setStripeTexture(tex);
    });
  }, []);

  const ballRadius = useMemo(() => {
    const ball = ballsRef.current.find((b) => b.title === item.title);
    return ball ? ball.radius : 0.38;
  }, [ballsRef, item.title]);

  const visualBallScale = ballRadius * 0.85; // Compact size to prevent visual merging
  const logoScale = ballRadius * 1.15; // Compact readable logo stamp

  return (
    <group
      ref={groupRef}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerOver={() => { document.body.style.cursor = 'grab'; }}
      onPointerOut={() => { document.body.style.cursor = 'auto'; }}
    >
      {texture && isReady && !loadError ? (
        <group>
          {/* Flat 2D Circle Ball base with stripe texture */}
          <mesh>
            <circleGeometry args={[visualBallScale, 32]} />
            <meshBasicMaterial 
              map={stripeTexture || undefined} 
              color="#f54900" 
              transparent
              opacity={1.0}
            />
          </mesh>
          {/* Flat logo mesh layered on the front of the ball */}
          <mesh position={[0, 0, 0.01]} scale={[logoScale, logoScale, 1]}>
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial 
              map={texture} 
              transparent 
            />
          </mesh>
        </group>
      ) : (
        <Html
          center
          className="pointer-events-none select-none text-[10px] font-bold text-foreground uppercase text-center w-12 truncate font-clash"
          style={{ zIndex: 5 }}
        >
          {item.title}
        </Html>
      )}
    </group>
  );
};

/* ─── Dashed Connecting Arrow Component ─── */
const DashedArrow: React.FC<{
  ballsRef: React.MutableRefObject<BallState[]>;
  draggedIndexRef: React.MutableRefObject<number | null>;
  portalX: number;
  portalY: number;
}> = ({ ballsRef, draggedIndexRef, portalX, portalY }) => {
  const lineRef = useRef<THREE.Line>(null);
  const headRef = useRef<THREE.Mesh>(null);

  const headGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    // Points for a triangle pointing to the right (+X)
    shape.moveTo(0, 0);
    shape.lineTo(-0.22, -0.1);
    shape.lineTo(-0.22, 0.1);
    shape.closePath();
    return new THREE.ShapeGeometry(shape);
  }, []);

  useFrame(() => {
    const draggedIndex = draggedIndexRef.current;
    const line = lineRef.current;
    const head = headRef.current;

    if (draggedIndex === null || !ballsRef.current || !ballsRef.current[draggedIndex] || !line || !head) {
      if (line) line.visible = false;
      if (head) head.visible = false;
      return;
    }

    const ball = ballsRef.current[draggedIndex];
    
    // If ball is captured/swallowed already, don't show the arrow
    if (ball.isCaptured) {
      line.visible = false;
      head.visible = false;
      return;
    }

    const x0 = ball.x;
    const y0 = ball.y;
    const x1 = portalX;
    const y1 = portalY;

    const dx = x1 - x0;
    const dy = y1 - y0;
    const r = Math.hypot(dx, dy);

    // Fade out as it gets very close to the portal
    const minDistance = 0.75;
    const maxDistance = 2.2;
    const opacity = Math.max(0.0, Math.min(1.0, (r - minDistance) / (maxDistance - minDistance)));

    const lineMat = line.material as any;
    const headMat = head.material as any;

    if (opacity <= 0.001) {
      line.visible = false;
      head.visible = false;
      return;
    }

    line.visible = true;
    head.visible = true;
    lineMat.opacity = opacity * 0.85;
    headMat.opacity = opacity * 0.95;

    // Calculate curve points
    const midX = (x0 + x1) / 2;
    const midY = (y0 + y1) / 2;
    
    // Bend the curve a bit. We bend it upward or downward depending on relative positions
    const bendFactor = 0.12;
    const px = -dy * bendFactor;
    const py = dx * bendFactor;

    const controlX = midX + px;
    const controlY = midY + py;

    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(x0, y0, 0),
      new THREE.Vector3(controlX, controlY, 0),
      new THREE.Vector3(x1, y1, 0)
    );

    const points = curve.getPoints(32);
    line.geometry.setFromPoints(points);
    line.computeLineDistances();

    // Position and rotate the arrowhead at (x1, y1)
    head.position.set(x1, y1, 0);
    const angle = Math.atan2(y1 - controlY, x1 - controlX);
    head.rotation.set(0, 0, angle);
  });

  return (
    <group>
      {/* @ts-ignore */}
      <line ref={lineRef}>
        <bufferGeometry />
        <lineDashedMaterial
          color="#f54900"
          dashSize={0.16}
          gapSize={0.08}
          transparent
          opacity={0.0}
          linewidth={1.5}
        />
      </line>
      <mesh ref={headRef} geometry={headGeometry}>
        <meshBasicMaterial
          color="#f54900"
          transparent
          opacity={0.0}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};

/* ─── Core Physics and Interaction Ballroom Controller ─── */
const PhysicsBallroom: React.FC<{
  items: typeof techStackItems;
  onSelectTech: (item: typeof techStackItems[0]) => void;
  selectedTech: typeof techStackItems[0] | null;
  onInteract?: () => void;
}> = ({ items, onSelectTech, selectedTech, onInteract }) => {
  const { viewport } = useThree();
  const ballsRef = useRef<BallState[]>([]);
  const draggedIndexRef = useRef<number | null>(null);
  const interactedRef = useRef(false);

  const portalX = 0;
  const portalY = viewport.height / 3.4;
  const captureRadius = 0.58;
  const attractionRadius = 1.8;

  // Synchronize balls lists on category filtering changes (fill from sideways)
  useEffect(() => {
    const currentBalls = ballsRef.current;
    const syncedBalls: BallState[] = [];
    const { radius: currentRadius } = getResponsiveSizes(window.innerWidth);

    items.forEach((item, index) => {
      const existing = currentBalls.find((b) => b.title === item.title);
      if (existing) {
        existing.radius = currentRadius; // Update radius dynamically on screen resize
        syncedBalls.push(existing);
      } else {
        // Sideways spawning: alternate left and right sides
        const fromLeft = index % 2 === 0;
        const spawnX = fromLeft 
          ? -viewport.width / 2 - 0.5 
          : viewport.width / 2 + 0.5;
        // Spawn at random heights within ballroom
        const spawnY = (Math.random() - 0.5) * (viewport.height * 0.4);
        
        // Shoot sideways into the center
        const vx = fromLeft 
          ? 3.2 + Math.random() * 2.8 
          : -3.2 - Math.random() * 2.8;

        syncedBalls.push({
          id: item.title,
          title: item.title,
          image: item.image,
          item,
          x: spawnX,
          y: spawnY,
          vx,
          vy: (Math.random() - 0.5) * 2.0,
          radius: currentRadius,
          rotation: 0,
          angularVelocity: 0,
          isDragged: false,
          isCaptured: false,
          scale: 0.0,
        });
      }
    });

    ballsRef.current = syncedBalls;
  }, [items, viewport.width, viewport.height]);

  // Main physics loop (Gravity + Boundaries + Collisions + Portal snap)
  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.03);
    const balls = ballsRef.current;
    const draggedIndex = draggedIndexRef.current;

    const gravity = -12.0;
    const damping = 0.985;
    const restitution = 0.55;
    const wallFriction = 0.95;

    if (draggedIndex !== null && !interactedRef.current) {
      interactedRef.current = true;
      if (onInteract) {
        setTimeout(() => onInteract(), 0);
      }
    }

    const { radius: activeRadius } = getResponsiveSizes(window.innerWidth);

    const floorY = -viewport.height / 2 + activeRadius;
    const ceilY = viewport.height / 2 - activeRadius;
    const wallLeft = -viewport.width / 2 + activeRadius;
    const wallRight = viewport.width / 2 - activeRadius;

    // 1. Position and Velocity updates
    balls.forEach((ball) => {
      // Scale-in transition animation
      if (ball.scale < 1.0 && !ball.isCaptured) {
        ball.scale = Math.min(1.0, ball.scale + dt * 4.0);
      }

      // Keep rotation upright always
      ball.rotation = 0;
      ball.angularVelocity = 0;

      if (ball.isDragged) {
        const targetX = (state.pointer.x * viewport.width) / 2;
        const targetY = (state.pointer.y * viewport.height) / 2;

        // Smooth dragging lerp for a very premium, smooth, and relaxing feel
        const lerpFactor = 0.22;
        const nextX = ball.x + (targetX - ball.x) * lerpFactor;
        const nextY = ball.y + (targetY - ball.y) * lerpFactor;

        ball.vx = (nextX - ball.x) / dt;
        ball.vy = (nextY - ball.y) / dt;

        // Cap throw speed to prevent glitching walls
        const speed = Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy);
        const maxSpeed = 22;
        if (speed > maxSpeed) {
          ball.vx = (ball.vx / speed) * maxSpeed;
          ball.vy = (ball.vy / speed) * maxSpeed;
        }

        ball.x = nextX;
        ball.y = nextY;
      } else if (ball.isCaptured) {
        // Smoothly snap to portal center and scale down if details popup is active
        ball.x += (portalX - ball.x) * 0.22;
        ball.y += (portalY - ball.y) * 0.22;
        ball.vx = 0;
        ball.vy = 0;

        if (selectedTech && selectedTech.title === ball.title) {
          ball.scale = Math.max(0.0, ball.scale - dt * 5.5);
        } else {
          ball.scale = Math.min(0.85, ball.scale + dt * 4.0);
        }
      } else {
        // Normal falling ballroom physics
        ball.vy += gravity * dt;
        ball.vx *= damping;
        ball.vy *= damping;

        // Apply high damping at low speeds to help balls settle down cleanly and prevent micro-jitter
        const speed = Math.hypot(ball.vx, ball.vy);
        if (speed < 0.35) {
          ball.vx *= 0.82;
          ball.vy *= 0.82;
          if (speed < 0.08) {
            ball.vx = 0;
            ball.vy = 0;
          }
        }

        ball.x += ball.vx * dt;
        ball.y += ball.vy * dt;

        // Portal attraction (optimized distance checks)
        const pdx = portalX - ball.x;
        const pdy = portalY - ball.y;
        const pdistSq = pdx * pdx + pdy * pdy;
        const attrRadiusSq = attractionRadius * attractionRadius;

        if (pdistSq < attrRadiusSq) {
          const pdist = Math.sqrt(pdistSq);
          if (pdist > 0.0001) {
            const force = (1.0 - pdist / attractionRadius) * 6.5;
            ball.vx += (pdx / pdist) * force * dt;
            ball.vy += (pdy / pdist) * force * dt;
          }
        }

        // Boundary collision handling
        if (ball.y < floorY) {
          ball.y = floorY;
          if (Math.abs(ball.vy) < 0.35) {
            ball.vy = 0;
          } else {
            ball.vy = -ball.vy * restitution;
          }
          ball.vx *= wallFriction;
        }
        if (ball.y > ceilY) {
          ball.y = ceilY;
          if (Math.abs(ball.vy) < 0.35) {
            ball.vy = 0;
          } else {
            ball.vy = -ball.vy * restitution;
          }
          ball.vx *= wallFriction;
        }
        if (ball.x < wallLeft) {
          ball.x = wallLeft;
          if (Math.abs(ball.vx) < 0.35) {
            ball.vx = 0;
          } else {
            ball.vx = -ball.vx * restitution;
          }
          ball.vy *= wallFriction;
        }
        if (ball.x > wallRight) {
          ball.x = wallRight;
          if (Math.abs(ball.vx) < 0.35) {
            ball.vx = 0;
          } else {
            ball.vx = -ball.vx * restitution;
          }
          ball.vy *= wallFriction;
        }
      }
    });

    // 2. Drag release checking for portal capture
    if (draggedIndex !== null) {
      const db = balls[draggedIndex];
      const pdx = portalX - db.x;
      const pdy = portalY - db.y;
      const pdistSq = pdx * pdx + pdy * pdy;
      const capRadiusOffsetSq = (captureRadius + 0.1) * (captureRadius + 0.1);

      // If dragged near portal, attract visual cue
      if (pdistSq < capRadiusOffsetSq) {
        db.x += (portalX - db.x) * 0.15;
        db.y += (portalY - db.y) * 0.15;
      }
    } else {
      // Check if any ball was dropped inside portal capture zone
      balls.forEach((ball) => {
        if (!ball.isDragged && !ball.isCaptured) {
          const pdx = portalX - ball.x;
          const pdy = portalY - ball.y;
          const pdistSq = pdx * pdx + pdy * pdy;
          const captureRadiusSq = captureRadius * captureRadius;

          if (pdistSq < captureRadiusSq) {
            // Displace previously captured ball back into ballroom
            balls.forEach((b) => {
              if (b.isCaptured) {
                b.isCaptured = false;
                b.scale = 0.85;
                b.vy = -3.0; // drops down
              }
            });

            ball.isCaptured = true;
            onSelectTech(ball.item);
          }
        }
      });
    }

    // 3. User dragging item OUT of portal check
    if (draggedIndex !== null) {
      const db = balls[draggedIndex];
      if (db.isCaptured) {
        const pdx = portalX - db.x;
        const pdy = portalY - db.y;
        const pdistSq = pdx * pdx + pdy * pdy;
        const releaseRadius = captureRadius + 0.25;
        // Dragging far enough breaks portal lock
        if (pdistSq > releaseRadius * releaseRadius) {
          db.isCaptured = false;
        }
      }
    }

    // 4. Ball-to-Ball elastic collisions resolution (optimized overlap checks)
    const len = balls.length;
    for (let i = 0; i < len; i++) {
      const bi = balls[i];
      if (bi.isCaptured) continue;

      for (let j = i + 1; j < len; j++) {
        const bj = balls[j];
        if (bj.isCaptured) continue;

        const dx = bj.x - bi.x;
        const dy = bj.y - bi.y;
        const distSq = dx * dx + dy * dy;
        const minDist = bi.radius + bj.radius;
        const minDistSq = minDist * minDist;

        if (distSq < minDistSq && distSq > 0.000001) {
          const dist = Math.sqrt(distSq);
          const overlap = minDist - dist;
          const nx = dx / dist;
          const ny = dy / dist;

          // Positional slop: ignore extremely small overlaps to prevent jitter at rest
          const slop = 0.006;
          const resolveOverlap = Math.max(0, overlap - slop);
          
          if (resolveOverlap > 0) {
            // Push apart based on active dragging states
            if (bi.isDragged) {
              bj.x += nx * resolveOverlap;
              bj.y += ny * resolveOverlap;
            } else if (bj.isDragged) {
              bi.x -= nx * resolveOverlap;
              bi.y -= ny * resolveOverlap;
            } else {
              bi.x -= nx * (resolveOverlap * 0.5);
              bi.y -= ny * (resolveOverlap * 0.5);
              bj.x += nx * (resolveOverlap * 0.5);
              bj.y += ny * (resolveOverlap * 0.5);
            }
          }

          // Elastic impulse response
          const rvx = bj.vx - bi.vx;
          const rvy = bj.vy - bi.vy;
          const velAlongNormal = rvx * nx + rvy * ny;

          if (velAlongNormal < 0) {
            // Absorb bounce energy completely (treat as plastic collision) at low velocities to prevent infinite micro-bouncing
            const currentRestitution = Math.abs(velAlongNormal) < 0.25 ? 0.0 : restitution;
            const impulse = -(1 + currentRestitution) * velAlongNormal / 2;

            if (!bi.isDragged) {
              bi.vx -= impulse * nx;
              bi.vy -= impulse * ny;
            }
            if (!bj.isDragged) {
              bj.vx += impulse * nx;
              bj.vy += impulse * ny;
            }
          }
        }
      }
    }
  });

  return (
    <group>
      {/* Dashed Connecting Arrow to Portal during Dragging */}
      <DashedArrow
        ballsRef={ballsRef}
        draggedIndexRef={draggedIndexRef}
        portalX={portalX}
        portalY={portalY}
      />

      {/* Pulse Portal Ring Accretion Disk */}
      <Portal portalX={portalX} portalY={portalY} />

      {/* Pulsing Sparks Swirl Particles */}
      <PortalParticles count={40} portalX={portalX} portalY={portalY} />

      {/* Render Physics Items inside Scene */}
      {items.map((item) => (
        <Ball
          key={item.title}
          item={item}
          ballsRef={ballsRef}
          draggedIndexRef={draggedIndexRef}
          selectedTech={selectedTech}
        />
      ))}
    </group>
  );
};

/* ─── Main Skills Page ─── */
export const SkillsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedTech, setSelectedTech] = useState<typeof techStackItems[0] | null>(null);
  const [hasInteracted, setHasInteracted] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('portfolio_skills_interacted') === 'true';
    }
    return false;
  });

  const handleInteract = () => {
    setHasInteracted(true);
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio_skills_interacted', 'true');
    }
  };

  const filteredItems = useMemo(() => {
    return activeCategory === 'All' 
      ? techStackItems 
      : techStackItems.filter(item => item.category === activeCategory);
  }, [activeCategory]);

  const techDetails = useMemo(() => {
    if (!selectedTech) return null;
    return getTechDetails(selectedTech.title, selectedTech.category);
  }, [selectedTech]);

  return (
    <section id="skills" className="w-full relative z-10 min-h-screen bg-transparent overflow-hidden font-clash select-none">
      <div className="w-[97%] max-w-384 mx-auto bg-background min-h-screen relative flex flex-col pb-16">
        {/* Section Header */}
        <div className="w-full z-20 px-6 sm:px-8 lg:px-16 pt-10 sm:pt-14 relative">
          <header className="border-b border-dashed border-neutral-800 pb-6 sm:pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div>
              <span className="text-[#f54900] text-sm uppercase tracking-widest font-semibold">
                Expertise
              </span>
              <h2 className="text-[clamp(2.5rem,6vw,5.5rem)] font-extrabold uppercase tracking-tight mt-2 text-foreground leading-none">
                <AnimatedTitle text="Tech  Stack" />
              </h2>
            </div>
            <div className="flex flex-col items-end gap-2 text-right">
              <p className="text-muted-foreground max-w-sm text-sm md:text-base pb-1">
                Drag and drop tech balls inside the physics ballroom. Toss them into the pulsar black hole to analyze details!
              </p>
            </div>
          </header>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mt-6">
            {['All', 'Frontend', 'Backend', 'Database', 'DevOps', 'Design'].map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3 py-1.5 text-xs uppercase tracking-wider border transition-all duration-300 ${isActive
                      ? 'border-[#f54900] text-[#f54900] bg-[#f54900]/10'
                      : 'border-neutral-800 text-muted-foreground hover:border-[#f54900] hover:text-[#f54900]'
                    }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3D Physics Ballroom Container - Increased height on mobile view */}
        <div className="relative w-full h-[650px] sm:h-[550px] md:h-[650px] shrink-0  overflow-hidden mt-8 mx-auto max-w-[95%] bg-background">
          {/* Repeating Stripe Background styling */}
          <div
            className="absolute inset-0 w-full h-full opacity-10 dark:opacity-5 pointer-events-none select-none"
            style={{
              backgroundImage: "url('/stripe.svg')",
              backgroundRepeat: 'repeat',
              backgroundSize: '16px 16px',
            }}
          />

          <div className="absolute inset-0 w-full h-full z-10 touch-auto">
            <Canvas
              dpr={[1, 1.5]}
              camera={{ position: [0, 0, 5.0], fov: 50, near: 0.1, far: 50 }}
              flat
              gl={{ antialias: true, powerPreference: 'high-performance' }}
            >
              <ambientLight intensity={1.5} />
              <PhysicsBallroom
                items={filteredItems}
                onSelectTech={setSelectedTech}
                selectedTech={selectedTech}
                onInteract={handleInteract}
              />
            </Canvas>
          </div>

          {!hasInteracted && (
            <div className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center">
              {/* Animated Drag Demo Guide */}
              <motion.div
                className="absolute flex flex-col items-center justify-center text-[#f54900]"
                initial={{ x: 0, y: 120, opacity: 0 }}
                animate={{
                  x: [0, 0, 0, 0, 0],
                  y: [120, 120, 120, -120, -120],
                  scale: [1, 1, 0.85, 0.85, 1],
                  opacity: [0, 1, 1, 1, 0],
                }}
                transition={{
                  duration: 4.0,
                  repeat: Infinity,
                  ease: "easeInOut",
                  times: [0, 0.12, 0.28, 0.72, 0.88],
                }}
              >
                <div className="bg-background/95 border border-border px-3 py-1.5 rounded-md flex items-center gap-2 shadow-lg mb-2 backdrop-blur-xs">
                  <Grab className="w-4 h-4 animate-pulse text-[#f54900]" />
                  <span className="text-[10px] uppercase font-bold tracking-widest font-clash text-foreground">
                    Drag tech to Pulsar
                  </span>
                </div>
                {/* Arrow helper pointing direction */}
                <svg
                  className="w-5 h-5 animate-bounce mt-1 text-[#f54900]/80"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </motion.div>
            </div>
          )}
        </div>
      </div>

      {/* Glassmorphic Popup Modal */}
      <AnimatePresence>
        {selectedTech && techDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTech(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 22, stiffness: 220 }}
              className="relative w-full max-w-xl bg-background border border-border rounded-none p-6 sm:p-8 flex flex-col gap-6 overflow-hidden max-h-[90vh] md:max-h-none select-none font-clash"
            >
              {/* Repeating Stripe Background */}
              <div
                className="absolute inset-0 w-full h-full opacity-10 dark:opacity-5 pointer-events-none select-none z-0"
                style={{
                  backgroundImage: "url('/stripe.svg')",
                  backgroundRepeat: 'repeat',
                  backgroundSize: '16px 16px',
                }}
              />

              {/* Header with Close Button Left and Title/Description Pushed to Top */}
              <div className="relative z-10 flex items-start gap-4 border-b border-dashed border-border pb-4">
                {/* Close Button */}
                <button
                  onClick={() => setSelectedTech(null)}
                  className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-[#f54900] transition-colors cursor-pointer shrink-0 mt-0.5"
                >
                  ✕
                </button>

                <div className="text-left flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-2xl font-bold text-foreground leading-none">{selectedTech.title}</h3>
                    <div className="w-8 h-8 flex items-center justify-center shrink-0">
                      <img
                        src={selectedTech.image}
                        alt={selectedTech.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 items-center mt-2 flex-wrap">
                    <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded border border-border text-muted-foreground">
                      {selectedTech.category}
                    </span>
                    <span className="text-xs text-[#f54900] font-semibold">
                      {selectedTech.description}
                    </span>
                  </div>
                </div>
              </div>

              {/* Chart and Details Info */}
              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center overflow-y-auto pr-1">
                {/* Visual SVG Diagram */}
                <div className="flex flex-col items-center gap-3">
                  <DynamicPieChart metrics={techDetails.metrics} />
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 w-full max-w-[220px]">
                    {techDetails.metrics.map((m, idx) => (
                      <div key={idx} className="flex justify-between items-center text-[10px]">
                        <span className="text-muted-foreground truncate text-left">{m.label}:</span>
                        <span className="text-[#f54900] font-bold">{m.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Text Description & Links */}
                <div className="flex flex-col gap-5 justify-between h-full py-1">
                  <div className="flex flex-col gap-3">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-foreground border-b border-dashed border-border/40 pb-1 text-left">
                      Experience Details
                    </h4>
                    <p className="text-xs leading-relaxed text-muted-foreground text-left">
                      {techDetails.summary}
                    </p>
                  </div>

                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => {
                        if (selectedTech.link) window.open(selectedTech.link, '_blank');
                      }}
                      className="flex-1 py-2.5 text-[10px] font-bold uppercase tracking-wider bg-[#f54900] text-[#ffffe3] hover:scale-[1.02] active:scale-[0.98] transition-all rounded cursor-pointer"
                    >
                      Documentation
                    </button>
                    <button
                      onClick={() => setSelectedTech(null)}
                      className="flex-1 py-2.5 text-[10px] font-bold uppercase tracking-wider border border-border text-muted-foreground hover:border-foreground hover:text-foreground active:scale-[0.98] transition-all rounded cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};



export default SkillsPage;
