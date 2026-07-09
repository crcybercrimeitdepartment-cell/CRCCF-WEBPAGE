import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.jsx'

// Intercept and silence specific warnings that clutter the console
const originalWarn = console.warn;
console.warn = (...args) => {
  if (typeof args[0] === 'string') {
    if (args[0].includes('container has a non')) return; // Ignore Framer Motion scroll container warning
    if (args[0].includes('THREE.Clock:')) return; // Ignore Three.js Clock deprecation warning
    if (args[0].includes('THREE.WebGLRenderer: Context lost.')) return;
  }
  originalWarn(...args);
};

const originalLog = console.log;
console.log = (...args) => {
  if (typeof args[0] === 'string') {
    if (args[0].includes('THREE.WebGLRenderer: Context lost.')) return;
  }
  originalLog(...args);
};

const originalError = console.error;
console.error = (...args) => {
  if (typeof args[0] === 'string') {
    if (args[0].includes('THREE.WebGLRenderer: Context lost.')) return;
  }
  originalError(...args);
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
