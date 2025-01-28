import '../scss/app.scss';

class TimeFormatted extends window.HTMLElement {
  connectedCallback() {
    this.innerHTML = 'hello 2';
  }
}

window.customElements.define('my-hello', TimeFormatted);
