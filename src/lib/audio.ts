import { Capacitor } from '@capacitor/core';
import { TextToSpeech } from '@capacitor-community/text-to-speech';

export const SLOW = 0.6;

async function webVoice() {
  const synth = window.speechSynthesis;
  if (!synth) return undefined;
  let voices = synth.getVoices();
  if (!voices.length) {
    await new Promise((r) => {
      synth.addEventListener('voiceschanged', r, { once: true });
      setTimeout(r, 800);
    });
    voices = synth.getVoices();
  }
  return voices.find((v) => v.lang.toLowerCase().startsWith('ja'));
}

/** True when this device can speak Japanese. */
export async function hasVoice(): Promise<boolean> {
  if (Capacitor.isNativePlatform()) {
    try {
      return (await TextToSpeech.isLanguageSupported({ lang: 'ja-JP' })).supported;
    } catch {
      return false;
    }
  }
  return !!(await webVoice());
}

/** Speaks Japanese with the device voice. Resolves false when no Japanese voice exists. */
export async function speak(text: string, rate = 0.9): Promise<boolean> {
  if (Capacitor.isNativePlatform()) {
    try {
      await TextToSpeech.speak({ text, lang: 'ja-JP', rate });
      return true;
    } catch {
      return false;
    }
  }
  const voice = await webVoice();
  if (!voice) return false;
  const synth = window.speechSynthesis;
  synth.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'ja-JP';
  u.voice = voice;
  u.rate = rate;
  synth.speak(u);
  return true;
}

let ctx: AudioContext | null = null;
function tone(freq: number, start: number, dur: number) {
  ctx ??= new AudioContext();
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = 'sine';
  o.frequency.value = freq;
  const t = ctx.currentTime + start;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.12, t + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(ctx.destination);
  o.start(t);
  o.stop(t + dur);
}
export function chime(ok: boolean) {
  try {
    if (ok) { tone(784, 0, 0.14); tone(1175, 0.1, 0.2); } else { tone(330, 0, 0.16); tone(262, 0.12, 0.22); }
  } catch { /* audio unavailable */ }
}
