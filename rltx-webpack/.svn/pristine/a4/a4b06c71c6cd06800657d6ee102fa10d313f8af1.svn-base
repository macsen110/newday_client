/**
 * Created by zhuyi on 17/8/22.
 */
const PublicArea = {
  obj: {},
  data: {},
  setObservers: {},
  getObservers: {},
  defineDescriptor: (key) => {
    if (!Object.getOwnPropertyDescriptor(PublicArea.obj, key)) {
      Object.defineProperty(PublicArea.obj, key, {
        set: (val) => {
          PublicArea.data[key] = val;
          if (PublicArea.setObservers[key]) {
            PublicArea.setObservers[key].forEach((setObserver) => {
              setObserver(val);
            });
          }
        },
        get: () => {
          return PublicArea.data[key];
        },
        enumerable: true,
        configurable: true
      });
    }
  },
  set: (key, value) => {
    PublicArea.defineDescriptor(key);
    PublicArea.obj[key] = value;
  },
  get: (key) => {
    PublicArea.defineDescriptor(key);
    return PublicArea.obj[key];
  },
  addSetObservers: (key, setObserver) => {
    if (!PublicArea.setObservers[key]) {
      PublicArea.setObservers[key] = [];
    }
    PublicArea.setObservers[key].push(setObserver);
  },
  addGetObservers: (key, getObserver) => {
    if (!PublicArea.getObservers[key]) {
      PublicArea.getObservers[key] = [];
    }
    PublicArea.getObservers[key].push(getObserver);
  }
};

module.exports = PublicArea;
