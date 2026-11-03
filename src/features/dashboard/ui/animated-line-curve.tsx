'use client';

import { motion, useReducedMotion } from 'motion/react';
import { useId } from 'react';
import { Curve, type CurveProps } from 'recharts';

const REVEAL_PADDING = 4;

export function AnimatedLineCurve(props: CurveProps) {
  const shouldReduceMotion = useReducedMotion();
  const clipPathId = `dashboard-line-reveal-${useId().replaceAll(':', '')}`;
  const coordinates = (props.points ?? []).flatMap((point) =>
    point.x === null || point.y === null ? [] : [{ x: point.x, y: point.y }]
  );

  if (coordinates.length === 0) return <Curve {...props} />;

  const xValues = coordinates.map((point) => point.x);
  const yValues = coordinates.map((point) => point.y);
  const x = Math.min(...xValues) - REVEAL_PADDING;
  const y = Math.min(...yValues) - REVEAL_PADDING;
  const width = Math.max(...xValues) - x + REVEAL_PADDING;
  const height = Math.max(...yValues) - y + REVEAL_PADDING;

  return (
    <g clipPath={props.clipPath}>
      <defs>
        <clipPath id={clipPathId}>
          <motion.rect
            x={x}
            y={y}
            height={height}
            initial={{ width: shouldReduceMotion ? width : 0 }}
            animate={{ width }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 1.5, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }
            }
          />
        </clipPath>
      </defs>
      <Curve {...props} clipPath={`url(#${clipPathId})`} />
    </g>
  );
}
