class WorkArea extends HTMLElement {
  static minCellSize = 25;

  static maxCellSize = 70;

  static step = 10;

  startDragMouse = null;

  shift = [0, 0];

  constructor() {
    super();

    this.cellSize = 30;

    this.wheelHandler = (event) => {
      this.wheel(event);
    };
    this.resizeHandler = (event) => {
      this.resize(event);
    };
    this.mouseDownHandler = (event) => {
      this.startDragging(event);
    };
    this.mouseMoveHandler = (event) => {
      this.doDragging(event);
    };
    this.mouseUpHandler = (event) => {
      this.stopDragging(event);
    };
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

    this.attachShadow({ mode: 'open' });
    this.render();
  }

  render() {
    const { cellSize } = this;
    const { step } = WorkArea;

    this.shadowRoot.innerHTML = `
                <style>
                  :host(work-area) {   
                        display: grid;
                        grid-template-rows: 1fr 30px;
                        grid-template-columns: 30px 1fr;
                  }
                  :host > work-ruler[align="vertical"] {
                    grid-row: 1 / span 1;
                    grid-column: 1 / span 1;
                  }
                  :host > work-ruler[align="horizontal"] {
                    grid-row: 2 / span 1;
                    grid-column: 2 / span 1;
                  }
                  :host > drag-area {
                    grid-row: 1 / span 1;
                    grid-column: 2 / span 1;
                    background-color: var(--bg-color);
                  }
                </style>
                <work-ruler cell-size="${cellSize}" step="${step}" start-mark="0" align="horizontal"></work-ruler>
                <work-ruler cell-size="${cellSize}" step="${step}" start-mark="0" align="vertical"></work-ruler>
                <drag-area cell-size="${cellSize}"></drag-area>
              `;
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
    if (event.target?.tagName !== 'WORK-AREA') {
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
    return this.shadowRoot.querySelector('drag-area');
  }

  getRulerY() {
    return this.shadowRoot.querySelector('work-ruler[align="vertical"]');
  }

  getRulerX() {
    return this.shadowRoot.querySelector('work-ruler[align="horizontal"]');
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
