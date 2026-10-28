import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import App from './App';
import { initAnalytics } from './utils/analytics';
import { dismissLoader } from './utils/loader';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

dismissLoader();
initAnalytics();
