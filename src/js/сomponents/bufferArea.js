import generatePolygonsData from '../utils/polygons';

class BufferArea extends HTMLElement {
  constructor() {
    super();
    this.polygonsData = null;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const { polygonsData } = this;
    if (!polygonsData) {
      return;
    }

    this.innerHTML = '';
    try {
      polygonsData.forEach((polygonData) => {
        this.append(BufferArea.renderPolygon(polygonData));
      });
    } catch (e) {
      console.log(e);
    }
  }

  createPolygons() {
    this.polygonsData = generatePolygonsData();
    this.render();
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
