class WorkArea extends HTMLElement {
  constructor() {
    super();

    this.cellSize = 30;

    const scrollHandler = (event) => {
      this.resize(event);
    };
    this.scrollHandler = scrollHandler.bind(this);
  }

  disconnectedCallback() {
    this.removeEventListener('wheel', this.scrollHandler);
  }

  connectedCallback() {
    this.addEventListener('wheel', this.scrollHandler);

    this.attachShadow({ mode: 'open' });
    this.render();
  }

  render() {
    const { cellSize } = this;
    const step = 10;

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

  resize(event) {
    if (!event.ctrlKey) {
      return;
    }
    event.preventDefault();
    const sign = event.deltaY < 0 ? 1 : -1;
    this.cellSize += sign * 5;
    if (this.cellSize < 25) {
      this.cellSize = 25;
    } else if (this.cellSize > 70) {
      this.cellSize = 70;
    }
    this.render();
  }
}

export default WorkArea;
