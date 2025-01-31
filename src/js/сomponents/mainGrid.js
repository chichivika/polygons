class MainGrid extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
            <app-toolbar></app-toolbar>
            <dnd-wrapper></dnd-wrapper>
          `;
  }
}

export default MainGrid;
