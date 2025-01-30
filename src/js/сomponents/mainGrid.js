import { setDraggedObjectPosition } from '../utils/jsUtils';

class MainGrid extends HTMLElement {
  draggedPolygon = null;

  originPolygon = null;

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
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
            <style>
              :host {   
                    display: grid;
                    height: 100%;
                    grid-template-rows: 80px max-content minmax(300px, 1fr);
                    grid-template-columns: 1fr;
                    gap: 5px;
                    background-color: var(--header-color);
              }
              ::slotted(*) {
                background-color: var(--bg-color);
              }
              ::slotted(app-toolbar) {
                grid-row: 1 / span 1;
              }
              ::slotted(buffer-area) {
                grid-row: 2 / span 1;
                min-height: 240px;
                position: relative;
              }
              ::slotted(work-area) {
                grid-row: 3 / span 1;
                background-color: var(--ruler-bg-color);
                position: relative;
              }
            </style>
            <slot name='toolbar'></slot>
            <slot name='buffer-area'></slot>
            <slot name='work-area'></slot>
          `;
    this.initEventListeners();
  }

  initEventListeners() {
    this.querySelector('buffer-area').addEventListener('mousedown', this.mouseDownHandler);
    this.querySelector('work-area').addEventListener('mousedown', this.mouseDownHandler);
  }

  startDragPolygon(event) {
    if (this.draggedPolygon) {
      return;
    }
    if (!event.target.matches('polygon.generated-polygon')) {
      return;
    }

    const polygon = event.target.parentElement;
    const polygonRect = polygon.getBoundingClientRect();
    const clonePolygon = polygon.cloneNode(true);
    setDraggedObjectPosition({
      clientX: event.clientX,
      clientY: event.clientY,
      draggedObject: clonePolygon,
      width: polygonRect.width,
      height: polygonRect.height,
    });

    polygon.style.display = 'none';
    document.body.append(clonePolygon);

    this.originPolygon = polygon;
    this.draggedPolygon = clonePolygon;

    document.addEventListener('mousemove', this.mouseMoveHandler);
    document.addEventListener('mouseup', this.mouseUpHandler);
  }

  doDragPolygon(event) {
    const { draggedPolygon } = this;
    if (!this.draggedPolygon) {
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

  getPossibleTarget(deepEl) {
    if (!deepEl) {
      return null;
    }
    if (deepEl.tagName === 'BUFFER-AREA' || deepEl.tagName === 'DRAG-AREA') {
      return deepEl;
    }
    return this.getPossibleTarget(deepEl.parentElement);
  }

  stopDragPolygon(event) {
    const { draggedPolygon } = this;
    if (!draggedPolygon) {
      return;
    }

    draggedPolygon.style.display = 'none';
    const deepTarget = document.elementFromPoint(event.clientX, event.clientY);
    const target = this.getPossibleTarget(deepTarget);
    if (!target) {
      draggedPolygon.remove();
      this.originPolygon.style.display = 'block';
      this.clearDragMode();
      return;
    }

    draggedPolygon.style.display = 'block';
    const draggedRect = draggedPolygon.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    target.append(draggedPolygon);
    draggedPolygon.style.left = `${draggedRect.left - targetRect.left}px`;
    draggedPolygon.style.top = `${draggedRect.top - targetRect.top}px`;
    this.originPolygon.remove();
    this.clearDragMode();
  }

  clearDragMode() {
    this.originPolygon = null;
    this.draggedPolygon = null;

    document.removeEventListener('mousemove', this.mouseMoveHandler);
    document.removeEventListener('mouseup', this.mouseUpHandler);
  }
}

export default MainGrid;
