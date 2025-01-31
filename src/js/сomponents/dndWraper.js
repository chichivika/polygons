import { setDraggedObjectPosition } from '../utils/jsUtils';
import store from '../utils/store';

class DNDWrapper extends HTMLElement {
  draggedPolygon = null;

  draggedInitialPosition = null;

  dragFromTarget = null;

  bufferArea = null;

  workArea = null;

  constructor() {
    super();

    this.mouseDownHandler = (event) => {
      this.startDragPolygon(event);
    };
    this.mouseMoveHandler = (event) => {
      this.doDragPolygon(event);
    };
    this.mouseUpHandler = (event) => {
      this.stopDragPolygon(event);
    };
  }

  connectedCallback() {
    const bufferArea = this.getBufferArea();
    const workArea = this.getWorkArea();

    this.append(bufferArea);
    this.append(workArea);

    bufferArea.addEventListener('mousedown', this.mouseDownHandler);
    workArea.addEventListener('mousedown', this.mouseDownHandler);
  }

  getBufferArea() {
    if (this.bufferArea === null) {
      this.bufferArea = document.createElement('buffer-area');
    }
    return this.bufferArea;
  }

  getWorkArea() {
    if (this.workArea === null) {
      this.workArea = document.createElement('work-area');
    }
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
      clonePolygon.style.transform = `scale(${scale}, ${scale})`;
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

  getDragTargetByChild(deepEl) {
    if (!deepEl) {
      return null;
    }
    if (deepEl === this.getBufferArea() || deepEl === this.getWorkDragArea()) {
      return deepEl;
    }

    return this.getDragTargetByChild(deepEl.parentElement);
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
      draggedPolygon.style.transform = 'scale(1,1)';
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
}

export default DNDWrapper;
