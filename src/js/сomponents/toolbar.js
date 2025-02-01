import store from '../utils/store';

class Toolbar extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
          <style>
            :host {   
                display: flex;
                justify-content: space-evenly;
                flex-wrap: wrap;
                align-items: center;
                gap: 20px;
            }
            button {
                background-color: var(--button-bg-color);
                padding: 10px 20px;
                border: none;
                border-radius: 3px;
                cursor: pointer;
                transition: background-color 0.3s;
            }
            button:hover {
                background-color: var(--button-hover-bg-color);
            }
            button:active {
                background-color: var(--button-active-bg-color);
            }
            .app-toolbar-right-cnt {
                display: flex;
                gap: 20px;
                align-items: center;
            }
          </style>
          <button data-action='create'>Создать</button>
          <div class='app-toolbar-right-cnt'>
            <button data-action='save'>Сохранить</button>
            <button data-action='clear'>Сбросить</button>
          </div>
        `;
    this.addActionsListeners();
  }

  addActionsListeners() {
    const actionButtons = this.shadowRoot.querySelectorAll('button[data-action]');
    actionButtons.forEach((actionButton) => {
      actionButton.addEventListener('click', () => {
        Toolbar.doAction(actionButton.dataset.action);
      });
    });
  }

  static doAction(actionName) {
    switch (actionName) {
      case 'create':
        store.createPolygons();
        break;
      case 'save':
        store.saveData();
        break;
      case 'clear':
        store.clearData();
        break;
      default:
        break;
    }
  }
}

export default Toolbar;
