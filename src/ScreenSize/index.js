import ScreenSize from './ScreenSize';

export default (config) => {
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
