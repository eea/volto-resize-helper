import ScreenSize from './ScreenSize';

// eslint-disable-next-line import/no-anonymous-default-export
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
