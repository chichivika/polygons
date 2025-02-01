class WorkRuler extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    const cellSize = parseInt(this.getAttribute('cell-size'));
    const step = parseInt(this.getAttribute('step'));
    if (Number.isNaN(cellSize) || Number.isNaN(step)) {
      return;
    }

    this.innerHTML = '';
    const rect = this.getBoundingClientRect();
    const vertical = this.getAttribute('align') === 'vertical';
    const fullSize = vertical ? rect.height : rect.width;
    const marksCount = Math.ceil(fullSize / cellSize);
    this.renderMarks({
      vertical,
      marksCount,
      step,
      cellSize,
    });
  }

  renderMarks({ marksCount, step, cellSize, vertical }) {
    const shift = this.getShift();
    const ratioShift = shift % 1;
    const integerShift = Math.trunc(shift);
    const shiftSign = vertical ? 1 : -1;

    for (let i = 0; i <= marksCount; ++i) {
      const edgePadding = '3px';
      const position = i * cellSize - shiftSign * ratioShift * cellSize;
      if (position < 0) {
        continue;
      }

      const markNumber = step * (i + shiftSign * integerShift);
      if (!WorkRuler.checkShouldShowNumber(markNumber, i)) {
        continue;
      }

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

  static checkShouldShowNumber(markNumber, i) {
    if (Math.abs(markNumber) < 1000) {
      return true;
    }
    if (Math.abs(markNumber) < 10000) {
      return i % 2 === 0;
    }
    return i % 3 === 0;
  }

  getShift() {
    return Number(this.getAttribute('shift')) || 0;
  }

  attributeChangedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ['cell-size', 'step', 'vertical', 'shift'];
  }
}

export default WorkRuler;
