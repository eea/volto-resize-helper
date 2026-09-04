import installScreenSize from './ScreenSize';

import screen from './store';

const applyConfig = (config) => {
  config.addonReducers = { ...(config.addonReducers || {}), screen };

  return [installScreenSize].reduce((acc, apply) => apply(acc), config);
};

export default applyConfig;
