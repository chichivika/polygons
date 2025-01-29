class WorkArea extends HTMLElement {
  connectedCallback() {
    this.innerHTML = '<canvas width=300 height=300></canvas>';
  }
}

export default WorkArea;
