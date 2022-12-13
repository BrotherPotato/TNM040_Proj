import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

/* === SVG VIEW === */
const svgRoot = document.getElementById('svg-root');
const svgManager = new window.BuildingsManager();
const svgView = new window.SVGView(svgRoot, svgManager);
window.svgView = svgView;
window.svgRoot = svgRoot;
// document.body.removeChild(svgRoot);

svgManager.loadBuildings(window.CONFIG.svg_files).then().then(() => {
  svgView.ready = true;
  svgView.displayFloor('tappan', 4)
});
/* === SVG VIEW === */

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

