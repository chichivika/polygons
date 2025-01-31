import store from '../utils/store';

class WorkArea extends HTMLElement {
  static minCellSize = 20;

  static maxCellSize = 70;

  static step = 10;

  static originCellSize = 30;

  startDragMouse = null;

  constructor() {
    super();

    this.wheelHandler = this.wheel.bind(this);
    this.resizeHandler = this.resize.bind(this);
    this.mouseDownHandler = this.startDragging.bind(this);
    this.mouseMoveHandler = this.doDragging.bind(this);
    this.mouseUpHandler = this.stopDragging.bind(this);
  }

  disconnectedCallback() {
    this.removeEventListener('wheel', this.wheelHandler);
    this.removeEventListener('mousedown', this.mouseDownHandler);
    window.removeEventListener('resize', this.resizeHandler);
  }

  connectedCallback() {
    this.addEventListener('wheel', this.wheelHandler);
    this.addEventListener('mousedown', this.mouseDownHandler);
    window.addEventListener('resize', this.resizeHandler);
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
    if (!event.ctrlKey) {
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
    const cellSize = WorkArea.getCellSize();
    const deltaX = event.clientX - this.startDragMouse[0];
    const deltaY = event.clientY - this.startDragMouse[1];
    store.shift = [store.shift[0] + deltaX / cellSize, store.shift[1] + deltaY / cellSize];

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

    const cellSize = WorkArea.getCellSize();
    const deltaX = event.clientX - this.startDragMouse[0];
    const deltaY = event.clientY - this.startDragMouse[1];
    const newShift = [store.shift[0] + deltaX / cellSize, store.shift[1] + deltaY / cellSize];
    const dragArea = this.getDragArea();

    dragArea.setAttribute('shift-x', newShift[0]);
    dragArea.setAttribute('shift-y', newShift[1]);

    this.getRulerX().setAttribute('shift', newShift[0]);
    this.getRulerY().setAttribute('shift', newShift[1]);
  }
}

export default WorkArea;
