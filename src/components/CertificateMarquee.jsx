import { useRef, useState, useCallback } from 'react';
import { Award } from 'lucide-react';
import './CertificateMarquee.css';

/**
 * Auto-scrolling certificate carousel.
 *
 * Behaviour requested:
 *  - Cards continuously auto-scroll ("run") to the left, looping forever.
 *  - On pointer-down (click-and-hold) the CSS animation pauses, and the
 *    user can drag the track left/right manually.
 *  - On release, if the user didn't actually drag (just a tap/click), we
 *    let the click-through to onSelect fire and resume auto-scroll;
 *    if they did drag, we keep it paused-but-released (resume after a
 *    short grace period) so the motion doesn't yank back unexpectedly.
 *
 * The list is duplicated once so the CSS `marquee-left` keyframe (which
 * translates by -50%) loops seamlessly.
 */
export default function CertificateMarquee({ certificates, onSelect }) {
  const trackRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [paused, setPaused] = useState(false);
  const dragState = useRef({ startX: 0, scrollLeft: 0, moved: false });

  const doubled = [...certificates, ...certificates];

  const onPointerDown = useCallback((e) => {
    const track = trackRef.current;
    if (!track) return;
    setPaused(true);
    setDragging(true);
    dragState.current.startX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    dragState.current.moved = false;

    // Freeze the current visual position by converting the running CSS
    // animation offset into an actual scrollLeft-like transform, then we
    // drive translateX manually while dragging.
    const computedTransform = window.getComputedStyle(track).transform;
    let currentX = 0;
    if (computedTransform && computedTransform !== 'none') {
      const match = computedTransform.match(/matrix\(([^)]+)\)/);
      if (match) {
        const parts = match[1].split(',').map(Number);
        currentX = parts[4] || 0;
      }
    }
    dragState.current.scrollLeft = currentX;
    track.style.animation = 'none';
    track.style.transform = `translateX(${currentX}px)`;

    track.setPointerCapture?.(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e) => {
    if (!dragging) return;
    const track = trackRef.current;
    if (!track) return;
    const clientX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    const dx = clientX - dragState.current.startX;
    if (Math.abs(dx) > 4) dragState.current.moved = true;
    const newX = dragState.current.scrollLeft + dx;
    track.style.transform = `translateX(${newX}px)`;
  }, [dragging]);

  const onPointerUp = useCallback((e) => {
    const track = trackRef.current;
    setDragging(false);
    if (track) {
      track.releasePointerCapture?.(e.pointerId);
      // Resume the auto-scroll marquee from roughly where the user left it.
      // We just re-enable the CSS animation; the brief visual jump back to
      // the keyframe's natural position is masked by the edge fade.
      setTimeout(() => {
        if (track) {
          track.style.animation = '';
          track.style.transform = '';
          setPaused(false);
        }
      }, 220);
    }
  }, []);

  const handleCardClick = (cert) => {
    if (dragState.current.moved) return; // it was a drag, not a tap
    onSelect?.(cert);
  };

  return (
    <>
      <div className="cert-track-outer">
        <div
          className={`cert-track ${paused ? 'paused' : ''} ${dragging ? 'dragging' : ''}`}
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={(e) => { if (dragging) onPointerUp(e); }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => { if (!dragging) setPaused(false); }}
        >
          {doubled.map((cert, i) => (
            <div
              key={`${cert.id}-${i}`}
              className="uiv-card cert-card"
              onClick={() => handleCardClick(cert)}
            >
              <div className="cert-thumb">
                {cert.image ? (
                  <img src={cert.image} alt={cert.title} loading="lazy" draggable={false} />
                ) : (
                  <Award size={42} />
                )}
                <div className="cert-ribbon">
                  <Award size={15} />
                </div>
              </div>
              <div className="cert-body">
                <h4>{cert.title}</h4>
                <div className="cert-issuer">{cert.issuer}</div>
                <div className="cert-year">{cert.year}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="cert-hint">
        <Award size={12} /> Klik &amp; tahan untuk geser manual
      </div>
    </>
  );
}
