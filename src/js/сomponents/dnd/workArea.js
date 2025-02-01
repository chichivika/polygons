import store from '../../utils/store';
import { throttled } from '../../utils/jsUtils';

class WorkArea extends HTMLElement {
  static minCellSize = 20;

  static originCellSize = 30;

  static maxCellSize = 70;

  static step = 10;

  startDragMouse = null;

  constructor() {
    super();

    this.renderHandler = this.render.bind(this);
    this.wheelHandler = this.wheel.bind(this);
    this.resizeHandler = throttled(this.resize.bind(this), 50);
    this.mouseDownHandler = this.startDragging.bind(this);
    this.mouseMoveHandler = throttled(this.doDragging.bind(this), 40);
    this.mouseUpHandler = this.stopDragging.bind(this);
  }

  disconnectedCallback() {
    this.removeEventListener('wheel', this.wheelHandler);
    this.removeEventListener('mousedown', this.mouseDownHandler);
    window.removeEventListener('resize', this.resizeHandler);
    store.removeEventListener('clearData', this.renderHandler);
  }

  connectedCallback() {
    this.addEventListener('wheel', this.wheelHandler);
    this.addEventListener('mousedown', this.mouseDownHandler);
    window.addEventListener('resize', this.resizeHandler);
    store.addListener('clearData', this.renderHandler);

    this.render();
  }

  render() {
    const { shift } = store;
    const { step } = WorkArea;
    const cellSize = WorkArea.getCellSize();

    this.innerHTML = `
                <work-ruler cell-size="${cellSize}" step="${step}" align="horizontal" shift=${shift[0]}></work-ruler>
                <work-ruler cell-size="${cellSize}" step="${step}" align="vertical" shift=${shift[1]}></work-ruler>
                <work-drag-area cell-size="${cellSize}" origin-cell-size=${WorkArea.originCellSize} 
                                shift-x=${shift[0]} shift-y=${shift[1]}></work-drag-area>
              `;
  }

  wheel(event) {
    if (!event.ctrlKey) {
      return;
    }
    event.preventDefault();

    const sign = event.deltaY < 0 ? 1 : -1;
    const cellSize = WorkArea.getCellSize();
    const newCellSize = Math.min(Math.max(cellSize + sign * 5, WorkArea.minCellSize), WorkArea.maxCellSize);
    store.scale = newCellSize / WorkArea.originCellSize;
    this.render();
  }

  static getCellSize() {
    return WorkArea.originCellSize * store.scale;
  }

  resize() {
    this.render();
  }

  startDragging(event) {
    if (!event.ctrlKey || event.button !== 0) {
      return;
    }
    if (event.currentTarget?.tagName !== 'WORK-AREA') {
      return;
    }
    this.startDragMouse = [event.clientX, event.clientY];
    document.addEventListener('mousemove', this.mouseMoveHandler);
    document.addEventListener('mouseup', this.mouseUpHandler);
    document.body.style.cursor = 'grab';
  }

  stopDragging(event) {
    const deltaX = event.clientX - this.startDragMouse[0];
    const deltaY = event.clientY - this.startDragMouse[1];
    store.shift = WorkArea.calculateNewShiftByDelta(deltaX, deltaY);

    this.startDragMouse = null;
    document.removeEventListener('mousemove', this.mouseMoveHandler);
    document.removeEventListener('mouseup', this.mouseUpHandler);
    document.body.style.cursor = 'auto';
  }

  getDragArea() {
    return this.querySelector('work-drag-area');
  }

  getRulerY() {
    return this.querySelector('work-ruler[align="vertical"]');
  }

  getRulerX() {
    return this.querySelector('work-ruler[align="horizontal"]');
  }

  doDragging(event) {
    if (!this.startDragMouse) {
      return;
    }

    const deltaX = event.clientX - this.startDragMouse[0];
    const deltaY = event.clientY - this.startDragMouse[1];
    const newShift = WorkArea.calculateNewShiftByDelta(deltaX, deltaY);
    const dragArea = this.getDragArea();

    dragArea.setAttribute('shift-x', newShift[0]);
    dragArea.setAttribute('shift-y', newShift[1]);

    this.getRulerX().setAttribute('shift', newShift[0]);
    this.getRulerY().setAttribute('shift', newShift[1]);
  }

  appendPolygon(...rest) {
    return this.getDragArea().appendPolygon(...rest);
  }

  removePolygon(...rest) {
    return this.getDragArea().removePolygon(...rest);
  }

  returnPolygon(...rest) {
    return this.getDragArea().returnPolygon(...rest);
  }

  static calculateNewShiftByDelta(deltaX, deltaY) {
    const cellSize = WorkArea.getCellSize();
    const oldShift = store.shift;
    return [oldShift[0] + deltaX / cellSize, oldShift[1] + deltaY / cellSize];
  }
}

export default WorkArea;
