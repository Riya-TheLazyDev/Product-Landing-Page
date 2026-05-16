/**
 * Fixed global atmosphere layers — grain, vignette, ambient glows.
 * Rendered once in the root layout; all pages inherit depth via CSS tokens.
 */
export default function CinematicAtmosphere() {
  return (
    <div className="cinematic-atmosphere" aria-hidden>
      <div className="cinematic-atmosphere__base" />
      <div className="cinematic-atmosphere__plume" />
      <div className="cinematic-atmosphere__shift" />
      <div className="cinematic-atmosphere__glow cinematic-atmosphere__glow--gold" />
      <div className="cinematic-atmosphere__glow cinematic-atmosphere__glow--midnight" />
      <div className="cinematic-atmosphere__glow cinematic-atmosphere__glow--charcoal" />
      <div className="cinematic-atmosphere__mist" />
      <div className="cinematic-atmosphere__vignette" />
      <div className="cinematic-atmosphere__grain" />
    </div>
  );
}
