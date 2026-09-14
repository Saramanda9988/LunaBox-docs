'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';

// Ordered dithering keeps the app icon's facets while giving the moon a tonal surface.
const BAYER_4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
const GRID = 140;
const CELL = 4;

export function PixelMoon() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [ready, setReady] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    let cancelled = false;
    const image = imageRef.current ?? new window.Image();
    imageRef.current = image;

    const draw = () => {
      if (cancelled) return;
      const canvas = canvasRef.current;
      const context = canvas?.getContext('2d');
      if (!canvas || !context) return;

      const source = document.createElement('canvas');
      source.width = source.height = GRID;
      const sourceContext = source.getContext('2d', { willReadFrequently: true });
      if (!sourceContext) return;

      // Crop the icon's padding and read the white moon on its black background.
      sourceContext.drawImage(image, 140, 130, 730, 750, 0, 0, GRID, GRID);
      const { data } = sourceContext.getImageData(0, 0, GRID, GRID);
      const dark = resolvedTheme === 'dark';
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = dark ? '#a9bdd8' : '#495f7e';

      for (let y = 0; y < GRID; y++) {
        for (let x = 0; x < GRID; x++) {
          const offset = (y * GRID + x) * 4;
          const luminance =
            (data[offset] * 0.2126 +
              data[offset + 1] * 0.7152 +
              data[offset + 2] * 0.0722) / 255;
          const mask = Math.pow(luminance, 0.65) * (data[offset + 3] / 255);
          if (mask < 0.08) continue;

          const light = Math.exp(-((x / GRID - 0.24) ** 2 + (y / GRID - 0.22) ** 2) * 3);
          const density = mask * (0.3 + light * 0.65);
          const threshold = (BAYER_4[(y % 4) * 4 + (x % 4)] + 0.5) / 16;
          if (density < threshold) continue;

          context.globalAlpha = (dark ? 0.58 : 0.5) + light * 0.35;
          context.fillRect(x * CELL, y * CELL, CELL - 0.65, CELL - 0.65);
        }
      }

      context.globalAlpha = 1;
      setReady(true);
    };

    image.onload = draw;
    if (!image.src) image.src = '/icon/appicon-dark.png';
    if (image.complete && image.naturalWidth > 0) draw();

    return () => {
      cancelled = true;
      image.onload = null;
    };
  }, [resolvedTheme]);

  return (
    <div className="hero-moon" aria-hidden="true">
      <div className="hero-moon-glow" />
      <Image
        src="/icon/appicon-dark.png"
        alt=""
        width={560}
        height={560}
        className="hero-moon-fallback"
        style={{ opacity: ready ? 0 : 0.65 }}
        priority
      />
      <canvas
        ref={canvasRef}
        width={GRID * CELL}
        height={GRID * CELL}
        className="hero-moon-pixels"
        style={{ opacity: ready ? 1 : 0 }}
      />
    </div>
  );
}
