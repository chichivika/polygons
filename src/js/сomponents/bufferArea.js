import generatePolygonsData from '../utils/polygons';

class BufferArea extends HTMLElement {
  static polygonPadding = 5;

  static rowHeight = 110;

  static rowTopPadding = 5;

  constructor() {
    super();
    this.polygonsData = [];

    this.resizeHandler = () => {
      this.render();
    };
  }

  connectedCallback() {
    window.addEventListener('resize', this.resizeHandler);
    this.render();
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this.resizeHandler);
  }

  render() {
    const { polygonsData } = this;

    this.innerHTML = '';
    this.layoutPolygons(polygonsData);
  }

  createPolygons() {
    this.polygonsData = generatePolygonsData({
      maxHeight: BufferArea.rowHeight,
    });
    this.render();
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
      const polygonEl = BufferArea.renderPolygon(data);
      polygonEl.style.position = 'absolute';
      polygonEl.style.left = `${widthSum}px`;
      polygonEl.style.top = `${rowNumber * BufferArea.rowHeight + BufferArea.rowTopPadding}px`;
      this.append(polygonEl);
      widthSum += data.width + polygonPadding;
    });
  }

  static renderPolygon(polygonData) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', polygonData.width);
    svg.setAttribute('height', polygonData.height);

    const polygon = document.createElementNS(svg.namespaceURI, 'polygon');
    polygon.setAttribute('points', polygonData.points);

    svg.append(polygon);
    return svg;
  }
}

export default BufferArea;
