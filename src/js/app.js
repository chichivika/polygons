import '../scss/app.scss';
import Toolbar from './сomponents/toolbar';
import MainGrid from './сomponents/mainGrid';
import BufferArea from './сomponents/dnd/bufferArea';
import WorkArea from './сomponents/dnd/workArea';
import WorkRuler from './сomponents/workTools/workRuler';
import WorkDragArea from './сomponents/workTools/workDragArea';
import DNDWrapper from './сomponents/dnd/dndWraper';
import GeneratedPolygon from './сomponents/generatedPolygon';

customElements.define('app-toolbar', Toolbar);
customElements.define('main-grid', MainGrid);
customElements.define('dnd-wrapper', DNDWrapper);

customElements.define('buffer-area', BufferArea);
customElements.define('generated-polygon', GeneratedPolygon);

customElements.define('work-area', WorkArea);
customElements.define('work-ruler', WorkRuler);
customElements.define('work-drag-area', WorkDragArea);
