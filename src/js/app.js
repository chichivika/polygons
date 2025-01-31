import '../scss/app.scss';
import Toolbar from './сomponents/toolbar';
import MainGrid from './сomponents/mainGrid';
import BufferArea from './сomponents/bufferArea';
import WorkArea from './сomponents/workArea';
import Ruler from './сomponents/ruler';
import WorkDragArea from './сomponents/workDragArea';
import DNDWrapper from './сomponents/dndWraper';
import GeneratedPolygon from './сomponents/generatedPolygon';

customElements.define('app-toolbar', Toolbar);
customElements.define('main-grid', MainGrid);
customElements.define('dnd-wrapper', DNDWrapper);

customElements.define('buffer-area', BufferArea);
customElements.define('generated-polygon', GeneratedPolygon);

customElements.define('work-area', WorkArea);
customElements.define('work-ruler', Ruler);
customElements.define('work-drag-area', WorkDragArea);

document.addEventListener('DOMContentLoaded', () => {});
