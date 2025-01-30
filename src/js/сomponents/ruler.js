class Ruler extends HTMLElement {
  connectedCallback() {
    this.style = `
        position: relative;
        overflow: hidden;
        font-size: 10px;
        font-weight: bold;
        user-select: none;
    `;
    this.render();
  }

  render() {
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
    const marksCount = Math.floor(fullSize / cellSize);
    this.renderMarks({
      vertical,
      marksCount,
      step,
      cellSize,
    });
  }

  renderMarks({ marksCount, step, cellSize, vertical }) {
    const shift = this.getShift();
    const ratioShift = shift % cellSize;
    const integerShift = shift > 0 ? Math.floor(shift / cellSize) : Math.ceil(shift / cellSize);
    const shiftSign = vertical ? 1 : -1;

    for (let i = 0; i <= marksCount; ++i) {
      const edgePadding = '3px';
      const position = i * cellSize - shiftSign * ratioShift;
      if (position < 0) {
        continue;
      }

      const markNumber = step * (i + shiftSign * integerShift);
      const markEl = document.createElement('div');
      markEl.style.position = 'absolute';

      if (vertical) {
        markEl.style.right = edgePadding;
        markEl.style.bottom = `${position}px`;
      } else {
        markEl.style.top = edgePadding;
        markEl.style.left = `${position}px`;
      }

      markEl.innerText = `${markNumber}`;
      this.append(markEl);
    }
  }

  getShift() {
    return Number(this.getAttribute('shift')) || 0;
  }

  attributeChangedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ['cell-size', 'step', 'start-mark', 'vertical', 'shift'];
  }
}

export default Ruler;
