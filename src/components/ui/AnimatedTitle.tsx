import React from 'react';
import { motion } from 'motion/react';

export const AnimatedTitle: React.FC<{ text: string }> = ({ text }) => (
  <motion.span
    variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.02 } } }}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    className="inline"
  >
    {text.split('').map((c, i) => (
      <motion.span
        key={i}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 12, stiffness: 100 } },
        }}
        className="inline-block"
      >
        {c === ' ' ? '\u00A0' : c}
      </motion.span>
    ))}
  </motion.span>
);
