class DragArea extends HTMLElement {
  constructor() {
    super();

    const resizeCallback = () => {
      this.render();
    };
    this.resizeCallback = resizeCallback.bind(this);
  }

  connectedCallback() {
    window.addEventListener('resize', this.resizeCallback);
    this.style = `
        position: relative;
    `;
    this.render();
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this.resizeCallback);
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = '';

    const canvas = document.createElement('canvas');
    const rect = this.getBoundingClientRect();
    canvas.setAttribute('width', rect.width);
    canvas.setAttribute('height', rect.height);
    canvas.style.position = 'absolute';
    canvas.style.bottom = '0px';
    canvas.style.left = '0px';
    this.append(canvas);

    const ctx = canvas.getContext('2d');
    const cellSize = parseInt(this.getAttribute('cell-size'));
    if (ctx === null || Number.isNaN(cellSize)) {
      return;
    }
    DragArea.drawCells({ ctx, cellSize, width: canvas.width, height: canvas.height });
  }

  static drawCells({ ctx, cellSize, width, height }) {
    ctx.strokeStyle = 'lightgrey';

    const horizontalLinesCount = Math.floor(height / cellSize);
    for (let i = 1; i <= horizontalLinesCount; ++i) {
      ctx.beginPath();
      ctx.moveTo(0, height - i * cellSize);
      ctx.lineTo(width, height - i * cellSize);
      ctx.stroke();
    }

    const verticalLinesCount = Math.floor(width / cellSize);
    for (let i = 1; i <= verticalLinesCount; ++i) {
      ctx.beginPath();
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, height);
      ctx.stroke();
    }
  }

  static get observedAttributes() {
    return ['cell-size'];
  }
}

export default DragArea;
