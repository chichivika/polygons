class WorkArea extends HTMLElement {
  static minCellSize = 20;

  static maxCellSize = 70;

  static step = 10;

  static originCellSize = 30;

  startDragMouse = null;

  shift = [0, 0];

  cellSize;

  constructor() {
    super();

    this.cellSize = WorkArea.originCellSize;

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
    const { cellSize } = this;
    const { step } = WorkArea;

    this.innerHTML = `
                <work-ruler cell-size="${cellSize}" step="${step}" start-mark="0" align="horizontal"></work-ruler>
                <work-ruler cell-size="${cellSize}" step="${step}" start-mark="0" align="vertical"></work-ruler>
                <work-drag-area cell-size="${cellSize}" step=${step}></work-drag-area>
              `;
  }

  getScale() {
    return this.cellSize / WorkArea.originCellSize;
  }

  wheel(event) {
    if (!event.ctrlKey) {
      return;
    }
    event.preventDefault();

    const sign = event.deltaY < 0 ? 1 : -1;
    this.cellSize = Math.min(Math.max(this.cellSize + sign * 5, WorkArea.minCellSize), WorkArea.maxCellSize);
    this.render();
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
    const deltaX = event.clientX - this.startDragMouse[0];
    const deltaY = event.clientY - this.startDragMouse[1];
    this.shift = [this.shift[0] + deltaX, this.shift[1] + deltaY];

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
    const newShift = [this.shift[0] + deltaX, this.shift[1] + deltaY];
    const dragArea = this.getDragArea();
    dragArea.setShift(newShift);

    this.getRulerX().setAttribute('shift', newShift[0]);
    this.getRulerY().setAttribute('shift', newShift[1]);
  }
}

export default WorkArea;
