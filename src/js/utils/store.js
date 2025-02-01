import { generateKey } from './jsUtils';
import generatePolygonsData from './polygons';

function getInitialData() {
  return {
    scale: 1,
    shift: [0, 0],
    bufferPolygons: [],
    workPolygons: [],
  };
}

function getStoreKeys() {
  return [...Object.keys(getInitialData())];
}

function getInitialStoreParam() {
  const savedData = localStorage.getItem('storeData');
  if (savedData) {
    try {
      const param = Object.assign(getInitialData(), JSON.parse(savedData));
      return {
        ...param,
        bufferPolygons: PolygonsStore.parsePolygonsFromSaving(param.bufferPolygons),
        workPolygons: PolygonsStore.parsePolygonsFromSaving(param.workPolygons),
      };
    } catch (e) {
      return {};
    }
  }
  return {};
}

export class PolygonsStore {
  static maxPolygonHeight = 110;

  listeners = {
    bufferPolygonsCreated: [],
    clearData: [],
  };

  constructor(param = {}) {
    const initialParam = { ...getInitialData(), ...param };
    Object.assign(this, initialParam);
  }

  saveData() {
    const dataForSaving = {};
    getStoreKeys().forEach((key) => {
      const data = this[key];
      switch (key) {
        case 'workPolygons':
        case 'bufferPolygons':
          dataForSaving[key] = PolygonsStore.parsePolygonsForSaving(data);
          break;
        default:
          dataForSaving[key] = data;
          break;
      }
    });
    localStorage.setItem('storeData', JSON.stringify(dataForSaving));
    alert('Данные сохранены в local storage!');
  }

  clearData() {
    Object.assign(this, getInitialData());
    localStorage.clear();
    this.callListeners('clearData');
  }

  createPolygons() {
    const polygonsData = generatePolygonsData({
      maxHeight: PolygonsStore.maxPolygonHeight,
    });

    this.bufferPolygons = polygonsData;
    this.callListeners('bufferPolygonsCreated', polygonsData);
  }

  addListener(eventName, handler) {
    const handlers = this.listeners[eventName];
    if (handlers) {
      handlers.push(handler);
    }
  }

  removeListener(eventName, handler) {
    const handlers = this.listeners[eventName];
    if (handlers) {
      this.listeners[eventName] = handlers.filter((func) => func !== handler);
    }
  }

  callListeners(eventName, eventParam) {
    const handlers = this.listeners[eventName];
    if (!handlers || !handlers.length) {
      return;
    }
    handlers.forEach((handler) => handler(eventParam));
  }

  static parsePolygonsForSaving(polygonsData) {
    return polygonsData.map((data) => {
      const newData = { ...data };
      delete newData.key;
      return newData;
    });
  }

  static parsePolygonsFromSaving(polygonsData) {
    return polygonsData.map((data) => ({ ...data, key: generateKey('polygon') }));
  }
}

const store = new PolygonsStore(getInitialStoreParam());
export default store;
