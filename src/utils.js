export const getOSName = () => {
  const userAgent = window.navigator.userAgent;
  const platform = window.navigator.platform;
  const macPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
  const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
  const iosPlatforms = ['iPhone', 'iPad', 'iPod'];
  const mobilePlatforms = [
    'Android',
    'webOS',
    'Blackberry',
    'WindowsPhone',
    'WindowsCE',
    'Symbian',
  ];

  if (macPlatforms.indexOf(platform) !== -1) {
    return 'mac';
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    return 'ios';
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    return 'windows';
  } else if (/Android/.test(userAgent)) {
    return 'android';
  } else if (/Linux/.test(platform)) {
    return 'linux';
  } else if (mobilePlatforms.some((mp) => userAgent.indexOf(mp) !== -1)) {
    return 'mobile';
  } else {
    return 'unknown';
  }
};

export const detectTouchScreen = () => {
  let hasTouchScreen = false;
  if ('maxTouchPoints' in navigator) {
    hasTouchScreen = navigator.maxTouchPoints > 0;
  } else if ('msMaxTouchPoints' in navigator) {
    hasTouchScreen = navigator.msMaxTouchPoints > 0;
  } else {
    // fallback
    if ('ontouchstart' in window || window.TouchEvent) {
      hasTouchScreen = true;
    } else {
      hasTouchScreen = /Mobi|Android/i.test(navigator.userAgent);
    }
  }
  return hasTouchScreen;
};

export const getBrowserToolbarWidth = () => {
  return (
    window.screen.height -
    window.screen.availHeight +
    window.outerHeight -
    window.innerHeight
  );
};
