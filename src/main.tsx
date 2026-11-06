import { createRoot } from 'react-dom/client';
import '@fontsource/zen-maru-gothic/400.css';
import '@fontsource/zen-maru-gothic/700.css';
import './styles.css';
import App from './App';
import { startOffline } from './lib/offline';

createRoot(document.getElementById('root')!).render(<App />);
startOffline();
