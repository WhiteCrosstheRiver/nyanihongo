import { useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';

export type OfflineStatus =
  | { state: 'builtin' } // desktop and Android ship everything inside the app
  | { state: 'none' } // this browser cannot cache the app
  | { state: 'saving'; percent: number; failed: boolean }
  | { state: 'ready' };

const isHosted = () => /^https?:$/.test(location.protocol) && !Capacitor.isNativePlatform();

let status: OfflineStatus = isHosted() ? { state: 'none' } : { state: 'builtin' };
const listeners = new Set<(s: OfflineStatus) => void>();
const publish = (s: OfflineStatus) => { status = s; listeners.forEach((l) => l(s)); };

export function startOffline() {
  if (!isHosted() || !import.meta.env.PROD || !('serviceWorker' in navigator)) return;
  publish({ state: 'saving', percent: 0, failed: false });
  navigator.serviceWorker.addEventListener('message', ({ data }) => {
    if (data?.type !== 'offline') return;
    if (data.saved >= data.total) publish({ state: 'ready' });
    else publish({ state: 'saving', percent: Math.round((data.saved / data.total) * 100), failed: data.failed > 0 });
  });
  const fill = async () => (await navigator.serviceWorker.ready).active?.postMessage('fill');
  navigator.serviceWorker.register('sw.js').then(fill).catch(() => publish({ state: 'saving', percent: 0, failed: true }));
  window.addEventListener('online', fill); // pick up where a dropped connection stopped
  navigator.storage?.persist?.().catch(() => {}); // ask the browser not to evict saved progress
}

export function useOffline() {
  const [s, setS] = useState(status);
  useEffect(() => {
    setS(status);
    listeners.add(setS);
    return () => { listeners.delete(setS); };
  }, []);
  return s;
}
