import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './pages/App';
import './index.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register service worker for PWA
serviceWorkerRegistration.register({
  onSuccess: (registration) => {
    console.log('ServiceWorker registration successful with scope: ', registration.scope);
  },
  onUpdate: (registration) => {
    if (window.confirm('New content available! Reload to update?')) {
      const worker = registration.waiting;
      if (worker) {
        worker.postMessage({ type: 'SKIP_WAITING' });
        window.location.reload();
      }
    }
  },
  onError: (error) => {
    console.error('Error during service worker registration:', error);
  },
});
