import { generateKey } from './jsUtils';

const initialData = {
  scale: 1,
  shift: [0, 0],
  bufferPolygons: [],
  workPolygons: [],
};

class AppStore {
  constructor(param = {}) {
    const initialParam = { ...initialData, ...param };
    Object.assign(this, initialParam);
  }

  saveData() {
    const dataForSaving = {};
    Object.keys(initialData).forEach((key) => {
      const data = this[key];
      switch (key) {
        case 'workPolygons':
        case 'bufferPolygons':
          dataForSaving[key] = AppStore.parsePolygonsForSaving(data);
          break;
        default:
          dataForSaving[key] = data;
          break;
      }
    });
    localStorage.setItem('storeData', JSON.stringify(dataForSaving));
  }

  clearData() {
    Object.assign(this, initialData);
    localStorage.clear();
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

function getInitialStoreParam() {
  const savedData = localStorage.getItem('storeData');
  if (savedData) {
    try {
      const param = Object.assign(initialData, JSON.parse(savedData));
      return {
        ...param,
        bufferPolygons: AppStore.parsePolygonsFromSaving(param.bufferPolygons),
        workPolygons: AppStore.parsePolygonsFromSaving(param.workPolygons),
      };
    } catch (e) {
      return {};
    }
  }
  return {};
}

const store = new AppStore(getInitialStoreParam());
export default store;
