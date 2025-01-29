class MainGrid extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
            <style>
              :host {   
                    width: 100%;
                    height: 100%;
                    display: grid;
                    grid-template-rows: 80px 1fr 2fr;
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
                height: 100%;
                min-height: 300px;
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
