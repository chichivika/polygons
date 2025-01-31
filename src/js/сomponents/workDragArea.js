import { getPolygonDataByElement, renderPolygon } from '../utils/polygons';
import WorkArea from './workArea';
import store from '../utils/store';

class WorkDragArea extends HTMLElement {
  shift = [0, 0];

  canvasEl = null;

  polygonsEl = null;

  connectedCallback() {
    if (!this.canvasEl) {
      const canvas = document.createElement('canvas');
      const rect = this.getBoundingClientRect();
      canvas.setAttribute('width', rect.width);
      canvas.setAttribute('height', rect.height);
      canvas.style.position = 'absolute';
      canvas.style.bottom = '0px';
      canvas.style.left = '0px';
      this.canvasEl = canvas;
      this.append(canvas);
    }
    if (!this.polygonsEl) {
      const polygonsEl = document.createElement('div');
      this.append(polygonsEl);
      this.polygonsEl = polygonsEl;
    }
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const { canvasEl } = this;
    if (!canvasEl) {
      return;
    }

    const ctx = canvasEl.getContext('2d');
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
    const cellSize = parseInt(this.getAttribute('cell-size'));
    if (ctx === null || Number.isNaN(cellSize)) {
      return;
    }
    this.drawCells({ ctx, cellSize, width: canvasEl.width, height: canvasEl.height });

    this.renderPolygons();
  }

  renderPolygons() {
    const { polygonsEl } = this;
    const { workPolygons } = store;

    const newChildren = [];
    const viewPolygonsData = workPolygons.filter((data) => this.checkPolygonInView(data));
    viewPolygonsData.forEach((data) => {
      const polygonEl = renderPolygon(data);
      polygonEl.style.position = 'absolute';

      const position = this.getPositionByWorkCoordinates(data);
      polygonEl.style.left = `${position.left}px`;
      polygonEl.style.top = `${position.top}px`;
      polygonEl.style.transform = `scale(${this.getScale()})`;

      newChildren.push(polygonEl);
    });

    polygonsEl.replaceChildren(...newChildren);
  }

  checkPolygonInView(polygonData) {
    const polygonLeft = polygonData.workLeft;
    const polygonTop = polygonData.workTop;

    const rect = this.getBoundingClientRect();
    const { workLeft: minLeft, workTop: minTop } = this.getWorkCoordinatesByPosition({ left: 0, top: rect.height });
    const { workLeft: maxLeft, workTop: maxTop } = this.getWorkCoordinatesByPosition({ left: rect.width, top: 0 });

    const scale = this.getScale();
    const polygonRight = polygonLeft + polygonData.width * scale;
    const polygonBottom = polygonTop - polygonData.height * scale;

    const isSeenInHorizontal = (polygonLeft <= maxLeft && polygonLeft >= minLeft) ||
    (polygonRight <= maxLeft && polygonRight >= minLeft);
    const isSeenInVertical = (polygonTop <= maxTop && polygonTop >= minTop) ||
    (polygonBottom <= maxTop && polygonBottom >= minTop);

    return isSeenInHorizontal && isSeenInVertical;
  }

  getScale() {
    const cellSize = this.getAttribute('cell-size');
    return cellSize / WorkArea.originCellSize;
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
    store.workPolygons.push({ ...polygonData, ...workCoordinates });

    this.polygonsEl.append(polygonEl);
  }

  removePolygon(polygonEl) {
    const polygonData = getPolygonDataByElement(polygonEl);
    store.workPolygons = store.workPolygons.filter((data) => data.key !== polygonData.key);
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

  getPositionByWorkCoordinates({ workLeft, workTop }) {
    const rect = this.getBoundingClientRect();
    const { shift } = this;

    return {
      left: this.fromCoordinateToPixels(workLeft) + shift[0],
      top: rect.height + shift[1] - this.fromCoordinateToPixels(workTop),
    };
  }

  fromPixelsToCoordinate(pxNumber) {
    const cellSize = Number(this.getAttribute('cell-size'));
    const step = Number(this.getAttribute('step'));

    return (pxNumber / cellSize) * step;
  }

  fromCoordinateToPixels(coordinate) {
    const cellSize = Number(this.getAttribute('cell-size'));
    const step = Number(this.getAttribute('step'));
    return (coordinate * cellSize) / step;
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
