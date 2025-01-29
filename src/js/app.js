import '../scss/app.scss';
import Toolbar from './сomponents/toolbar';
import MainGrid from './сomponents/mainGrid';
import RulerCanvas from './сomponents/workArea';
import { doAction } from './utils/actions';

customElements.define('app-toolbar', Toolbar);
customElements.define('main-grid', MainGrid);
customElements.define('ruler-canvas', RulerCanvas, { extends: 'canvas' });

document.addEventListener('DOMContentLoaded', () => {
  const toolbar = document.querySelector('app-toolbar');
  toolbar.addEventListener('action', (param) => {
    doAction(param.detail);
  });
});
