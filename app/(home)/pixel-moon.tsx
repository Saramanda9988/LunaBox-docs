import { PIXEL_MOON_PATHS } from './pixel-moon.paths';

export function PixelMoon() {
  return (
    <div className="hero-moon animate-fd-fade-in duration-400" aria-hidden="true">
      <div className="hero-moon-glow" />
      <svg
        viewBox="0 0 140 140"
        width={560}
        height={560}
        className="hero-moon-pixels"
        focusable="false"
      >
        {PIXEL_MOON_PATHS.map(({ opacity, d }) => (
          <path key={opacity} d={d} opacity={opacity} />
        ))}
      </svg>
    </div>
  );
}
