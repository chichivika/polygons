class Ruler extends HTMLElement {
  constructor() {
    super();

    const resizeCallback = () => {
      this.render();
    };
    this.resizeCallback = resizeCallback.bind(this);
  }

  connectedCallback() {
    window.addEventListener('resize', this.resizeCallback);
    this.render();
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this.resizeCallback);
  }

  render() {
    this.style = `
        position: relative;
        font-size: 10px;
        font-weight: bold;
    `;

    const cellSize = parseInt(this.getAttribute('cell-size'));
    const step = parseInt(this.getAttribute('step'));
    const startMark = parseInt(this.getAttribute('start-mark'));
    if (Number.isNaN(cellSize) || Number.isNaN(step) || Number.isNaN(startMark)) {
      return;
    }

    this.innerHTML = '';
    const rect = this.getBoundingClientRect();
    const vertical = this.getAttribute('align') === 'vertical';
    const fullSize = vertical ? rect.height : rect.width;
    const marksCount = Math.floor((fullSize) / cellSize);
    this.renderMarks({
      vertical,
      marksCount,
      step,
      cellSize,
    });
  }

  renderMarks({ marksCount, step, cellSize, vertical }) {
    for (let i = 0; i < marksCount; ++i) {
      const markNumber = step * i;
      const markEl = document.createElement('div');
      markEl.style.position = 'absolute';

      const edgePadding = '3px';
      const position = `${i * cellSize}px`;
      if (vertical) {
        markEl.style.right = edgePadding;
        markEl.style.bottom = position;
      } else {
        markEl.style.top = edgePadding;
        markEl.style.left = position;
      }

      markEl.innerText = `${markNumber}`;
      this.append(markEl);
    }
  }

  attributeChangedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ['cell-size', 'step', 'start-mark', 'vertical'];
  }
}

export default Ruler;
