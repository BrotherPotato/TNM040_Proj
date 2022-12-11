import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
const svgRoot = document.getElementById('svg-view');
const svgManager = new window.BuildingsManager();
const svgView = new window.SVGView(svgRoot, svgManager);

window.svgView = svgView;

svgManager.loadBuildings(window.CONFIG.svg_files).then().then(() => {
  svgView.ready = true;
  // console.log('foobar')
  svgView.displayFloor('tappan', 4)
});

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

