import ScreenSize from './ScreenSize';

const applyConfig = (config) => {
  config.settings.resizeDebounce = 350; // Measured in milliseconds

  config.settings.appExtras = [
    ...(config.settings.appExtras || []),
    {
      match: '',
      component: ScreenSize,
    },
  ];

  return config;
};

export default applyConfig;
