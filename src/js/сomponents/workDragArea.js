import { getPolygonDataByElement } from '../utils/polygons';

class WorkDragArea extends HTMLElement {
  shift = [0, 0];

  polygonsData = [];

  connectedCallback() {
    this.style = `
        position: relative;
        overflow: hidden;
    `;
    this.render();
  }

  attributeChangedCallback() {
    const canvas = document.createElement('canvas');
    const rect = this.getBoundingClientRect();
    canvas.setAttribute('width', rect.width);
    canvas.setAttribute('height', rect.height);
    canvas.style.position = 'absolute';
    canvas.style.bottom = '0px';
    canvas.style.left = '0px';

    this.append(canvas);
    this.render();
  }

  render() {
    const canvas = this.querySelector('canvas');
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cellSize = parseInt(this.getAttribute('cell-size'));
    if (ctx === null || Number.isNaN(cellSize)) {
      return;
    }
    this.drawCells({ ctx, cellSize, width: canvas.width, height: canvas.height });
  }

  appendPolygon(polygonEl) {
    const polygonData = getPolygonDataByElement(polygonEl);

    const polygonRect = polygonEl.getBoundingClientRect();
    const targetRect = this.getBoundingClientRect();

    const left = polygonRect.left - targetRect.left;
    const top = polygonRect.top - targetRect.top;
    polygonEl.style.left = `${left}px`;
    polygonEl.style.top = `${top}px`;

    const workCoordinates = this.getWorkCoordinatesByPosition({ left, top });
    this.polygonsData.push({ ...polygonData, ...workCoordinates });

    this.append(polygonEl);
  }

  removePolygon(polygonEl) {
    const polygonData = getPolygonDataByElement(polygonEl);
    this.polygonsData = this.polygonsData.filter((data) => data.key !== polygonData.key);
    polygonEl.remove();
  }

  getWorkCoordinatesByPosition({ left, top }) {
    const rect = this.getBoundingClientRect();
    const { shift } = this;

    return {
      workLeft: this.fromPixelsToCoordinate(left - shift[0]),
      workTop: this.fromPixelsToCoordinate(rect.height - top + shift[1]),
    };
  }

  fromPixelsToCoordinate(pxNumber) {
    const cellSize = Number(this.getAttribute('cell-size'));
    const step = Number(this.getAttribute('step'));

    return (pxNumber / cellSize) * step;
  }

  drawCells({ ctx, cellSize, width, height }) {
    ctx.strokeStyle = 'lightgrey';
    const shiftX = this.shift[0] % cellSize;
    const shiftY = this.shift[1] % cellSize;

    const horizontalLinesCount = Math.floor(height / cellSize);
    for (let i = 0; i <= horizontalLinesCount; ++i) {
      ctx.beginPath();
      const y = shiftY + height - i * cellSize;
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    const verticalLinesCount = Math.floor(width / cellSize);
    for (let i = 0; i <= verticalLinesCount; ++i) {
      ctx.beginPath();
      const x = shiftX + i * cellSize;
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
  }

  getCellByMouse(mouseX, mouseY) {
    const rect = this.getBoundingClientRect();
    if (mouseX < rect.left || mouseX > rect.left + rect.width) {
      return null;
    }
    if (mouseY < rect.top || mouseY > rect.top + rect.height) {
      return null;
    }

    const cellSize = this.getAttribute('cell-size');
    const rowIndex = Math.floor((mouseX - rect.left) / cellSize);
    const colIndex = Math.floor((rect.top + rect.height - mouseY) / cellSize);

    return [rowIndex, colIndex];
  }

  setShift(newShift) {
    this.shift = newShift;
    this.render();
  }

  static get observedAttributes() {
    return ['cell-size', 'step'];
  }
}

export default WorkDragArea;
