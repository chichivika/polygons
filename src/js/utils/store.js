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
}

const store = new AppStore();
export default store;
