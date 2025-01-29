import '../scss/app.scss';
import Toolbar from './сomponents/toolbar';
import MainGrid from './сomponents/mainGrid';
import BufferArea from './сomponents/bufferArea';

customElements.define('app-toolbar', Toolbar);
customElements.define('main-grid', MainGrid);
customElements.define('buffer-area', BufferArea);

document.addEventListener('DOMContentLoaded', () => {});
