'use client';

import { useCallback, useEffect, useRef } from 'react';

const CHARSET = '@#$%&*+-=.:;<>?/\\|~^';

interface DecryptAsciiProps {
  text: string;
  className?: string;
  radius?: number;
  decryptDuration?: number;
}

interface CharPosition {
  row: number;
  col: number;
}

function randomChar() {
  return CHARSET[Math.floor(Math.random() * CHARSET.length)];
}

function isPreservedChar(char: string) {
  return char === ' ' || char === '\n' || char === '\t';
}

function buildCharGrid(text: string): CharPosition[] {
  const positions: CharPosition[] = [];
  let row = 0;
  let col = 0;

  for (let i = 0; i < text.length; i++) {
    if (text[i] === '\n') {
      positions.push({ row: -1, col: -1 });
      row++;
      col = 0;
    } else {
      positions.push({ row, col });
      col++;
    }
  }

  return positions;
}

function getCharAt(lines: string[], row: number, col: number): string | null {
  if (row < 0 || row >= lines.length) return null;
  const line = lines[row];
  if (col < 0 || col >= line.length) return null;
  return line[col];
}

function measureMetrics(element: HTMLElement) {
  const style = window.getComputedStyle(element);
  const probe = document.createElement('span');
  probe.style.position = 'absolute';
  probe.style.visibility = 'hidden';
  probe.style.whiteSpace = 'pre';
  probe.style.font = style.font;
  probe.textContent = 'M';
  document.body.appendChild(probe);

  const charWidth = probe.getBoundingClientRect().width || 1;
  const fontSize = parseFloat(style.fontSize) || 9;
  const lineHeight =
    style.lineHeight === 'normal'
      ? fontSize * 1.2
      : parseFloat(style.lineHeight) || fontSize;

  document.body.removeChild(probe);
  return { charWidth, lineHeight };
}

export default function DecryptAscii({
  text,
  className = '',
  radius = 4,
  decryptDuration = 500,
}: DecryptAsciiProps) {
  const preRef = useRef<HTMLPreElement>(null);
  const frameRef = useRef<number | null>(null);
  const mouseRef = useRef<{ row: number; col: number } | null>(null);
  const charGridRef = useRef<CharPosition[]>(buildCharGrid(text));
  const linesRef = useRef<string[]>(text.split('\n'));
  const metricsRef = useRef({ charWidth: 1, lineHeight: 1 });
  const scrambleStartRef = useRef<Map<number, number>>(new Map());
  const isHoveringRef = useRef(false);

  const cancelAnimation = useCallback(() => {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
  }, []);

  const resetEffect = useCallback(() => {
    isHoveringRef.current = false;
    mouseRef.current = null;
    scrambleStartRef.current.clear();
    cancelAnimation();
    if (preRef.current) {
      preRef.current.textContent = text;
    }
  }, [cancelAnimation, text]);

  const updateMetrics = useCallback(() => {
    if (!preRef.current) return;
    metricsRef.current = measureMetrics(preRef.current);
  }, []);

  const renderFrame = useCallback(
    (now: number) => {
      if (!preRef.current) return;

      const mouse = mouseRef.current;
      const scrambleStart = scrambleStartRef.current;
      const positions = charGridRef.current;
      const activeIndices = new Set<number>();

      if (mouse) {
        for (let i = 0; i < text.length; i++) {
          const char = text[i];
          const pos = positions[i];
          if (isPreservedChar(char) || pos.row < 0) continue;

          const distance = Math.hypot(pos.row - mouse.row, pos.col - mouse.col);
          if (distance <= radius) {
            activeIndices.add(i);
            if (!scrambleStart.has(i)) scrambleStart.set(i, now);
          }
        }
      }

      for (const index of scrambleStart.keys()) {
        if (!activeIndices.has(index)) scrambleStart.delete(index);
      }

      let output = '';
      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (isPreservedChar(char)) {
          output += char;
          continue;
        }

        const startedAt = scrambleStart.get(i);
        if (startedAt !== undefined) {
          const progress = (now - startedAt) / decryptDuration;
          if (progress >= 1) {
            output += char;
          } else {
            output += randomChar();
          }
        } else {
          output += char;
        }
      }

      preRef.current.textContent = output;
    },
    [decryptDuration, radius, text]
  );

  const startLoop = useCallback(() => {
    if (frameRef.current !== null) return;

    const tick = (now: number) => {
      if (!isHoveringRef.current) {
        frameRef.current = null;
        return;
      }
      renderFrame(now);
      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
  }, [renderFrame]);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLPreElement>) => {
      if (!preRef.current) return;

      const rect = preRef.current.getBoundingClientRect();
      const { charWidth, lineHeight } = metricsRef.current;
      const x = event.clientX - rect.left + preRef.current.scrollLeft;
      const y = event.clientY - rect.top + preRef.current.scrollTop;

      const row = Math.floor(y / lineHeight);
      const col = Math.floor(x / charWidth);
      const charUnderCursor = getCharAt(linesRef.current, row, col);

      if (!charUnderCursor || isPreservedChar(charUnderCursor)) {
        resetEffect();
        return;
      }

      mouseRef.current = { row, col };
      isHoveringRef.current = true;
      startLoop();
    },
    [resetEffect, startLoop]
  );

  const handleMouseLeave = useCallback(() => {
    resetEffect();
  }, [resetEffect]);

  useEffect(() => {
    charGridRef.current = buildCharGrid(text);
    linesRef.current = text.split('\n');
    scrambleStartRef.current.clear();
    if (preRef.current) {
      preRef.current.textContent = text;
    }
  }, [text]);

  useEffect(() => {
    updateMetrics();
    window.addEventListener('resize', updateMetrics);
    return () => {
      window.removeEventListener('resize', updateMetrics);
      cancelAnimation();
    };
  }, [cancelAnimation, updateMetrics]);

  return (
    <pre
      ref={preRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {text}
    </pre>
  );
}
