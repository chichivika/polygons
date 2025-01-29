import '../scss/app.scss';
import Toolbar from './сomponents/toolbar';
import MainGrid from './сomponents/mainGrid';
import { doAction } from './utils/actions';

customElements.define('app-toolbar', Toolbar);
customElements.define('main-grid', MainGrid);

window.onload = () => {
  const toolbar = document.querySelector('app-toolbar');
  toolbar.addEventListener('action', (param) => {
    doAction(param.detail);
  });
};
