import { setDraggedObjectPosition } from '../../utils/jsUtils';
import store from '../../utils/store';

class DNDWrapper extends HTMLElement {
  draggedPolygon = null;

  draggedInitialPosition = null;

  dragFromTarget = null;

  bufferArea = null;

  workArea = null;

  constructor() {
    super();

    this.mouseDownHandler = this.startDragPolygon.bind(this);
    this.mouseMoveHandler = this.doDragPolygon.bind(this);
    this.mouseUpHandler = this.stopDragPolygon.bind(this);
  }

  connectedCallback() {
    this.bufferArea = document.createElement('buffer-area');
    this.workArea = document.createElement('work-area');

    this.append(this.bufferArea);
    this.append(this.workArea);

    this.bufferArea.addEventListener('mousedown', this.mouseDownHandler);
    this.workArea.addEventListener('mousedown', this.mouseDownHandler);
  }

  disconnectedCallback() {
    this.bufferArea.removeEventListener('mousedown', this.mouseDownHandler);
    this.workArea.removeEventListener('mousedown', this.mouseDownHandler);
  }

  getBufferArea() {
    return this.bufferArea;
  }

  getWorkArea() {
    return this.workArea;
  }

  getWorkDragArea() {
    const workArea = this.getWorkArea();
    return workArea.querySelector('work-drag-area');
  }

  startDragPolygon(event) {
    if (this.draggedPolygon) {
      return;
    }
    if (event.target.tagName.toLowerCase() !== 'generated-polygon') {
      return;
    }

    const polygon = event.target;

    const polygonRect = polygon.getBoundingClientRect();
    this.draggedInitialPosition = {
      left: polygonRect.left,
      top: polygonRect.top,
      width: polygonRect.width,
      height: polygonRect.height,
    };

    const clonePolygon = polygon.cloneNode(true);

    const targetFrom = this.getDragTargetByChild(polygon);
    targetFrom.removePolygon(polygon);

    let scale = 1;
    if (targetFrom === this.getBufferArea()) {
      scale = store.scale;
      clonePolygon.style.transform = `scale(${scale})`;
    }

    setDraggedObjectPosition({
      clientX: event.clientX,
      clientY: event.clientY,
      draggedObject: clonePolygon,
      width: this.draggedInitialPosition.width * scale,
      height: this.draggedInitialPosition.height * scale,
    });

    document.body.append(clonePolygon);

    this.draggedPolygon = clonePolygon;
    this.dragFromTarget = targetFrom;

    document.addEventListener('mousemove', this.mouseMoveHandler);
    document.addEventListener('mouseup', this.mouseUpHandler);
  }

  doDragPolygon(event) {
    const { draggedPolygon, draggedInitialPosition } = this;
    if (!draggedPolygon || !draggedInitialPosition) {
      return;
    }

    const draggedRect = draggedPolygon.getBoundingClientRect();
    setDraggedObjectPosition({
      clientX: event.clientX,
      clientY: event.clientY,
      draggedObject: draggedPolygon,
      width: draggedRect.width,
      height: draggedRect.height,
    });
  }

  stopDragPolygon(event) {
    const { draggedPolygon } = this;
    if (!draggedPolygon) {
      return;
    }

    draggedPolygon.style.display = 'none';
    const deepTarget = document.elementFromPoint(event.clientX, event.clientY);
    let target = this.getDragTargetByChild(deepTarget);

    if (!target) {
      target = this.dragFromTarget;
      draggedPolygon.style.left = `${this.draggedInitialPosition.left}px`;
      draggedPolygon.style.top = `${this.draggedInitialPosition.top}px`;
    }

    draggedPolygon.style.display = 'block';

    if (target === this.getBufferArea()) {
      draggedPolygon.style.transform = 'scale(1)';
    }

    target.appendPolygon(draggedPolygon);
    this.clearDragMode();
  }

  clearDragMode() {
    this.dragFromTarget = null;
    this.draggedPolygon = null;
    this.draggedInitialPosition = null;

    document.removeEventListener('mousemove', this.mouseMoveHandler);
    document.removeEventListener('mouseup', this.mouseUpHandler);
  }

  getDragTargetByChild(deepEl) {
    if (!deepEl) {
      return null;
    }
    if (deepEl === this.getBufferArea() || deepEl === this.getWorkDragArea()) {
      return deepEl;
    }

    return this.getDragTargetByChild(deepEl.parentElement);
  }
}

export default DNDWrapper;
