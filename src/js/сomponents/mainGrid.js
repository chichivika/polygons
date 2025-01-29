class MainGrid extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
            <style>
              :host {   
                    display: grid;
                    height: 100%;
                    grid-template-rows: 80px max-content minmax(300px, 1fr);
                    grid-template-columns: 1fr;
                    gap: 8px;
                    background-color: var(--header-color);
              }
              :host > ::slotted(*) {
                background-color: var(--bg-color);
              }
              ::slotted(app-toolbar) {
                grid-row: 1 / span 1;
              }
              ::slotted(buffer-area) {
                grid-row: 2 / span 1;
                min-height: 240px;
              }
              ::slotted(work-area) {
                grid-row: 3 / span 1;
              }
            </style>
            <slot name='toolbar'></slot>
            <slot name='buffer-area'></slot>
            <slot name='work-area'></slot>
          `;
  }
}

export default MainGrid;
