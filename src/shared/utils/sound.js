/**
 * Pure Web Audio API arcade sound synthesizer.
 * Matches the exact crisp, tactile blip sound from the certifications cards.
 */
export function playArcadeSound(type = 'item') {
  if (typeof window === 'undefined') return;

  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;

    if (type === 'select' || type === 'expand') {
      // Degree card / major select blip (523Hz -> 784Hz clean square wave)
      osc.type = 'square';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.setValueAtTime(783.99, now + 0.05);
      gain.gain.setValueAtTime(0.045, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
      osc.start(now);
      osc.stop(now + 0.14);
    } else if (type === 'swap') {
      // Swapper navigation: light, clean dual-tone ping in the same certification key
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(660, now);
      osc.frequency.setValueAtTime(880, now + 0.035);
      gain.gain.setValueAtTime(0.035, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    } else {
      // Default: EXACT certification card sound (660Hz triangle, 70ms crisp ping)
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(660, now);
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
      osc.start(now);
      osc.stop(now + 0.07);
    }
  } catch {
    // AudioContext blocked or muted
  }
}
