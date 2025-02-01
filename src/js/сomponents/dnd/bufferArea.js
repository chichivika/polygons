import { getPolygonDataByElement, renderPolygon } from '../../utils/polygons';
import store, { PolygonsStore } from '../../utils/store';

class BufferArea extends HTMLElement {
  static polygonPadding = 5;

  static rowTopPadding = 5;

  constructor() {
    super();

    this.renderHandler = this.render.bind(this);
  }

  connectedCallback() {
    window.addEventListener('resize', this.renderHandler);
    store.addListener('bufferPolygonsCreated', this.renderHandler);
    store.addListener('clearData', this.renderHandler);

    this.render();
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this.renderHandler);
    store.removeListener('bufferPolygonsCreated', this.renderHandler);
    store.removeListener('clearData', this.renderHandler);
  }

  render() {
    const { bufferPolygons } = store;

    this.innerHTML = '';
    this.layoutPolygons(bufferPolygons);
  }

  appendPolygon(polygonEl) {
    const polygonData = getPolygonDataByElement(polygonEl);
    store.bufferPolygons.push(polygonData);

    const polygonRect = polygonEl.getBoundingClientRect();
    const targetRect = this.getBoundingClientRect();

    const polygonLeft = Math.min(Math.max(polygonRect.left - targetRect.left, 0), targetRect.width - polygonData.width);
    const polygonTop = Math.min(Math.max(0, polygonRect.top - targetRect.top), targetRect.height - polygonData.height);

    polygonEl.style.left = `${polygonLeft}px`;
    polygonEl.style.top = `${polygonTop}px`;

    this.append(polygonEl);
  }

  returnPolygon(polygonEl, initialPosition) {
    polygonEl.style.left = `${initialPosition.left}px`;
    polygonEl.style.top = `${initialPosition.top}px`;

    this.appendPolygon(polygonEl);
  }

  removePolygon(polygonEl) {
    const polygonData = getPolygonDataByElement(polygonEl);
    const indexToRemove = store.bufferPolygons.findIndex((data) => data.key === polygonData.key);
    polygonEl.remove();
    return store.bufferPolygons.splice(indexToRemove, 1)?.[0] || null;
  }

  layoutPolygons(polygonsData) {
    const rect = this.getBoundingClientRect();
    const { width } = rect;

    const polygonsLength = polygonsData.length;
    const { polygonPadding } = BufferArea;

    let rowNumber = 0;
    let widthSum = polygonPadding;
    let firstPolygonIndex = 0;

    polygonsData.forEach((data, i) => {
      const nextWidth = widthSum + data.width + polygonPadding;
      const isLast = i === polygonsLength - 1;

      if (nextWidth < width && !isLast) {
        widthSum = nextWidth;
        return;
      }
      if (nextWidth < width && isLast) {
        this.placePolygonsInRow({
          rowNumber,
          polygonsData: polygonsData.slice(firstPolygonIndex, polygonsLength),
          fullWidth: nextWidth,
        });
        return;
      }

      this.placePolygonsInRow({
        rowNumber,
        polygonsData: polygonsData.slice(firstPolygonIndex, i),
        fullWidth: widthSum,
      });

      rowNumber += 1;
      widthSum = polygonPadding * 2 + data.width;
      firstPolygonIndex = i;

      if (isLast) {
        this.placePolygonsInRow({
          rowNumber,
          polygonsData: [polygonsData.at(-1)],
          fullWidth: polygonPadding * 2 + polygonsData.at(-1).width,
        });
      }
    });

    this.style.height = `${(rowNumber + 1) * 120}px`;
  }

  placePolygonsInRow({ rowNumber, polygonsData, fullWidth }) {
    const rect = this.getBoundingClientRect();
    const { width } = rect;
    const restWidth = width - fullWidth;
    const padding = restWidth / 2;
    const { polygonPadding } = BufferArea;

    let widthSum = padding + polygonPadding;
    polygonsData.forEach((data) => {
      const polygonEl = renderPolygon(data);
      polygonEl.style.position = 'absolute';
      polygonEl.style.left = `${widthSum}px`;
      polygonEl.style.top = `${rowNumber * PolygonsStore.maxPolygonHeight + BufferArea.rowTopPadding}px`;

      this.append(polygonEl);
      widthSum += data.width + polygonPadding;
    });
  }
}

export default BufferArea;
