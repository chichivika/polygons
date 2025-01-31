class GeneratedPolygon extends HTMLElement {
  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
    }
    this.render();
  }

  render() {
    if (!this.shadowRoot) {
      return;
    }

    const width = this.getAttribute('width');
    const height = this.getAttribute('height');
    const points = this.getAttribute('points');
    const polygonKey = this.getAttribute('polygon-key');

    this.shadowRoot.innerHTML = `
            <style>
                :host {
                    fill: var(--polygon-bg-color);
                    fill-opacity: 0.7;
                    stroke: var(--polygon-bg-color);
                    cursor: pointer;
                    transform-origin: top left;
                }
            </style>
            <svg width=${width} height=${height} data-polygonKey=${polygonKey}>
                <polygon></polygon>
            </svg>
            `;
    this.shadowRoot.querySelector('polygon').setAttribute('points', points);
  }

  attributeChangedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ['width', 'height', 'points', 'polygonKey'];
  }
}

export default GeneratedPolygon;
