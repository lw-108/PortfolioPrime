import React from 'react';
import { motion } from 'motion/react';

export const AnimatedTitle: React.FC<{ text: string }> = ({ text }) => {
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
                hidden: { opacity: 0, y: 50 },
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
