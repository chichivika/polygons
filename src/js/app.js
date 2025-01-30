import '../scss/app.scss';
import Toolbar from './сomponents/toolbar';
import MainGrid from './сomponents/mainGrid';
import BufferArea from './сomponents/bufferArea';
import WorkArea from './сomponents/workArea';
import Ruler from './сomponents/ruler';
import DragArea from './сomponents/dragArea';

customElements.define('app-toolbar', Toolbar);
customElements.define('main-grid', MainGrid);
customElements.define('buffer-area', BufferArea);
customElements.define('work-area', WorkArea);
customElements.define('work-ruler', Ruler);
customElements.define('drag-area', DragArea);

document.addEventListener('DOMContentLoaded', () => {});
